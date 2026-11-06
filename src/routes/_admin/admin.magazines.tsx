import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { adminHead } from "@/lib/admin-ui";
import { ContentManager } from "@/components/admin/ContentManager";
import {
  adminListMagazines,
  adminCreateMagazine,
  adminUpdateMagazine,
  adminDeleteMagazine,
} from "@/lib/content";

export const Route = createFileRoute("/_admin/admin/magazines")({
  head: () => adminHead("Monthly Magazine"),
  component: AdminMagazinesPage,
});

function AdminMagazinesPage() {
  const listFn = useServerFn(adminListMagazines);
  const createFn = useServerFn(adminCreateMagazine);
  const updateFn = useServerFn(adminUpdateMagazine);
  const deleteFn = useServerFn(adminDeleteMagazine);

  const { data: magazines, isLoading, error, refetch } = useQuery({
    queryKey: ["admin", "magazines"],
    queryFn: () => listFn(),
  });

  return (
    <ContentManager
      title="Monthly Magazine"
      description="Publish each month's issue of মাসিক আল ফুরকান. Readers can read it online."
      fields={[
        { name: "title", label: "Issue Title", type: "text", required: true, placeholder: "মাসিক আল ফুরকান — অক্টোবর ২০২৬" },
        { name: "issueMonth", label: "Issue Month", type: "date", required: true },
        { name: "pdfUrl", label: "Magazine PDF", type: "pdf", required: true },
        { name: "coverUrl", label: "Cover Image", type: "image" },
        { name: "pageCount", label: "Page Count", type: "number" },
        { name: "description", label: "Short Description", type: "textarea" },
        { name: "isPublished", label: "Published", type: "switch" },
      ]}
      columns={[
        { key: "title", label: "Title" },
        { key: "issueMonth", label: "Issue Month" },
        { key: "pageCount", label: "Pages" },
        { key: "isPublished", label: "Published" },
      ]}
      rows={magazines as any}
      isLoading={isLoading}
      error={error}
      onCreate={(v) => createFn({ data: v as any })}
      onUpdate={(id, v) => updateFn({ data: { id, ...v } as any })}
      onDelete={(id) => deleteFn({ data: { id } })}
      onChanged={refetch}
    />
  );
}
