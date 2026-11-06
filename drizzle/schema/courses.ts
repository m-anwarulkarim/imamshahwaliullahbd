import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const shortCourses = sqliteTable("short_courses", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: text("slug").notNull().unique(),
  titleEn: text("title_en").notNull(),
  titleBn: text("title_bn").notNull(),
  titleAr: text("title_ar").notNull(),
  subtitleEn: text("subtitle_en"),
  subtitleBn: text("subtitle_bn"),
  subtitleAr: text("subtitle_ar"),
  imageUrl: text("image_url"),
  fee: real("fee"),
  monthlyFee: real("monthly_fee"),
  isPublished: integer("is_published", { mode: "boolean" }).default(false).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
});

export const courseAccess = sqliteTable("course_access", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  courseId: text("course_id").references(() => shortCourses.id),
  userId: text("user_id").notNull(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  paymentMethod: text("payment_method").notNull(),
  transactionId: text("transaction_id").notNull(),
  amount: real("amount"),
  status: text("status").default("pending").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
});

export const courseEnrollments = sqliteTable("course_enrollments", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  course: text("course").notNull(),
  education: text("education"),
  message: text("message"),
  status: text("status").default("pending").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
});

export const courseLessons = sqliteTable("course_lessons", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  courseId: text("course_id").references(() => shortCourses.id).notNull(),
  title: text("title").notNull(),
  kind: text("kind").default("video").notNull(),
  url: text("url").notNull(),
  scheduledAt: integer("scheduled_at", { mode: "timestamp" }),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
});
