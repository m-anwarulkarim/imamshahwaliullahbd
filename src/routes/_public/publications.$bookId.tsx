import { createFileRoute, Outlet } from "@tanstack/react-router";
import { getBookById } from "@/lib/books";

export const Route = createFileRoute("/_public/publications/$bookId")({
  loader: async ({ context, params }) => {
    return context.queryClient.ensureQueryData({
      queryKey: ["book", params.bookId],
      queryFn: () => getBookById({ data: { id: params.bookId } }),
    });
  },
  component: () => <Outlet />,
});
