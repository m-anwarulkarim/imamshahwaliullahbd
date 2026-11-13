import { createServerFn } from "@tanstack/react-start";
import { requireAuth } from "@/lib/auth/middleware";
import { eq, asc } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "../db/client";
import { verifyAdmin } from "../db/access";
import { patrons } from "../../../drizzle/schema/patrons";
import { INITIAL_PATRONS } from "./data";

const patronSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  nameEn: z.string().optional(),
  nameAr: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  designation: z.string().optional(),
  designationEn: z.string().optional(),
  designationAr: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  addressEn: z.string().optional(),
  addressAr: z.string().optional(),
  district: z.string().min(1, "District is required"),
  phone: z.string().min(1, "Phone is required"),
  secondaryPhone: z.string().optional(),
  email: z.string().optional(),
  imageUrl: z.string().optional(),
  sortOrder: z.number().int().optional().default(0),
  isPublished: z.boolean().optional().default(true),
});

export const adminListPatrons = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context.userId);
    try {
      const db = getDb();
      const rows = await db
        .select()
        .from(patrons)
        .orderBy(asc(patrons.sortOrder), asc(patrons.createdAt));
      if (rows && rows.length > 0) return rows;
    } catch (e) {
      console.warn("adminListPatrons fallback:", (e as Error).message);
    }
    // Return INITIAL_PATRONS mapped to flat records for content manager
    return INITIAL_PATRONS.map((p) => ({
      id: p.id,
      name: p.name.bn,
      nameEn: p.name.en || "",
      nameAr: p.name.ar || "",
      category: p.category,
      designation: p.designation?.bn || "",
      designationEn: p.designation?.en || "",
      designationAr: p.designation?.ar || "",
      address: p.address.bn,
      addressEn: p.address.en || "",
      addressAr: p.address.ar || "",
      district: p.district.bn,
      phone: p.phone,
      secondaryPhone: p.secondaryPhone || "",
      email: p.email || "",
      imageUrl: p.avatarUrl || "",
      sortOrder: p.sortOrder || 0,
      isPublished: true,
      createdAt: new Date(),
    }));
  });

export const adminCreatePatron = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .validator((d: unknown) => patronSchema.parse(d))
  .handler(async ({ data, context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    const id = data.id || crypto.randomUUID();
    await db.insert(patrons).values({
      id,
      name: data.name,
      nameEn: data.nameEn || null,
      nameAr: data.nameAr || null,
      category: data.category,
      designation: data.designation || null,
      designationEn: data.designationEn || null,
      designationAr: data.designationAr || null,
      address: data.address,
      addressEn: data.addressEn || null,
      addressAr: data.addressAr || null,
      district: data.district,
      phone: data.phone,
      secondaryPhone: data.secondaryPhone || null,
      email: data.email || null,
      imageUrl: data.imageUrl || null,
      sortOrder: data.sortOrder ?? 0,
      isPublished: data.isPublished ?? true,
    });
    return { success: true, id };
  });

export const adminUpdatePatron = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .validator((d: { id: string; values: unknown }) => ({
    id: z.string().parse(d.id),
    values: patronSchema.partial().parse(d.values),
  }))
  .handler(async ({ data, context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    const values: Record<string, unknown> = {};
    if (data.values.name !== undefined) values["name"] = data.values.name;
    if (data.values.nameEn !== undefined) values["nameEn"] = data.values.nameEn;
    if (data.values.nameAr !== undefined) values["nameAr"] = data.values.nameAr;
    if (data.values.category !== undefined) values["category"] = data.values.category;
    if (data.values.designation !== undefined) values["designation"] = data.values.designation;
    if (data.values.designationEn !== undefined) values["designationEn"] = data.values.designationEn;
    if (data.values.designationAr !== undefined) values["designationAr"] = data.values.designationAr;
    if (data.values.address !== undefined) values["address"] = data.values.address;
    if (data.values.addressEn !== undefined) values["addressEn"] = data.values.addressEn;
    if (data.values.addressAr !== undefined) values["addressAr"] = data.values.addressAr;
    if (data.values.district !== undefined) values["district"] = data.values.district;
    if (data.values.phone !== undefined) values["phone"] = data.values.phone;
    if (data.values.secondaryPhone !== undefined) values["secondaryPhone"] = data.values.secondaryPhone;
    if (data.values.email !== undefined) values["email"] = data.values.email;
    if (data.values.imageUrl !== undefined) values["imageUrl"] = data.values.imageUrl;
    if (data.values.sortOrder !== undefined) values["sortOrder"] = data.values.sortOrder;
    if (data.values.isPublished !== undefined) values["isPublished"] = data.values.isPublished;

    await db.update(patrons).set(values).where(eq(patrons.id, data.id));
    return { success: true };
  });

export const adminDeletePatron = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .validator((d: { id: string }) => z.object({ id: z.string() }).parse(d))
  .handler(async ({ data, context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    await db.delete(patrons).where(eq(patrons.id, data.id));
    return { success: true };
  });
