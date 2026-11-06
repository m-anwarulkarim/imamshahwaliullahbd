import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { adminListAccess, adminSetAccess } from "@/lib/courses";
import { RecordList } from "./RecordList";
import { Button } from "@/components/ui/button";
import { useAdminText } from "@/lib/admin-ui";
import { submissionListRefresh } from "@/lib/admin-records";

export function CourseAccessRequests() {
  const a = useAdminText();
  const listFn = useServerFn(adminListAccess);
  const setFn = useServerFn(adminSetAccess);
  const q = useQuery({
    queryKey: ["admin", "course-access"],
    queryFn: () => listFn(),
    ...submissionListRefresh,
  });
  const [pending, setPending] = useState(false);
  const [filter, setFilter] = useState("All");

  const rows = q.data?.filter((r) => filter === "All" || r.status === filter);

  async function updateStatus(id: string, status: "approved" | "rejected") {
    setPending(true);
    try {
      await setFn({ data: { id, status } });
      await q.refetch();
      toast.success(a("Updated successfully."));
    } catch {
      toast.error(a("Something went wrong."));
    } finally {
      setPending(false);
    }
  }

  return (
    <RecordList
      title="Course Payment Requests"
      rows={rows}
      loading={q.isLoading}
      error={q.error}
      retry={q.refetch}
      searchText={(r) => `${r.id} ${r.fullName} ${r.phone} ${r.transactionId}`}
      exportRow={(r) => ({
        date: String(r.createdAt).slice(0, 10),
        name: r.fullName,
        phone: r.phone,
        paymentMethod: r.paymentMethod,
        transactionId: r.transactionId,
        amount: r.amount ?? "",
        status: r.status,
      })}
      extra={
        <div className="flex gap-1">
          {["All", "pending", "approved", "rejected"].map((v) => (
            <Button key={v} variant={filter === v ? "default" : "outline"} onClick={() => setFilter(v)}>
              {a(v)}
            </Button>
          ))}
        </div>
      }
      columns={[
        { label: "Date", render: (r) => String(r.createdAt).slice(0, 10) },
        { label: "Name", render: (r) => r.fullName },
        { label: "Phone", render: (r) => r.phone },
        { label: "Method", render: (r) => r.paymentMethod },
        { label: "Transaction ID", render: (r) => r.transactionId },
        { label: "Amount", render: (r) => r.amount ?? "—" },
        { label: "Status", render: (r) => a(r.status) },
        {
          label: "Actions",
          render: (r) =>
            r.status === "pending" ? (
              <div className="flex gap-2">
                <Button size="sm" disabled={pending} onClick={() => updateStatus(r.id, "approved")}>
                  {a("Approve")}
                </Button>
                <Button size="sm" variant="outline" disabled={pending} onClick={() => updateStatus(r.id, "rejected")}>
                  {a("Reject")}
                </Button>
              </div>
            ) : null,
        },
      ]}
    />
  );
}
