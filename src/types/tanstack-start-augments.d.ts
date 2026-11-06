/** Type stubs for framework-injected functions that have no upstream declarations. */

type ServerFileRouteHandler = (ctx: {
  request: Request;
  params: Record<string, string>;
}) => Response | Promise<Response>;

declare module "@tanstack/react-start/server" {
  export function createServerFileRoute(path: string): {
    methods(handlers: Partial<Record<"GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS", ServerFileRouteHandler>>): unknown;
  };

  /** Re-exported from @tanstack/start-server-core but missing from TS declarations */
  export function getRequest(): Request;
}
