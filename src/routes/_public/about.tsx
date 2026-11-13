import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookOpen, Compass, Target, Gem, Scale, HandHeart, Lightbulb, ShieldCheck } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/layout/PageHero";
import { InstituteGallery } from "@/components/about/InstituteGallery";
import { useLanguage, type LocalizedText } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_public/about")({
  head: () => seo({
    title: "About the Institute — Imam Shah Waliullah Dehlawi Research Institute",
    description: "Introduction, vision, mission, aims and core values of the Imam Shah Waliullah Dehlawi Research Institute.",
    path: "/about",
  }),
  component: AboutPage,
});

const aims: LocalizedText[] = [
  {
    en: "Preserve, edit and publish the works of Imam Shah Waliullah Dehlawi and his school.",
    bn: "ইমাম শাহ ওয়ালিউল্লাহ দেহলভী রহ. ও তাঁর ধারার রচনাবলি সংরক্ষণ, সম্পাদনা ও প্রকাশ।",
    ar: "حفظ وتحقيق ونشر مؤلفات الإمام شاه ولي الله الدهلوي ومدرسته.",
  },
  {
    en: "Advance original research in Qur'an, Hadith, Fiqh and Maqasid ash-Shari'ah.",
    bn: "কুরআন, হাদীস, ফিকহ ও মাকাসিদুশ শরীআহ বিষয়ে মৌলিক গবেষণা এগিয়ে নেওয়া।",
    ar: "النهوض بالبحث الأصيل في القرآن والحديث والفقه ومقاصد الشريعة.",
  },
  {
    en: "Train a new generation of researchers through fellowships and certificate programmes.",
    bn: "ফেলোশিপ ও সার্টিফিকেট প্রোগ্রামের মাধ্যমে নতুন প্রজন্মের গবেষক গড়ে তোলা।",
    ar: "تأهيل جيل جديد من الباحثين عبر الزمالات والبرامج المعتمدة.",
  },
  {
    en: "Build a digital archive of rare manuscripts accessible to scholars worldwide.",
    bn: "বিশ্বজুড়ে গবেষকদের জন্য দুর্লভ পাণ্ডুলিপির ডিজিটাল আর্কাইভ গড়ে তোলা।",
    ar: "بناء أرشيف رقمي للمخطوطات النادرة متاح للباحثين في العالم.",
  },
  {
    en: "Foster dialogue between classical Islamic scholarship and contemporary intellectual challenges.",
    bn: "ধ্রুপদী ইসলামী জ্ঞানচর্চা ও সমকালীন বুদ্ধিবৃত্তিক চ্যালেঞ্জের মধ্যে সংলাপ সৃষ্টি।",
    ar: "تعزيز الحوار بين العلوم الإسلامية الكلاسيكية والتحديات الفكرية المعاصرة.",
  },
  {
    en: "Collaborate with universities and research centres across the Muslim world and beyond.",
    bn: "মুসলিম বিশ্ব ও তার বাইরের বিশ্ববিদ্যালয় ও গবেষণাকেন্দ্রের সঙ্গে সহযোগিতা।",
    ar: "التعاون مع الجامعات ومراكز البحث في العالم الإسلامي وخارجه.",
  },
];

const challenges: LocalizedText[] = [
  { en: "Atheism and agnosticism", bn: "নাস্তিক্যবাদ ও অজ্ঞেয়বাদ", ar: "الإلحاد واللاأدرية" },
  { en: "Secularism and materialism", bn: "ধর্মনিরপেক্ষতাবাদ ও বস্তুবাদ", ar: "العلمانية والمادية" },
  {
    en: "Modern skepticism and competing ideologies",
    bn: "আধুনিক সংশয়বাদ ও প্রতিদ্বন্দ্বী মতাদর্শ",
    ar: "الشك الحديث والأيديولوجيات المنافسة",
  },
  {
    en: "The weakening of Islamic intellectual and scholarly engagement",
    bn: "ইসলামী বুদ্ধিবৃত্তিক ও জ্ঞানগত চর্চার দুর্বলতা",
    ar: "ضعف الانشغال الفكري والعلمي الإسلامي",
  },
  {
    en: "A growing disconnect between the classical Islamic intellectual heritage and contemporary questions",
    bn: "ধ্রুপদী ইসলামী জ্ঞানভাণ্ডার ও সমকালীন প্রশ্নের মধ্যে ক্রমবর্ধমান দূরত্ব",
    ar: "اتساع الفجوة بين التراث الفكري الإسلامي والأسئلة المعاصرة",
  },
  {
    en: "The increasing distance of younger generations from serious Islamic scholarship and intellectual thought",
    bn: "গভীর ইসলামী জ্ঞানচর্চা ও চিন্তাধারা থেকে নতুন প্রজন্মের ক্রমবর্ধমান দূরত্ব",
    ar: "ابتعاد الأجيال الشابة المتزايد عن العلم الشرعي الرصين والفكر الجاد",
  },
];

const values: { icon: typeof ShieldCheck; title: LocalizedText; text: LocalizedText }[] = [
  {
    icon: ShieldCheck,
    title: { en: "Integrity", bn: "সততা", ar: "النزاهة" },
    text: {
      en: "Honest, transparent and evidence-based scholarship in every publication.",
      bn: "প্রতিটি প্রকাশনায় সৎ, স্বচ্ছ ও প্রমাণনির্ভর জ্ঞানচর্চা।",
      ar: "بحث أمين وشفاف قائم على الدليل في كل إصدار.",
    },
  },
  {
    icon: Gem,
    title: { en: "Excellence", bn: "উৎকর্ষ", ar: "التميز" },
    text: {
      en: "Uncompromising academic rigour in research, editing and teaching.",
      bn: "গবেষণা, সম্পাদনা ও শিক্ষাদানে আপোষহীন একাডেমিক মান।",
      ar: "صرامة أكاديمية لا تهاون فيها في البحث والتحقيق والتدريس.",
    },
  },
  {
    icon: Scale,
    title: { en: "Balance", bn: "ভারসাম্য", ar: "التوازن" },
    text: {
      en: "The Waliullahi method of moderation between text, reason and context.",
      bn: "নস, যুক্তি ও প্রেক্ষাপটের মধ্যে ভারসাম্যের ওয়ালিউল্লাহি পদ্ধতি।",
      ar: "المنهج الولي اللهي في التوازن بين النص والعقل والواقع.",
    },
  },
  {
    icon: HandHeart,
    title: { en: "Service", bn: "খিদমাহ", ar: "الخدمة" },
    text: {
      en: "Knowledge produced for the benefit of the Ummah and humanity at large.",
      bn: "উম্মাহ ও সমগ্র মানবতার কল্যাণে জ্ঞানচর্চা।",
      ar: "علم يُنتج لخدمة الأمة والإنسانية جمعاء.",
    },
  },
  {
    icon: Lightbulb,
    title: { en: "Renewal (Tajdid)", bn: "তাজদীদ (নবায়ন)", ar: "التجديد" },
    text: {
      en: "Reviving the intellectual spirit of reform in a modern idiom.",
      bn: "আধুনিক ভাষায় সংস্কারের বুদ্ধিবৃত্তিক চেতনার পুনরুজ্জীবন।",
      ar: "إحياء روح الإصلاح الفكري بلغة العصر.",
    },
  },
  {
    icon: BookOpen,
    title: { en: "Openness", bn: "উন্মুক্ততা", ar: "الانفتاح" },
    text: {
      en: "Free access to our digital library, archives and research outputs.",
      bn: "আমাদের ডিজিটাল লাইব্রেরি, আর্কাইভ ও গবেষণাকর্মে অবাধ প্রবেশাধিকার।",
      ar: "وصول مجاني إلى مكتبتنا الرقمية وأرشيفنا ومخرجات أبحاثنا.",
    },
  },
];

function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow={t({ en: "About Us", bn: "আমাদের সম্পর্কে", ar: "من نحن" })}
        title={t({ en: "About the Institute", bn: "প্রতিষ্ঠান পরিচিতি", ar: "عن المعهد" })}
        subtitle={t({
          en: "A scholarly institution devoted to the study, preservation and renewal of the intellectual legacy of Imam Shah Waliullah Dehlawi (1703–1762).",
          bn: "ইমাম শাহ ওয়ালিউল্লাহ দেহলভী রহ. (১৭০৩–১৭৬২)-এর জ্ঞানগত উত্তরাধিকার অধ্যয়ন, সংরক্ষণ ও পুনরুজ্জীবনে নিবেদিত একটি গবেষণা প্রতিষ্ঠান।",
          ar: "مؤسسة علمية مكرسة لدراسة وحفظ وتجديد الإرث الفكري للإمام شاه ولي الله الدهلوي (١٧٠٣–١٧٦٢).",
        })}
      />

      <section className="container mx-auto px-6 pb-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading title={t({ en: "Introduction", bn: "ভূমিকা", ar: "مقدمة" })} />
            <div className="space-y-4 leading-relaxed text-muted-foreground">
              <p>
                {t({
                  en: "The Imam Shah Waliullah Dehlawi Research Institute is an independent academic body established to study the vast intellectual heritage of one of the greatest reformers of the Muslim world, and to bring his method of balanced, purpose-oriented scholarship to bear on the questions of our own age.",
                  bn: "ইমাম শাহ ওয়ালিউল্লাহ দেহলভী রিসার্চ ইনস্টিটিউট একটি স্বাধীন একাডেমিক প্রতিষ্ঠান, যা মুসলিম বিশ্বের অন্যতম শ্রেষ্ঠ সংস্কারকের বিশাল জ্ঞানভাণ্ডার অধ্যয়ন এবং তাঁর ভারসাম্যপূর্ণ ও উদ্দেশ্যনির্ভর জ্ঞানচর্চার পদ্ধতিকে সমকালীন প্রশ্নের সমাধানে প্রয়োগ করতে প্রতিষ্ঠিত।",
                  ar: "معهد الإمام شاه ولي الله الدهلوي للدراسات والبحوث هيئة أكاديمية مستقلة أُنشئت لدراسة التراث الفكري الواسع لأحد أعظم مجددي العالم الإسلامي، وتوظيف منهجه المتوازن المقاصدي في معالجة قضايا عصرنا.",
                })}
              </p>
              <p>
                {t({
                  en: "Through nine specialised academic departments, an active research programme, a growing publications list and a digital library, the institute serves scholars, students and the wider public with reliable, peer-reviewed knowledge.",
                  bn: "বিশেষায়িত একাডেমিক বিভাগ, সক্রিয় গবেষণা কর্মসূচি, ক্রমবর্ধমান প্রকাশনা ও ডিজিটাল লাইব্রেরির মাধ্যমে প্রতিষ্ঠানটি গবেষক, শিক্ষার্থী ও সাধারণ পাঠককে নির্ভরযোগ্য জ্ঞান পৌঁছে দিচ্ছে।",
                  ar: "من خلال أقسام أكاديمية متخصصة وبرنامج بحثي نشط وإصدارات متنامية ومكتبة رقمية، يخدم المعهد الباحثين والطلاب والجمهور بمعرفة موثوقة ومحكَّمة.",
                })}
              </p>
              <p>
                {t({
                  en: "Our work joins the classical disciplines — Tafsir, Hadith, Fiqh and Kalam — with the tools of modern research: critical editing, historical analysis, digital humanities and comparative study.",
                  bn: "আমাদের কাজ ধ্রুপদী শাস্ত্র—তাফসীর, হাদীস, ফিকহ ও কালাম—কে আধুনিক গবেষণার উপকরণ, যেমন তাহকীক, ঐতিহাসিক বিশ্লেষণ, ডিজিটাল হিউম্যানিটিজ ও তুলনামূলক অধ্যয়নের সঙ্গে যুক্ত করে।",
                  ar: "يجمع عملنا بين العلوم الكلاسيكية — التفسير والحديث والفقه والكلام — وأدوات البحث الحديث: التحقيق النقدي والتحليل التاريخي والإنسانيات الرقمية والدراسة المقارنة.",
                })}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid gap-6"
          >
            <div className="rounded-2xl border border-primary/10 bg-card p-8 shadow-sm">
              <Compass className="mb-4 h-8 w-8 text-accent" />
              <h3 className="mb-3 text-xl font-bold text-primary">
                {t({ en: "Our Vision", bn: "আমাদের লক্ষ্য", ar: "رؤيتنا" })}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {t({
                  en: "To be a leading global centre of Waliullahi studies — where authentic Islamic scholarship meets rigorous contemporary research, and where knowledge translates into the moral and intellectual renewal of society.",
                  bn: "ওয়ালিউল্লাহি স্টাডিজের একটি অগ্রগণ্য বৈশ্বিক কেন্দ্র হওয়া—যেখানে বিশুদ্ধ ইসলামী জ্ঞানচর্চা ও কঠোর সমকালীন গবেষণার মিলন ঘটবে এবং জ্ঞান সমাজের নৈতিক ও বুদ্ধিবৃত্তিক নবায়নে রূপ নেবে।",
                  ar: "أن نكون مركزًا عالميًا رائدًا للدراسات الولي اللهية، يلتقي فيه العلم الشرعي الأصيل بالبحث المعاصر الرصين، ويتحول فيه العلم إلى تجديد أخلاقي وفكري للمجتمع.",
                })}
              </p>
            </div>
            <div className="rounded-2xl border border-primary/10 bg-primary p-8 text-primary-foreground shadow-lg">
              <Target className="mb-4 h-8 w-8 text-accent" />
              <h3 className="mb-3 text-xl font-bold">
                {t({ en: "Our Mission", bn: "আমাদের মিশন", ar: "رسالتنا" })}
              </h3>
              <p className="leading-relaxed text-primary-foreground/80">
                {t({
                  en: "To research, edit, publish and teach the works of Imam Shah Waliullah and the wider Islamic tradition; to nurture capable researchers; and to make this heritage freely accessible in Bangla, Arabic, Urdu and English.",
                  bn: "ইমাম শাহ ওয়ালিউল্লাহ রহ. ও বৃহত্তর ইসলামী ঐতিহ্যের রচনাবলি গবেষণা, সম্পাদনা, প্রকাশ ও শিক্ষাদান; যোগ্য গবেষক তৈরি; এবং এই উত্তরাধিকারকে বাংলা, আরবি, উর্দু ও ইংরেজিতে অবাধে সহজলভ্য করা।",
                  ar: "بحث وتحقيق ونشر وتدريس مؤلفات الإمام شاه ولي الله والتراث الإسلامي الأوسع، وإعداد باحثين أكفاء، وإتاحة هذا التراث مجانًا بالبنغالية والعربية والأردية والإنجليزية.",
                })}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Current state of the institute */}
      <InstituteGallery />

      {/* Why ISWDRI */}
      <section className="container mx-auto px-6 pb-16">
        <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-card p-8 shadow-xl md:p-12">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                {t({ en: "Why ISWDRI?", bn: "কেন ISWDRI?", ar: "لماذا المعهد؟" })}
              </span>
              <h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">
                {t({
                  en: "Why Does This Institute Matter?",
                  bn: "এই প্রতিষ্ঠান কেন প্রয়োজন?",
                  ar: "لماذا هذا المعهد مهم؟",
                })}
              </h2>
              <div className="mt-4 h-1 w-16 rounded-full bg-accent" />
              <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  {t({
                    en: "The Muslim Ummah today is facing a rapidly evolving landscape of intellectual, ideological, and cultural challenges. In an age of profound global transformation, there is an urgent need to reconnect contemporary Muslim thought with the depth, richness, and intellectual vitality of the Islamic scholarly tradition.",
                    bn: "আজ মুসলিম উম্মাহ দ্রুত পরিবর্তনশীল বুদ্ধিবৃত্তিক, আদর্শিক ও সাংস্কৃতিক চ্যালেঞ্জের মুখোমুখি। বৈশ্বিক রূপান্তরের এই যুগে সমকালীন মুসলিম চিন্তাকে ইসলামী জ্ঞানঐতিহ্যের গভীরতা ও প্রাণশক্তির সঙ্গে পুনঃসংযুক্ত করা অত্যন্ত জরুরি।",
                    ar: "تواجه الأمة الإسلامية اليوم تحديات فكرية وأيديولوجية وثقافية متسارعة. وفي عصر التحولات العالمية العميقة تشتد الحاجة إلى إعادة وصل الفكر الإسلامي المعاصر بعمق التراث العلمي الإسلامي وحيويته.",
                  })}
                </p>
                <p>
                  {t({
                    en: "The Imam Shah Waliullah Dehlawi Research Institute (ISWDRI) seeks to build a meaningful and constructive bridge between the rich intellectual heritage of Islam and the complex intellectual challenges of the modern world.",
                    bn: "ইমাম শাহ ওয়ালিউল্লাহ দেহলভী রিসার্চ ইনস্টিটিউট (ISWDRI) ইসলামের সমৃদ্ধ জ্ঞানঐতিহ্য ও আধুনিক বিশ্বের জটিল বুদ্ধিবৃত্তিক চ্যালেঞ্জের মধ্যে একটি অর্থবহ সেতুবন্ধ গড়তে চায়।",
                    ar: "يسعى المعهد إلى بناء جسر بنّاء بين التراث الفكري الإسلامي الثري والتحديات الفكرية المعقدة في العالم الحديث.",
                  })}
                </p>
                <p>
                  {t({
                    en: "Our mission is to conduct rigorous research, foster scholarly engagement, and produce meaningful publications rooted in the Qur'an, Sunnah, and the Islamic intellectual tradition—while addressing contemporary questions with intellectual depth, academic integrity, and relevance.",
                    bn: "আমাদের মিশন হলো কুরআন, সুন্নাহ ও ইসলামী চিন্তাঐতিহ্যে প্রোথিত গভীর গবেষণা পরিচালনা, জ্ঞানচর্চাকে উৎসাহিত করা এবং সমকালীন প্রশ্নগুলোর বুদ্ধিবৃত্তিক গভীরতা ও একাডেমিক সততার সঙ্গে জবাব দেওয়া।",
                    ar: "رسالتنا إجراء بحوث رصينة وتعزيز الحوار العلمي وإنتاج إصدارات متأصلة في القرآن والسنة والتراث الفكري الإسلامي، مع معالجة القضايا المعاصرة بعمق ونزاهة أكاديمية.",
                  })}
                </p>
                <p className="border-l-4 border-accent pl-4 font-medium text-primary">
                  {t({
                    en: "Through this work, ISWDRI aspires to contribute to the revival of Islamic intellectual scholarship and to nurture a confident, informed, and future-oriented generation of Muslim thinkers and researchers.",
                    bn: "এই কাজের মাধ্যমে ISWDRI ইসলামী জ্ঞানচর্চার পুনরুজ্জীবনে অবদান রাখতে এবং আত্মবিশ্বাসী, সচেতন ও ভবিষ্যৎমুখী মুসলিম চিন্তাবিদ ও গবেষকের প্রজন্ম গড়ে তুলতে চায়।",
                    ar: "ومن خلال ذلك يطمح المعهد إلى الإسهام في إحياء العلم الإسلامي وإعداد جيل واثق ومطّلع ومستشرف للمستقبل من المفكرين والباحثين المسلمين.",
                  })}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl bg-primary p-8 text-primary-foreground shadow-lg"
            >
              <h3 className="text-lg font-bold">
                {t({
                  en: "Among the key challenges are:",
                  bn: "প্রধান চ্যালেঞ্জসমূহ:",
                  ar: "من أبرز التحديات:",
                })}
              </h3>
              <ul className="mt-5 space-y-3">
                {challenges.map((c, i) => (
                  <li key={c.en} className="flex items-start gap-3 text-sm leading-relaxed text-primary-foreground/85">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                      {i + 1}
                    </span>
                    {t(c)}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-y border-primary/10 bg-primary/5 py-16">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t({ en: "Aims & Objectives", bn: "লক্ষ্য ও উদ্দেশ্য", ar: "الأهداف والغايات" })}
            description={t({
              en: "The concrete commitments that guide our academic programme.",
              bn: "আমাদের একাডেমিক কর্মসূচিকে পরিচালিত করে যেসব সুনির্দিষ্ট অঙ্গীকার।",
              ar: "الالتزامات العملية التي توجه برنامجنا الأكاديمي.",
            })}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {aims.map((aim, i) => (
              <motion.div
                key={aim.en}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex gap-4 rounded-xl border border-primary/10 bg-card p-5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent">
                  {i + 1}
                </span>
                <p className="text-muted-foreground">{t(aim)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <SectionHeading
          title={t({ en: "Core Values", bn: "মূল মূল্যবোধ", ar: "قيمنا الأساسية" })}
          description={t({
            en: "The principles that govern how we research, publish and serve.",
            bn: "গবেষণা, প্রকাশনা ও সেবার ক্ষেত্রে আমাদের পরিচালিত নীতিমালা।",
            ar: "المبادئ التي تحكم بحثنا ونشرنا وخدمتنا.",
          })}
        />
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
          {values.map((v, i) => (
            <motion.div
              key={v.title.en}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group rounded-2xl border border-primary/10 bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-accent/15 group-hover:text-accent">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-bold text-primary">{t(v.title)}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{t(v.text)}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
