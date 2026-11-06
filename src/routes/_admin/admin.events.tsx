import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { adminHead } from "@/lib/admin-ui";
import { ContentManager } from "@/components/admin/ContentManager";
import {
  adminListEvents,
  adminCreateEvent,
  adminUpdateEvent,
  adminDeleteEvent,
} from "@/lib/content";

export const Route = createFileRoute("/_admin/admin/events")({
  head: () => adminHead("Events Management"),
  validateSearch: (s: Record<string, unknown>): { create?: boolean } =>
    s["create"] === true || s["create"] === "true" ? { create: true } : {},
  component: AdminEventsPage,
});

function AdminEventsPage() {
  const { create } = Route.useSearch();
  const listFn = useServerFn(adminListEvents);
  const createFn = useServerFn(adminCreateEvent);
  const updateFn = useServerFn(adminUpdateEvent);
  const deleteFn = useServerFn(adminDeleteEvent);

  const { data: events, isLoading, error, refetch } = useQuery({
    queryKey: ["admin", "events"],
    queryFn: () => listFn(),
  });

  return (
    <ContentManager
      createOnOpen={Boolean(create)}
      title="Events Management"
      description="Manage upcoming institute events, conferences, and seminars."
      fields={[
        { name: "title", label: "Title (বাংলা)", type: "text", required: true },
        { name: "titleEn", label: "Title (English)", type: "text" },
        { name: "titleAr", label: "Title (العربية)", type: "text" },
        { name: "descriptionEn", label: "Description (English)", type: "textarea" },
        { name: "descriptionAr", label: "Description (العربية)", type: "textarea" },
        { name: "locationEn", label: "Location (English)", type: "text" },
        { name: "locationAr", label: "Location (العربية)", type: "text" },
        { name: "eventDate", label: "Date", type: "date", required: true },
        { name: "eventTime", label: "Time", type: "text" },
        { name: "location", label: "Location", type: "text" },
        { name: "category", label: "Category", type: "text" },
        { name: "imageUrl", label: "Image", type: "image" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "isPublished", label: "Published", type: "switch" },
      ]}
      columns={[
        { key: "title", label: "Title" },
        { key: "eventDate", label: "Date" },
        { key: "location", label: "Location" },
      ]}
      rows={events as any}
      isLoading={isLoading}
      error={error}
      onCreate={(v) => createFn({ data: v as any })}
      onUpdate={(id, v) => updateFn({ data: { id, ...v } as any })}
      onDelete={(id) => deleteFn({ data: { id } })}
      onChanged={refetch}
    />
  );
}
