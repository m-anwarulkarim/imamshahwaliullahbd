import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  FlaskConical,
  CheckCircle2,
  FileText,
  Users,
  Megaphone,
  Coins,
  ArrowRight,
  BookOpen,
  ScrollText,
  GraduationCap,
} from "lucide-react";
import { PageHero, SectionHeading } from "@/components/layout/PageHero";
import { useLanguage, type LocalizedText } from "@/lib/i18n";

export const Route = createFileRoute("/_public/research/")({
  head: () => ({
    meta: [
      { title: "Research Departments — Imam Shah Waliullah Dehlawi Research Institute" },
      {
        name: "description",
        content:
          "Current and completed research projects, articles, fellows, call for papers and research grants at the institute.",
      },
      { property: "og:title", content: "Research Departments — Imam Shah Waliullah Dehlawi Research Institute" },
      { property: "og:description", content: "Explore our ongoing scholarly projects, fellows and grant programmes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResearchPage,
});

const current: { title: LocalizedText; lead: LocalizedText }[] = [
  {
    title: { en: "Bangla Translation of Hujjatullah al-Baligha (with essential commentary)", bn: "'হুজ্জাতুল্লাহিল বালিগাহ'-র বাংলা অনুবাদ (প্রয়োজনীয় টিকা সহ)", ar: "ترجمة بنغالية لحجة الله البالغة (مع تعليقات ضرورية)" },
    lead: { en: "Shah Waliullah Studies", bn: "শাহ ওয়ালিউল্লাহ স্টাডিজ", ar: "دراسات شاه ولي الله" },
  },
  {
    title: {
      en: "Bangla Translation of 'Rahmatullahil Wasiah' — the historic Urdu commentary on Hujjatullah al-Baligha by Mufti Saeed Ahmad Palanpuri (rh.)",
      bn: "'হুজ্জাতুল্লাহিল বালিগাহ'-র ঐতিহাসিক উর্দু ব্যাখ্যাগ্রন্থ মুফতি সাঈদ আহমদ পালনপুরী রহ. প্রণীত 'রহমাতুল্লাহিল ওয়াসিআহ'-র বাংলা অনুবাদ",
      ar: "ترجمة بنغالية لكتاب «رحمة الله الواسعة»، الشرح الأوردو التاريخي لحجة الله البالغة للشيخ مفتي سعيد أحمد بالنبوري (رحمه الله)",
    },
    lead: { en: "Shah Waliullah Studies", bn: "শাহ ওয়ালিউল্লাহ স্টাডিজ", ar: "دراسات شاه ولي الله" },
  },
  {
    title: { en: "Asrar ash-Shari'ah in the Light of the Muqaddimah of Hujjatullah al-Baligha", bn: "'হুজ্জাতুল্লাহিল বালিগাহ'-র মুকাদ্দিমার আলোকে আসরারুশ শরীআহ", ar: "أسرار الشريعة في ضوء مقدمة حجة الله البالغة" },
    lead: { en: "Maqasid & Shari'ah Studies", bn: "মাকাসিদ ও শরীয়াহ স্টাডিজ", ar: "دراسات المقاصد والشريعة" },
  },
  {
    title: { en: "Fikr-e-Waliullah (rh.) — Memorial Volume", bn: "ফিকরে ওয়ালিউল্লাহ রহ. স্মারকগ্রন্থ", ar: "فكر ولي الله (رحمه الله) — كتاب تذكاري" },
    lead: { en: "Shah Waliullah Studies", bn: "শাহ ওয়ালিউল্লাহ স্টাডিজ", ar: "دراسات شاه ولي الله" },
  },
  {
    title: { en: "Mujaddid Alf-e-Thani (rh.) — Memorial Volume", bn: "মুজাদ্দিদে আলফে সানী রহ. স্মারকগ্রন্থ", ar: "المجدد الألف الثاني (رحمه الله) — كتاب تذكاري" },
    lead: { en: "Tajdid & Reform Studies", bn: "তাজদীদ ও সংস্কার স্টাডিজ", ar: "دراسات التجديد والإصلاح" },
  },
  {
    title: { en: "Hazratji Yusuf (rh.) — Memorial Volume", bn: "হজরতজি ইউসুফ রহ. স্মারকগ্রন্থ", ar: "حضرتي يوسف (رحمه الله) — كتاب تذكاري" },
    lead: { en: "Tajdid & Reform Studies", bn: "তাজদীদ ও সংস্কার স্টাডিজ", ar: "دراسات التجديد والإصلاح" },
  },
  {
    title: { en: "Translation and Research of Various Works of Imam Shah Waliullah Dehlawi (rh.)", bn: "ইমাম শাহ ওয়ালিউল্লাহ দেহলভী রহ.-এর বিভিন্ন কিতাবাদির অনুবাদ ও গবেষণা", ar: "ترجمة وبحث في مؤلفات الإمام شاه ولي الله الدهلوي (رحمه الله)" },
    lead: { en: "Shah Waliullah Studies", bn: "শাহ ওয়ালিউল্লাহ স্টাডিজ", ar: "دراسات شاه ولي الله" },
  },
  {
    title: { en: "Various Researches on 'Maqasid ash-Shari'ah and Contemporary Crises'", bn: "'মাকাসিদুশ শরীআহ ও সমকালীন সংকট' বিষয়ক বিভিন্ন গবেষণা", ar: "أبحاث متنوعة حول «مقاصد الشريعة والأزمات المعاصرة»" },
    lead: { en: "Maqasid & Shari'ah Studies", bn: "মাকাসিদ ও শরীয়াহ স্টাডিজ", ar: "دراسات المقاصد والشريعة" },
  },
];

const completed: { title: LocalizedText; year: string }[] = [
  { title: { en: "Al-Fawz al-Kabir: Annotated Bangla Translation", bn: "আল-ফাওজ আল-কাবীর: টীকাসহ বাংলা অনুবাদ", ar: "الفوز الكبير: ترجمة بنغالية مشروحة" }, year: "2025" },
  { title: { en: "Shah Waliullah on Social Justice and Economy", bn: "সামাজিক ন্যায় ও অর্থনীতি নিয়ে শাহ ওয়ালিউল্লাহর দৃষ্টিভঙ্গি", ar: "شاه ولي الله في العدالة الاجتماعية والاقتصاد" }, year: "2025" },
  { title: { en: "Survey of Waliullahi Manuscripts in Bengal", bn: "বাংলায় ওয়ালিউল্লাহি পাণ্ডুলিপির জরিপ", ar: "مسح للمخطوطات الولي‌اللهية في البنغال" }, year: "2024" },
  { title: { en: "Comparative Study of Tajdid Movements", bn: "তাজদীদ আন্দোলনসমূহের তুলনামূলক অধ্যয়ন", ar: "دراسة مقارنة لحركات التجديد" }, year: "2024" },
];

const articles: { title: LocalizedText; author: LocalizedText; tag: LocalizedText }[] = [
  { title: { en: "The Theory of Irtifaqat and Modern Development Studies", bn: "ইরতিফাকাত তত্ত্ব ও আধুনিক উন্নয়ন অধ্যয়ন", ar: "نظرية الارتفاقات ودراسات التنمية الحديثة" }, author: { en: "Research Fellow, Islamic Thought", bn: "গবেষণা ফেলো, ইসলামি চিন্তাধারা", ar: "زميل بحث، الفكر الإسلامي" }, tag: { en: "Islamic Economics", bn: "ইসলামি অর্থনীতি", ar: "الاقتصاد الإسلامي" } },
  { title: { en: "Reconciling Hanafi and Shafi'i Positions: A Waliullahi Reading", bn: "হানাফি ও শাফেয়ি অবস্থানের মিলন: একটি ওয়ালিউল্লাহি পাঠ", ar: "التوفيق بين المذهبين الحنفي والشافعي: قراءة ولي‌اللهية" }, author: { en: "Research Fellow, Fiqh", bn: "গবেষণা ফেলো, ফিকহ", ar: "زميل بحث، الفقه" }, tag: { en: "Fiqh", bn: "ফিকহ", ar: "الفقه" } },
  { title: { en: "Qur'anic Hermeneutics between Text and Context", bn: "পাঠ ও প্রেক্ষাপটের মাঝে কুরআনি ব্যাখ্যাশাস্ত্র", ar: "التفسير القرآني بين النص والسياق" }, author: { en: "Research Fellow, Qur'anic Studies", bn: "গবেষণা ফেলো, কুরআন স্টাডিজ", ar: "زميل بحث، الدراسات القرآنية" }, tag: { en: "Qur'anic Studies", bn: "কুরআন স্টাডিজ", ar: "الدراسات القرآنية" } },
];

const grants: { name: LocalizedText; amount: LocalizedText; note: LocalizedText; icon: typeof ScrollText }[] = [
  {
    name: { en: "Manuscript Digitisation Grant", bn: "পাণ্ডুলিপি ডিজিটাইজেশন অনুদান", ar: "منحة رقمنة المخطوطات" },
    amount: { en: "Up to BDT 200,000", bn: "সর্বোচ্চ ২,০০,০০০ টাকা", ar: "حتى 200,000 تاكا بنغلاديشي" },
    note: { en: "For cataloguing and digitising rare manuscripts.", bn: "বিরল পাণ্ডুলিপি তালিকাভুক্তকরণ ও ডিজিটাইজেশনের জন্য।", ar: "لفهرسة ورقمنة المخطوطات النادرة." },
    icon: ScrollText,
  },
  {
    name: { en: "Doctoral Research Grant", bn: "ডক্টরাল গবেষণা অনুদান", ar: "منحة البحث الدكتوراه" },
    amount: { en: "Up to BDT 150,000", bn: "সর্বোচ্চ ১,৫০,০০০ টাকা", ar: "حتى 150,000 تاكا بنغلاديشي" },
    note: { en: "For PhD candidates working on Waliullahi themes.", bn: "ওয়ালিউল্লাহি বিষয়ে কর্মরত পিএইচডি গবেষকদের জন্য।", ar: "لطلاب الدكتوراه العاملين على موضوعات ولي‌اللهية." },
    icon: GraduationCap,
  },
  {
    name: { en: "Translation Grant", bn: "অনুবাদ অনুদান", ar: "منحة الترجمة" },
    amount: { en: "Up to BDT 100,000", bn: "সর্বোচ্চ ১,০০,০০০ টাকা", ar: "حتى 100,000 تاكا بنغلاديشي" },
    note: { en: "For Bangla, English or Arabic translation of core works.", bn: "মূল রচনাবলির বাংলা, ইংরেজি বা আরবি অনুবাদের জন্য।", ar: "لترجمة الأعمال الأساسية إلى البنغالية أو الإنجليزية أو العربية." },
    icon: BookOpen,
  },
];

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay: i * 0.08 },
});

function ResearchPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow={t({ en: "Research", bn: "গবেষণা", ar: "البحث" })}
        title={t({ en: "Research Departments", bn: "গবেষণা বিভাগসমূহ", ar: "أقسام البحث" })}
        subtitle={t({
          en: "Original, peer-reviewed research across the Islamic disciplines — from critical editions of classical texts to studies of the contemporary Muslim world.",
          bn: "ইসলামি জ্ঞানের প্রতিটি শাখায় মৌলিক ও সহকর্মী-পর্যালোচিত গবেষণা — প্রাচীন গ্রন্থের সমালোচনামূলক সংস্করণ থেকে শুরু করে সমকালীন মুসলিম বিশ্বের অধ্যয়ন পর্যন্ত।",
          ar: "بحوث أصيلة محكّمة في مختلف العلوم الإسلامية — من الطبعات النقدية للنصوص الكلاسيكية إلى دراسات العالم الإسلامي المعاصر.",
        })}
        image="/programs/research-library.webp"
      />

      {/* Current Research Projects — scholarly list */}
      <section className="container mx-auto px-6 pb-20">
        <SectionHeading
          title={t({ en: "Current Research Projects", bn: "চলমান গবেষণা প্রকল্পসমূহ", ar: "المشاريع البحثية الجارية" })}
          description={t({ en: "Active projects supervised by our departments and fellows.", bn: "আমাদের বিভাগ ও ফেলোদের তত্ত্বাবধানে পরিচালিত সক্রিয় প্রকল্পসমূহ।", ar: "مشاريع نشطة يشرف عليها أقسامنا وزملاؤنا الباحثون." })}
        />
        <div className="grid gap-5 md:grid-cols-2">
          {current.map((p, i) => (
            <motion.article
              key={p.title.en}
              {...fadeUp(i)}
              className="group relative flex items-start gap-5 rounded-2xl border border-primary/10 bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-xl hover:shadow-primary/10"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-base font-bold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary/70">
                  <FlaskConical className="h-3.5 w-3.5 text-accent" />
                  {t(p.lead)}
                </span>
                <h3 className="text-base font-bold leading-snug text-primary transition-colors group-hover:text-accent">
                  {t(p.title)}
                </h3>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Completed Research — dark emerald band */}
      <section className="relative overflow-hidden bg-primary py-20">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/programs/manuscript-archive.webp"
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-primary" />
        </div>
        <div className="container relative mx-auto px-6">
          <div className="mb-10">
            <span className="mb-3 inline-block rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t({ en: "Archive", bn: "আর্কাইভ", ar: "الأرشيف" })}
            </span>
            <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
              {t({ en: "Completed Research Projects", bn: "সম্পন্ন গবেষণা প্রকল্প", ar: "المشاريع البحثية المكتملة" })}
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-accent" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {completed.map((p, i) => (
              <motion.div
                key={p.title.en}
                {...fadeUp(i)}
                className="flex items-start gap-4 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-5 backdrop-blur transition-colors hover:border-accent/40"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/20">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                </span>
                <div>
                  <p className="font-semibold text-primary-foreground">{t(p.title)}</p>
                  <p className="mt-1 text-sm text-primary-foreground/60">{t({ en: "Completed", bn: "সম্পন্ন", ar: "اكتمل في" })} {p.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles + Fellows */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading title={t({ en: "Research Articles", bn: "গবেষণা নিবন্ধ", ar: "المقالات البحثية" })} description={t({ en: "Recent working papers and journal contributions by our fellows.", bn: "আমাদের ফেলোদের সাম্প্রতিক কার্যপত্র ও জার্নাল প্রবন্ধ।", ar: "أوراق عمل حديثة ومساهمات في المجلة من زملائنا الباحثين." })} />
            <div className="space-y-4">
              {articles.map((a, i) => (
                <motion.div
                  key={a.title.en}
                  {...fadeUp(i)}
                  className="group flex items-start gap-4 rounded-xl border border-primary/10 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg hover:shadow-primary/5"
                >
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <FileText className="h-5 w-5 text-accent" />
                  </span>
                  <div className="flex-1">
                    <span className="mb-1.5 inline-block rounded-full bg-primary/5 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary/70">
                      {t(a.tag)}
                    </span>
                    <p className="font-semibold leading-snug text-primary transition-colors group-hover:text-accent">
                      {t(a.title)}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{t(a.author)}</p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-1 group-hover:text-accent" />
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading title={t({ en: "Research Fellows", bn: "গবেষণা ফেলোগণ", ar: "زملاء البحث" })} />
            <motion.div
              {...fadeUp(0)}
              className="relative overflow-hidden rounded-2xl border border-primary/10 bg-card shadow-sm"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src="/programs/islamic-literature-seminar.webp"
                  alt={t({ en: "Research fellows in a seminar at the institute", bn: "প্রতিষ্ঠানের একটি সেমিনারে গবেষণা ফেলোগণ", ar: "زملاء البحث في ندوة بالمعهد" })}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-8">
                <Users className="mb-4 h-8 w-8 text-accent" />
                <p className="leading-relaxed text-muted-foreground">
                  {t({
                    en: "Our fellowship programme supports scholars for one to three years to pursue focused research within an academic department. Fellows receive a stipend, library access, editorial support and publication opportunities in the institute's journal.",
                    bn: "আমাদের ফেলোশিপ প্রোগ্রাম এক থেকে তিন বছর মেয়াদে গবেষকদের একটি নির্দিষ্ট একাডেমিক বিভাগে কেন্দ্রীভূত গবেষণায় সহায়তা করে। ফেলোগণ বৃত্তি, গ্রন্থাগার সুবিধা, সম্পাদনা সহায়তা ও প্রতিষ্ঠানের জার্নালে প্রকাশনার সুযোগ পান।",
                    ar: "يدعم برنامج الزمالة لدينا الباحثين لمدة تتراوح بين سنة وثلاث سنوات لإجراء بحث مركّز ضمن أحد الأقسام الأكاديمية. يحصل الزملاء على راتب شهري، والوصول إلى المكتبة، ودعم التحرير، وفرص النشر في مجلة المعهد.",
                  })}
                </p>
                <Link
                  to="/membership"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {t({ en: "Apply for a Fellowship", bn: "ফেলোশিপের জন্য আবেদন করুন", ar: "التقدم بطلب للحصول على زمالة" })}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp(1)}
              className="relative mt-6 overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/15 via-accent/10 to-transparent p-8"
            >
              <Megaphone className="mb-4 h-8 w-8 text-accent" />
              <h3 className="mb-2 text-lg font-bold text-primary">{t({ en: "Call for Papers", bn: "প্রবন্ধ আহ্বান", ar: "دعوة لتقديم الأبحاث" })}</h3>
              <p className="leading-relaxed text-muted-foreground">
                {t({
                  en: "The institute's peer-reviewed journal invites original papers on Waliullahi thought, Maqasid, Hadith methodology and the contemporary Ummah. Submissions are accepted year-round in Bangla, Arabic and English.",
                  bn: "প্রতিষ্ঠানের সহকর্মী-পর্যালোচিত জার্নাল ওয়ালিউল্লাহি চিন্তাধারা, মাকাসিদ, হাদীস পদ্ধতি এবং সমকালীন উম্মাহ বিষয়ে মৌলিক প্রবন্ধ আহ্বান করছে। বাংলা, আরবি ও ইংরেজিতে সারা বছর প্রবন্ধ গ্রহণ করা হয়।",
                  ar: "تدعو مجلة المعهد المحكّمة إلى تقديم أبحاث أصيلة حول الفكر الولي‌اللهي والمقاصد ومنهجية الحديث والأمة المعاصرة. تُقبل المشاركات على مدار العام باللغات البنغالية والعربية والإنجليزية.",
                })}
              </p>
              <Link
                to="/magazine"
                className="mt-5 inline-flex items-center gap-2 font-semibold text-accent hover:underline"
              >
                {t({ en: "Read the Journal", bn: "জার্নাল পড়ুন", ar: "اقرأ المجلة" })}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Research Grants */}
      <section className="relative overflow-hidden border-t border-primary/10 bg-primary/5 py-20">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t({ en: "Research Grants", bn: "গবেষণা অনুদান", ar: "المنح البحثية" })}
            description={t({ en: "Financial support for scholars pursuing work aligned with our academic priorities.", bn: "আমাদের একাডেমিক অগ্রাধিকারের সাথে সামঞ্জস্যপূর্ণ কাজে নিয়োজিত গবেষকদের জন্য আর্থিক সহায়তা।", ar: "دعم مالي للباحثين الذين يعملون على موضوعات تتماشى مع أولوياتنا الأكاديمية." })}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {grants.map((g, i) => (
              <motion.div
                key={g.name.en}
                {...fadeUp(i)}
                className="group relative overflow-hidden rounded-2xl border border-primary/10 bg-card p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/10 transition-transform duration-500 group-hover:scale-150" />
                <span className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
                  <g.icon className="h-6 w-6 text-accent" />
                </span>
                <h3 className="relative font-bold text-primary">{t(g.name)}</h3>
                <p className="relative mt-2 inline-block rounded-full bg-accent/15 px-3 py-1 text-sm font-bold text-accent">
                  {t(g.amount)}
                </p>
                <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">{t(g.note)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
