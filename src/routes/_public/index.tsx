import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { FeaturedBooks } from "@/components/home/FeaturedBooks";
import { ProgramsActivities } from "@/components/home/ProgramsActivities";
import { LegacyTimeline } from "@/components/about/LegacyTimeline";
import { Suspense } from "react";
import { LeadershipMessages } from "@/components/about/LeadershipMessages";
import { ResearchHighlights } from "@/components/shared/ResearchHighlights";
import { AcademicPartners } from "@/components/shared/AcademicPartners";
import { LatestJournal } from "@/components/home/LatestJournal";
import { PayamEInsaniyat } from "@/components/home/PayamEInsaniyat";
import { InstituteGallerySlider } from "@/components/about/InstituteGallerySlider";
import { CoursesSlider } from "@/components/home/CoursesSlider";
import { VisionStatement } from "@/components/about/VisionStatement";
import { useLanguage } from "@/lib/i18n";
import { getFeaturedBooks } from "@/lib/books";
import { getPublishedEvents, getPublishedCourses } from "@/lib/content";
import { getPublishedMagazines } from "@/lib/content";

export const Route = createFileRoute("/_public/")({
  loader: async () => {
    const [books, events, magazines, courses] = await Promise.all([
      getFeaturedBooks(),
      getPublishedEvents(),
      getPublishedMagazines(),
      getPublishedCourses(),
    ]);
    return { books, events, magazines, courses };
  },
  head: () => {
    const url = "https://imamshahwaliullahbd.com/";
    const title = "Imam Shah Waliullah Dehlawi Research Institute | ইমাম শাহ ওয়ালিউল্লাহ";
    const description =
      "Imam Shah Waliullah Dehlawi Research Institute, Dhaka — the official site dedicated to Imam Shah Waliullah: research, publications, মাসিক আল ফুরকান, courses and seminars. ইমাম শাহ ওয়ালিউল্লাহ দেহলভী রিসার্চ ইনস্টিটিউট।";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: "imam shah waliullah, Imam Shah Waliullah, Imam Shah Waliullah Dehlawi, Imam Shah Waliullah Dehlawi Research Institute, Shah Waliullah Research Institute, Shah Waliullah Dehlawi, ইমাম শাহ ওয়ালিউল্লাহ, ইমাম শাহ ওয়ালিউল্লাহ দেহলভী রিসার্চ ইনস্টিটিউট, শাহ ওয়ালিউল্লাহ দেহলভী, الإمام شاه ولي الله الدهلوي, معهد الإمام شاه ولي الله الدهلوي للدراسات والبحوث, Islamic research Bangladesh, মাসিক আল ফুরকান" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "Imam Shah Waliullah Dehlawi Research Institute",
            alternateName: [
              "Imam Shah Waliullah",
              "Imam Shah Waliullah Research Institute",
              "Shah Waliullah Research Institute",
              "ইমাম শাহ ওয়ালিউল্লাহ দেহলভী রিসার্চ ইনস্টিটিউট",
              "معهد الإمام شاه ولي الله الدهلوي للدراسات والبحوث",
            ],
            description,
            foundingLocation: "Dhaka, Bangladesh",
            knowsAbout: ["Imam Shah Waliullah Dehlawi", "Hujjatullah al-Baligha", "Maqasid al-Shariah", "Islamic research"],
            areaServed: "Bangladesh",
            url,
            logo: "https://imamshahwaliullahbd.com/logo.webp",
            telephone: ["+8801974392665", "+8801774392665"],
            address: {
              "@type": "PostalAddress",
              streetAddress: "House 206, Road 11, Block B, Mirpur-12, Pallabi",
              addressLocality: "Dhaka",
              postalCode: "1216",
              addressCountry: "BD",
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Imam Shah Waliullah Dehlawi Research Institute",
            url,
            inLanguage: ["bn", "en", "ar"],
          }),
        },
      ],
    };
  },
  component: Index,
});

function Index() {
  const { t } = useLanguage();
  const { books, events, magazines, courses } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <VisionStatement />
      <LeadershipMessages />

      <main>
        <CoursesSlider dbCourses={courses} />

        <Suspense fallback={<div className="h-96 flex items-center justify-center">{t({ en: "Loading books...", bn: "বই লোড হচ্ছে...", ar: "جارٍ تحميل الكتب..." })}</div>}>
          <FeaturedBooks books={books} />
        </Suspense>

        <Suspense fallback={<div className="h-96 flex items-center justify-center">{t({ en: "Loading programs...", bn: "কর্মসূচি লোড হচ্ছে...", ar: "جارٍ تحميل البرامج..." })}</div>}>
          <ProgramsActivities events={events} />
        </Suspense>

        <Suspense fallback={<div className="h-96 flex items-center justify-center">{t({ en: "Loading...", bn: "লোড হচ্ছে...", ar: "جارٍ التحميل..." })}</div>}>
          <PayamEInsaniyat />
        </Suspense>

        <LatestJournal magazines={magazines} />

        <InstituteGallerySlider />

        <ResearchHighlights />

        <LegacyTimeline />

        <AcademicPartners />

        <div className="container mx-auto px-6 py-16">



          <section className="rounded-3xl bg-primary/5 p-8 md:p-16 text-center border border-primary/10">
            <h2 className="text-2xl md:text-4xl font-bold text-primary mb-6">{t({ en: "Support Our Intellectual Journey", bn: "আমাদের জ্ঞানযাত্রায় পাশে থাকুন", ar: "ادعم رحلتنا العلمية" })}</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-8 text-lg">
              {t({
                en: "Your contributions help us digitize rare manuscripts and support research fellows dedicated to Islamic scholarship.",
                bn: "আপনার সহযোগিতা দুর্লভ পাণ্ডুলিপি ডিজিটাইজ করতে এবং ইসলামী জ্ঞানচর্চায় নিবেদিত গবেষকদের সহায়তা করতে আমাদের সক্ষম করে।",
                ar: "تسهم تبرعاتكم في رقمنة المخطوطات النادرة ودعم الباحثين المتفرغين للعلوم الإسلامية.",
              })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="rounded-full bg-accent px-8 py-3 font-bold text-accent-foreground hover:bg-accent/90 transition-all">
                {t({ en: "Become a Donor", bn: "দাতা হোন", ar: "كن متبرعًا" })}
              </button>
              <button className="rounded-full bg-primary px-8 py-3 font-bold text-primary-foreground hover:bg-primary/90 transition-all">
                {t({ en: "Research Fellowship", bn: "গবেষণা ফেলোশিপ", ar: "زمالة بحثية" })}
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
