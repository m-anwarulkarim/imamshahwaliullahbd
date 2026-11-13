import { createServerFn } from "@tanstack/react-start";
import { PATRON_CATEGORIES, INITIAL_PATRONS } from "./data";
import type { PatronCategoryMeta, PatronMember } from "./types";
import { getDb } from "../db";
import { patrons } from "../../../drizzle/schema/patrons";
import { eq, asc } from "drizzle-orm";

export interface PatronsPayload {
  categories: PatronCategoryMeta[];
  patrons: PatronMember[];
  stats: {
    totalPatrons: number;
    totalCategories: number;
    districtsCount: number;
  };
  districts: string[];
}

export const getPublishedPatrons = createServerFn({ method: "GET" }).handler(
  async (): Promise<PatronsPayload> => {
    let list: PatronMember[] = INITIAL_PATRONS;

    try {
      const db = getDb();
      if (db) {
        const rows = await db
          .select()
          .from(patrons)
          .where(eq(patrons.isPublished, true))
          .orderBy(asc(patrons.sortOrder), asc(patrons.createdAt));

        if (rows && rows.length > 0) {
          list = rows.map((r) => ({
            id: r.id,
            name: {
              bn: r.name,
              en: r.nameEn || undefined,
              ar: r.nameAr || undefined,
            },
            category: (r.category as any) || "general",
            designation: r.designation
              ? {
                  bn: r.designation,
                  en: r.designationEn || undefined,
                  ar: r.designationAr || undefined,
                }
              : undefined,
            address: {
              bn: r.address,
              en: r.addressEn || undefined,
              ar: r.addressAr || undefined,
            },
            district: {
              bn: r.district,
            },
            phone: r.phone,
            secondaryPhone: r.secondaryPhone || undefined,
            email: r.email || undefined,
            avatarUrl: r.imageUrl || undefined,
            sortOrder: r.sortOrder,
          }));
        }
      }
    } catch (e) {
      // D1 table might not exist yet on remote or local before migration — gracefully fallback to INITIAL_PATRONS
      console.warn("Using bundled patrons catalog fallback:", (e as Error).message);
    }

    const uniqueDistricts = Array.from(
      new Set(list.map((p) => p.district.bn).filter(Boolean)),
    ).sort();

    return {
      categories: PATRON_CATEGORIES,
      patrons: list,
      stats: {
        totalPatrons: list.length,
        totalCategories: PATRON_CATEGORIES.length,
        districtsCount: uniqueDistricts.length,
      },
      districts: uniqueDistricts,
    };
  },
);
