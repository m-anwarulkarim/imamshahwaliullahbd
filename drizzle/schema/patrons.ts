import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const patrons = sqliteTable("patrons", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  nameEn: text("name_en"),
  nameAr: text("name_ar"),
  category: text("category").notNull(), // 'chief' | 'founder' | 'special' | 'life' | 'honorary' | 'general'
  designation: text("designation"),
  designationEn: text("designation_en"),
  designationAr: text("designation_ar"),
  address: text("address").notNull(),
  addressEn: text("address_en"),
  addressAr: text("address_ar"),
  district: text("district").notNull(),
  phone: text("phone").notNull(),
  secondaryPhone: text("secondary_phone"),
  email: text("email"),
  imageUrl: text("image_url"),
  sortOrder: integer("sort_order").default(0).notNull(),
  isPublished: integer("is_published", { mode: "boolean" }).default(true).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
});
