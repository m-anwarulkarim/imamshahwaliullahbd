import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, GraduationCap, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCourseBySlug } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import type { shortCourses } from "../../../drizzle/schema/courses";
import type { InferSelectModel } from "drizzle-orm";

type Course = InferSelectModel<typeof shortCourses>;

export const Route = createFileRoute("/_public/short-courses/$slug")({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  head: ({ loaderData, params }: any) => {
    if (!loaderData) return { meta: [{ title: "Short Course — ISWDRI" }] };
    return seo({
      title: `${loaderData.titleEn} — Short Courses | ISWDRI`,
      description: loaderData.subtitleEn ?? `Enrol in ${loaderData.titleEn}`,
      path: `/short-courses/${params.slug}`,
      ogType: "article",
    });
  },
  loader: async ({ params }): Promise<Course> => {
    const course = await getCourseBySlug({ data: { slug: params.slug } });
    if (!course) throw notFound();
    return course;
  },
  notFoundComponent: () => (
    <div className="container mx-auto px-6 py-24 text-center text-muted-foreground">
      Course not found.
    </div>
  ),
  component: ShortCourseDetailPage,
});

function ShortCourseDetailPage() {
  const { t, lang } = useLanguage();
  const course = Route.useLoaderData();

  if (!course) {
    return (
      <div className="container mx-auto px-6 py-24 text-center text-muted-foreground">
        {t({ en: "Course not found.", bn: "কোর্সটি পাওয়া যায়নি।", ar: "لم يتم العثور على الدورة." })}
      </div>
    );
  }

  const pick = (bn: string | null | undefined, en: string | null | undefined, ar: string | null | undefined) =>
    lang === "en" && en ? en : lang === "ar" && ar ? ar : bn ?? null;

  const title = pick(course.titleBn, course.titleEn, course.titleAr) ?? course.titleEn;
  const subtitle = pick(course.subtitleBn, course.subtitleEn, course.subtitleAr);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-primary/10 bg-primary/5 py-6">
        <div className="container mx-auto px-6">
          <Link to="/short-courses" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            {t({ en: "All Courses", bn: "সব কোর্স", ar: "جميع الدورات" })}
          </Link>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <main>
            <h1 className="text-3xl font-bold leading-snug text-primary md:text-4xl">{title}</h1>
            {subtitle && (
              <p className="mt-4 text-xl leading-relaxed text-muted-foreground">{subtitle}</p>
            )}

            <div className="mt-8 flex flex-wrap gap-5 text-sm text-muted-foreground">
              {course.fee && (
                <span className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-accent" />
                  {t({ en: "Course fee", bn: "কোর্স ফি", ar: "رسوم الدورة" })}: <strong className="text-primary">৳{course.fee}</strong>
                </span>
              )}
              {course.monthlyFee && (
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-accent" />
                  {t({ en: "Monthly fee", bn: "মাসিক ফি", ar: "الرسوم الشهرية" })}: <strong className="text-primary">৳{course.monthlyFee}</strong>
                </span>
              )}
              {!course.fee && !course.monthlyFee && (
                <span className="font-semibold text-accent">
                  {t({ en: "Free", bn: "বিনামূল্যে", ar: "مجاني" })}
                </span>
              )}
            </div>

            <div className="mt-10 rounded-2xl border border-primary/10 bg-primary/5 p-6">
              <p className="text-muted-foreground leading-relaxed">
                {t({
                  en: "Full course details and curriculum will be published soon. Use the enrolment form on the right to express your interest and we will notify you when the course opens.",
                  bn: "সম্পূর্ণ কোর্সের বিবরণ ও পাঠ্যক্রম শীঘ্রই প্রকাশিত হবে। আপনার আগ্রহ প্রকাশ করতে পাশের নথিভুক্তি ফর্ম ব্যবহার করুন এবং কোর্স শুরু হলে আমরা আপনাকে জানাব।",
                  ar: "سيتم نشر تفاصيل الدورة الكاملة والمناهج الدراسية قريباً. استخدم نموذج التسجيل على اليمين للتعبير عن اهتمامك وسنُخطرك عند بدء الدورة.",
                })}
              </p>
            </div>
          </main>

          <aside>
            <div className="sticky top-24 rounded-2xl border border-primary/10 bg-card p-8 shadow-lg">
              {course.imageUrl ? (
                <img
                  src={course.imageUrl}
                  alt={title}
                  className="mb-6 w-full rounded-xl object-cover"
                />
              ) : (
                <div className="mb-6 flex aspect-video w-full items-center justify-center rounded-xl bg-muted">
                  <GraduationCap className="h-12 w-12 text-primary/30" />
                </div>
              )}

              <div className="space-y-3">
                {course.fee && (
                  <div className="rounded-xl bg-primary/5 p-4 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t({ en: "Course Fee", bn: "কোর্স ফি", ar: "رسوم الدورة" })}
                    </p>
                    <p className="mt-1 text-2xl font-bold text-primary">৳{course.fee}</p>
                  </div>
                )}
                {course.monthlyFee && (
                  <div className="rounded-xl bg-primary/5 p-4 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t({ en: "Monthly", bn: "মাসিক", ar: "شهري" })}
                    </p>
                    <p className="mt-1 text-2xl font-bold text-primary">৳{course.monthlyFee}</p>
                  </div>
                )}

                <Button asChild className="mt-4 w-full rounded-full" size="lg">
                  <Link to="/short-courses/enroll" search={{ course: course.slug }}>
                    {t({ en: "Enrol Now", bn: "এখনই নথিভুক্ত হোন", ar: "سجّل الآن" })}
                  </Link>
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  {t({ en: "Or contact us for more information.", bn: "অথবা আরও তথ্যের জন্য আমাদের সাথে যোগাযোগ করুন।", ar: "أو تواصل معنا للمزيد من المعلومات." })}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
