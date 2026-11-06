import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getAllBooks } from "@/lib/books";
import { BookCard } from "@/components/shared/BookCard";
import { Search, Filter, BookOpen, GraduationCap, History, Landmark } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useLanguage, type LocalizedText } from "@/lib/i18n";

export const Route = createFileRoute("/_public/publications/")({
  head: () => ({
    meta: [
      { property: "og:title", content: "Publications — Imam Shah Waliullah Dehlawi Research Institute" },
      { property: "og:description", content: "Browse institute books, journals and scholarly publications." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Publications — Imam Shah Waliullah Dehlawi Research Institute" },
      { name: "description", content: "Explore our collection of scholarly books, research papers, and journals." },
    ],
  }),
  loader: async ({ context }) => {
    return context.queryClient.ensureQueryData({
      queryKey: ["books"],
      queryFn: () => getAllBooks(),
    });
  },
  component: PublicationsPage,
});

const categories: { name: LocalizedText; icon: typeof BookOpen }[] = [
  { name: { en: "Quranic Studies", bn: "কুরআন অধ্যয়ন", ar: "الدراسات القرآنية" }, icon: BookOpen },
  { name: { en: "Theology", bn: "ইলমে কালাম", ar: "علم الكلام" }, icon: Landmark },
  { name: { en: "History", bn: "ইতিহাস", ar: "التاريخ" }, icon: History },
  { name: { en: "Sufism", bn: "তাসাউফ", ar: "التصوف" }, icon: GraduationCap },
];

function PublicationsPage() {
  const { t } = useLanguage();
  const { data: books } = useSuspenseQuery({
    queryKey: ["books"],
    queryFn: () => getAllBooks(),
  });

  const [search, setSearch] = useState("");

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/islamic-art.png')] opacity-5 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            {t({ en: "Institutional Publications", bn: "প্রাতিষ্ঠানিক প্রকাশনা", ar: "منشورات المعهد" })}
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg mb-10">
            {t({
              en: "A curated collection of classical works and modern research contributing to Islamic scholarly thought.",
              bn: "ইসলামি জ্ঞানচর্চায় অবদান রাখা ধ্রুপদী রচনা ও আধুনিক গবেষণার একটি নির্বাচিত সংগ্রহ।",
              ar: "مجموعة مختارة من الأعمال الكلاسيكية والأبحاث الحديثة المساهمة في الفكر العلمي الإسلامي.",
            })}
          </p>
          <div className="max-w-xl mx-auto relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-accent transition-colors" />
            <Input
              placeholder={t({ en: "Search by title or author...", bn: "শিরোনাম বা লেখক দিয়ে খুঁজুন...", ar: "ابحث بالعنوان أو المؤلف..." })}
              className="h-14 pl-12 rounded-full border-white/10 bg-white/5 text-white placeholder:text-white/30 backdrop-blur-md focus:ring-accent transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-16">
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.name.en}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-primary/5 border border-primary/10 text-primary font-bold text-sm hover:bg-accent hover:text-primary transition-all group"
            >
              <cat.icon className="w-4 h-4 text-accent group-hover:text-primary" />
              {t(cat.name)}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-accent" />
            <h2 className="text-2xl font-bold text-primary">
              {t({ en: "All Publications", bn: "সকল প্রকাশনা", ar: "جميع المنشورات" })}
            </h2>
            <span className="text-sm font-medium text-muted-foreground bg-primary/5 px-3 py-1 rounded-full">
              {t({ en: `${filteredBooks.length} Books`, bn: `${filteredBooks.length}টি বই`, ar: `${filteredBooks.length} كتاباً` })}
            </span>
          </div>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-2">
              {t({ en: "No results found", bn: "কোনো ফলাফল পাওয়া যায়নি", ar: "لم يتم العثور على نتائج" })}
            </h3>
            <p className="text-muted-foreground">
              {t({ en: "Try adjusting your search terms.", bn: "আপনার অনুসন্ধানের শব্দ পরিবর্তন করে দেখুন।", ar: "حاول تعديل مصطلحات البحث." })}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
