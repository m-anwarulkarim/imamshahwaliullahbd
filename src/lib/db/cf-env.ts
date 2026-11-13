import { createHttpD1 } from "./d1-http";

let httpFallbackCached: { DB?: D1Database; IMAGES?: R2Bucket; PDFS?: R2Bucket } | null = null;

/** Access Cloudflare Worker bindings from any TanStack Start server context. */
export function getCfEnv(): { DB?: D1Database; IMAGES?: R2Bucket; PDFS?: R2Bucket } {
  const globalEnv = (globalThis as Record<string, unknown>)["__CF_ENV__"] as
    | { DB?: D1Database; IMAGES?: R2Bucket; PDFS?: R2Bucket }
    | undefined;
  if (globalEnv?.DB) return globalEnv;

  const key = Symbol.for("tanstack-start:event-storage");
  const storage = (globalThis as Record<symbol, unknown>)[key] as
    | { getStore(): { h3Event?: { context?: Record<string, unknown> } } | undefined }
    | undefined;
  const cfCtx = storage?.getStore()?.h3Event?.context?.["cloudflare"] as
    | { env?: Record<string, unknown> }
    | undefined;
  if (cfCtx?.env && typeof cfCtx.env === "object" && "DB" in cfCtx.env) {
    return cfCtx.env as { DB?: D1Database; IMAGES?: R2Bucket; PDFS?: R2Bucket };
  }

  const procEnv = (globalThis as Record<string, unknown>)["process"] as
    | { env?: Record<string, unknown> }
    | undefined;
  if (procEnv?.env && typeof procEnv.env === "object" && "DB" in procEnv.env) {
    return procEnv.env as { DB?: D1Database; IMAGES?: R2Bucket; PDFS?: R2Bucket };
  }

  // Fallback: vite dev (Node.js) — use D1 HTTP API with .env credentials
  if (httpFallbackCached) return httpFallbackCached;
  if (procEnv?.env) {
    const db = createHttpD1();
    if (db) {
      httpFallbackCached = { DB: db } as { DB?: D1Database; IMAGES?: R2Bucket; PDFS?: R2Bucket };
      return httpFallbackCached;
    }
  }

  return (globalEnv ?? cfCtx?.env ?? procEnv?.env ?? {}) as { DB?: D1Database; IMAGES?: R2Bucket; PDFS?: R2Bucket };
}
