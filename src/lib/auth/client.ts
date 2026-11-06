import { createAuthClient } from "better-auth/client";

// Browser-side auth client
// usage: import { authClient } from "@/lib/auth-client"
export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
});
