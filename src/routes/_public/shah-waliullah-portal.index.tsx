import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { User, Network, BookMarked, Sparkles, ScrollText, Library, Archive, Images } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/layout/PageHero";
import { useLanguage, type LocalizedText } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_public/shah-waliullah-portal/")({
  head: () => {
    const head = seo({
      title: "Imam Shah Waliullah Dehlawi — Life, Works & Legacy | ইমাম শাহ ওয়ালিউল্লাহ",
      description: "Imam Shah Waliullah Dehlawi (1703–1762): biography, family tree, Hujjatullah al-Baligha and other works, legacy and archive — by Imam Shah Waliullah Dehlawi Research Institute.",
      path: "/shah-waliullah-portal",
      keywords: "imam shah waliullah, Imam Shah Waliullah, Imam Shah Waliullah Dehlawi, Shah Waliullah Dehlawi biography, ইমাম শাহ ওয়ালিউল্লাহ, শাহ ওয়ালিউল্লাহ দেহলভী, الإمام شاه ولي الله الدهلوي",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Imam Shah Waliullah Dehlawi",
        alternateName: ["Imam Shah Waliullah", "Shah Waliullah Dehlawi", "ইমাম শাহ ওয়ালিউল্লাহ দেহলভী", "شاه ولي الله الدهلوي"],
        birthDate: "1703",
        deathDate: "1762",
        birthPlace: "Delhi",
        url: "https://imamshahwaliullahbd.com/shah-waliullah-portal",
      },
    });
    return head;
  },
  component: PortalPage,
});

const works: { title: LocalizedText; note: LocalizedText }[] = [
  {
    title: { en: "Hujjatullah al-Baligha", bn: "হুজ্জাতুল্লাহিল বালিগাহ", ar: "حجة الله البالغة" },
    note: {
      en: "His magnum opus on the wisdom behind the Shari'ah.",
      bn: "শরীআহর অন্তর্নিহিত হিকমাহ নিয়ে রচিত তাঁর শ্রেষ্ঠ গ্রন্থ।",
      ar: "كتابه الأعظم في أسرار الشريعة وحكمها.",
    },
  },
  {
    title: { en: "Al-Fawz al-Kabir fi Usul al-Tafsir", bn: "আল-ফাওযুল কাবীর ফী উসূলিত তাফসীর", ar: "الفوز الكبير في أصول التفسير" },
    note: {
      en: "Foundational principles of Qur'anic exegesis.",
      bn: "কুরআন ব্যাখ্যার মৌলিক উসূল।",
      ar: "الأصول الأساسية لعلم التفسير.",
    },
  },
  {
    title: { en: "Izalat al-Khafa 'an Khilafat al-Khulafa", bn: "ইযালাতুল খাফা আন খিলাফাতিল খুলাফা", ar: "إزالة الخفاء عن خلافة الخلفاء" },
    note: {
      en: "A study of the rightly-guided caliphate.",
      bn: "খিলাফতে রাশেদা বিষয়ক গবেষণা।",
      ar: "دراسة في الخلافة الراشدة.",
    },
  },
  {
    title: { en: "Al-Musaffa & Al-Musawwa", bn: "আল-মুসাফফা ও আল-মুসাওয়া", ar: "المصفى والمسوى" },
    note: {
      en: "Commentaries on Muwatta Imam Malik.",
      bn: "মুয়াত্তা ইমাম মালিকের ব্যাখ্যাগ্রন্থ।",
      ar: "شرحان على موطأ الإمام مالك.",
    },
  },
  {
    title: { en: "Al-Budur al-Bazigha", bn: "আল-বুদূরুল বাযিগাহ", ar: "البدور البازغة" },
    note: {
      en: "Philosophy of human society and religion.",
      bn: "মানবসমাজ ও ধর্মের দর্শন।",
      ar: "فلسفة المجتمع الإنساني والدين.",
    },
  },
  {
    title: { en: "Fath al-Rahman", bn: "ফাতহুর রহমান", ar: "فتح الرحمن" },
    note: {
      en: "The first Persian translation of the Qur'an in the subcontinent.",
      bn: "উপমহাদেশে কুরআনের প্রথম ফারসি অনুবাদ।",
      ar: "أول ترجمة فارسية للقرآن في شبه القارة.",
    },
  },
];

const legacy: LocalizedText[] = [
  {
    en: "Systematised the philosophy of Islamic law (asrar al-shari'ah) into a coherent framework.",
    bn: "ইসলামী আইনের দর্শন (আসরারুশ শরীআহ)-কে সুসংহত কাঠামোয় বিন্যস্ত করেছেন।",
    ar: "صاغ فلسفة التشريع الإسلامي (أسرار الشريعة) في إطار متكامل.",
  },
  {
    en: "Reconciled the juristic schools through a comparative, evidence-based approach.",
    bn: "তুলনামূলক ও দলিলনির্ভর পদ্ধতিতে ফিকহী মাযহাবসমূহের মধ্যে সমন্বয় সাধন করেছেন।",
    ar: "وفّق بين المذاهب الفقهية بمنهج مقارن قائم على الدليل.",
  },
  {
    en: "Introduced the theory of Irtifaqat — the stages of human social development.",
    bn: "ইরতিফাকাত তত্ত্ব উপস্থাপন করেছেন—মানবসমাজ বিকাশের স্তরসমূহ।",
    ar: "قدّم نظرية الارتفاقات، أي مراحل تطور المجتمع الإنساني.",
  },
  {
    en: "Inspired reform and revival movements across South Asia for over two centuries.",
    bn: "দুই শতাব্দীরও বেশি সময় ধরে দক্ষিণ এশিয়ার সংস্কার ও পুনর্জাগরণ আন্দোলনকে অনুপ্রাণিত করেছেন।",
    ar: "ألهم حركات الإصلاح والتجديد في جنوب آسيا لأكثر من قرنين.",
  },
  {
    en: "Made scripture accessible by translating the Qur'an into the vernacular of his time.",
    bn: "তাঁর সময়ের প্রচলিত ভাষায় কুরআন অনুবাদ করে তা সাধারণের জন্য সহজলভ্য করেছেন।",
    ar: "يسّر الوصول إلى الوحي بترجمة القرآن إلى لغة عصره.",
  },
];

const sections: { icon: typeof Network; title: LocalizedText; text: LocalizedText }[] = [
  {
    icon: Network,
    title: { en: "Family Tree", bn: "বংশলতিকা", ar: "شجرة العائلة" },
    text: {
      en: "The Waliullahi household: Shah Abdur Rahim, and sons Shah Abdul Aziz, Shah Rafiuddin, Shah Abdul Qadir and Shah Abdul Ghani.",
      bn: "ওয়ালিউল্লাহি পরিবার: শাহ আব্দুর রহীম এবং পুত্রগণ—শাহ আব্দুল আযীয, শাহ রফীউদ্দীন, শাহ আব্দুল কাদির ও শাহ আব্দুল গনী।",
      ar: "بيت ولي الله: شاه عبد الرحيم وأبناؤه شاه عبد العزيز وشاه رفيع الدين وشاه عبد القادر وشاه عبد الغني.",
    },
  },
  {
    icon: ScrollText,
    title: { en: "Books & Manuscripts", bn: "গ্রন্থ ও পাণ্ডুলিপি", ar: "الكتب والمخطوطات" },
    text: {
      en: "Catalogue of surviving manuscripts held in Delhi, Rampur, Dhaka and private collections.",
      bn: "দিল্লি, রামপুর, ঢাকা ও ব্যক্তিগত সংগ্রহে রক্ষিত পাণ্ডুলিপির তালিকা।",
      ar: "فهرس المخطوطات المحفوظة في دلهي ورامبور ودكا والمجموعات الخاصة.",
    },
  },
  {
    icon: Library,
    title: { en: "Bibliography", bn: "গ্রন্থপঞ্জি", ar: "الببليوغرافيا" },
    text: {
      en: "Secondary literature: monographs, dissertations and journal articles on Waliullahi thought.",
      bn: "ওয়ালিউল্লাহি চিন্তা নিয়ে রচিত গবেষণাগ্রন্থ, অভিসন্দর্ভ ও জার্নাল প্রবন্ধ।",
      ar: "الدراسات الثانوية: الكتب والرسائل والمقالات حول الفكر الولي اللهي.",
    },
  },
  {
    icon: Archive,
    title: { en: "Digital Archive", bn: "ডিজিটাল আর্কাইভ", ar: "الأرشيف الرقمي" },
    text: {
      en: "Scanned folios, transcriptions and searchable text being released progressively.",
      bn: "স্ক্যানকৃত পাতা, প্রতিলিপি ও অনুসন্ধানযোগ্য পাঠ ক্রমান্বয়ে প্রকাশ করা হচ্ছে।",
      ar: "صور المخطوطات والنسخ والنصوص القابلة للبحث تُنشر تدريجيًا.",
    },
  },
  {
    icon: Images,
    title: { en: "Photo Gallery", bn: "ছবির গ্যালারি", ar: "معرض الصور" },
    text: {
      en: "Images of historical sites, manuscripts and institute events connected to his legacy.",
      bn: "তাঁর উত্তরাধিকারসংশ্লিষ্ট ঐতিহাসিক স্থান, পাণ্ডুলিপি ও প্রতিষ্ঠানের আয়োজনের ছবি।",
      ar: "صور للمواقع التاريخية والمخطوطات وفعاليات المعهد المرتبطة بإرثه.",
    },
  },
];

const glance: { k: LocalizedText; v: LocalizedText }[] = [
  {
    k: { en: "Full Name", bn: "পূর্ণ নাম", ar: "الاسم الكامل" },
    v: {
      en: "Qutb al-Din Ahmad ibn Abdur Rahim",
      bn: "কুতুবুদ্দীন আহমদ ইবনে আব্দুর রহীম",
      ar: "قطب الدين أحمد بن عبد الرحيم",
    },
  },
  {
    k: { en: "Born", bn: "জন্ম", ar: "الميلاد" },
    v: {
      en: "1703 CE / 1114 AH, Phulat, Delhi",
      bn: "১৭০৩ খ্রি. / ১১১৪ হি., ফুলাত, দিল্লি",
      ar: "١٧٠٣م / ١١١٤هـ، فلت، دلهي",
    },
  },
  {
    k: { en: "Died", bn: "ইন্তেকাল", ar: "الوفاة" },
    v: { en: "1762 CE / 1176 AH, Delhi", bn: "১৭৬২ খ্রি. / ১১৭৬ হি., দিল্লি", ar: "١٧٦٢م / ١١٧٦هـ، دلهي" },
  },
  {
    k: { en: "School", bn: "মাযহাব", ar: "المذهب" },
    v: {
      en: "Hanafi, with comparative method",
      bn: "হানাফী, তুলনামূলক পদ্ধতিসহ",
      ar: "حنفي بمنهج مقارن",
    },
  },
  {
    k: { en: "Languages", bn: "ভাষা", ar: "اللغات" },
    v: { en: "Arabic, Persian", bn: "আরবি, ফারসি", ar: "العربية والفارسية" },
  },
  {
    k: { en: "Major Work", bn: "প্রধান গ্রন্থ", ar: "أشهر مؤلفاته" },
    v: { en: "Hujjatullah al-Baligha", bn: "হুজ্জাতুল্লাহিল বালিগাহ", ar: "حجة الله البالغة" },
  },
];

function PortalPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow={t({ en: "Digital Portal", bn: "ডিজিটাল পোর্টাল", ar: "البوابة الرقمية" })}
        title={t({ en: "Shah Waliullah Portal", bn: "শাহ ওয়ালিউল্লাহ পোর্টাল", ar: "بوابة شاه ولي الله" })}
        subtitle={t({
          en: "A dedicated gateway to the life, writings and enduring intellectual legacy of Imam Shah Waliullah Dehlawi (1703–1762).",
          bn: "ইমাম শাহ ওয়ালিউল্লাহ দেহলভী রহ. (১৭০৩–১৭৬২)-এর জীবন, রচনা ও চিরন্তন জ্ঞানগত উত্তরাধিকারের একটি নিবেদিত প্রবেশদ্বার।",
          ar: "بوابة مخصصة لحياة الإمام شاه ولي الله الدهلوي (١٧٠٣–١٧٦٢) ومؤلفاته وإرثه الفكري الخالد.",
        })}
      />

      <section className="container mx-auto px-6 pb-16">
        <div className="grid gap-10 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <SectionHeading title={t({ en: "Biography", bn: "জীবনী", ar: "السيرة" })} />
            <div className="space-y-4 leading-relaxed text-muted-foreground">
              <p>
                {t({
                  en: "Qutb al-Din Ahmad, known as Shah Waliullah Dehlawi, was born in 1703 near Delhi into a family of scholars. He memorised the Qur'an as a child, mastered the Islamic sciences under his father Shah Abdur Rahim, and began teaching at the age of seventeen.",
                  bn: "কুতুবুদ্দীন আহমদ, যিনি শাহ ওয়ালিউল্লাহ দেহলভী নামে পরিচিত, ১৭০৩ সালে দিল্লির নিকটে এক আলেম পরিবারে জন্মগ্রহণ করেন। শৈশবেই কুরআন হিফয করেন, পিতা শাহ আব্দুর রহীমের কাছে ইসলামী শাস্ত্রে ব্যুৎপত্তি অর্জন করেন এবং সতেরো বছর বয়সে শিক্ষকতা শুরু করেন।",
                  ar: "وُلد قطب الدين أحمد المعروف بشاه ولي الله الدهلوي عام ١٧٠٣ قرب دلهي في أسرة علم. حفظ القرآن صغيرًا، وأتقن العلوم الإسلامية على والده شاه عبد الرحيم، وبدأ التدريس في السابعة عشرة.",
                })}
              </p>
              <p>
                {t({
                  en: "After fourteen months of study in the Hijaz under leading Hadith scholars, he returned to a Delhi in political and moral crisis. His response was intellectual: a vast programme of writing that explained the deeper wisdom of revelation, reconciled juristic disagreement, and set out a philosophy of society grounded in scripture.",
                  bn: "হিজাযে প্রখ্যাত মুহাদ্দিসগণের কাছে চৌদ্দ মাস অধ্যয়নের পর তিনি রাজনৈতিক ও নৈতিক সংকটে নিমজ্জিত দিল্লিতে ফিরে আসেন। তাঁর প্রতিক্রিয়া ছিল জ্ঞানগত—এক বিশাল রচনাকর্ম, যা ওহীর গভীর হিকমাহ ব্যাখ্যা করে, ফিকহী মতভেদে সমন্বয় ঘটায় এবং ওহীভিত্তিক সমাজদর্শন উপস্থাপন করে।",
                  ar: "بعد أربعة عشر شهرًا من الدراسة في الحجاز على كبار المحدثين، عاد إلى دلهي التي كانت تعاني أزمة سياسية وأخلاقية، فكان جوابه فكريًا: مشروع تأليفي واسع يبيّن أسرار الوحي، ويوفّق بين الخلاف الفقهي، ويؤسس فلسفة اجتماعية مستمدة من النصوص.",
                })}
              </p>
              <p>
                {t({
                  en: "He died in 1762, leaving behind sons and students who carried his method across the subcontinent — making him, by common agreement, the foremost renewer (mujaddid) of Islam in South Asia.",
                  bn: "১৭৬২ সালে তিনি ইন্তেকাল করেন; তাঁর সন্তান ও ছাত্ররা তাঁর পদ্ধতিকে গোটা উপমহাদেশে ছড়িয়ে দেন—ফলে তিনি সর্বসম্মতভাবে দক্ষিণ এশিয়ার শ্রেষ্ঠ মুজাদ্দিদ হিসেবে স্বীকৃত।",
                  ar: "توفي عام ١٧٦٢ مخلفًا أبناء وتلاميذ حملوا منهجه في شبه القارة، فعُدّ باتفاق العلماء مجدد الإسلام الأبرز في جنوب آسيا.",
                })}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-primary/10 bg-primary p-8 text-primary-foreground"
          >
            <User className="mb-4 h-8 w-8 text-accent" />
            <h3 className="mb-5 text-lg font-bold">
              {t({ en: "At a Glance", bn: "এক নজরে", ar: "نظرة سريعة" })}
            </h3>
            <dl className="space-y-4 text-sm">
              {glance.map((row) => (
                <div key={row.k.en} className="border-b border-primary-foreground/10 pb-3">
                  <dt className="text-primary-foreground/60">{t(row.k)}</dt>
                  <dd className="font-semibold">{t(row.v)}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-primary/10 bg-primary/5 py-16">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t({ en: "Works & Contributions", bn: "রচনা ও অবদান", ar: "المؤلفات والإسهامات" })}
            description={t({
              en: "Principal writings that define the Waliullahi corpus.",
              bn: "ওয়ালিউল্লাহি জ্ঞানভাণ্ডারের প্রধান রচনাসমূহ।",
              ar: "أهم المؤلفات التي تشكّل التراث الولي اللهي.",
            })}
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {works.map((w, i) => (
              <motion.div
                key={w.title.en}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl border border-primary/10 bg-card p-6"
              >
                <BookMarked className="mb-4 h-6 w-6 text-accent" />
                <h3 className="font-bold text-primary">{t(w.title)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(w.note)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <SectionHeading title={t({ en: "Intellectual Legacy", bn: "জ্ঞানগত উত্তরাধিকার", ar: "الإرث الفكري" })} />
        <div className="grid gap-4 md:grid-cols-2">
          {legacy.map((l) => (
            <div key={l.en} className="flex gap-4 rounded-xl border border-primary/10 bg-card p-5">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p className="text-muted-foreground">{t(l)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-primary/10 bg-primary/5 py-16">
        <div className="container mx-auto px-6">
          <SectionHeading title={t({ en: "Archive & Resources", bn: "আর্কাইভ ও সম্পদ", ar: "الأرشيف والموارد" })} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((s, i) => (
              <motion.div
                key={s.title.en}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group rounded-2xl border border-primary/10 bg-card p-7 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg"
              >
                <s.icon className="mb-4 h-6 w-6 text-accent" />
                <h3 className="font-bold text-primary">{t(s.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(s.text)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
