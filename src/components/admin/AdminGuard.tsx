import { useEffect, useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, ShieldAlert } from "lucide-react";
import { authClient } from "@/lib/auth/client";
import { getMyAdminStatus } from "@/lib/content";
import { useAdminText } from "@/lib/admin-ui";
import { Button } from "@/components/ui/button";

export function AdminGuard({ children }: { children: ReactNode }) {
  const a = useAdminText();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const adminStatusFn = useServerFn(getMyAdminStatus);
  const [state, setState] = useState<"loading" | "admin" | "not-admin" | "error">("loading");

  async function check() {
    setState("loading");
    try {
      // Step 1: session ??? ???? ????
      const { data, error } = await authClient.getSession();
      if (error || !data?.user) {
        void navigate({ to: "/admin-login", replace: true });
        return;
      }

      // Step 2: Drizzle — user_roles table থেকে admin role চেক করো
      const { isAdmin } = await adminStatusFn();
      setState(isAdmin ? "admin" : "not-admin");
    } catch {
      setState("error");
    }
  }

  useEffect(() => {
    void check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state === "loading") {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (state === "error") {
    return (
      <div role="alert" className="p-12 text-center space-y-4">
        <p className="text-destructive">{a("Unable to load records.")}</p>
        <Button onClick={() => void check()}>{a("Retry")}</Button>
      </div>
    );
  }

  if (state === "not-admin") {
    return (
      <div className="h-screen flex items-center justify-center bg-background px-6">
        <div className="max-w-md text-center space-y-4">
          <ShieldAlert className="w-12 h-12 text-accent mx-auto" />
          <h1 className="text-2xl font-bold text-primary">{a("Administrator access required")}</h1>
          <p className="text-muted-foreground text-sm">
            {a("Your account is signed in but does not have administrator rights.")}
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={async () => {
                await qc.cancelQueries();
                qc.clear();
                await authClient.signOut();
                void navigate({ to: "/admin-login", replace: true });
              }}
            >
              {a("Sign out")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

