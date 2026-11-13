import { createServerFn } from "@tanstack/react-start";
import { eq, desc, asc, ne } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "../db/client";
import { events, newsPosts } from "../../../drizzle/schema/content";
import { shortCourses } from "../../../drizzle/schema/courses";

export const getPublishedEvents = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const db = getDb();
    return await db
      .select()
      .from(events)
      .where(eq(events.isPublished, true))
      .orderBy(desc(events.eventDate));
  } catch (e) {
    console.error("getPublishedEvents failed:", e);
    return [];
  }
});

export const getPayamItems = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const db = getDb();
    return await db
      .select()
      .from(events)
      .where(eq(events.category, "payam-e-insaniyat"))
      .orderBy(desc(events.eventDate))
      .limit(8);
  } catch (e) {
    console.error("getPayamItems failed:", e);
    return [];
  }
});

export const getPublishedNews = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const db = getDb();
    return await db
      .select()
      .from(newsPosts)
      .where(eq(newsPosts.isPublished, true))
      .orderBy(desc(newsPosts.publishedAt));
  } catch (e) {
    console.error("getPublishedNews failed:", e);
    return [];
  }
});

export const getPublishedCourses = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const db = getDb();
    return await db
      .select({
        id: shortCourses.id,
        slug: shortCourses.slug,
        titleEn: shortCourses.titleEn,
        titleBn: shortCourses.titleBn,
        titleAr: shortCourses.titleAr,
        subtitleEn: shortCourses.subtitleEn,
        subtitleBn: shortCourses.subtitleBn,
        subtitleAr: shortCourses.subtitleAr,
        imageUrl: shortCourses.imageUrl,
        fee: shortCourses.fee,
        monthlyFee: shortCourses.monthlyFee,
      })
      .from(shortCourses)
      .where(eq(shortCourses.isPublished, true))
      .orderBy(asc(shortCourses.sortOrder), asc(shortCourses.createdAt));
  } catch (e) {
    console.error("getPublishedCourses failed:", e);
    return [];
  }
});

export const getCourseBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ slug: z.string().min(1) }).parse(data))
  .handler(async ({ data }) => {
    try {
      const db = getDb();
      const [course] = await db
        .select()
        .from(shortCourses)
        .where(eq(shortCourses.slug, data.slug))
        .limit(1);
      return course ?? null;
    } catch (e) {
      console.error("getCourseBySlug failed:", e);
      return null;
    }
  });
