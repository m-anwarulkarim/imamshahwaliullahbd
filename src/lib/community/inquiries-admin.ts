import { createServerFn } from "@tanstack/react-start";
import { requireAuth } from "@/lib/auth/middleware";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "../db/client";
import { verifyAdmin } from "../db/access";
import { books, orders } from "../../../drizzle/schema/books";
import { contactMessages, membershipApplications } from "../../../drizzle/schema/community";

export const getContactMessages = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  });

export const getMembershipApplications = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    return db
      .select()
      .from(membershipApplications)
      .orderBy(desc(membershipApplications.createdAt));
  });

export const getBookOrders = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    return db
      .select({
        id: orders.id,
        bookId: orders.bookId,
        customerName: orders.customerName,
        customerEmail: orders.customerEmail,
        customerPhone: orders.customerPhone,
        address: orders.address,
        quantity: orders.quantity,
        status: orders.status,
        bookTitle: orders.bookTitle,
        unitPrice: orders.unitPrice,
        createdAt: orders.createdAt,
        book: {
          title: books.title,
          price: books.price,
          coverUrl: books.coverUrl,
        },
      })
      .from(orders)
      .leftJoin(books, eq(orders.bookId, books.id))
      .orderBy(desc(orders.createdAt));
  });

const updateOrderSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["pending", "confirmed", "shipped", "delivered", "cancelled"]),
});

export const updateOrderStatus = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((data) => updateOrderSchema.parse(data))
  .handler(async ({ data, context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    await db.update(orders).set({ status: data.status }).where(eq(orders.id, data.id));
    return { success: true };
  });

export const deleteOrder = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    await db.delete(orders).where(eq(orders.id, data.id));
    return { success: true };
  });

