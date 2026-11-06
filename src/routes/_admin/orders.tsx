import { orderSnapshotValue } from "@/lib/admin-rules";
import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { format } from "date-fns";
import { Loader2, ShoppingCart, Search, Trash2, Download } from "lucide-react";
import { toast } from "sonner";
import { getBookOrders, updateOrderStatus, deleteOrder } from "@/lib/community";
import { downloadCsv } from "@/lib/csv";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QueryFailure } from "@/components/admin/RecordList";
import { adminHead, useAdminText } from "@/lib/admin-ui";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { submissionListRefresh } from "@/lib/admin-records";

export const Route = createFileRoute("/_admin/orders")({
  head: () => adminHead("Order Management"),
  component: () => (
    <AdminGuard>
      <AdminOrdersPage />
    </AdminGuard>
  ),
});

type OrderRow = {
  id: string;
  createdAt: string | Date;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  quantity: number;
  status: string;
  unitPrice?: string | number | null;
  bookTitle?: string | null;
  book?: { title?: string | null; price?: string | number | null } | null;
};

const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"] as const;

const statusVariant: Record<string, "secondary" | "default" | "destructive" | "outline"> = {
  pending: "secondary",
  confirmed: "outline",
  shipped: "outline",
  delivered: "default",
  cancelled: "destructive",
};

function AdminOrdersPage() {
  const a = useAdminText();
  const queryClient = useQueryClient();
  const fetchOrders = useServerFn(getBookOrders);
  const setStatus = useServerFn(updateOrderStatus);
  const removeOrder = useServerFn(deleteOrder);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin", "orders"],
    queryFn: () => fetchOrders() as Promise<OrderRow[]>,
    ...submissionListRefresh,
  });

  const statusMutation = useMutation({
    mutationFn: (vars: { id: string; status: string }) => setStatus({ data: vars as any }),
    onSuccess: () => {
      toast.success(a("Order status updated"));
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
    },
    onError: () => toast.error(a("Could not update the order")),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => removeOrder({ data: { id } }),
    onSuccess: () => {
      toast.success(a("Order deleted"));
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
    },
    onError: () => toast.error(a("Could not delete the order")),
  });

  const orders = useMemo(() => data ?? [], [data]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter((o) => {
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (!q) return true;
      return [o.id, o.customerName, o.customerEmail, o.customerPhone, o.address, o.bookTitle ?? o.book?.title ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [orders, search, statusFilter]);

  const orderValue = (o: OrderRow) =>
    orderSnapshotValue(Number(o.unitPrice ?? o.book?.price ?? 0), o.quantity ?? 1);
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(filtered.length / 20));
  const current = Math.min(page, pages - 1);
  const totalValue = filtered.reduce((sum: number, o: OrderRow) => sum + orderValue(o), 0);
  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const deliveredCount = orders.filter((o) => o.status === "delivered").length;

  function formatDate(d: string | Date) {
    return format(new Date(d as string), "MMM d, yyyy");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-primary">{a("Order Management")}</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Orders", value: orders.length },
          { label: "Pending", value: pendingCount },
          { label: "Delivered", value: deliveredCount },
          { label: "Value (filtered)", value: `৳${totalValue}` },
        ].map((s) => (
          <Card key={a(s.label)} className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">{a(s.label)}</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold text-primary">{s.value}</CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            {a("All Orders")}
          </CardTitle>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={a("Search customer or book")}
                className="pl-9 sm:w-64"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="sm:w-40">
                <SelectValue placeholder={a("Status")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{a("All statuses")}</SelectItem>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {a(s)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {filtered.length > 0 && (
              <Button
                variant="outline"
                onClick={() =>
                  downloadCsv(
                    "orders.csv",
                    filtered.map((o) => ({
                      date: String(o.createdAt).slice(0, 10),
                      book: o.bookTitle ?? o.book?.title ?? "",
                      customer: o.customerName,
                      email: o.customerEmail,
                      phone: o.customerPhone,
                      address: o.address,
                      quantity: o.quantity,
                      value: orderValue(o),
                      status: o.status,
                    })),
                  )
                }
              >
                <Download className="h-4 w-4 me-2" />
                {a("Export CSV")}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <QueryFailure retry={refetch} />
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">{a("No orders found.")}</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{a("Date")}</TableHead>
                    <TableHead>{a("Book")}</TableHead>
                    <TableHead>{a("Customer")}</TableHead>
                    <TableHead>{a("Contact")}</TableHead>
                    <TableHead>{a("Address")}</TableHead>
                    <TableHead className="text-center">{a("Qty")}</TableHead>
                    <TableHead className="text-right">{a("Value")}</TableHead>
                    <TableHead>{a("Status")}</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.slice(current * 20, current * 20 + 20).map((o) => (
                    <TableRow key={o.id}>
                      <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                        {formatDate(o.createdAt)}
                      </TableCell>
                      <TableCell className="font-medium">{o.bookTitle ?? o.book?.title ?? "—"}</TableCell>
                      <TableCell className="text-sm">{o.customerName}</TableCell>
                      <TableCell className="text-sm">
                        <div>{o.customerEmail}</div>
                        <div className="text-muted-foreground">{o.customerPhone}</div>
                      </TableCell>
                      <TableCell className="max-w-xs text-sm text-muted-foreground">
                        {o.address}
                      </TableCell>
                      <TableCell className="text-center">{o.quantity}</TableCell>
                      <TableCell className="text-right font-medium">৳{orderValue(o)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant={statusVariant[o.status] ?? "secondary"}>{a(o.status)}</Badge>
                          <Select
                            value={o.status}
                            onValueChange={(status) => statusMutation.mutate({ id: o.id, status })}
                          >
                            <SelectTrigger disabled={statusMutation.isPending} className="h-8 w-[130px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {STATUSES.map((s) => (
                                <SelectItem key={s} value={s}>
                                  {a(s)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          disabled={deleteMutation.isPending}
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (confirm(a("Delete this order?"))) deleteMutation.mutate(o.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" disabled={current === 0} onClick={() => setPage(current - 1)}>
              {a("Previous")}
            </Button>
            <span>
              {current + 1} / {pages}
            </span>
            <Button
              variant="outline"
              disabled={current + 1 >= pages}
              onClick={() => setPage(current + 1)}
            >
              {a("Next")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
