import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const events = sqliteTable("events", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  titleEn: text("title_en"),
  titleAr: text("title_ar"),
  description: text("description"),
  descriptionEn: text("description_en"),
  descriptionAr: text("description_ar"),
  location: text("location"),
  locationEn: text("location_en"),
  locationAr: text("location_ar"),
  eventDate: text("event_date").notNull(),
  eventTime: text("event_time"),
  category: text("category"),
  imageUrl: text("image_url"),
  isPublished: integer("is_published", { mode: "boolean" }).default(false).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
});

export const magazines = sqliteTable("magazines", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  issueMonth: text("issue_month").notNull(),
  description: text("description"),
  coverUrl: text("cover_url"),
  pdfUrl: text("pdf_url").notNull(),
  pageCount: integer("page_count"),
  isPublished: integer("is_published", { mode: "boolean" }).default(false).notNull(),
  publishedAt: integer("published_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
});

export const newsPosts = sqliteTable("news_posts", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  content: text("content"),
  category: text("category"),
  imageUrl: text("image_url"),
  isPublished: integer("is_published", { mode: "boolean" }).default(false).notNull(),
  publishedAt: integer("published_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
});
