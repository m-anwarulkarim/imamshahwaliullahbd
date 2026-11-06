import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Loader2, ShieldCheck, Trash2, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { listAdmins, addAdminByEmail, removeAdmin } from "@/lib/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QueryFailure } from "@/components/admin/RecordList";
import { adminHead, useAdminText } from "@/lib/admin-ui";
import { AdminGuard } from "@/components/admin/AdminGuard";

export const Route = createFileRoute("/_admin/admin/users")({
  head: () => adminHead("Admin Users"),
  component: () => (
    <AdminGuard>
      <AdminUsersPage />
    </AdminGuard>
  ),
});

function AdminUsersPage() {
  const a = useAdminText();
  const queryClient = useQueryClient();
  const fetchAdmins = useServerFn(listAdmins);
  const addAdmin = useServerFn(addAdminByEmail);
  const revokeAdmin = useServerFn(removeAdmin);
  const [email, setEmail] = useState("");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin", "admins"],
    queryFn: () => fetchAdmins(),
  });

  const addMutation = useMutation({
    mutationFn: (value: string) => addAdmin({ data: { email: value } }),
    onSuccess: () => {
      toast.success(a("Admin added."));
      setEmail("");
      queryClient.invalidateQueries({ queryKey: ["admin", "admins"] });
    },
    onError: (e) => toast.error(e instanceof Error ? a(e.message) : a("Something went wrong.")),
  });

  const removeMutation = useMutation({
    mutationFn: (userId: string) => revokeAdmin({ data: { userId } }),
    onSuccess: () => {
      toast.success(a("Admin removed."));
      queryClient.invalidateQueries({ queryKey: ["admin", "admins"] });
    },
    onError: (e) => toast.error(e instanceof Error ? a(e.message) : a("Something went wrong.")),
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-primary">{a("Admin Users")}</h1>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <UserPlus className="h-5 w-5 text-primary" />
            {a("Add admin by email")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) addMutation.mutate(email);
            }}
          >
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="sm:max-w-sm"
            />
            <Button type="submit" disabled={addMutation.isPending}>
              {addMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : a("Add Admin")}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShieldCheck className="h-5 w-5 text-primary" />
            {a("Admin Users")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <QueryFailure retry={refetch} />
          ) : !data || data.length === 0 ? (
            <p className="py-10 text-center text-muted-foreground">{a("Nothing here yet.")}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{a("Email")}</TableHead>
                  <TableHead>{a("Name")}</TableHead>
                  <TableHead>{a("Role")}</TableHead>
                  <TableHead>{a("Date")}</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.email || "—"}</TableCell>
                    <TableCell>{r.fullName || "—"}</TableCell>
                    <TableCell>{a(r.role)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {r.createdAt instanceof Date ? r.createdAt.toISOString().slice(0, 10) : new Date(r.createdAt as string).toISOString().slice(0, 10)}
                    </TableCell>
                    <TableCell>
                      <Button
                        disabled={removeMutation.isPending}
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          if (confirm(a("Remove this admin?"))) removeMutation.mutate(r.userId);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
