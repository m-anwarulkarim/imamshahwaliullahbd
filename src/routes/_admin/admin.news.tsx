import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { adminHead } from "@/lib/admin-ui";
import { ContentManager } from "@/components/admin/ContentManager";
import {
  adminListNews,
  adminCreateNews,
  adminUpdateNews,
  adminDeleteNews,
} from "@/lib/content";

export const Route = createFileRoute("/_admin/admin/news")({
  head: () => adminHead("News & Media"),
  component: AdminNewsPage,
});

function AdminNewsPage() {
  const listFn = useServerFn(adminListNews);
  const createFn = useServerFn(adminCreateNews);
  const updateFn = useServerFn(adminUpdateNews);
  const deleteFn = useServerFn(adminDeleteNews);

  const { data: news, isLoading, error, refetch } = useQuery({
    queryKey: ["admin", "news"],
    queryFn: () => listFn(),
  });

  return (
    <ContentManager
      title="News & Media"
      description="Manage institute news posts and media announcements."
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "publishedAt", label: "Publish Date", type: "date", required: true },
        { name: "category", label: "Category", type: "text" },
        { name: "imageUrl", label: "Image", type: "image" },
        { name: "excerpt", label: "Excerpt", type: "textarea" },
        { name: "content", label: "Full Content", type: "textarea" },
        { name: "isPublished", label: "Published", type: "switch" },
      ]}
      columns={[
        { key: "title", label: "Title" },
        { key: "publishedAt", label: "Published" },
        { key: "category", label: "Category" },
      ]}
      rows={news as any}
      isLoading={isLoading}
      error={error}
      onCreate={(v) => createFn({ data: v as any })}
      onUpdate={(id, v) => updateFn({ data: { id, ...v } as any })}
      onDelete={(id) => deleteFn({ data: { id } })}
      onChanged={refetch}
    />
  );
}
