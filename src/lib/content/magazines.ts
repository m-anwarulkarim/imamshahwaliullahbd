import { createServerFn } from "@tanstack/react-start";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "../db/client";
import { magazines } from "../../../drizzle/schema/content";

export const getPublishedMagazines = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const db = getDb();
    return await db
      .select({
        id: magazines.id,
        title: magazines.title,
        issueMonth: magazines.issueMonth,
        description: magazines.description,
        coverUrl: magazines.coverUrl,
        pageCount: magazines.pageCount,
        publishedAt: magazines.publishedAt,
      })
      .from(magazines)
      .where(eq(magazines.isPublished, true))
      .orderBy(desc(magazines.issueMonth));
  } catch (e) {
    console.error("getPublishedMagazines failed:", e);
    return [];
  }
});

export const getMagazineById = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => {
    const res = z.object({ id: z.string() }).safeParse(data);
    return res.success ? res.data : { id: "" };
  })
  .handler(async ({ data }) => {
    if (!data.id) return null;
    try {
      const db = getDb();
      const [magazine] = await db
        .select()
        .from(magazines)
        .where(eq(magazines.id, data.id))
        .limit(1);
      return magazine ?? null;
    } catch (e) {
      console.error("getMagazineById failed:", e);
      return null;
    }
  });

export function magazineReadUrl(id: string) {
  return `/api/public/magazine/${id}`;
}

export function magazineDownloadUrl(id: string) {
  return `/api/public/magazine/${id}`;
}

export function formatIssueMonth(issueMonth: string): string {
  const d = new Date(issueMonth + "-01");
  if (isNaN(d.getTime())) return issueMonth;
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
