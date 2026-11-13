let httpFallbackCached: { DB?: D1Database; IMAGES?: R2Bucket; PDFS?: R2Bucket } | null = null;

/** Access Cloudflare Worker bindings from any TanStack Start server context. */
export function getCfEnv(): { DB?: D1Database; IMAGES?: R2Bucket; PDFS?: R2Bucket } {
  // Nitro's Cloudflare preset uses __env__; the custom server.ts uses __CF_ENV__.
  const globalEnv = ((globalThis as Record<string, unknown>)["__CF_ENV__"] ??
    (globalThis as Record<string, unknown>)["__env__"]) as
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

  // Fallback: vite dev (Node.js) — lazy-import d1-http to avoid pulling
  // Node.js `fs`/`path` into the Cloudflare Workers bundle.
  if (httpFallbackCached) return httpFallbackCached;
  if (procEnv?.env) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { createHttpD1 } = require("./d1-http") as { createHttpD1: () => D1Database | null };
      const db = createHttpD1();
      if (db) {
        httpFallbackCached = { DB: db } as { DB?: D1Database; IMAGES?: R2Bucket; PDFS?: R2Bucket };
        return httpFallbackCached;
      }
    } catch {
      // Not in Node.js (e.g. Cloudflare Workers) — skip HTTP fallback
    }
  }

  return (globalEnv ?? cfCtx?.env ?? procEnv?.env ?? {}) as { DB?: D1Database; IMAGES?: R2Bucket; PDFS?: R2Bucket };
}
