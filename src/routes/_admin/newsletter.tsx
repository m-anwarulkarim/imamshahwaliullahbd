import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getNewsletterSubscribers } from "@/lib/community";
import { RecordList } from "@/components/admin/RecordList";
import { Button } from "@/components/ui/button";
import { adminHead, useAdminText } from "@/lib/admin-ui";

export const Route = createFileRoute("/_admin/newsletter")({
  head: () => adminHead("Newsletter Subscribers"),
  component: Newsletter,
});

function Newsletter() {
  const a = useAdminText();
  const fetch = useServerFn(getNewsletterSubscribers);
  const q = useQuery({ queryKey: ["admin", "newsletter"], queryFn: () => fetch() });

  function exportCsv() {
    const quote = (s: string) => `"${s.replace(/"/g, '""')}"`;
    const content = [
      "Email,Date",
      ...(q.data ?? []).map((r) => `${quote(r.email)},${quote(String(r.createdAt))}`),
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob(["﻿", content], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "newsletter.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <RecordList
      title="Newsletter Subscribers"
      rows={q.data}
      loading={q.isLoading}
      error={q.error}
      retry={q.refetch}
      searchText={(r) => r.email}
      columns={[
        { label: "Date", render: (r) => String(r.createdAt).slice(0, 10) },
        { label: "Email", render: (r) => r.email },
      ]}
      extra={
        <Button variant="outline" disabled={!q.data?.length} onClick={exportCsv}>
          {a("Export CSV")}
        </Button>
      }
    />
  );
}
