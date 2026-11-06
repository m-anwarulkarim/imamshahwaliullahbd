import { motion } from "framer-motion";
import { BookMarked, Scale, History, Microscope, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { useLanguage, type LocalizedText } from "@/lib/i18n";

const highlights: { title: LocalizedText; description: LocalizedText; icon: typeof BookMarked; color: string }[] = [
  {
    title: { en: "Quranic Hermeneutics", bn: "কুরআন ব্যাখ্যাতত্ত্ব", ar: "مناهج تفسير القرآن" },
    description: {
      en: "Advanced research into Imam Shah Waliullah's 'Fath al-Rahman' and his unique principles of translation and interpretation.",
      bn: "ইমাম শাহ ওয়ালিউল্লাহ রহ.-এর 'ফাতহুর রহমান' এবং তাঁর অনন্য অনুবাদ ও ব্যাখ্যানীতির উপর উচ্চতর গবেষণা।",
      ar: "بحث متقدم في «فتح الرحمن» للإمام شاه ولي الله وأصوله المتميزة في الترجمة والتفسير.",
    },
    icon: BookMarked,
    color: "bg-emerald-50",
  },
  {
    title: { en: "Socio-Political Reform", bn: "সমাজ ও রাষ্ট্রচিন্তার সংস্কার", ar: "الإصلاح الاجتماعي والسياسي" },
    description: {
      en: "Analyzing 'Hujjat Allah al-Baligha' to understand the integration of theology, law, and sociology in modern contexts.",
      bn: "আধুনিক প্রেক্ষাপটে আকীদা, ফিকহ ও সমাজবিজ্ঞানের সমন্বয় বোঝার জন্য 'হুজ্জাতুল্লাহিল বালিগাহ'র বিশ্লেষণ।",
      ar: "تحليل «حجة الله البالغة» لفهم تكامل العقيدة والفقه وعلم الاجتماع في السياقات المعاصرة.",
    },
    icon: Scale,
    color: "bg-amber-50",
  },
  {
    title: { en: "Manuscript Digitization", bn: "পাণ্ডুলিপি ডিজিটাইজেশন", ar: "رقمنة المخطوطات" },
    description: {
      en: "A large-scale project dedicated to preserving and digitizing rare 18th-century manuscripts from the Waliullahi tradition.",
      bn: "ওয়ালিউল্লাহি ধারার অষ্টাদশ শতকের দুর্লভ পাণ্ডুলিপি সংরক্ষণ ও ডিজিটাইজ করার একটি বৃহৎ প্রকল্প।",
      ar: "مشروع واسع لحفظ ورقمنة المخطوطات النادرة من القرن الثامن عشر في التراث الولي اللهي.",
    },
    icon: History,
    color: "bg-blue-50",
  },
  {
    title: { en: "Economic Theory", bn: "অর্থনৈতিক তত্ত্ব", ar: "النظرية الاقتصادية" },
    description: {
      en: "Exploring the 'Irtefaqat' (stages of social development) and their relevance to contemporary Islamic economic models.",
      bn: "'ইরতিফাকাত' (সমাজ বিকাশের স্তর) এবং সমকালীন ইসলামী অর্থনৈতিক মডেলে এর প্রাসঙ্গিকতা অনুসন্ধান।",
      ar: "استكشاف «الارتفاقات» (مراحل التطور الاجتماعي) وصلتها بالنماذج الاقتصادية الإسلامية المعاصرة.",
    },
    icon: Microscope,
    color: "bg-purple-50",
  },
];

export function ResearchHighlights() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm uppercase tracking-[0.3em] text-accent font-bold mb-4">
                {t({ en: "Scholarly Excellence", bn: "জ্ঞানগত উৎকর্ষ", ar: "التميز العلمي" })}
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                {t({ en: "Research Highlights", bn: "গবেষণার বিশেষ দিক", ar: "أبرز الأبحاث" })}
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t({
                  en: "Our institute is at the forefront of scholarly exploration, bridging the gap between classical Waliullahi thought and contemporary intellectual challenges.",
                  bn: "আমাদের প্রতিষ্ঠান ধ্রুপদী ওয়ালিউল্লাহি চিন্তাধারা ও সমকালীন বুদ্ধিবৃত্তিক চ্যালেঞ্জের মধ্যে সেতুবন্ধ রচনায় অগ্রণী ভূমিকা পালন করছে।",
                  ar: "يقف معهدنا في طليعة البحث العلمي، مقيمًا جسرًا بين الفكر الولي اللهي الكلاسيكي والتحديات الفكرية المعاصرة.",
                })}
              </p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/research">
              <Button className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 h-14 font-bold group">
                {t({ en: "View Research Hub", bn: "গবেষণা কেন্দ্র দেখুন", ar: "تصفح مركز البحوث" })}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title.en}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-4 md:p-8 rounded-2xl md:rounded-3xl border border-primary/10 bg-white hover:border-accent/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
            >
              <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl ${item.color} flex items-center justify-center mb-4 md:mb-8 group-hover:scale-110 transition-transform duration-500`}>
                <item.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
              <h4 className="text-base md:text-xl font-bold text-primary mb-2 md:mb-4 group-hover:text-accent transition-colors">
                {t(item.title)}
              </h4>
              <p className="text-muted-foreground leading-relaxed text-xs md:text-sm">
                {t(item.description)}
              </p>
              <div className="mt-8 pt-6 border-t border-primary/5 flex items-center text-accent text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                {t({ en: "Learn More", bn: "আরও জানুন", ar: "اعرف المزيد" })}
                <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
