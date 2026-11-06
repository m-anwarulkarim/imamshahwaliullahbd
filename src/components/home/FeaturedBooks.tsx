import { BookCard } from "../shared/BookCard";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string | null;
  category: string | null;
  coverUrl: string | null;
  stock: number | null;
  isFeatured: boolean | null;
  createdAt: Date;
};

export function FeaturedBooks({ books: booksProp }: { books?: Book[] }) {
  const { t } = useLanguage();
  const books = booksProp ?? [];

  if (!books || books.length === 0) return null;

  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
              {t({ en: "Latest Publications", bn: "সাম্প্রতিক প্রকাশনা", ar: "أحدث الإصدارات" })}
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              {t({
                en: "Explore our recently published scholarly works, contributing to the global Islamic intellectual discourse.",
                bn: "আমাদের সম্প্রতি প্রকাশিত গবেষণামূলক গ্রন্থসমূহ দেখুন, যা বৈশ্বিক ইসলামি বুদ্ধিবৃত্তিক আলোচনায় গুরুত্বপূর্ণ অবদান রাখছে।",
                ar: "استكشف أعمالنا العلمية المنشورة حديثًا، والتي تسهم في الخطاب الفكري الإسلامي العالمي.",
              })}
            </p>
          </div>
          <Link to="/publications">
            <Button variant="outline" className="rounded-full px-8 group border-primary/20 hover:border-primary text-primary font-bold">
              {t({ en: "View All Books", bn: "সব বই দেখুন", ar: "عرض جميع الكتب" })}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
