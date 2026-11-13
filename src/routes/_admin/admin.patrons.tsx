import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { adminHead } from "@/lib/admin-ui";
import { ContentManager } from "@/components/admin/ContentManager";
import {
  adminListPatrons,
  adminCreatePatron,
  adminUpdatePatron,
  adminDeletePatron,
} from "@/lib/patrons";

export const Route = createFileRoute("/_admin/admin/patrons")({
  head: () => adminHead("Patron Council Management"),
  validateSearch: (s: Record<string, unknown>): { create?: boolean } =>
    s["create"] === true || s["create"] === "true" ? { create: true } : {},
  component: AdminPatronsPage,
});

function AdminPatronsPage() {
  const { create } = Route.useSearch();
  const listFn = useServerFn(adminListPatrons);
  const createFn = useServerFn(adminCreatePatron);
  const updateFn = useServerFn(adminUpdatePatron);
  const deleteFn = useServerFn(adminDeletePatron);

  const { data: patrons, isLoading, error, refetch } = useQuery({
    queryKey: ["admin", "patrons"],
    queryFn: () => listFn(),
  });

  return (
    <ContentManager
      createOnOpen={Boolean(create)}
      title="Patron Council Management (পৃষ্ঠপোষক পরিষদ)"
      description="Manage all 6 tiers of institute patrons, contact numbers, designations, and addresses."
      fields={[
        { name: "name", label: "Name (বাংলা)", type: "text", required: true },
        { name: "nameEn", label: "Name (English)", type: "text" },
        {
          name: "category",
          label: "Category (ক্যাটাগরি)",
          type: "select",
          required: true,
          options: [
            "chief",
            "founder",
            "special",
            "life",
            "honorary",
            "general",
          ],
        },
        { name: "designation", label: "Designation / Title (পদবি/পরিচয়)", type: "text" },
        { name: "phone", label: "Phone Number (মোবাইল নম্বর)", type: "text", required: true },
        { name: "secondaryPhone", label: "Secondary Phone (বিকল্প নম্বর)", type: "text" },
        { name: "district", label: "District (জেলা)", type: "text", required: true },
        { name: "address", label: "Full Address (ঠিকানা)", type: "textarea", required: true },
        { name: "email", label: "Email (ইমেইল)", type: "text" },
        { name: "imageUrl", label: "Photo", type: "image" },
        { name: "sortOrder", label: "Sort Order (ক্রমিক)", type: "number" },
        { name: "isPublished", label: "Published (প্রকাশিত)", type: "switch" },
      ]}
      columns={[
        { key: "name", label: "Name (নাম)" },
        { key: "category", label: "Category" },
        { key: "district", label: "District (জেলা)" },
        { key: "phone", label: "Phone" },
      ]}
      rows={patrons as any}
      isLoading={isLoading}
      error={error}
      onCreate={(v) => createFn({ data: v as any })}
      onUpdate={(id, v) => updateFn({ data: { id, values: v } })}
      onDelete={(id) => deleteFn({ data: { id } })}
      onChanged={() => refetch()}
    />
  );
}
