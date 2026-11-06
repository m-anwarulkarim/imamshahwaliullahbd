import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Users, Briefcase, Quote } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/layout/PageHero";
import { useLanguage, type LocalizedText } from "@/lib/i18n";

export const Route = createFileRoute("/_public/administration")({
  head: () => ({
    meta: [
      { title: "Administration — Imam Shah Waliullah Dehlawi Research Institute" },
      {
        name: "description",
        content: "Advisory Council, Executive Committee, Chairman and Executive Director of the institute.",
      },
      { property: "og:title", content: "Administration — Imam Shah Waliullah Dehlawi Research Institute" },
      { property: "og:description", content: "Meet the leadership and governing bodies guiding our scholarly work." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdministrationPage,
});

const leaders = [
  {
    name: { en: "Shaykh Muhammad Salman", bn: "শাইখ মুহাম্মদ সালমান", ar: "الشيخ محمد سلمان" },
    role: { en: "Chairman", bn: "চেয়ারম্যান", ar: "الرئيس" },
    image: "/chairman.webp",
    bio: {
      en: "A scholar, author and educator who leads the institute's academic direction and represents it in national and international forums.",
      bn: "একজন আলেম, লেখক ও শিক্ষাবিদ যিনি প্রতিষ্ঠানের একাডেমিক দিকনির্দেশনায় নেতৃত্ব দেন এবং জাতীয় ও আন্তর্জাতিক ফোরামে প্রতিষ্ঠানের প্রতিনিধিত্ব করেন।",
      ar: "عالم ومؤلف وتربوي يقود التوجه الأكاديمي للمؤسسة ويمثلها في المحافل الوطنية والدولية.",
    },
  },
  {
    name: { en: "Executive Director", bn: "নির্বাহী পরিচালক", ar: "المدير التنفيذي" },
    role: { en: "Executive Director", bn: "নির্বাহী পরিচালক", ar: "المدير التنفيذي" },
    image: "/executive-director.webp",
    bio: {
      en: "Responsible for day-to-day administration, research coordination and the delivery of the institute's annual academic plan.",
      bn: "প্রতিষ্ঠানের দৈনন্দিন প্রশাসন, গবেষণা সমন্বয় এবং বার্ষিক একাডেমিক পরিকল্পনা বাস্তবায়নের দায়িত্বে নিয়োজিত।",
      ar: "مسؤول عن الإدارة اليومية، وتنسيق البحوث، وتنفيذ الخطة الأكاديمية السنوية للمؤسسة.",
    },
  },
];

const advisoryCouncil: { name: LocalizedText; image?: string }[] = [
  { name: { en: "Shaykh Khalilur Rahman Sajjad Nomani", bn: "শাইখ খলীলুর রহমান সাজ্জাদ নোমানী", ar: "الشيخ خليل الرحمن سجاد النعماني" } },
  { name: { en: "Sayyed Bilal Abdul Hai Hasani Nadwi", bn: "সাইয়েদ বিলাল আব্দুল হাই হাসানী নদভী", ar: "السيد بلال عبد الهي الحساني الندوي" } },
  { name: { en: "Mawlana Mahfuzul Haq", bn: "মাওলানা মাহফুজুল হক", ar: "المولانا محفوظ الحق" } },
  { name: { en: "Mawlana Abdur Razzaq Nadwi", bn: "মাওলানা আব্দুর রাজ্জাক নদভী", ar: "المولانا عبد الرزاق الندوي" } },
  { name: { en: "Shaykh Khalilur Rahman Nesarabdi", bn: "শাইখ খলীলুর রহমান নেসারাবাদী", ar: "الشيخ خليل الرحمن نيسرابادي" } },
  { name: { en: "Brigadier General Shafiul Mawla", bn: "ব্রিগেডিয়ার জেনারেল শফিউল মাওলা", ar: "العميد شفيول مولى" } },
  { name: { en: "Dr. Muhammad Abdur Rahman Anwari", bn: "ড. মুহাম্মদ আব্দুর রহমান আনওয়ারী", ar: "الدكتور محمد عبد الرحمن أنواري" } },
  { name: { en: "Shaykh Musa Al Hafiz", bn: "শাইখ মূসা আল হাফিজ", ar: "الشيخ موسى الحافظ" } },
];

const executiveCommittee = [
  { name: { en: "Director of Research", bn: "গবেষণা পরিচালক", ar: "مدير البحوث" }, desc: { en: "Oversees research projects, fellows and grant allocation.", bn: "গবেষণা প্রকল্প, ফেলো ও অনুদান বরাদ্দ তত্ত্বাবধান করেন।", ar: "يشرف على المشاريع البحثية والزملاء وتخصيص المنح." } },
  { name: { en: "Director of Publications", bn: "প্রকাশনা পরিচালক", ar: "مدير المنشورات" }, desc: { en: "Manages books, journals, peer review and editorial standards.", bn: "গ্রন্থ, জার্নাল, পিয়ার রিভিউ ও সম্পাদনা মান তদারকি করেন।", ar: "يدير الكتب والمجلات والمراجعة العلمية ومعايير التحرير." } },
  { name: { en: "Director of Training", bn: "প্রশিক্ষণ পরিচালক", ar: "مدير التدريب" }, desc: { en: "Leads certificate courses, workshops, seminars and summer school.", bn: "সার্টিফিকেট কোর্স, কর্মশালা, সেমিনার ও সামার স্কুল পরিচালনা করেন।", ar: "يقود الدورات التدريبية وورش العمل والندوات والمدرسة الصيفية." } },
  { name: { en: "Director of Digital Library", bn: "ডিজিটাল লাইব্রেরি পরিচালক", ar: "مدير المكتبة الرقمية" }, desc: { en: "Digitisation of manuscripts, e-books and audio-video archives.", bn: "পাণ্ডুলিপি, ই-বুক ও অডিও-ভিডিও আর্কাইভ ডিজিটাইজেশন।", ar: "رقمنة المخطوطات والكتب الإلكترونية والأرشيف السمعي البصري." } },
  { name: { en: "Treasurer", bn: "কোষাধ্যক্ষ", ar: "أمين الصندوق" }, desc: { en: "Financial governance, donations, audit and transparency reporting.", bn: "আর্থিক ব্যবস্থাপনা, অনুদান, নিরীক্ষা ও স্বচ্ছতা প্রতিবেদন।", ar: "الحوكمة المالية والتبرعات والتدقيق وتقارير الشفافية." } },
  { name: { en: "Secretary", bn: "সচিব", ar: "الأمين العام" }, desc: { en: "Institutional records, meetings, correspondence and membership.", bn: "প্রাতিষ্ঠানিক রেকর্ড, সভা, চিঠিপত্র ও সদস্যপদ ব্যবস্থাপনা।", ar: "السجلات المؤسسية والاجتماعات والمراسلات والعضوية." } },
];

function AdministrationPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow={t({ en: "Governance", bn: "পরিচালনা", ar: "الحوكمة" })}
        title={t({ en: "Administration", bn: "প্রশাসন", ar: "الإدارة" })}
        subtitle={t({
          en: "The institute is governed by an Advisory Council of senior scholars and managed by an Executive Committee under the leadership of the Chairman and Executive Director.",
          bn: "প্রতিষ্ঠানটি জ্যেষ্ঠ আলেমদের সমন্বয়ে গঠিত একটি উপদেষ্টা পরিষদ দ্বারা পরিচালিত এবং চেয়ারম্যান ও নির্বাহী পরিচালকের নেতৃত্বে একটি নির্বাহী কমিটি দ্বারা পরিচালিত হয়।",
          ar: "تُدار المؤسسة من قبل مجلس استشاري من كبار العلماء، وتشرف عليها لجنة تنفيذية بقيادة الرئيس والمدير التنفيذي.",
        })}
      />

      <section className="container mx-auto px-6 pb-16">
        <SectionHeading title={t({ en: "Leadership", bn: "নেতৃত্ব", ar: "القيادة" })} />
        <div className="grid gap-8 md:grid-cols-2">
          {leaders.map((l, i) => (
            <motion.div
              key={l.role.en}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="overflow-hidden rounded-2xl border border-primary/10 bg-card shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="aspect-[4/3] overflow-hidden bg-primary/5">
                <img
                  src={l.image}
                  alt={`${t(l.name)}, ${t(l.role)}`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-8">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{t(l.role)}</span>
                <h3 className="mt-2 text-xl font-bold text-primary">{t(l.name)}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{t(l.bio)}</p>
                <Quote className="mt-4 h-6 w-6 text-accent/40" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-y border-primary/10 bg-primary/5 py-16">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t({ en: "Advisory Council", bn: "উপদেষ্টা পরিষদ", ar: "المجلس الاستشاري" })}
            description={t({
              en: "Senior scholars who review the institute's academic policy and safeguard its methodological standards.",
              bn: "জ্যেষ্ঠ আলেমগণ যারা প্রতিষ্ঠানের একাডেমিক নীতি পর্যালোচনা করেন এবং এর পদ্ধতিগত মান রক্ষা করেন।",
              ar: "كبار العلماء الذين يراجعون السياسة الأكاديمية للمؤسسة ويحافظون على معاييرها المنهجية.",
            })}
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {advisoryCouncil.map((m, i) => (
              <motion.div
                key={m.name.en}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-start gap-4 rounded-xl border border-primary/10 bg-card p-5"
              >
                {m.image ? (
                  <img src={m.image} alt={t(m.name)} loading="lazy" className="h-12 w-12 shrink-0 rounded-full border border-primary/20 object-cover object-top" />
                ) : (
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
                  </span>
                )}
                <div>
                  <p className="font-semibold text-primary">{t(m.name)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <SectionHeading
          title={t({ en: "Executive Committee", bn: "নির্বাহী কমিটি", ar: "اللجنة التنفيذية" })}
          description={t({
            en: "The operational offices that run the institute's daily academic and administrative work.",
            bn: "প্রতিষ্ঠানের দৈনন্দিন একাডেমিক ও প্রশাসনিক কার্যক্রম পরিচালনাকারী কার্যকরী দপ্তরসমূহ।",
            ar: "المكاتب التشغيلية التي تدير العمل الأكاديمي والإداري اليومي للمؤسسة.",
          })}
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {executiveCommittee.map((m, i) => (
            <motion.div
              key={m.name.en}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group rounded-2xl border border-primary/10 bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg"
            >
              <Briefcase className="mb-4 h-6 w-6 text-accent" />
              <h3 className="mb-2 font-bold text-primary">{t(m.name)}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{t(m.desc)}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
