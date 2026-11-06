/** Access Cloudflare Worker bindings from any TanStack Start server context. */
export function getCfEnv(): { DB?: D1Database; IMAGES?: R2Bucket; PDFS?: R2Bucket } {
  const key = Symbol.for("tanstack-start:event-storage");
  const storage = (globalThis as Record<symbol, unknown>)[key] as
    | { getStore(): { h3Event?: { context?: Record<string, unknown> } } | undefined }
    | undefined;
  const cfCtx = storage?.getStore()?.h3Event?.context?.["cloudflare"] as
    | { env?: Record<string, unknown> }
    | undefined;
  return (cfCtx?.env ?? {}) as { DB?: D1Database; IMAGES?: R2Bucket; PDFS?: R2Bucket };
}
