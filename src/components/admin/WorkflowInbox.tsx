import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { getContactMessages, getMembershipApplications } from "@/lib/community";
import { getDonations } from "@/lib/admin";
import { updateMessage, updateMembership, updateDonation } from "@/lib/admin";
import { RecordList } from "@/components/admin/RecordList";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAdminText } from "@/lib/admin-ui";

type Row = Record<string, unknown> & { id: string };

export function WorkflowInbox({ kind }: { kind: "messages" | "memberships" | "donations" }) {
  const a = useAdminText();
  const messagesFn = useServerFn(getContactMessages);
  const membershipsFn = useServerFn(getMembershipApplications);
  const donationsFn = useServerFn(getDonations);
  const messageFn = useServerFn(updateMessage);
  const membershipFn = useServerFn(updateMembership);
  const donationFn = useServerFn(updateDonation);

  const query = useQuery<Row[]>({
    queryKey: ["admin", kind],
    queryFn: async () =>
      kind === "messages"
        ? ((await messagesFn()) as Row[])
        : kind === "memberships"
          ? ((await membershipsFn()) as Row[])
          : ((await donationsFn()) as Row[]),
  });

  const [selected, setSelected] = useState<Row | null>(null);
  const [notes, setNotes] = useState("");
  const [pending, setPending] = useState(false);
  const [filter, setFilter] = useState("All");

  const title =
    kind === "messages"
      ? "Contact Messages"
      : kind === "memberships"
        ? "Membership Applications"
        : "Donations";

  async function change(
    status: "pending" | "approved" | "rejected" | "confirmed",
    read?: boolean,
    archived?: boolean,
  ) {
    if (!selected) return;
    setPending(true);
    try {
      if (kind === "messages") {
        await messageFn({
          data: {
            id: selected.id,
            isRead: read ?? Boolean(selected["isRead"]),
            isArchived: archived ?? Boolean(selected["isArchived"]),
          },
        });
      } else if (kind === "memberships") {
        await membershipFn({
          data: {
            id: selected.id,
            status: status === "confirmed" ? "approved" : (status as "pending" | "approved" | "rejected"),
            adminNotes: notes,
          },
        });
      } else {
        await donationFn({
          data: {
            id: selected.id,
            status: status === "approved" ? "confirmed" : (status as "pending" | "confirmed" | "rejected"),
          },
        });
      }
      await query.refetch();
      setSelected(null);
      toast.success(a("Updated successfully."));
    } catch {
      toast.error(a("Something went wrong."));
    } finally {
      setPending(false);
    }
  }

  const statusOptions =
    kind === "donations"
      ? ["All", "pending", "confirmed", "rejected"]
      : ["All", "pending", "approved", "rejected"];

  const rows = query.data?.filter((r) => {
    if (kind === "messages") {
      return filter === "Archived"
        ? r["isArchived"]
        : filter === "Unread"
          ? !r["isArchived"] && !r["isRead"]
          : !r["isArchived"];
    }
    return filter === "All" || r["status"] === filter;
  });

  const fieldLabels: Record<string, string> = {
    fullName: "Name",
    name: "Name",
    email: "Email",
    phone: "Phone",
    subject: "Subject",
    message: "Message",
    institution: "Institution",
    statement: "Statement",
    donationType: "Type",
    amount: "Amount",
  };

  const detailFields = [
    "fullName",
    "name",
    "email",
    "phone",
    "subject",
    "message",
    "institution",
    "statement",
    "donationType",
    "amount",
  ];

  return (
    <>
      <RecordList
        title={title}
        rows={rows}
        loading={query.isLoading}
        error={query.error}
        retry={query.refetch}
        searchText={(r) => Object.values(r).join(" ")}
        exportRow={(r) => ({
          date: String(r["createdAt"]).slice(0, 10),
          name: String(r["fullName"] ?? r["name"] ?? ""),
          email: String(r["email"] ?? ""),
          phone: String(r["phone"] ?? ""),
          subject_or_type: String(r["subject"] ?? r["membershipType"] ?? r["donationType"] ?? ""),
          amount: String(r["amount"] ?? ""),
          status:
            kind === "messages" ? (r["isRead"] ? "read" : "unread") : String(r["status"] ?? ""),
        })}
        extra={
          <div className="flex gap-1">
            {(kind === "messages" ? ["All", "Unread", "Archived"] : statusOptions).map((v) => (
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
          { label: "Date", render: (r) => String(r["createdAt"]).slice(0, 10) },
          { label: "Name", render: (r) => String(r["fullName"] ?? r["name"] ?? "") },
          { label: "Email", render: (r) => String(r["email"] ?? "") },
          {
            label: kind === "messages" ? "Subject" : kind === "donations" ? "Amount" : "Type",
            render: (r) =>
              String(
                r["subject"] ??
                  (kind === "donations" ? `৳${r["amount"]}` : r["membershipType"]) ??
                  "",
              ),
          },
          {
            label: "Status",
            render: (r) =>
              kind === "messages"
                ? a(r["isRead"] ? "Mark read" : "Unread")
                : a(String(r["status"] ?? "")),
          },
          {
            label: "Actions",
            render: (r) => (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelected(r);
                  setNotes(String(r["adminNotes"] ?? ""));
                }}
              >
                {a("Details")}
              </Button>
            ),
          },
        ]}
      />
      <Dialog
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open && !pending) setSelected(null);
        }}
      >
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{a("Details")}</DialogTitle>
          </DialogHeader>
          {selected && (
            <>
              <dl className="space-y-3">
                {detailFields
                  .filter((k) => selected[k] != null)
                  .map((k) => (
                    <div key={k}>
                      <dt className="text-xs text-muted-foreground">
                        {a(fieldLabels[k] ?? k)}
                      </dt>
                      <dd className="whitespace-pre-wrap break-words">{String(selected[k])}</dd>
                    </div>
                  ))}
              </dl>
              {kind === "memberships" && (
                <div className="space-y-2">
                  <Label htmlFor="admin-notes">{a("Admin notes")}</Label>
                  <Textarea
                    id="admin-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {kind === "messages" ? (
                  <>
                    <Button disabled={pending} onClick={() => change("pending", !selected["isRead"])}>
                      {a(selected["isRead"] ? "Mark unread" : "Mark read")}
                    </Button>
                    <Button
                      disabled={pending}
                      variant="outline"
                      onClick={() => change("pending", undefined, !selected["isArchived"])}
                    >
                      {a(selected["isArchived"] ? "Restore" : "Archive")}
                    </Button>
                    <Button variant="outline" asChild>
                      <a
                        href={`mailto:${encodeURIComponent(String(selected["email"] ?? ""))}?subject=${encodeURIComponent(`Re: ${selected["subject"]}`)}`}
                      >
                        {a("Reply by email")}
                      </a>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      disabled={pending}
                      onClick={() => change(kind === "donations" ? "confirmed" : "approved")}
                    >
                      {a(kind === "donations" ? "Confirm" : "Approve")}
                    </Button>
                    <Button
                      variant="destructive"
                      disabled={pending}
                      onClick={() => change("rejected")}
                    >
                      {a("Reject")}
                    </Button>
                    {kind === "memberships" && (
                      <Button
                        variant="outline"
                        disabled={pending}
                        onClick={() =>
                          change(
                            selected["status"] === "approved"
                              ? "approved"
                              : selected["status"] === "rejected"
                                ? "rejected"
                                : "pending",
                          )
                        }
                      >
                        {a("Save")}
                      </Button>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
