import { betterAuth } from "better-auth";
import { drizzle } from "drizzle-orm/d1";

// Cloudflare D1 binding থেকে auth instance তৈরি করে
// প্রতিটা request-এ D1 binding pass করতে হবে
export function createAuth(d1: D1Database) {
  return betterAuth({
    database: {
      type: "sqlite",
      db: drizzle(d1) as Parameters<typeof betterAuth>[0]["database"] extends { db: infer D } ? D : never,
    },
    emailAndPassword: {
      enabled: true,
    },
    secret: process.env["BETTER_AUTH_SECRET"] ?? "change-me-in-production",
    baseURL: process.env["BETTER_AUTH_URL"] ?? "http://localhost:3000",
  });
}
