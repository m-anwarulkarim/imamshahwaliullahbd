import { createServerFn } from "@tanstack/react-start";
import { requireAuth } from "@/lib/auth/middleware";
import { eq, and, like } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "../db/client";
import { verifyAdmin } from "../db/access";
import { userRoles, profiles } from "../../../drizzle/schema/users";

export const listAdmins = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();
    return db
      .select({
        id: userRoles.id,
        userId: userRoles.userId,
        role: userRoles.role,
        createdAt: userRoles.createdAt,
        email: profiles.email,
        fullName: profiles.fullName,
      })
      .from(userRoles)
      .leftJoin(profiles, eq(userRoles.userId, profiles.id))
      .orderBy(userRoles.createdAt);
  });

export const addAdminByEmail = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((data: unknown) => z.object({ email: z.string().email() }).parse(data))
  .handler(async ({ data, context }) => {
    await verifyAdmin(context.userId);
    const db = getDb();

    const [profile] = await db
      .select()
      .from(profiles)
      .where(like(profiles.email, data.email))
      .limit(1);

    if (!profile) throw new Error("No account found for that email address");

    await db
      .insert(userRoles)
      .values({ userId: profile.id, role: "admin" })
      .onConflictDoNothing();

    return { success: true };
  });

export const removeAdmin = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((data: unknown) => z.object({ userId: z.string() }).parse(data))
  .handler(async ({ data, context }) => {
    if (data.userId === context.userId) {
      throw new Error("You cannot remove your own admin role");
    }
    await verifyAdmin(context.userId);
    const db = getDb();
    await db
      .delete(userRoles)
      .where(and(eq(userRoles.userId, data.userId), eq(userRoles.role, "admin")));
    return { success: true };
  });

