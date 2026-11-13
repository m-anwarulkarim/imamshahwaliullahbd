import { createServerFn } from "@tanstack/react-start";
import { eq, desc, asc } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "../db/client";
import { books, orders } from "../../../drizzle/schema/books";

export const getFeaturedBooks = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const db = getDb();
    return await db.select().from(books).orderBy(desc(books.createdAt)).limit(8);
  } catch (e) {
    console.error("getFeaturedBooks failed:", e);
    return [];
  }
});

export const getAllBooks = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const db = getDb();
    return await db.select().from(books).orderBy(asc(books.createdAt));
  } catch (e) {
    console.error("getAllBooks failed:", e);
    return [];
  }
});

export const getBookById = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const db = getDb();
    const [book] = await db.select().from(books).where(eq(books.id, data.id)).limit(1);
    return book ?? null;
  });

const orderSchema = z.object({
  bookId: z.string().uuid(),
  customerName: z.string().min(2).max(200),
  customerEmail: z.string().email().max(255),
  customerPhone: z.string().min(6).max(30),
  address: z.string().min(5).max(500),
  quantity: z.number().int().min(1).max(100),
});

export const placeOrder = createServerFn({ method: "POST" })
  .inputValidator((data) => orderSchema.parse(data))
  .handler(async ({ data }) => {
    const db = getDb();

    const [book] = await db.select().from(books).where(eq(books.id, data.bookId)).limit(1);
    if (!book) throw new Error("Book not found");

    const [order] = await db
      .insert(orders)
      .values({
        bookId: data.bookId,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        address: data.address,
        quantity: data.quantity,
        status: "pending",
        bookTitle: book.title,
        unitPrice: book.price,
      })
      .returning();

    return { id: order!.id };
  });
