import { eq } from "drizzle-orm";
import { getDb } from "./client";
import { userRoles } from "../../../drizzle/schema/users";

export async function verifyAdmin(userId: string): Promise<void> {
  const db = getDb();
  const rows = await db
    .select()
    .from(userRoles)
    .where(eq(userRoles.userId, userId))
    .limit(1);
  if (rows.length === 0 || rows[0]?.role !== "admin") {
    throw new Error("Administrator access required");
  }
}

export async function isAdmin(userId: string): Promise<boolean> {
  const db = getDb();
  const rows = await db
    .select()
    .from(userRoles)
    .where(eq(userRoles.userId, userId))
    .limit(1);
  return rows.length > 0 && rows[0]?.role === "admin";
}
