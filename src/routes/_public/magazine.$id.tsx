import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMagazineById, magazineReadUrl, magazineDownloadUrl, formatIssueMonth } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";
import type { magazines } from "../../../drizzle/schema/content";
import type { InferSelectModel } from "drizzle-orm";

type Magazine = InferSelectModel<typeof magazines>;

export const Route = createFileRoute("/_public/magazine/$id")({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  head: ({ loaderData }: any) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Monthly Al Furqan | ISWDRI` },
          { name: "description", content: loaderData.description ?? `Read ${loaderData.title} online.` },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.description ?? "" },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Magazine Issue — ISWDRI" }],
  }),
  loader: async ({ params }): Promise<Magazine> => {
    const magazine = await getMagazineById({ data: { id: params.id } });
    if (!magazine) throw notFound();
    return magazine;
  },
  notFoundComponent: () => (
    <div className="container mx-auto px-6 py-24 text-center text-muted-foreground">
      Issue not found.
    </div>
  ),
  component: MagazineDetailPage,
});

function MagazineDetailPage() {
  const { t } = useLanguage();
  const magazine = Route.useLoaderData();

  if (!magazine) return null;

  const readUrl = magazineReadUrl(magazine.id);
  const downloadUrl = magazineDownloadUrl(magazine.id);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-primary/10 bg-primary/5 py-6">
        <div className="container mx-auto px-6">
          <Link to="/magazine" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            {t({ en: "Back to Archive", bn: "আর্কাইভে ফিরে যান", ar: "العودة إلى الأرشيف" })}
          </Link>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          <aside>
            <div className="sticky top-24">
              {magazine.coverUrl ? (
                <img
                  src={magazine.coverUrl}
                  alt={magazine.title}
                  className="w-full rounded-2xl border border-primary/10 shadow-2xl"
                />
              ) : (
                <div className="flex aspect-[3/4] w-full items-center justify-center rounded-2xl border border-primary/10 bg-muted">
                  <FileText className="h-16 w-16 text-primary/30" />
                </div>
              )}
              <div className="mt-6 space-y-3">
                <Button asChild className="w-full" size="lg">
                  <a href={readUrl} target="_blank" rel="noopener noreferrer">
                    <BookOpen className="mr-2 h-5 w-5" />
                    {t({ en: "Read Online", bn: "অনলাইনে পড়ুন", ar: "اقرأ عبر الإنترنت" })}
                  </a>
                </Button>
                {magazine.pdfUrl && (
                  <Button asChild variant="outline" className="w-full" size="lg">
                    <a href={downloadUrl} target="_blank" rel="noopener noreferrer" download>
                      <Download className="mr-2 h-5 w-5" />
                      {t({ en: "Download PDF", bn: "PDF ডাউনলোড করুন", ar: "تحميل PDF" })}
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </aside>

          <main>
            <span className="inline-block rounded-full bg-accent/10 px-4 py-1 text-sm font-semibold text-accent">
              {formatIssueMonth(magazine.issueMonth)}
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-snug text-primary md:text-4xl">
              {magazine.title}
            </h1>
            {magazine.description && (
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {magazine.description}
              </p>
            )}
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {magazine.pageCount && (
                <div className="rounded-xl border border-primary/10 bg-card p-5">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {t({ en: "Pages", bn: "পৃষ্ঠা", ar: "الصفحات" })}
                  </dt>
                  <dd className="mt-1 text-xl font-bold text-primary">{magazine.pageCount}</dd>
                </div>
              )}
              {magazine.publishedAt && (
                <div className="rounded-xl border border-primary/10 bg-card p-5">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {t({ en: "Published", bn: "প্রকাশিত", ar: "نُشر في" })}
                  </dt>
                  <dd className="mt-1 text-xl font-bold text-primary">
                    {new Date(magazine.publishedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-12 overflow-hidden rounded-2xl border border-primary/10 bg-card">
              {magazine.pdfUrl ? (
                <iframe
                  src={`${readUrl}#toolbar=0`}
                  title={magazine.title}
                  className="h-[70vh] w-full"
                />
              ) : (
                <div className="flex h-64 items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <FileText className="mx-auto mb-3 h-12 w-12 opacity-40" />
                    <p>{t({ en: "PDF not yet available.", bn: "PDF এখনো উপলব্ধ নয়।", ar: "PDF غير متاح بعد." })}</p>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
