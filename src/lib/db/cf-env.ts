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
    | { env?: { DB?: D1Database; IMAGES?: R2Bucket; PDFS?: R2Bucket } }
    | undefined;
  if (procEnv?.env && typeof procEnv.env === "object" && "DB" in procEnv.env) {
    return procEnv.env;
  }

  return (globalEnv ?? cfCtx?.env ?? procEnv?.env ?? {}) as { DB?: D1Database; IMAGES?: R2Bucket; PDFS?: R2Bucket };
}
