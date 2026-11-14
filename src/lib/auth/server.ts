import { betterAuth } from "better-auth";
import { getCfEnv } from "@/lib/db/cf-env";

// Cloudflare D1 binding থেকে auth instance তৈরি করে
// প্রতিটা request-এ D1 binding pass করতে হবে
export function createAuth(d1: D1Database, request?: Request) {
  const env = getCfEnv() as Record<string, unknown>;
  const origin = request ? new URL(request.url).origin : undefined;
  const baseURL =
    (env["BETTER_AUTH_URL"] as string | undefined) ??
    process.env["BETTER_AUTH_URL"] ??
    origin ??
    "https://imamshahwaliullahbd.com";

  const secret =
    (env["BETTER_AUTH_SECRET"] as string | undefined) ??
    process.env["BETTER_AUTH_SECRET"] ??
    "iswdri-better-auth-secret-key-imamshahwaliullahbd-2026";

  return betterAuth({
    database: d1,
    emailAndPassword: {
      enabled: true,
    },
    secret,
    baseURL,
    trustedOrigins: [
      "https://imamshahwaliullahbd.com",
      "https://test.imamshahwaliullahbd.com",
      "http://localhost:3000",
    ],
  });
}
