import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  Quote,
  Crown,
  ShieldCheck,
  Star,
  HeartHandshake,
  Award,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { PageHero, SectionHeading } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { useLanguage, type LocalizedText } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { PATRON_CATEGORIES } from "@/lib/patrons";

export const Route = createFileRoute("/_public/administration/")({
  head: () =>
    seo({
      title: "Administration — Imam Shah Waliullah Dehlawi Research Institute",
      description:
        "Advisory Council, Executive Committee, Chairman, Executive Director and Patron Council of the institute.",
      path: "/administration",
    }),
  component: AdministrationPage,
});

const leaders = [
  {
    name: {
      en: "Shaykh Muhammad Salman",
      bn: "শাইখ মুহাম্মদ সালমান",
      ar: "الشيخ محمد سلمان",
    },
    role: { en: "Chairman", bn: "চেয়ারম্যান", ar: "الرئيس" },
    image: "/chairman.webp",
    bio: {
      en: "A scholar, author and educator who leads the institute's academic direction and represents it in national and international forums.",
      bn: "একজন আলেম, লেখক ও শিক্ষাবিদ যিনি প্রতিষ্ঠানের একাডেমিক দিকনির্দেশনায় নেতৃত্ব দেন এবং জাতীয় ও আন্তর্জাতিক ফোরামে প্রতিষ্ঠানের প্রতিনিধিত্ব করেন।",
      ar: "عالم ومؤلف وتربوي يقود التوجه الأكاديمي للمؤسسة ويمثلها في المحافل الوطنية والدولية.",
    },
  },
  {
    name: {
      en: "Executive Director",
      bn: "নির্বাহী পরিচালক",
      ar: "المدير التنفيذي",
    },
    role: {
      en: "Executive Director",
      bn: "নির্বাহী পরিচালক",
      ar: "المدير التنفيذي",
    },
    image: "/executive-director.webp",
    bio: {
      en: "Responsible for day-to-day administration, research coordination and the delivery of the institute's annual academic plan.",
      bn: "প্রতিষ্ঠানের দৈনন্দিন প্রশাসন, গবেষণা সমন্বয় এবং বার্ষিক একাডেমিক পরিকল্পনা বাস্তবায়নের দায়িত্বে নিয়োজিত।",
      ar: "مسؤول عن الإدارة اليومية، وتنسيق البحوث، وتنفيذ الخطة الأكاديمية السنوية للمؤسسة.",
    },
  },
];

const advisoryCouncil: { name: LocalizedText; image?: string }[] = [
  {
    name: {
      en: "Shaykh Khalilur Rahman Sajjad Nomani",
      bn: "শাইখ খলীলুর রহমান সাজ্জাদ নোমানী",
      ar: "الشيخ خليل الرحمن سجاد النعماني",
    },
  },
  {
    name: {
      en: "Sayyed Bilal Abdul Hai Hasani Nadwi",
      bn: "সাইয়েদ বিলাল আব্দুল হাই হাসানী নদভী",
      ar: "السيد بلال عبد الهي الحساني الندوي",
    },
  },
  {
    name: {
      en: "Mawlana Mahfuzul Haq",
      bn: "মাওলানা মাহফুজুল হক",
      ar: "المولانا محفوظ الحق",
    },
  },
  {
    name: {
      en: "Mawlana Abdur Razzaq Nadwi",
      bn: "মাওলানা আব্দুর রাজ্জাক নদভী",
      ar: "المولانا عبد الرزاق الندوي",
    },
  },
  {
    name: {
      en: "Shaykh Khalilur Rahman Nesarabdi",
      bn: "শাইখ খলীলুর রহমান নেসারাবাদী",
      ar: "الشيخ خليل الرحمن نيسرابادي",
    },
  },
  {
    name: {
      en: "Brigadier General Shafiul Mawla",
      bn: "ব্রিগেডিয়ার জেনারেল শফিউল মাওলা",
      ar: "العميد شفيول مولى",
    },
  },
  {
    name: {
      en: "Dr. Muhammad Abdur Rahman Anwari",
      bn: "ড. মুহাম্মদ আব্দুর রহমান আনওয়ারী",
      ar: "الدكتور محمد عبد الرحمن أنواري",
    },
  },
  {
    name: {
      en: "Shaykh Musa Al Hafiz",
      bn: "শাইখ মূসা আল হাফিজ",
      ar: "الشيخ موسى الحافظ",
    },
  },
];

const executiveCommittee = [
  {
    name: { en: "Director of Research", bn: "গবেষণা পরিচালক", ar: "مدير البحوث" },
    desc: {
      en: "Oversees research projects, fellows and grant allocation.",
      bn: "গবেষণা প্রকল্প, ফেলো ও অনুদান বরাদ্দ তত্ত্বাবধান করেন।",
      ar: "يشرف على المشاريع البحثية والزملاء وتخصيص المنح.",
    },
  },
  {
    name: { en: "Director of Publications", bn: "প্রকাশনা পরিচালক", ar: "مدير المنشورات" },
    desc: {
      en: "Manages books, journals, peer review and editorial standards.",
      bn: "গ্রন্থ, জার্নাল, পিয়ার রিভিউ ও সম্পাদনা মান তদারকি করেন।",
      ar: "يدير الكتب والمجلات والمراجعة العلمية ومعايير التحرير.",
    },
  },
  {
    name: { en: "Director of Training", bn: "প্রশিক্ষণ পরিচালক", ar: "مدير التدريب" },
    desc: {
      en: "Leads certificate courses, workshops, seminars and summer school.",
      bn: "সার্টিফিকেট কোর্স, কর্মশালা, সেমিনার ও সামার স্কুল পরিচালনা করেন।",
      ar: "يقود الدورات التدريبية وورش العمل والندوات والمدرسة الصيفية.",
    },
  },
  {
    name: { en: "Director of Digital Library", bn: "ডিজিটাল লাইব্রেরি পরিচালক", ar: "مدير المكتبة الرقمية" },
    desc: {
      en: "Digitisation of manuscripts, e-books and audio-video archives.",
      bn: "পাণ্ডুলিপি, ই-বুক ও অডিও-ভিডিও আর্কাইভ ডিজিটাইজেশন।",
      ar: "رقمنة المخطوطات والكتب الإلكترونية والأرشيف السمعي البصري.",
    },
  },
  {
    name: { en: "Treasurer", bn: "কোষাধ্যক্ষ", ar: "أمين الصندوق" },
    desc: {
      en: "Financial governance, donations, audit and transparency reporting.",
      bn: "আর্থিক ব্যবস্থাপনা, অনুদান, নিরীক্ষা ও স্বচ্ছতা প্রতিবেদন।",
      ar: "الحوكمة المالية والتبرعات والتدقيق وتقارير الشفافية.",
    },
  },
  {
    name: { en: "Secretary", bn: "সচিব", ar: "الأمين العام" },
    desc: {
      en: "Institutional records, meetings, correspondence and membership.",
      bn: "প্রাতিষ্ঠানিক রেকর্ড, সভা, চিঠিপত্র ও সদস্যপদ ব্যবস্থাপনা।",
      ar: "السجلات المؤسسية والاجتماعات والمراسلات والعضوية.",
    },
  },
];

const categoryIcons = {
  crown: Crown,
  shield: ShieldCheck,
  star: Star,
  heart: HeartHandshake,
  award: Award,
  users: Users,
};

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

      {/* Leadership */}
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
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {t(l.role)}
                </span>
                <h3 className="mt-2 text-xl font-bold text-primary">{t(l.name)}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{t(l.bio)}</p>
                <Quote className="mt-4 h-6 w-6 text-accent/40" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Patron Council Section Highlight */}
      <section className="border-t border-primary/10 bg-gradient-to-b from-primary/5 via-card to-background py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent">
                {t({ en: "Patronage & Benefactors", bn: "পৃষ্ঠপোষণ ও সহযোগিতা", ar: "الرعاية والدعم" })}
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-primary">
                {t({ en: "Patron Council", bn: "পৃষ্ঠপোষক পরিষদ", ar: "مجلس الرعاة" })}
              </h2>
              <p className="mt-2 max-w-2xl text-muted-foreground text-sm sm:text-base leading-relaxed">
                {t({
                  en: "Comprising 6 distinguished categories of patrons, scholars and philanthropists whose guidance and benevolence sustain our ongoing scholarly endeavours.",
                  bn: "প্রতিষ্ঠানের ৬টি মর্যাদাপূর্ণ ক্যাটাগরির পৃষ্ঠপোষক পরিষদ—যাঁদের দোয়া, পরামর্শ ও অনুদানে ইলম ও গবেষণার পথ সুগম হচ্ছে।",
                  ar: "يضم ٦ فئات متميزة من الرعاة والعلماء والمحسنين الداعمين لمشاريع المعهد.",
                })}
              </p>
            </div>
            <Link to="/administration/patrons" className="shrink-0">
              <Button className="rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
                {t({
                  en: "View Full Patron Directory",
                  bn: "পৃষ্ঠপোষক পরিষদের সম্পূর্ণ তালিকা",
                  ar: "عرض دليل الرعاة الكامل",
                })}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PATRON_CATEGORIES.map((cat) => {
              const Icon = categoryIcons[cat.iconName] || Users;
              return (
                <Link
                  key={cat.key}
                  to="/administration/patrons"
                  className="group rounded-2xl border border-primary/10 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${cat.badgeBg} ${cat.badgeBorder} border`}>
                        <Icon className={`h-6 w-6 ${cat.textColor}`} />
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {t(cat.label)}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {t(cat.description)}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-primary/10 flex items-center justify-between text-xs font-semibold text-primary">
                    <span>{t({ en: "Explore members", bn: "সদস্য তালিকা দেখুন", ar: "عرض الأعضاء" })}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advisory Council */}
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
                  <img
                    src={m.image}
                    alt={t(m.name)}
                    loading="lazy"
                    className="h-12 w-12 shrink-0 rounded-full border border-primary/20 object-cover object-top"
                  />
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

      {/* Executive Committee */}
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
