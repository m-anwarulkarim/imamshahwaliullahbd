import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Library, BookOpen, Headphones, Film, Download, Search } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/layout/PageHero";
import { useLanguage, type LocalizedText } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_public/digital-library/")({
  head: () => seo({
    title: "Digital Library — Imam Shah Waliullah Dehlawi Research Institute",
    description: "E-library, e-books, audio library, video library and downloadable research resources.",
    path: "/digital-library",
  }),
  component: DigitalLibraryPage,
});

const collections: { icon: typeof Library; title: LocalizedText; count: LocalizedText; text: LocalizedText }[] = [
  { icon: Library, title: { en: "E-Library", bn: "ই-লাইব্রেরি", ar: "المكتبة الإلكترونية" }, count: { en: "1,200+ titles", bn: "১,২০০+ শিরোনাম", ar: "أكثر من 1200 عنوان" }, text: { en: "A searchable catalogue of classical and modern works in Arabic, Persian, Urdu and Bangla.", bn: "আরবি, ফার্সি, উর্দু ও বাংলায় প্রাচীন এবং আধুনিক রচনাবলির অনুসন্ধানযোগ্য তালিকা।", ar: "فهرس قابل للبحث للأعمال الكلاسيكية والحديثة بالعربية والفارسية والأوردية والبنغالية." } },
  { icon: BookOpen, title: { en: "E-Books", bn: "ই-বুক", ar: "الكتب الإلكترونية" }, count: { en: "180+ books", bn: "১৮০+ বই", ar: "أكثر من 180 كتابًا" }, text: { en: "Institute publications and out-of-copyright classics in PDF and EPUB format.", bn: "প্রতিষ্ঠানের প্রকাশনা ও কপিরাইটমুক্ত ক্লাসিক গ্রন্থ পিডিএফ ও ইপাব ফরম্যাটে।", ar: "منشورات المعهد والكتب الكلاسيكية غير المحفوظة الحقوق بصيغتي PDF و EPUB." } },
  { icon: Headphones, title: { en: "Audio Library", bn: "অডিও লাইব্রেরি", ar: "المكتبة الصوتية" }, count: { en: "350+ hours", bn: "৩৫০+ ঘণ্টা", ar: "أكثر من 350 ساعة" }, text: { en: "Recorded lectures, seminar sessions and Qur'an recitation with commentary.", bn: "রেকর্ডকৃত বক্তৃতা, সেমিনার অধিবেশন এবং তাফসীরসহ কুরআন তিলাওয়াত।", ar: "محاضرات مسجلة، وجلسات ندوات، وتلاوة القرآن مع التفسير." } },
  { icon: Film, title: { en: "Video Library", bn: "ভিডিও লাইব্রেরি", ar: "مكتبة الفيديو" }, count: { en: "220+ videos", bn: "২২০+ ভিডিও", ar: "أكثر من 220 فيديو" }, text: { en: "Conference talks, documentary features and course recordings.", bn: "কনফারেন্স বক্তৃতা, ডকুমেন্টারি ও কোর্স রেকর্ডিং।", ar: "محاضرات المؤتمرات، وأفلام وثائقية، وتسجيلات الدورات." } },
  { icon: Download, title: { en: "Downloads", bn: "ডাউনলোড", ar: "التنزيلات" }, count: { en: "Free access", bn: "মুক্ত প্রবেশ", ar: "وصول مجاني" }, text: { en: "Syllabi, reading lists, research templates and citation guides.", bn: "পাঠ্যসূচি, পঠন তালিকা, গবেষণা টেমপ্লেট এবং উদ্ধৃতি নির্দেশিকা।", ar: "المناهج الدراسية، وقوائم القراءة، وقوالب البحث، وأدلة التوثيق." } },
];

const featured: { title: LocalizedText; format: LocalizedText }[] = [
  { title: { en: "Hujjatullah al-Baligha — Bangla Translation", bn: "হুজ্জাতুল্লাহিল বালিগাহ — বাংলা অনুবাদ", ar: "حجة الله البالغة — ترجمة بنغالية" }, format: { en: "PDF · 640 pages", bn: "পিডিএফ · ৬৪০ পৃষ্ঠা", ar: "PDF · 640 صفحة" } },
  { title: { en: "Al-Fawz al-Kabir — Annotated Edition", bn: "আল-ফাওজ আল-কাবীর — টীকাসহ সংস্করণ", ar: "الفوز الكبير — طبعة مشروحة" }, format: { en: "PDF · 210 pages", bn: "পিডিএফ · ২১০ পৃষ্ঠা", ar: "PDF · 210 صفحة" } },
  { title: { en: "Waliullahi Thought: Lecture Series", bn: "ওয়ালিউল্লাহি চিন্তাধারা: বক্তৃতামালা", ar: "الفكر الولي‌اللهي: سلسلة محاضرات" }, format: { en: "Audio · 12 sessions", bn: "অডিও · ১২ অধিবেশন", ar: "صوتي · 12 جلسة" } },
  { title: { en: "Manuscript Editing Workshop 2025", bn: "পাণ্ডুলিপি সম্পাদনা কর্মশালা ২০২৫", ar: "ورشة تحرير المخطوطات 2025" }, format: { en: "Video · 6 hours", bn: "ভিডিও · ৬ ঘণ্টা", ar: "فيديو · 6 ساعات" } },
  { title: { en: "Journal of Waliullahi Studies, Vol. 3", bn: "ওয়ালিউল্লাহি স্টাডিজ জার্নাল, খণ্ড ৩", ar: "مجلة الدراسات الولي‌اللهية، المجلد 3" }, format: { en: "PDF · 180 pages", bn: "পিডিএফ · ১৮০ পৃষ্ঠা", ar: "PDF · 180 صفحة" } },
  { title: { en: "Maqasid ash-Shari'ah Reading List", bn: "মাকাসিদ আশ-শারীয়াহ পঠন তালিকা", ar: "قائمة قراءات مقاصد الشريعة" }, format: { en: "PDF · 14 pages", bn: "পিডিএফ · ১৪ পৃষ্ঠা", ar: "PDF · 14 صفحة" } },
];

function DigitalLibraryPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow={t({ en: "Open Knowledge", bn: "উন্মুক্ত জ্ঞান", ar: "المعرفة المفتوحة" })}
        title={t({ en: "Digital Library", bn: "ডিজিটাল লাইব্রেরি", ar: "المكتبة الرقمية" })}
        subtitle={t({
          en: "Our library is being digitised so that scholars and students anywhere can read, listen to and download the heritage we preserve.",
          bn: "আমাদের গ্রন্থাগার ডিজিটাইজ করা হচ্ছে যাতে বিশ্বের যেকোনো স্থানের গবেষক ও শিক্ষার্থী আমাদের সংরক্ষিত জ্ঞান-ঐতিহ্য পড়তে, শুনতে ও ডাউনলোড করতে পারেন।",
          ar: "يجري رقمنة مكتبتنا حتى يتمكن الباحثون والطلاب في أي مكان من قراءة والاستماع إلى وتنزيل التراث الذي نحفظه.",
        })}
      />

      <section className="container mx-auto px-6 pb-16">
        <SectionHeading title={t({ en: "Collections", bn: "সংগ্রহ", ar: "المجموعات" })} />
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
          {collections.map((c, i) => (
            <motion.div
              key={c.title.en}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group rounded-2xl border border-primary/10 bg-card p-7 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-accent/15 group-hover:text-accent">
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-primary">{t(c.title)}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-accent">{t(c.count)}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(c.text)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-y border-primary/10 bg-primary/5 py-16">
        <div className="container mx-auto px-6">
          <SectionHeading title={t({ en: "Featured Resources", bn: "বৈশিষ্ট্যযুক্ত সম্পদ", ar: "الموارد المميزة" })} description={t({ en: "Recently added to the digital catalogue.", bn: "ডিজিটাল তালিকায় সাম্প্রতিক সংযোজন।", ar: "تمت إضافتها حديثًا إلى الفهرس الرقمي." })} />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((f) => (
              <div
                key={f.title.en}
                className="group flex items-start gap-4 rounded-xl border border-primary/10 bg-card p-5 transition-colors hover:border-accent/50"
              >
                <Search className="mt-1 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="font-semibold leading-snug text-primary group-hover:text-accent">{t(f.title)}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{t(f.format)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-primary md:text-3xl">{t({ en: "Looking for a printed edition?", bn: "মুদ্রিত সংস্করণ খুঁজছেন?", ar: "تبحث عن نسخة مطبوعة؟" })}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          {t({ en: "Many of our digital titles are also available as beautifully produced hardcover books.", bn: "আমাদের অনেক ডিজিটাল শিরোনাম সুন্দরভাবে প্রকাশিত হার্ডকভার বই হিসেবেও পাওয়া যায়।", ar: "كثير من عناويننا الرقمية متوفرة أيضًا كنسخ مطبوعة بغلاف صلب ذات إخراج جميل." })}
        </p>
        <Link
          to="/publications"
          className="mt-8 inline-block rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {t({ en: "Browse Publications", bn: "প্রকাশনা দেখুন", ar: "تصفح المنشورات" })}
        </Link>
      </section>
    </div>
  );
}
