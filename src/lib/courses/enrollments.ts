import { createServerFn } from "@tanstack/react-start";
import { requireAuth } from "@/lib/auth/middleware";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "../db/client";
import { verifyAdmin } from "../db/access";
import { courseEnrollments } from "../../../drizzle/schema/courses";

export const getCourseEnrollments = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    return db.select().from(courseEnrollments).orderBy(desc(courseEnrollments.createdAt));
  });

export const updateEnrollmentStatus = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((d: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["pending", "approved", "rejected"]),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    await db
      .update(courseEnrollments)
      .set({ status: data.status })
      .where(eq(courseEnrollments.id, data.id));
    return { success: true };
  });

