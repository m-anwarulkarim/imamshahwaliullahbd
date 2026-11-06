import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  Scroll,
  Gavel,
  MessageSquare,
  Target,
  History,
  Globe,
  Users,
  Award,
  Coins,
  Landmark
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/_public/academic/")({
  head: () => ({
    meta: [
      { property: "og:title", content: "Academic Departments — Imam Shah Waliullah Dehlawi Research Institute" },
      { property: "og:description", content: "Islamic academic departments and scholarly research at the institute." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Academic Departments — Imam Shah Waliullah Dehlawi Research Institute" },
      { name: "description", content: "Explore our specialized academic departments dedicated to Islamic scholarship and research." },
    ],
  }),
  component: AcademicPage,
});

const departments = [
  {
    title: { en: "Department of Qur'anic Studies", bn: "কুরআন গবেষণা বিভাগ", ar: "قسم الدراسات القرآنية" },
    description: { en: "Specialized research into Exegesis (Tafsir), Hermeneutics, and the linguistic miracles of the Holy Qur'an.", bn: "তাফসির, ব্যাখ্যাশাস্ত্র এবং পবিত্র কুরআনের ভাষাগত অলৌকিকত্ব নিয়ে বিশেষায়িত গবেষণা।", ar: "بحث متخصص في التفسير، وعلم التأويل، والإعجاز اللغوي للقرآن الكريم." },
    icon: BookOpen,
    color: "emerald"
  },
  {
    title: { en: "Department of Hadith & Sunnah Studies", bn: "হাদিস ও সুন্নাহ গবেষণা বিভাগ", ar: "قسم دراسات الحديث والسنة" },
    description: { en: "Dedicated to the preservation, authentication, and application of Prophetic traditions in contemporary life.", bn: "নবীজির (সা.) হাদিস সংরক্ষণ, প্রামাণিকতা যাচাই এবং সমসাময়িক জীবনে প্রয়োগে নিবেদিত।", ar: "مخصص لحفظ الأحاديث النبوية وتوثيقها وتطبيقها في الحياة المعاصرة." },
    icon: Scroll,
    color: "gold"
  },
  {
    title: { en: "Department of Fiqh & Islamic Law", bn: "ফিকহ ও ইসলামি আইন বিভাগ", ar: "قسم الفقه والشريعة الإسلامية" },
    description: { en: "Rigorous analysis of classical jurisprudence and its application to modern legal and ethical challenges.", bn: "প্রথাগত ফিকহের কঠোর বিশ্লেষণ এবং আধুনিক আইনি ও নৈতিক চ্যালেঞ্জে এর প্রয়োগ।", ar: "تحليل دقيق للفقه الكلاسيكي وتطبيقه على التحديات القانونية والأخلاقية الحديثة." },
    icon: Gavel,
    color: "emerald"
  },
  {
    title: { en: "Department of Dawah & Research", bn: "দাওয়াহ ও গবেষণা বিভাগ", ar: "قسم الدعوة والبحوث" },
    description: { en: "Developing effective strategies and methodologies for communicating Islamic principles in a globalized world, alongside rigorous research into dawah theory and practice.", bn: "বিশ্বায়িত বিশ্বে ইসলামি নীতিমালা প্রচারের কার্যকর কৌশল ও পদ্ধতি উন্নয়ন, পাশাপাশি দাওয়াহ তত্ত্ব ও প্রয়োগ নিয়ে কঠোর গবেষণা।", ar: "تطوير استراتيجيات ومنهجيات فعالة لتبليغ المبادئ الإسلامية في عالم معولم، إلى جانب بحث دقيق في نظرية الدعوة وتطبيقها." },
    icon: MessageSquare,
    color: "gold"
  },
  {
    title: { en: "Department of Islamic Economics & Finance", bn: "ইসলামি অর্থনীতি ও ফিন্যান্স বিভাগ", ar: "قسم الاقتصاد والتمويل الإسلامي" },
    description: { en: "Researching the principles of Islamic economics, interest-free finance, and the objectives (maqasid) of Shariah in wealth distribution and social justice.", bn: "ইসলামি অর্থনীতির নীতিমালা, সুদমুক্ত ফিন্যান্স এবং সম্পদ বণ্টন ও সামাজিক ন্যায়বিচারে শরিয়াহর মাকাসিদ নিয়ে গবেষণা।", ar: "بحث في مبادئ الاقتصاد الإسلامي والتمويل الخالي من الربا ومقاصد الشريعة في توزيع الثروة والعدالة الاجتماعية." },
    icon: Coins,
    color: "emerald"
  },
  {
    title: { en: "Department of Maqasid Ash-Shari'ah", bn: "মাকাসিদ আশ-শারিয়াহ বিভাগ", ar: "قسم مقاصد الشريعة" },
    description: { en: "Exploring the higher objectives and ethical goals of Islamic Law to ensure justice and human welfare.", bn: "ন্যায়বিচার ও মানবকল্যাণ নিশ্চিত করতে ইসলামি আইনের উচ্চতর উদ্দেশ্য ও নৈতিক লক্ষ্য অন্বেষণ।", ar: "استكشاف الأهداف العليا والغايات الأخلاقية للشريعة الإسلامية لضمان العدالة ورفاهية الإنسان." },
    icon: Target,
    color: "emerald"
  },
  {
    title: { en: "Department of Islamic Thought, History & Civilization", bn: "ইসলামি চিন্তা, ইতিহাস ও সভ্যতা বিভাগ", ar: "قسم الفكر والتاريخ والحضارة الإسلامية" },
    description: { en: "Investigating the intellectual history of the Muslim world and its vast contributions to global civilization.", bn: "মুসলিম বিশ্বের বুদ্ধিবৃত্তিক ইতিহাস এবং বৈশ্বিক সভ্যতায় এর বিশাল অবদান অনুসন্ধান।", ar: "دراسة التاريخ الفكري للعالم الإسلامي ومساهماته الواسعة في الحضارة العالمية." },
    icon: History,
    color: "gold"
  },
  {
    title: { en: "Department of Comparative Religion", bn: "তুলনামূলক ধর্মতত্ত্ব বিভাগ", ar: "قسم الأديان المقارنة" },
    description: { en: "Promoting scholarly dialogue and comparative analysis between Islam and major world religions.", bn: "ইসলাম ও প্রধান বিশ্বধর্মগুলোর মধ্যে পাণ্ডিত্যপূর্ণ সংলাপ ও তুলনামূলক বিশ্লেষণ প্রসারিত করা।", ar: "تعزيز الحوار العلمي والتحليل المقارن بين الإسلام والأديان العالمية الكبرى." },
    icon: Users,
    color: "gold"
  },
  {
    title: { en: "Department of Shah Waliullah Studies", bn: "শাহ ওয়ালিউল্লাহ গবেষণা বিভাগ", ar: "قسم دراسات شاه ولي الله" },
    description: { en: "Specialized research into the life, works, and reformist philosophy of Imam Shah Waliullah Dehlawi.", bn: "ইমাম শাহ ওয়ালিউল্লাহ দেহলভীর জীবন, রচনাবলি ও সংস্কারমূলক দর্শন নিয়ে বিশেষায়িত গবেষণা।", ar: "بحث متخصص في حياة الإمام شاه ولي الله الدهلوي وأعماله وفلسفته الإصلاحية." },
    icon: Award,
    color: "emerald"
  },
];

function AcademicPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop" 
            alt="Library background" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>
        
        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">{t({ en: "Academic Departments", bn: "একাডেমিক বিভাগসমূহ", ar: "الأقسام الأكاديمية" })}</h1>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
              {t({
                en: "Our departments serve as the intellectual foundation of the institute, fostering deep scholarly exploration into the diverse fields of Islamic knowledge and modern intellectual challenges.",
                bn: "আমাদের বিভাগসমূহ প্রতিষ্ঠানের বুদ্ধিবৃত্তিক ভিত্তি হিসেবে কাজ করে, যা ইসলামি জ্ঞানের বিভিন্ন ক্ষেত্র এবং আধুনিক বুদ্ধিবৃত্তিক চ্যালেঞ্জ নিয়ে গভীর পাণ্ডিত্যপূর্ণ অনুসন্ধান পরিচালনা করে।",
                ar: "تُشكّل أقسامنا الأساس الفكري للمؤسسة، وتعزز البحث العلمي المتعمق في مختلف مجالات المعرفة الإسلامية والتحديات الفكرية المعاصرة.",
              })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-16 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.title.en}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl border border-primary/10 bg-card hover:border-accent/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <dept.icon className="w-20 h-20 text-primary" />
              </div>
              
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                dept.color === 'emerald' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
              }`}>
                <dept.icon className="w-6 h-6" />
              </div>
              
              <h2 className="text-xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                {t(dept.title)}
              </h2>
              
              <p className="text-muted-foreground leading-relaxed">
                {t(dept.description)}
              </p>
              
              <div className="mt-8 pt-6 border-t border-primary/5 flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all">
                {t({ en: "Learn more about this department", bn: "এই বিভাগ সম্পর্কে আরও জানুন", ar: "اعرف المزيد عن هذا القسم" })}
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 container mx-auto px-6">
        <div className="bg-primary rounded-3xl p-12 text-center text-primary-foreground relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t({ en: "Interested in Scholarly Collaboration?", bn: "পাণ্ডিত্যপূর্ণ সহযোগিতায় আগ্রহী?", ar: "هل أنت مهتم بالتعاون العلمي؟" })}</h2>
            <p className="max-w-2xl mx-auto mb-10 text-primary-foreground/80 text-lg">
              {t({
                en: "We welcome researchers, scholars, and students to join our academic departments and contribute to the global discourse on Islamic scholarship.",
                bn: "আমরা গবেষক, আলেম ও শিক্ষার্থীদের আমাদের একাডেমিক বিভাগে যোগদান করতে এবং ইসলামি জ্ঞানচর্চার বৈশ্বিক আলোচনায় অবদান রাখতে আমন্ত্রণ জানাই।",
                ar: "نرحب بالباحثين والعلماء والطلاب للانضمام إلى أقسامنا الأكاديمية والمساهمة في الخطاب العالمي حول الدراسات الإسلامية.",
              })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-accent text-accent-foreground font-bold rounded-full hover:bg-accent/90 transition-all shadow-lg">
                {t({ en: "View Research Fellowships", bn: "গবেষণা ফেলোশিপ দেখুন", ar: "عرض الزمالات البحثية" })}
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all">
                {t({ en: "Contact Academic Dean", bn: "একাডেমিক ডিনের সাথে যোগাযোগ করুন", ar: "التواصل مع العميد الأكاديمي" })}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
