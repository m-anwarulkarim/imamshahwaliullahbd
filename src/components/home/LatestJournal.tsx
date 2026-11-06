import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, FileText } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { formatIssueMonth } from "@/lib/content";

type MagazineItem = {
  id: string;
  title: string;
  issueMonth: string;
  description: string | null;
  coverUrl: string | null;
  pageCount: number | null;
};

export function LatestJournal({ magazines }: { magazines?: MagazineItem[] }) {
  const { t } = useLanguage();
  const [latest, ...recent] = magazines ?? [];

  if (!latest) return null;

  return (
    <section className="container mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-10 max-w-2xl text-center"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {t({ en: "Monthly Al Furqan · Latest Issue", bn: "মাসিক আল ফুরকান · সর্বশেষ সংখ্যা", ar: "الفرقان الشهرية · أحدث عدد" })}
        </span>
        <h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">{t({ en: "Monthly Al Furqan", bn: "মাসিক আল ফুরকান", ar: "الفرقان الشهرية" })}</h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-accent" />
      </motion.div>

      <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-card shadow-xl">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="grid items-center gap-10 p-8 md:p-12 lg:grid-cols-[1fr_320px]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            <p className="font-semibold text-muted-foreground">
              {formatIssueMonth(latest.issueMonth)}
              {latest.pageCount ? ` · ${latest.pageCount} ${t({ en: "pages", bn: "পৃষ্ঠা", ar: "صفحة" })}` : ""}
            </p>
            <h3 className="mt-5 text-xl font-bold text-foreground">{latest.title}</h3>
            {latest.description && (
              <p className="mt-3 leading-relaxed text-muted-foreground line-clamp-4">{latest.description}</p>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/magazine/$id"
                params={{ id: latest.id }}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-bold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <BookOpen className="h-4 w-4" /> {t({ en: "Read Online", bn: "অনলাইনে পড়ুন", ar: "اقرأ أونلاين" })}
              </Link>
            </div>

            {recent.length > 0 && (
              <div className="mt-8 border-t border-primary/10 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {t({ en: "Previous issues", bn: "পূর্ববর্তী সংখ্যা", ar: "الأعداد السابقة" })}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {recent.map((m) => (
                    <li key={m.id}>
                      <Link
                        to="/magazine/$id"
                        params={{ id: m.id }}
                        className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent"
                      >
                        <FileText className="h-3.5 w-3.5 text-accent" />
                        {formatIssueMonth(m.issueMonth)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link
              to="/magazine"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent"
            >
              {t({ en: "View all issues by month", bn: "মাসভিত্তিক সব সংখ্যা দেখুন", ar: "عرض جميع الأعداد حسب الشهر" })}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-1 mx-auto w-full max-w-[260px] lg:order-2 lg:max-w-none"
          >
            <Link to="/magazine/$id" params={{ id: latest.id }} className="group block">
              <div className="overflow-hidden rounded-2xl border-4 border-accent/50 shadow-2xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-1deg]">
                {latest.coverUrl ? (
                  <img
                    src={latest.coverUrl}
                    alt={latest.title}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[3/4] items-center justify-center bg-primary">
                    <FileText className="h-12 w-12 text-accent" />
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
