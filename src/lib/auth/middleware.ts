import { createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { createAuth } from "./server";
import { getCfEnv } from "@/lib/db/cf-env";

function getD1(): D1Database {
  const d1 = getCfEnv().DB;
  if (!d1) throw new Error('D1 binding "DB" not found in Worker context.');
  return d1;
}

export const requireAuth = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const auth = createAuth(getD1());
    const session = await auth.api.getSession({ headers: getRequest().headers });
    if (!session?.user) throw new Error("Unauthorized");
    return next({
      context: {
        userId: session.user.id,
        user: session.user,
      },
    });
  }
);
