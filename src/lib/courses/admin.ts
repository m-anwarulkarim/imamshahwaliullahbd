import { createServerFn } from "@tanstack/react-start";
import { requireAuth } from "@/lib/auth/middleware";
import { eq, asc } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "../db/client";
import { verifyAdmin } from "../db/access";
import { shortCourses, courseAccess, courseLessons } from "../../../drizzle/schema/courses";
import { validateCourseFees } from "@/lib/admin-rules";

export const courseSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers and hyphens"),
  titleEn: z.string().min(1).max(300),
  titleBn: z.string().min(1).max(300),
  titleAr: z.string().min(1).max(300),
  subtitleEn: z.string().max(500).optional(),
  subtitleBn: z.string().max(500).optional(),
  subtitleAr: z.string().max(500).optional(),
  imageUrl: z.string().url().max(500).optional().or(z.literal("")),
  fee: z.number().nonnegative().nullable().optional(),
  monthlyFee: z.number().nonnegative().nullable().optional(),
  isPublished: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

export const lessonSchema = z.object({
  id: z.string().uuid().optional(),
  courseId: z.string().uuid(),
  title: z.string().min(1).max(300),
  kind: z.enum(["video", "document", "live"]).default("video"),
  url: z.string().min(1).max(500),
  scheduledAt: z.string().optional(),
  sortOrder: z.number().int().default(0),
});

export const adminListCourses = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    return db.select().from(shortCourses).orderBy(asc(shortCourses.sortOrder), asc(shortCourses.createdAt));
  });

export const adminSaveCourse = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((d) => courseSchema.parse(d))
  .handler(async ({ data, context }) => {
    await verifyAdmin(context.userId);

    const fee = data.fee ?? null;
    const monthlyFee = data.monthlyFee ?? null;
    if (!validateCourseFees(fee, monthlyFee)) {
      throw new Error("Invalid course fee values");
    }

    const db = getDb();
    const values = {
      slug: data.slug,
      titleEn: data.titleEn,
      titleBn: data.titleBn,
      titleAr: data.titleAr,
      subtitleEn: data.subtitleEn || null,
      subtitleBn: data.subtitleBn || null,
      subtitleAr: data.subtitleAr || null,
      imageUrl: data.imageUrl || null,
      fee: fee,
      monthlyFee: monthlyFee,
      isPublished: data.isPublished ?? false,
      sortOrder: data.sortOrder ?? 0,
    };

    if (data.id) {
      await db.update(shortCourses).set(values).where(eq(shortCourses.id, data.id));
      return { id: data.id };
    }
    const [row] = await db.insert(shortCourses).values(values).returning({ id: shortCourses.id });
    return { id: row!.id };
  });

export const adminDeleteCourse = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    await db.delete(shortCourses).where(eq(shortCourses.id, data.id));
    return { success: true };
  });

export const adminListAccess = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    return db.select().from(courseAccess).orderBy(asc(courseAccess.createdAt));
  });

export const adminSetAccess = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((d: unknown) =>
    z
      .object({ id: z.string().uuid(), status: z.enum(["pending", "approved", "rejected"]) })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    await db.update(courseAccess).set({ status: data.status }).where(eq(courseAccess.id, data.id));
    return { success: true };
  });

export const adminListLessons = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .inputValidator((d: unknown) => z.object({ courseId: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    return db
      .select()
      .from(courseLessons)
      .where(eq(courseLessons.courseId, data.courseId))
      .orderBy(asc(courseLessons.sortOrder), asc(courseLessons.createdAt));
  });

export const adminSaveLesson = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((d) => lessonSchema.parse(d))
  .handler(async ({ data, context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    const values = {
      courseId: data.courseId,
      title: data.title,
      kind: data.kind,
      url: data.url,
      scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
      sortOrder: data.sortOrder,
    };

    if (data.id) {
      await db.update(courseLessons).set(values).where(eq(courseLessons.id, data.id));
      return { id: data.id };
    }
    const [row] = await db.insert(courseLessons).values(values).returning({ id: courseLessons.id });
    return { id: row!.id };
  });

export const adminDeleteLesson = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    await db.delete(courseLessons).where(eq(courseLessons.id, data.id));
    return { success: true };
  });

