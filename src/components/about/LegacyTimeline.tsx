import { motion } from "framer-motion";
import { Book, GraduationCap, Globe, Heart, Star, ScrollText } from "lucide-react";
import { useLanguage, type LocalizedText } from "@/lib/i18n";

type Milestone = { year: string; title: LocalizedText; description: LocalizedText; icon: typeof Star };

const milestones: Milestone[] = [
  {
    year: "1703",
    title: { en: "Birth in Delhi", bn: "দিল্লিতে জন্ম", ar: "المولد في دلهي" },
    description: {
      en: "Born in Phulat, North Delhi, to Shah Abdur Rahim, a renowned scholar and Sufi.",
      bn: "উত্তর দিল্লির ফুলাতে বিখ্যাত আলেম ও সুফি শাহ আব্দুর রহীম রহ.-এর ঘরে জন্মগ্রহণ।",
      ar: "وُلد في فلت شمال دلهي لوالده شاه عبد الرحيم، العالم والصوفي المعروف.",
    },
    icon: Star,
  },
  {
    year: "1719",
    title: { en: "Scholarly Leadership", bn: "শিক্ষকতার নেতৃত্ব", ar: "قيادة علمية" },
    description: {
      en: "Succeeds his father at Madrasah-i-Rahimiyah at the age of 17, beginning his teaching career.",
      bn: "মাত্র ১৭ বছর বয়সে মাদরাসায়ে রহীমিয়ায় পিতার স্থলাভিষিক্ত হয়ে শিক্ষকতা শুরু।",
      ar: "خلف والده في المدرسة الرحيمية في السابعة عشرة، فبدأ مسيرته في التدريس.",
    },
    icon: GraduationCap,
  },
  {
    year: "1730-1732",
    title: { en: "Hajj & Study in Medina", bn: "হজ ও মদীনায় অধ্যয়ন", ar: "الحج والدراسة في المدينة" },
    description: {
      en: "Performed Hajj and studied Hadith under Sheikh Abu Tahir Muhammad bin Ibrahim al-Kurani in Medina.",
      bn: "হজ আদায় করেন এবং মদীনায় শায়খ আবু তাহির মুহাম্মদ ইবনে ইবরাহীম আল-কুরানীর কাছে হাদীস অধ্যয়ন করেন।",
      ar: "أدى الحج ودرس الحديث على الشيخ أبي طاهر محمد بن إبراهيم الكوراني في المدينة.",
    },
    icon: Globe,
  },
  {
    year: "1738",
    title: { en: "Hujjat Allah al-Baligha", bn: "হুজ্জাতুল্লাহিল বালিগাহ", ar: "حجة الله البالغة" },
    description: {
      en: "Completion of his magnum opus, integrating theology, law, and sociology into a unified Islamic vision.",
      bn: "আকীদা, ফিকহ ও সমাজচিন্তাকে একীভূত করে রচিত তাঁর শ্রেষ্ঠ গ্রন্থের সমাপ্তি।",
      ar: "إتمام كتابه الأعظم الذي جمع العقيدة والفقه وعلم الاجتماع في رؤية إسلامية متكاملة.",
    },
    icon: Book,
  },
  {
    year: "1743",
    title: { en: "Quranic Translation", bn: "কুরআনের অনুবাদ", ar: "ترجمة القرآن" },
    description: {
      en: "Completed 'Fath al-Rahman', one of the first Persian translations of the Qur'an to make it accessible.",
      bn: "'ফাতহুর রহমান' সম্পন্ন করেন—কুরআনের অন্যতম প্রথম ফারসি অনুবাদ, যা সাধারণের জন্য কুরআনকে সহজলভ্য করে।",
      ar: "أتم «فتح الرحمن»، من أوائل ترجمات القرآن إلى الفارسية تيسيرًا لفهمه.",
    },
    icon: ScrollText,
  },
  {
    year: "1762",
    title: { en: "Intellectual Legacy", bn: "জ্ঞানগত উত্তরাধিকার", ar: "الإرث الفكري" },
    description: {
      en: "Passed away in Delhi, leaving behind a profound reformist legacy that continues to inspire modern Islamic thought.",
      bn: "দিল্লিতে ইন্তেকাল করেন, রেখে যান গভীর সংস্কারধর্মী উত্তরাধিকার যা আজও ইসলামী চিন্তাকে অনুপ্রাণিত করে।",
      ar: "توفي في دلهي مخلفًا إرثًا إصلاحيًا عميقًا لا يزال يلهم الفكر الإسلامي المعاصر.",
    },
    icon: Heart,
  },
];

export function LegacyTimeline() {
  const { t } = useLanguage();
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-white/95 backdrop-blur-[2px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {t({ en: "Intellectual Legacy", bn: "জ্ঞানগত উত্তরাধিকার", ar: "الإرث الفكري" })}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t({
              en: "A journey through the life and contributions of Imam Shah Waliullah Dehlawi (1703–1762).",
              bn: "ইমাম শাহ ওয়ালিউল্লাহ দেহলভী রহ. (১৭০৩–১৭৬২)-এর জীবন ও অবদানের পথপরিক্রমা।",
              ar: "رحلة في حياة الإمام شاه ولي الله الدهلوي (١٧٠٣–١٧٦٢) وإسهاماته.",
            })}
          </p>
        </div>

        {/* Desktop Horizontal Scroll */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-primary/10 -translate-y-1/2 z-0" />
            
            <div className="flex justify-between relative z-10 gap-8">
              {milestones.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="flex flex-col items-center max-w-[250px]"
                >
                  {index % 2 === 0 ? (
                    <>
                      <TimelineCard item={item} />
                      <div className="h-12 w-1 bg-accent my-4" />
                      <div className="w-6 h-6 rounded-full bg-primary border-4 border-accent flex-shrink-0" />
                      <div className="mt-4 text-2xl font-bold text-primary">{item.year}</div>
                    </>
                  ) : (
                    <>
                      <div className="mb-4 text-2xl font-bold text-primary">{item.year}</div>
                      <div className="w-6 h-6 rounded-full bg-primary border-4 border-accent flex-shrink-0" />
                      <div className="h-12 w-1 bg-accent my-4" />
                      <TimelineCard item={item} />
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Vertical List */}
        <div className="lg:hidden flex flex-col gap-12 relative">
          <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-primary/10 z-0" />
          
          {milestones.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-6 relative z-10"
            >
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-card border-2 border-primary flex items-center justify-center shadow-lg">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-xl font-bold text-accent mb-1">{item.year}</div>
                <h3 className="text-2xl font-bold text-primary mb-2">{t(item.title)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(item.description)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ item }: { item: Milestone }) {
  const { t } = useLanguage();
  return (
    <div className="bg-card border border-primary/10 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-accent/30 group w-full">
      <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
        <item.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
      </div>
      <h3 className="text-xl font-bold text-primary mb-2">{t(item.title)}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{t(item.description)}</p>
    </div>
  );
}
