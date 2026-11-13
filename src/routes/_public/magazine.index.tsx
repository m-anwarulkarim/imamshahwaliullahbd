import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookOpen, FileText } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { formatIssueMonth, getPublishedMagazines } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_public/magazine/")({
  head: () => seo({
    title: "Monthly Al Furqan — Magazine Archive | ISWDRI",
    description: "Read every issue of মাসিক আল ফুরকান, the monthly magazine of Imam Shah Waliullah Dehlawi Research Institute.",
    path: "/magazine",
  }),
  loader: () => getPublishedMagazines(),
  errorComponent: () => (
    <div className="container mx-auto px-6 py-24 text-center text-muted-foreground">
      Could not load the magazine archive.
    </div>
  ),
  notFoundComponent: () => (
    <div className="container mx-auto px-6 py-24 text-center text-muted-foreground">Not found.</div>
  ),
  component: MagazinePage,
});

function MagazinePage() {
  const { t } = useLanguage();
  const issues = Route.useLoaderData();
  const [latest, ...older] = issues;

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow={t({ en: "মাসিক আল ফুরকান", bn: "মাসিক আল ফুরকান", ar: "مجلة الفرقان الشهرية" })}
        title={t({ en: "Monthly Al Furqan", bn: "মাসিক আল ফুরকান", ar: "مجلة الفرقان الشهرية" })}
        subtitle={t({
          en: "Monthly Islamic scholarship, spiritual reform and intellectual research from Imam Shah Waliullah Dehlawi Research Institute. Read every issue online.",
          bn: "দ্বীনি, ইসলাহি ও ফিকরি সাময়িকী — ইমাম শাহ ওয়ালিউল্লাহ দেহলভী রহ. রিসার্চ ইনস্টিটিউট-এর মুখপত্র। প্রতি মাসের সংখ্যা অনলাইনে পড়ুন।",
          ar: "مجلة دينية وإصلاحية وفكرية — لسان حال معهد الإمام شاه ولي الله الدهلوي رحمه الله للبحوث. اقرأ عدد كل شهر عبر الإنترنت.",
        })}
      />

      {!latest ? (
        <p className="container mx-auto px-6 pb-24 text-center text-muted-foreground">
          {t({ en: "No issues published yet.", bn: "এখনো কোনো সংখ্যা প্রকাশিত হয়নি।", ar: "لم يتم نشر أي عدد بعد." })}
        </p>
      ) : (
        <>
          <section className="container mx-auto px-6 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl border border-primary/10 bg-primary text-primary-foreground shadow-2xl"
            >
              <div className="absolute inset-0 opacity-[0.07] islamic-pattern" />
              <div className="relative grid gap-10 p-8 md:grid-cols-[280px_1fr] md:p-12 items-center">
                <Link to="/magazine/$id" params={{ id: latest.id }} className="group mx-auto w-full max-w-[280px]">
                  <div className="overflow-hidden rounded-xl border-4 border-accent/60 shadow-2xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-1deg]">
                    {latest.coverUrl ? (
                      <img src={latest.coverUrl} alt={latest.title} className="aspect-[3/4] w-full object-cover" />
                    ) : (
                      <div className="flex aspect-[3/4] items-center justify-center bg-card">
                        <FileText className="h-12 w-12 text-primary" />
                      </div>
                    )}
                  </div>
                </Link>
                <div>
                  <span className="inline-block rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-widest text-accent-foreground">
                    {t({ en: "Latest Issue", bn: "সাম্প্রতিক সংখ্যা", ar: "العدد الأخير" })} · {formatIssueMonth(latest.issueMonth)}
                  </span>
                  <h2 className="mt-5 text-3xl font-bold leading-snug md:text-4xl">{latest.title}</h2>
                  {latest.description && (
                    <p className="mt-4 max-w-2xl text-primary-foreground/80 leading-relaxed">{latest.description}</p>
                  )}
                  {latest.pageCount && (
                    <p className="mt-3 text-sm text-primary-foreground/60">
                      {t({ en: `${latest.pageCount} pages`, bn: `${latest.pageCount} পৃষ্ঠা`, ar: `${latest.pageCount} صفحة` })}
                    </p>
                  )}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                      <Link to="/magazine/$id" params={{ id: latest.id }}>
                        <BookOpen className="mr-2 h-5 w-5" />
                        {t({ en: "Read Online", bn: "অনলাইনে পড়ুন", ar: "اقرأ عبر الإنترنت" })}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {older.length > 0 && (
            <section className="container mx-auto px-6 pb-24">
              <h3 className="mb-8 text-2xl font-bold text-primary">
                {t({ en: "Previous Issues", bn: "পূর্ববর্তী সংখ্যাসমূহ", ar: "الأعداد السابقة" })}
              </h3>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {older.map((issue, i) => (
                  <motion.article
                    key={issue.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="group rounded-2xl border border-primary/10 bg-card p-3 shadow-sm transition-shadow hover:shadow-xl"
                  >
                    <Link to="/magazine/$id" params={{ id: issue.id }} className="block overflow-hidden rounded-xl">
                      {issue.coverUrl ? (
                        <img
                          src={issue.coverUrl}
                          alt={issue.title}
                          loading="lazy"
                          className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex aspect-[3/4] items-center justify-center bg-muted">
                          <FileText className="h-10 w-10 text-primary" />
                        </div>
                      )}
                    </Link>
                    <div className="p-2 pt-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                        {formatIssueMonth(issue.issueMonth)}
                      </p>
                      <h4 className="mt-1 line-clamp-2 font-bold leading-snug text-primary">{issue.title}</h4>
                      <div className="mt-4 flex gap-2">
                        <Button asChild size="sm" className="flex-1">
                          <Link to="/magazine/$id" params={{ id: issue.id }}>
                            <BookOpen className="mr-1.5 h-4 w-4" />
                            {t({ en: "Read", bn: "পড়ুন", ar: "قراءة" })}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
