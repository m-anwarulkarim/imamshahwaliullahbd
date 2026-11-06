import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { adminHead } from "@/lib/admin-ui";
import { ContentManager } from "@/components/admin/ContentManager";
import {
  adminListBooks,
  adminCreateBook,
  adminUpdateBook,
  adminDeleteBook,
} from "@/lib/content";

export const Route = createFileRoute("/_admin/admin/books")({
  head: () => adminHead("Books Management"),
  component: AdminBooksPage,
});

function AdminBooksPage() {
  const listFn = useServerFn(adminListBooks);
  const createFn = useServerFn(adminCreateBook);
  const updateFn = useServerFn(adminUpdateBook);
  const deleteFn = useServerFn(adminDeleteBook);

  const { data: books, isLoading, error, refetch } = useQuery({
    queryKey: ["admin", "books"],
    queryFn: () => listFn(),
  });

  return (
    <ContentManager
      title="Books Management"
      description="Manage the institute's scholarly publication catalog."
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "author", label: "Author", type: "text", required: true },
        { name: "price", label: "Price", type: "number", required: true },
        { name: "category", label: "Category", type: "text" },
        { name: "coverUrl", label: "Cover Image", type: "image" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "stock", label: "Stock", type: "number" },
        { name: "isFeatured", label: "Featured", type: "switch" },
      ]}
      columns={[
        { key: "title", label: "Title" },
        { key: "author", label: "Author" },
        { key: "price", label: "Price" },
        { key: "category", label: "Category" },
      ]}
      rows={books as any}
      isLoading={isLoading}
      error={error}
      onCreate={(v) => createFn({ data: v as any })}
      onUpdate={(id, v) => updateFn({ data: { id, ...v } as any })}
      onDelete={(id) => deleteFn({ data: { id } })}
      onChanged={refetch}
    />
  );
}
