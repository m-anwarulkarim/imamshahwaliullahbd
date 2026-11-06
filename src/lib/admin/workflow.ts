import { createServerFn } from "@tanstack/react-start";
import { requireAuth } from "@/lib/auth/middleware";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "../db/client";
import { verifyAdmin } from "../db/access";
import { membershipApplications, contactMessages, donations } from "../../../drizzle/schema/community";

const updateMembershipSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["pending", "approved", "rejected"]),
  adminNotes: z.string().max(2000).optional(),
});

export const updateMembership = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((data) => updateMembershipSchema.parse(data))
  .handler(async ({ data, context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    await db
      .update(membershipApplications)
      .set({ status: data.status, adminNotes: data.adminNotes ?? null })
      .where(eq(membershipApplications.id, data.id));
    return { success: true };
  });

const updateMessageSchema = z.object({
  id: z.string().uuid(),
  isRead: z.boolean().optional(),
  isArchived: z.boolean().optional(),
});

export const updateMessage = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((data) => updateMessageSchema.parse(data))
  .handler(async ({ data, context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    const patch: Record<string, boolean> = {};
    if (data.isRead !== undefined) patch["isRead"] = data.isRead;
    if (data.isArchived !== undefined) patch["isArchived"] = data.isArchived;
    await db.update(contactMessages).set(patch).where(eq(contactMessages.id, data.id));
    return { success: true };
  });

const updateDonationSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["pending", "confirmed", "rejected"]),
});

export const updateDonation = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((data) => updateDonationSchema.parse(data))
  .handler(async ({ data, context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    await db.update(donations).set({ status: data.status }).where(eq(donations.id, data.id));
    return { success: true };
  });

