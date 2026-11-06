import { createServerFileRoute } from "@tanstack/react-start/server";
import { getCfEnv } from "@/lib/db/cf-env";

export const ServerRoute = createServerFileRoute("/api/public/media/$").methods({
  GET: async ({ params }) => {
    const key = params["*"] ?? "";
    if (!key) return new Response("Not found", { status: 404 });

    const isPdf = key.endsWith(".pdf");
    const env = getCfEnv();
    const bucket = isPdf ? env.PDFS : env.IMAGES;
    if (!bucket) return new Response("Storage not configured", { status: 503 });

    const obj = await bucket.get(key);
    if (!obj) return new Response("Not found", { status: 404 });

    const contentType = obj.httpMetadata?.contentType ?? (isPdf ? "application/pdf" : "application/octet-stream");

    return new Response(obj.body as BodyInit, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  },
});
