import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Newspaper, Radio, Mail, Camera } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/layout/PageHero";
import { getPublishedNews } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_public/news-media/")({
  head: () => seo({
    title: "News & Media — Imam Shah Waliullah Dehlawi Research Institute",
    description: "Institute news, press releases, newsletter archive and media gallery.",
    path: "/news-media",
  }),
  loader: () => getPublishedNews(),
  component: NewsMediaPage,
});

const press = [
  {
    title: { en: "Press Release: Annual Conference 2026 announced", bn: "সংবাদ বিজ্ঞপ্তি: বার্ষিক সম্মেলন ২০২৬ ঘোষিত", ar: "بيان صحفي: الإعلان عن المؤتمر السنوي ٢٠٢٦" },
    date: "5 August 2026",
  },
  {
    title: { en: "Press Release: MoU signed with Centre for Waliullahi Studies", bn: "সংবাদ বিজ্ঞপ্তি: ওয়ালীউল্লাহি স্টাডিজ কেন্দ্রের সাথে সমঝোতা স্মারক স্বাক্ষরিত", ar: "بيان صحفي: توقيع مذكرة تفاهم مع مركز الدراسات الولي‌اللهية" },
    date: "22 June 2026",
  },
  {
    title: { en: "Press Release: Summer School 2026 concludes", bn: "সংবাদ বিজ্ঞপ্তি: গ্রীষ্মকালীন স্কুল ২০২৬ সমাপ্ত", ar: "بيان صحفي: اختتام المدرسة الصيفية ٢٠٢٦" },
    date: "30 May 2026",
  },
];

const gallery = [
  "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop",
];

function NewsMediaPage() {
  const { t } = useLanguage();
  const posts = Route.useLoaderData();
  const news = posts.map((n) => ({
    title: n.title,
    date: new Date(`${n.publishedAt ?? n.createdAt}`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    excerpt: n.excerpt ?? "",
  }));

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow={t({ en: "Newsroom", bn: "সংবাদকক্ষ", ar: "غرفة الأخبار" })}
        title={t({ en: "News & Media", bn: "সংবাদ ও মিডিয়া", ar: "الأخبار والإعلام" })}
        subtitle={t({
          en: "Announcements, press releases, our newsletter archive and images from the institute's academic life.",
          bn: "ঘোষণা, সংবাদ বিজ্ঞপ্তি, আমাদের নিউজলেটার সংগ্রহশালা এবং ইনস্টিটিউটের একাডেমিক জীবনের চিত্র।",
          ar: "الإعلانات، والبيانات الصحفية، وأرشيف نشرتنا الإخبارية، وصور من الحياة الأكاديمية للمعهد.",
        })}
      />

      <section className="container mx-auto px-6 pb-16">
        <SectionHeading title={t({ en: "Latest News", bn: "সাম্প্রতিক সংবাদ", ar: "أحدث الأخبار" })} />
        <div className="grid gap-6 md:grid-cols-2">
          {news.length === 0 && (
            <p className="text-muted-foreground">
              {t({ en: "No news published yet.", bn: "এখনও কোনো সংবাদ প্রকাশিত হয়নি।", ar: "لم يتم نشر أي أخبار بعد." })}
            </p>
          )}
          {news.map((n, i) => (
            <motion.article
              key={n.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group rounded-2xl border border-primary/10 bg-card p-7 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg"
            >
              <Newspaper className="mb-4 h-6 w-6 text-accent" />
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">{n.date}</p>
              <h3 className="mt-2 text-lg font-bold leading-snug text-primary group-hover:text-accent">{n.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{n.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="border-y border-primary/10 bg-primary/5 py-16">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading title={t({ en: "Press Releases", bn: "সংবাদ বিজ্ঞপ্তি", ar: "البيانات الصحفية" })} />
              <div className="space-y-4">
                {press.map((p) => (
                  <div key={p.title.en} className="flex items-start gap-4 rounded-xl border border-primary/10 bg-card p-5">
                    <Radio className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <p className="font-semibold text-primary">{t(p.title)}</p>
                      <p className="text-sm text-muted-foreground">{p.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading title={t({ en: "Newsletter", bn: "নিউজলেটার", ar: "النشرة الإخبارية" })} />
              <div className="rounded-2xl border border-primary/10 bg-card p-8">
                <Mail className="mb-4 h-8 w-8 text-accent" />
                <p className="leading-relaxed text-muted-foreground">
                  {t({
                    en: "Our quarterly newsletter summarises new publications, research milestones, upcoming events and fellowship opportunities. Past issues are archived in the digital library.",
                    bn: "আমাদের ত্রৈমাসিক নিউজলেটার নতুন প্রকাশনা, গবেষণা মাইলফলক, আসন্ন অনুষ্ঠান ও ফেলোশিপের সুযোগগুলোর সারসংক্ষেপ প্রদান করে। পূর্ববর্তী সংখ্যাগুলো ডিজিটাল লাইব্রেরিতে সংরক্ষিত আছে।",
                    ar: "تُلخّص نشرتنا الفصلية الإصدارات الجديدة والإنجازات البحثية والفعاليات القادمة وفرص الزمالة. وتُحفظ الأعداد السابقة في المكتبة الرقمية.",
                  })}
                </p>
                <p className="mt-4 text-sm font-semibold text-primary">
                  {t({
                    en: "Subscribe using the form in the footer to receive each issue by email.",
                    bn: "প্রতিটি সংখ্যা ইমেইলে পেতে ফুটারের ফর্ম ব্যবহার করে সাবস্ক্রাইব করুন।",
                    ar: "اشترك باستخدام النموذج الموجود في التذييل لتلقي كل عدد عبر البريد الإلكتروني.",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <SectionHeading
          title={t({ en: "Media Gallery", bn: "মিডিয়া গ্যালারি", ar: "معرض الصور" })}
          description={t({
            en: "Moments from conferences, workshops and the institute's library.",
            bn: "সম্মেলন, কর্মশালা এবং ইনস্টিটিউটের লাইব্রেরি থেকে মুহূর্তসমূহ।",
            ar: "لحظات من المؤتمرات وورش العمل ومكتبة المعهد.",
          })}
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {gallery.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-primary/10"
            >
              <img
                src={src}
                alt={t({ en: "Institute media gallery", bn: "ইনস্টিটিউট মিডিয়া গ্যালারি", ar: "معرض صور المعهد" })}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 transition-opacity group-hover:opacity-100">
                <Camera className="absolute bottom-4 right-4 h-5 w-5 text-primary-foreground" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
