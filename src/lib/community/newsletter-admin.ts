import { createServerFn } from "@tanstack/react-start";
import { requireAuth } from "@/lib/auth/middleware";
import { desc } from "drizzle-orm";
import { getDb } from "../db/client";
import { verifyAdmin } from "../db/access";
import { newsletterSubscribers } from "../../../drizzle/schema/community";

export const getNewsletterSubscribers = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    return db.select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.createdAt));
  });

