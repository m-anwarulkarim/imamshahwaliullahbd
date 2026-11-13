import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookOpen, Clock, GraduationCap } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { getPublishedCourses } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_public/short-courses/")({
  head: () => seo({
    title: "Short Courses — Imam Shah Waliullah Dehlawi Research Institute",
    description: "Enrol in our short Islamic research and scholarship courses.",
    path: "/short-courses",
  }),
  loader: () => getPublishedCourses(),
  component: ShortCoursesPage,
});

function ShortCoursesPage() {
  const { t, lang } = useLanguage();
  const courses = Route.useLoaderData();

  const pick = (bn: string | null | undefined, en: string | null | undefined, ar: string | null | undefined) =>
    lang === "en" && en ? en : lang === "ar" && ar ? ar : bn ?? null;

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow={t({ en: "Education", bn: "শিক্ষা", ar: "التعليم" })}
        title={t({ en: "Short Courses", bn: "সংক্ষিপ্ত কোর্সসমূহ", ar: "الدورات القصيرة" })}
        subtitle={t({
          en: "Focused, structured courses in Islamic scholarship, research methodology and intellectual tradition — open to students at every level.",
          bn: "ইসলামি জ্ঞানচর্চা, গবেষণা পদ্ধতি ও বুদ্ধিবৃত্তিক ঐতিহ্যে কেন্দ্রীভূত ও সুগঠিত কোর্স — সব স্তরের শিক্ষার্থীদের জন্য উন্মুক্ত।",
          ar: "دورات مركّزة ومنظمة في العلوم الإسلامية ومنهجية البحث والتراث الفكري — مفتوحة للطلاب من جميع المستويات.",
        })}
      />

      <section className="container mx-auto px-6 pb-24">
        {courses.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">
            {t({ en: "No courses available at this time.", bn: "এই মুহূর্তে কোনো কোর্স উপলব্ধ নেই।", ar: "لا توجد دورات متاحة في الوقت الحالي." })}
          </p>
        ) : (
          <>
            <SectionHeading
              title={t({ en: "Available Courses", bn: "উপলব্ধ কোর্সসমূহ", ar: "الدورات المتاحة" })}
              description={t({ en: "Click on a course to learn more and enrol.", bn: "আরও জানতে এবং নথিভুক্ত হতে কোর্সে ক্লিক করুন।", ar: "انقر على الدورة للتعرف على المزيد والتسجيل." })}
            />
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course, i) => {
                const title = pick(course.titleBn, course.titleEn, course.titleAr) ?? course.titleEn;
                const subtitle = pick(course.subtitleBn, course.subtitleEn, course.subtitleAr);
                return (
                  <motion.article
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
                    className="group overflow-hidden rounded-2xl border border-primary/10 bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                      {course.imageUrl ? (
                        <img
                          src={course.imageUrl}
                          alt={title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-primary/10">
                          <GraduationCap className="h-12 w-12 text-primary/40" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold leading-snug text-primary transition-colors group-hover:text-accent">
                        {title}
                      </h3>
                      {subtitle && (
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{subtitle}</p>
                      )}
                      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        {course.fee && (
                          <span className="flex items-center gap-1.5">
                            <BookOpen className="h-4 w-4 text-accent" />
                            {t({ en: `৳${course.fee}`, bn: `৳${course.fee}`, ar: `৳${course.fee}` })}
                          </span>
                        )}
                        {course.monthlyFee && (
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-accent" />
                            {t({ en: `৳${course.monthlyFee}/month`, bn: `৳${course.monthlyFee}/মাস`, ar: `৳${course.monthlyFee}/شهر` })}
                          </span>
                        )}
                        {!course.fee && !course.monthlyFee && (
                          <span className="font-semibold text-accent">
                            {t({ en: "Free", bn: "বিনামূল্যে", ar: "مجاني" })}
                          </span>
                        )}
                      </div>
                      <Button asChild className="mt-6 w-full rounded-full" size="sm">
                        <Link to="/short-courses/$slug" params={{ slug: course.slug }}>
                          {t({ en: "View Course", bn: "কোর্স দেখুন", ar: "عرض الدورة" })}
                        </Link>
                      </Button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
