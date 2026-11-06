import { createServerFn } from "@tanstack/react-start";
import { requireAuth } from "@/lib/auth/middleware";
import { eq, sql, desc } from "drizzle-orm";
import { getDb } from "../db/client";
import { verifyAdmin } from "../db/access";
import { books, orders } from "../../../drizzle/schema/books";
import { membershipApplications, donations } from "../../../drizzle/schema/community";
import { events } from "../../../drizzle/schema/content";

export const getDashboardStats = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();

    const [booksCount] = await db.select({ count: sql<number>`count(*)::int` }).from(books);
    const [activeOrdersCount] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(orders)
      .where(eq(orders.status, "pending"));
    const [totalOrdersCount] = await db.select({ count: sql<number>`count(*)::int` }).from(orders);
    const [applicationsCount] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(membershipApplications);
    const [donationSum] = await db
      .select({ total: sql<number>`coalesce(sum(amount::numeric), 0)::float` })
      .from(donations)
      .where(eq(donations.status, "confirmed"));

    return {
      books: booksCount?.count ?? 0,
      activeOrders: activeOrdersCount?.count ?? 0,
      totalOrders: totalOrdersCount?.count ?? 0,
      membershipApplications: applicationsCount?.count ?? 0,
      confirmedDonations: donationSum?.total ?? 0,
    };
  });

export const getRecentActivities = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();

    const recentBooks = await db
      .select()
      .from(books)
      .orderBy(desc(books.createdAt))
      .limit(3);

    const recentOrders = await db
      .select()
      .from(orders)
      .orderBy(desc(orders.createdAt))
      .limit(3);

    const recentEvents = await db
      .select()
      .from(events)
      .orderBy(desc(events.createdAt))
      .limit(3);

    return { books: recentBooks, orders: recentOrders, events: recentEvents };
  });

export const getDonations = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();

    return db.select().from(donations).orderBy(desc(donations.createdAt));
  });

