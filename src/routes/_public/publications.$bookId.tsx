import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { getBookById } from "@/lib/books";

export const Route = createFileRoute("/_public/publications/$bookId")({
  loader: async ({ context, params }) => {
    const book = await context.queryClient.ensureQueryData({
      queryKey: ["book", params.bookId],
      queryFn: () => getBookById({ data: { id: params.bookId } }),
    });
    if (!book) throw notFound();
    return book;
  },
  notFoundComponent: () => (
    <div className="container mx-auto px-6 py-24 text-center text-muted-foreground">
      বইটি পাওয়া যায়নি (Book not found).
    </div>
  ),
  component: () => <Outlet />,
});
