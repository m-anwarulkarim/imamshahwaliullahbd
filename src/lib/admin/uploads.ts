import { createServerFn } from "@tanstack/react-start";
import { requireAuth } from "@/lib/auth/middleware";
import { z } from "zod";
import { verifyAdmin } from "../db/access";
import { getCfEnv } from "@/lib/db/cf-env";

function getR2Bindings() {
  const env = getCfEnv();
  if (!env.IMAGES || !env.PDFS) {
    throw new Error("R2 bindings (IMAGES, PDFS) not found. Check wrangler.toml [[r2_buckets]].");
  }
  return env as { IMAGES: R2Bucket; PDFS: R2Bucket };
}

function slugify(name: string) {
  const dot = name.lastIndexOf(".");
  const ext = dot > 0 ? name.slice(dot + 1).toLowerCase().replace(/[^a-z0-9]/g, "") : "jpg";
  const base = (dot > 0 ? name.slice(0, dot) : name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${base || "file"}-${crypto.randomUUID()}.${ext}`;
}

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

const imageSchema = z.object({
  fileName: z.string().min(1).max(200),
  contentType: z.string().min(3).max(100),
  base64: z.string().min(10),
});

const pdfSchema = z.object({
  fileName: z.string().min(1).max(200),
  base64: z.string().min(10),
});

/** Admin-only image upload → Cloudflare R2 IMAGES bucket */
export const uploadContentImage = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((d) => imageSchema.parse(d))
  .handler(async ({ data, context }) => {
    await verifyAdmin(context.userId);

    if (!ALLOWED_IMAGE_TYPES.includes(data.contentType)) {
      throw new Error("Only JPEG, PNG, WebP, GIF or AVIF images are allowed.");
    }

    const bytes = Buffer.from(data.base64, "base64");
    if (bytes.byteLength > 10 * 1024 * 1024) throw new Error("Image must be smaller than 10 MB.");

    const { IMAGES } = getR2Bindings();
    const key = slugify(data.fileName);
    await IMAGES.put(key, bytes, { httpMetadata: { contentType: data.contentType } });

    return { url: `/api/public/media/${key}`, key };
  });

/** Admin-only magazine PDF upload → Cloudflare R2 PDFS bucket */
export const uploadMagazinePdf = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((d) => pdfSchema.parse(d))
  .handler(async ({ data, context }) => {
    await verifyAdmin(context.userId);

    const bytes = Buffer.from(data.base64, "base64");
    if (bytes.byteLength > 30 * 1024 * 1024) throw new Error("PDF must be smaller than 30 MB.");
    if (bytes.subarray(0, 5).toString("latin1") !== "%PDF-") throw new Error("Only PDF files are allowed.");

    const { PDFS } = getR2Bindings();
    const key = slugify(data.fileName).replace(/\.[a-z0-9]+$/, ".pdf");
    await PDFS.put(key, bytes, { httpMetadata: { contentType: "application/pdf" } });

    return { path: key };
  });
