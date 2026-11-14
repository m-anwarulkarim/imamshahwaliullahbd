import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { createAuth } from "./lib/auth";
import { getCfEnv } from "./lib/db/cf-env";

type CfEnv = { DB?: D1Database; IMAGES?: R2Bucket; PDFS?: R2Bucket };

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

function handleAuthRequest(request: Request): Promise<Response> | Response {
  const d1 = getCfEnv().DB;
  if (!d1) return new Response("Database not configured", { status: 503 });
  return createAuth(d1, request).handler(request);
}

async function handleMediaRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const key = url.pathname.replace("/api/public/media/", "");
  if (!key) return new Response("Not found", { status: 404 });

  const isPdf = key.endsWith(".pdf");
  const env = getCfEnv();
  const bucket = isPdf ? env.PDFS : env.IMAGES;
  if (!bucket) return new Response("Storage not configured", { status: 503 });

  const obj = await bucket.get(key);
  if (!obj) return new Response("Not found", { status: 404 });

  const contentType =
    obj.httpMetadata?.contentType ?? (isPdf ? "application/pdf" : "application/octet-stream");

  return new Response(obj.body as BodyInit, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    if (env && typeof env === "object") {
      (globalThis as Record<string, unknown>)["__CF_ENV__"] = env;
    }

    const url = new URL(request.url);

    // Handle API routes directly — TanStack Start's createServerFileRoute
    // does not exist in the installed package, so these must be intercepted here.
    try {
      if (url.pathname.startsWith("/api/auth/") || url.pathname === "/api/auth") {
        return await handleAuthRequest(request);
      }
      if (url.pathname.startsWith("/api/public/media/")) {
        return await handleMediaRequest(request);
      }
    } catch (error) {
      console.error("API route error:", error);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        { status: 500, headers: { "content-type": "application/json" } },
      );
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
