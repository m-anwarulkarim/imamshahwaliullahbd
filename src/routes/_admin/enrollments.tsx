import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { getCourseEnrollments, updateEnrollmentStatus } from "@/lib/courses";
import { RecordList } from "@/components/admin/RecordList";
import { Button } from "@/components/ui/button";
import { adminHead, useAdminText } from "@/lib/admin-ui";
import { CourseAccessRequests } from "@/components/admin/CourseAccessRequests";
import { submissionListRefresh } from "@/lib/admin-records";

export const Route = createFileRoute("/_admin/enrollments")({
  head: () => adminHead("Course Applications"),
  component: Enrollments,
});

function Enrollments() {
  const a = useAdminText();
  const fetch = useServerFn(getCourseEnrollments);
  const save = useServerFn(updateEnrollmentStatus);
  const q = useQuery({
    queryKey: ["admin", "enrollments"],
    queryFn: () => fetch(),
    ...submissionListRefresh,
  });
  const [pending, setPending] = useState(false);
  const [filter, setFilter] = useState("All");
  const rows = q.data?.filter((r) => filter === "All" || r.status === filter);

  async function change(id: string, status: "approved" | "rejected") {
    setPending(true);
    try {
      await save({ data: { id, status } });
      await q.refetch();
      toast.success(a("Updated successfully."));
    } catch {
      toast.error(a("Something went wrong."));
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-12">
      <RecordList
        title="Course Applications"
        rows={rows}
        loading={q.isLoading}
        error={q.error}
        retry={q.refetch}
        searchText={(r) => `${r.id} ${r.fullName} ${r.email} ${r.phone} ${r.course}`}
        exportRow={(r) => ({
          date: String(r.createdAt).slice(0, 10),
          name: r.fullName,
          email: r.email,
          phone: r.phone,
          course: r.course,
          education: r.education ?? "",
          message: r.message ?? "",
          status: r.status,
        })}
        extra={
          <div className="flex gap-1">
            {["All", "pending", "approved", "rejected"].map((v) => (
              <Button
                key={v}
                variant={filter === v ? "default" : "outline"}
                onClick={() => setFilter(v)}
              >
                {a(v)}
              </Button>
            ))}
          </div>
        }
        columns={[
          { label: "Date", render: (r) => String(r.createdAt).slice(0, 10) },
          { label: "Name", render: (r) => r.fullName },
          { label: "Course", render: (r) => r.course },
          {
            label: "Email",
            render: (r) => (
              <div>
                {r.email}
                <div>{r.phone}</div>
              </div>
            ),
          },
          { label: "Education", render: (r) => r.education },
          {
            label: "Message",
            render: (r) => <p className="max-w-xs whitespace-pre-wrap">{r.message}</p>,
          },
          { label: "Status", render: (r) => a(r.status) },
          {
            label: "Actions",
            render: (r) => (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  disabled={pending || r.status === "approved"}
                  onClick={() => change(r.id, "approved")}
                >
                  {a("Approve")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pending || r.status === "rejected"}
                  onClick={() => change(r.id, "rejected")}
                >
                  {a("Reject")}
                </Button>
              </div>
            ),
          },
        ]}
      />
      <CourseAccessRequests />
    </div>
  );
}
