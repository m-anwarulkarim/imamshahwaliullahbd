import { createServerFn } from "@tanstack/react-start";
import { requireAuth } from "@/lib/auth/middleware";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "../db/client";
import { verifyAdmin, isAdmin } from "../db/access";
import { books } from "../../../drizzle/schema/books";
import { events, newsPosts, magazines } from "../../../drizzle/schema/content";

export const getMyAdminStatus = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    const admin = await isAdmin(context.userId);
    return { isAdmin: admin };
  });

// ---- Books ----

const bookSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(300),
  author: z.string().min(1).max(200),
  price: z.number().nonnegative(),
  description: z.string().max(5000).optional(),
  category: z.string().max(100).optional(),
  coverUrl: z.string().url().max(500).optional().or(z.literal("")),
  stock: z.number().int().nonnegative().optional(),
  isFeatured: z.boolean().optional(),
});

export const adminListBooks = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    return db.select().from(books).orderBy(books.createdAt);
  });

export const adminSaveBook = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((d) => bookSchema.parse(d))
  .handler(async ({ data, context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    const values = {
      title: data.title,
      author: data.author,
      price: data.price,
      description: data.description || null,
      category: data.category || null,
      coverUrl: data.coverUrl || null,
      stock: data.stock ?? null,
      isFeatured: data.isFeatured ?? false,
    };
    if (data.id) {
      await db.update(books).set(values).where(eq(books.id, data.id));
      return { id: data.id };
    }
    const [row] = await db.insert(books).values(values).returning({ id: books.id });
    return { id: row!.id };
  });

export const adminDeleteBook = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    await db.delete(books).where(eq(books.id, data.id));
    return { success: true };
  });

// ---- Events ----

const eventSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(300),
  titleEn: z.string().max(300).optional(),
  titleAr: z.string().max(300).optional(),
  description: z.string().max(10000).optional(),
  descriptionEn: z.string().max(10000).optional(),
  descriptionAr: z.string().max(10000).optional(),
  location: z.string().max(300).optional(),
  locationEn: z.string().max(300).optional(),
  locationAr: z.string().max(300).optional(),
  eventDate: z.string().min(1),
  eventTime: z.string().optional(),
  category: z.string().max(100).optional(),
  imageUrl: z.string().url().max(500).optional().or(z.literal("")),
  isPublished: z.boolean().optional(),
});

export const adminListEvents = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    return db.select().from(events).orderBy(events.createdAt);
  });

export const adminSaveEvent = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((d) => eventSchema.parse(d))
  .handler(async ({ data, context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    const values = {
      title: data.title,
      titleEn: data.titleEn || null,
      titleAr: data.titleAr || null,
      description: data.description || null,
      descriptionEn: data.descriptionEn || null,
      descriptionAr: data.descriptionAr || null,
      location: data.location || null,
      locationEn: data.locationEn || null,
      locationAr: data.locationAr || null,
      eventDate: data.eventDate,
      eventTime: data.eventTime || null,
      category: data.category || null,
      imageUrl: data.imageUrl || null,
      isPublished: data.isPublished ?? false,
    };
    if (data.id) {
      await db.update(events).set(values).where(eq(events.id, data.id));
      return { id: data.id };
    }
    const [row] = await db.insert(events).values(values).returning({ id: events.id });
    return { id: row!.id };
  });

export const adminDeleteEvent = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    await db.delete(events).where(eq(events.id, data.id));
    return { success: true };
  });

// ---- News Posts ----

const newsSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(300),
  excerpt: z.string().max(500).optional(),
  content: z.string().max(50000).optional(),
  category: z.string().max(100).optional(),
  imageUrl: z.string().url().max(500).optional().or(z.literal("")),
  isPublished: z.boolean().optional(),
  publishedAt: z.string().optional(),
});

export const adminListNews = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    return db.select().from(newsPosts).orderBy(newsPosts.createdAt);
  });

export const adminSaveNews = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((d) => newsSchema.parse(d))
  .handler(async ({ data, context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    const values = {
      title: data.title,
      excerpt: data.excerpt || null,
      content: data.content || null,
      category: data.category || null,
      imageUrl: data.imageUrl || null,
      isPublished: data.isPublished ?? false,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
    };
    if (data.id) {
      await db.update(newsPosts).set(values).where(eq(newsPosts.id, data.id));
      return { id: data.id };
    }
    const [row] = await db.insert(newsPosts).values(values).returning({ id: newsPosts.id });
    return { id: row!.id };
  });

export const adminDeleteNews = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    await db.delete(newsPosts).where(eq(newsPosts.id, data.id));
    return { success: true };
  });

// ---- Magazines ----

const magazineSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(300),
  issueMonth: z.string().min(1),
  description: z.string().max(5000).optional(),
  coverUrl: z.string().url().max(500).optional().or(z.literal("")),
  pdfUrl: z.string().min(1).max(500),
  pageCount: z.number().int().positive().optional(),
  isPublished: z.boolean().optional(),
  publishedAt: z.string().optional(),
});

export const adminListMagazines = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    return db.select().from(magazines).orderBy(magazines.createdAt);
  });

export const adminSaveMagazine = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((d) => magazineSchema.parse(d))
  .handler(async ({ data, context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    const values = {
      title: data.title,
      issueMonth: data.issueMonth,
      description: data.description || null,
      coverUrl: data.coverUrl || null,
      pdfUrl: data.pdfUrl,
      pageCount: data.pageCount ?? null,
      isPublished: data.isPublished ?? false,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
    };
    if (data.id) {
      await db
        .update(magazines)
        .set({ ...values, updatedAt: new Date() })
        .where(eq(magazines.id, data.id));
      return { id: data.id };
    }
    const [row] = await db.insert(magazines).values(values).returning({ id: magazines.id });
    return { id: row!.id };
  });

export const adminDeleteMagazine = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    await db.delete(magazines).where(eq(magazines.id, data.id));
    return { success: true };
  });

// Convenience aliases used by admin routes (create = save without id, update = save with id)
export const adminCreateBook = adminSaveBook;
export const adminUpdateBook = adminSaveBook;
export const adminCreateEvent = adminSaveEvent;
export const adminUpdateEvent = adminSaveEvent;
export const adminCreateNews = adminSaveNews;
export const adminUpdateNews = adminSaveNews;
export const adminCreateMagazine = adminSaveMagazine;
export const adminUpdateMagazine = adminSaveMagazine;

