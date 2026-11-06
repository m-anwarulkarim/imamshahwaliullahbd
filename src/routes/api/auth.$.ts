import { createServerFileRoute } from "@tanstack/react-start/server";
import { createAuth } from "@/lib/auth";
import { getCfEnv } from "@/lib/db/cf-env";

function getD1(): D1Database {
  const d1 = getCfEnv().DB;
  if (!d1) throw new Error('D1 binding "DB" not found.');
  return d1;
}

export const ServerRoute = createServerFileRoute("/api/auth/$").methods({
  GET: ({ request }) => createAuth(getD1()).handler(request),
  POST: ({ request }) => createAuth(getD1()).handler(request),
});
