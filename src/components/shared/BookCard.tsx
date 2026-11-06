import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverUrl: string | null;
  category: string | null;
}

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { t } = useLanguage();
  return (
    <Link 
      to="/publications/$bookId" 
      params={{ bookId: book.id }}
      className="block h-full"
    >
      <Card className="group relative h-full overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm transition-all hover:-translate-y-2 hover:border-accent/30 hover:shadow-2xl cursor-pointer">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={book.coverUrl || "https://images.unsplash.com/photo-1543003923-38e2d4087103?auto=format&fit=crop&q=80&w=800"}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          {book.category && (
            <div className="absolute top-4 right-4 rounded-full bg-accent/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-lg">
              {book.category}
            </div>
          )}
        </div>

        <CardHeader className="p-3 md:p-5 pb-2">
          <h3 className="line-clamp-2 text-sm md:text-lg font-bold text-primary transition-colors group-hover:text-accent leading-tight">
            {book.title}
          </h3>
          <p className="text-[10px] md:text-xs font-medium text-muted-foreground italic line-clamp-1">
            {t({ en: "by", bn: "লেখক", ar: "بقلم" })} {book.author}
          </p>
        </CardHeader>

        <CardContent className="px-3 md:px-5 pb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span className="text-lg md:text-xl font-black text-primary">৳{book.price}</span>
            <div className="flex items-center gap-1 text-[9px] md:text-[10px] font-bold text-accent uppercase tracking-tighter">
              <span>{t({ en: "View Details", bn: "বিস্তারিত দেখুন", ar: "عرض التفاصيل" })}</span>
              <ArrowRight className="h-2.5 w-2.5 md:h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
