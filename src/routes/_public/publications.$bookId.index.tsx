import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getBookById } from "@/lib/books";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Truck, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/_public/publications/$bookId/")({
  loader: ({ params, context }) =>
    context.queryClient.ensureQueryData({
      queryKey: ["book", params.bookId],
      queryFn: () => getBookById({ data: { id: params.bookId } }),
    }),
  head: ({ loaderData, params }) => {
    const b = loaderData;
    const url = `https://imamshahwaliullahbd.com/publications/${params.bookId}`;
    const title = `${b?.title ?? "Book"} — ${b?.author ?? "ISWDRI"} | Imam Shah Waliullah Dehlawi Research Institute`;
    const description = (
      b?.description ||
      `${b?.title ?? "Book"} by ${b?.author ?? "ISWDRI"} — order from Imam Shah Waliullah Dehlawi Research Institute publications.`
    ).slice(0, 160);
    const image = b?.coverUrl?.startsWith("http")
      ? b.coverUrl
      : b?.coverUrl
        ? `https://imamshahwaliullahbd.com${b.coverUrl}`
        : undefined;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "book" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(image
          ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }]
          : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: b
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": ["Book", "Product"],
                name: b.title,
                author: { "@type": "Person", name: b.author },
                ...(image ? { image } : {}),
                ...(b.description ? { description: b.description } : {}),
                publisher: {
                  "@type": "Organization",
                  name: "Imam Shah Waliullah Dehlawi Research Institute",
                },
                offers: {
                  "@type": "Offer",
                  price: b.price,
                  priceCurrency: "BDT",
                  availability:
                    (b.stock ?? 1) > 0
                      ? "https://schema.org/InStock"
                      : "https://schema.org/OutOfStock",
                  url,
                },
              }),
            },
          ]
        : [],
    };
  },
  component: BookDetailsPage,
});

function BookDetailsPage() {
  const { t } = useLanguage();
  const { bookId } = Route.useParams();
  const { data: book } = useSuspenseQuery({
    queryKey: ["book", bookId],
    queryFn: () => getBookById({ data: { id: bookId } }),
  });

  return (
    <div className="container mx-auto px-6 py-12">
      <Link
        to="/publications"
        className="inline-flex items-center gap-2 text-primary hover:text-accent font-medium mb-10 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t({ en: "Back to Publications", bn: "প্রকাশনায় ফিরে যান", ar: "العودة إلى المنشورات" })}
      </Link>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-primary/10">
            <img
              src={book!.coverUrl || "https://images.unsplash.com/photo-1543003923-38e2d4087103?auto=format&fit=crop&q=80&w=1200"}
              alt={book!.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-primary/5 rounded-2xl p-4 text-center">
              <Truck className="w-5 h-5 text-accent mx-auto mb-2" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary/70">
                {t({ en: "Fast Delivery", bn: "দ্রুত ডেলিভারি", ar: "توصيل سريع" })}
              </p>
            </div>
            <div className="bg-primary/5 rounded-2xl p-4 text-center">
              <ShieldCheck className="w-5 h-5 text-accent mx-auto mb-2" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary/70">
                {t({ en: "Secure Order", bn: "নিরাপদ অর্ডার", ar: "طلب آمن" })}
              </p>
            </div>
            <div className="bg-primary/5 rounded-2xl p-4 text-center">
              <BookOpen className="w-5 h-5 text-accent mx-auto mb-2" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary/70">
                {t({ en: "Premium Print", bn: "প্রিমিয়াম প্রিন্ট", ar: "طباعة فاخرة" })}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-8">
            <div className="inline-block px-4 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-4">
              {book!.category || t({ en: "General Publication", bn: "সাধারণ প্রকাশনা", ar: "منشور عام" })}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 leading-tight">
              {book!.title}
            </h1>
            <p className="text-xl text-muted-foreground italic font-serif">
              {t({ en: "by", bn: "লেখক:", ar: "بقلم" })} {book!.author}
            </p>
          </div>

          <div className="text-3xl font-black text-primary mb-8">৳{book!.price}</div>

          <div className="prose prose-emerald max-w-none mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {book!.description ||
                t({
                  en: "No description available for this scholarly work yet.",
                  bn: "এই গ্রন্থের জন্য এখনও কোনো বিবরণ নেই।",
                  ar: "لا يتوفر وصف لهذا العمل العلمي بعد.",
                })}
            </p>
          </div>

          <div className="space-y-6">
            <Button
              asChild
              size="lg"
              className="w-full h-16 bg-primary text-white text-lg font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all"
            >
              <Link to="/publications/$bookId/order" params={{ bookId: book!.id }}>
                {t({ en: "Order This Book Now", bn: "এখনই এই বইটি অর্ডার করুন", ar: "اطلب هذا الكتاب الآن" })}
              </Link>
            </Button>
            <div className="p-6 bg-accent/5 rounded-2xl border border-accent/10">
              <h4 className="text-sm font-bold text-primary mb-2">
                {t({ en: "Order Information", bn: "অর্ডার সংক্রান্ত তথ্য", ar: "معلومات الطلب" })}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t({
                  en: "Orders are processed within 24 hours. You will receive a confirmation call from our research center. Payment can be made via Cash on Delivery or Digital Banking.",
                  bn: "অর্ডারগুলো ২৪ ঘণ্টার মধ্যে প্রক্রিয়া করা হয়। আমাদের গবেষণা কেন্দ্র থেকে আপনি একটি নিশ্চিতকরণ কল পাবেন। ক্যাশ অন ডেলিভারি বা ডিজিটাল ব্যাংকিংয়ের মাধ্যমে পেমেন্ট করা যাবে।",
                  ar: "تتم معالجة الطلبات خلال 24 ساعة. ستتلقى مكالمة تأكيد من مركز أبحاثنا. يمكن الدفع عبر الدفع عند الاستلام أو الخدمات المصرفية الرقمية.",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
