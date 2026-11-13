import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { GraduationCap, Monitor, Wrench, Presentation, Users2, Video, Sun } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/layout/PageHero";
import { useLanguage } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_public/training/")({
  head: () => seo({
    title: "Training & Capacity Building — Imam Shah Waliullah Dehlawi Research Institute",
    description: "Certificate courses, online courses, workshops, seminars, conferences, webinars and summer school programmes.",
    path: "/training",
  }),
  component: TrainingPage,
});

const programmes = [
  {
    icon: GraduationCap,
    title: { en: "Certificate Courses", bn: "সনদ কোর্স", ar: "الدورات الشهادية" },
    duration: { en: "3–6 months", bn: "৩–৬ মাস", ar: "٣–٦ أشهر" },
    text: {
      en: "In-person courses in Qur'anic sciences, Hadith methodology, Usul al-Fiqh and Waliullahi thought, ending with a graded research paper.",
      bn: "কুরআনিক বিজ্ঞান, হাদিস পদ্ধতিবিজ্ঞান, উসূলুল ফিকহ ও ওয়ালীউল্লাহি চিন্তাধারায় সরাসরি উপস্থিত কোর্স, যা মূল্যায়িত একটি গবেষণাপত্র দিয়ে সমাপ্ত হয়।",
      ar: "دورات حضورية في علوم القرآن، ومنهجية الحديث، وأصول الفقه، والفكر الولي‌اللهي، تختتم ببحث علمي يُقيَّم.",
    },
  },
  {
    icon: Monitor,
    title: { en: "Online Courses", bn: "অনলাইন কোর্স", ar: "الدورات عبر الإنترنت" },
    duration: { en: "6–12 weeks", bn: "৬–১২ সপ্তাহ", ar: "٦–١٢ أسبوعًا" },
    text: {
      en: "Live and recorded modules in Bangla and English, accessible worldwide with downloadable readings.",
      bn: "বাংলা ও ইংরেজিতে লাইভ ও রেকর্ডকৃত মডিউল, ডাউনলোডযোগ্য পাঠ্যসামগ্রীসহ বিশ্বব্যাপী প্রবেশযোগ্য।",
      ar: "وحدات مباشرة ومسجَّلة باللغتين البنغالية والإنجليزية، يمكن الوصول إليها في جميع أنحاء العالم مع قراءات قابلة للتنزيل.",
    },
  },
  {
    icon: Wrench,
    title: { en: "Workshops", bn: "কর্মশালা", ar: "ورش العمل" },
    duration: { en: "1–3 days", bn: "১–৩ দিন", ar: "١–٣ أيام" },
    text: {
      en: "Hands-on training in manuscript editing, academic writing, citation standards and research methodology.",
      bn: "পাণ্ডুলিপি সম্পাদনা, একাডেমিক লেখা, উদ্ধৃতি মান ও গবেষণা পদ্ধতিবিজ্ঞানে হাতে-কলমে প্রশিক্ষণ।",
      ar: "تدريب عملي على تحقيق المخطوطات، والكتابة الأكاديمية، ومعايير التوثيق، ومنهجية البحث.",
    },
  },
  {
    icon: Presentation,
    title: { en: "Seminars", bn: "সেমিনার", ar: "الندوات" },
    duration: { en: "Monthly", bn: "মাসিক", ar: "شهريًا" },
    text: {
      en: "Departmental seminars where fellows present work-in-progress to peers and senior scholars.",
      bn: "বিভাগীয় সেমিনার যেখানে ফেলোগণ সহকর্মী ও প্রবীণ পণ্ডিতদের কাছে চলমান কাজ উপস্থাপন করেন।",
      ar: "ندوات قسمية يقدّم فيها الزملاء أعمالهم قيد الإنجاز أمام أقرانهم وكبار العلماء.",
    },
  },
  {
    icon: Users2,
    title: { en: "Conferences", bn: "সম্মেলন", ar: "المؤتمرات" },
    duration: { en: "Annual", bn: "বার্ষিক", ar: "سنويًا" },
    text: {
      en: "The institute's flagship conference on Waliullahi studies, with international speakers and published proceedings.",
      bn: "ওয়ালীউল্লাহি গবেষণার উপর ইনস্টিটিউটের প্রধান সম্মেলন, আন্তর্জাতিক বক্তা ও প্রকাশিত কার্যবিবরণীসহ।",
      ar: "المؤتمر الرئيسي للمعهد حول الدراسات الولي‌اللهية، بمشاركة متحدثين دوليين ووقائع منشورة.",
    },
  },
  {
    icon: Video,
    title: { en: "Webinars", bn: "ওয়েবিনার", ar: "الندوات الإلكترونية" },
    duration: { en: "Fortnightly", bn: "পাক্ষিক", ar: "كل أسبوعين" },
    text: {
      en: "Open online sessions on contemporary issues, free to the public with Q&A.",
      bn: "সমকালীন বিষয়ে উন্মুক্ত অনলাইন সেশন, প্রশ্নোত্তরসহ জনসাধারণের জন্য বিনামূল্যে।",
      ar: "جلسات مفتوحة عبر الإنترنت حول القضايا المعاصرة، مجانية للجمهور مع نقاش وأسئلة.",
    },
  },
  {
    icon: Sun,
    title: { en: "Summer School", bn: "গ্রীষ্মকালীন স্কুল", ar: "المدرسة الصيفية" },
    duration: { en: "4 weeks", bn: "৪ সপ্তাহ", ar: "٤ أسابيع" },
    text: {
      en: "An intensive residential programme for advanced students combining classical texts and research training.",
      bn: "উচ্চতর শিক্ষার্থীদের জন্য একটি নিবিড় আবাসিক কর্মসূচি, যা ধ্রুপদী গ্রন্থ ও গবেষণা প্রশিক্ষণকে সমন্বিত করে।",
      ar: "برنامج داخلي مكثف للطلاب المتقدمين يجمع بين النصوص الكلاسيكية والتدريب البحثي.",
    },
  },
];

function TrainingPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow={t({ en: "Capacity Building", bn: "সক্ষমতা বৃদ্ধি", ar: "بناء القدرات" })}
        title={t({ en: "Training & Capacity Building", bn: "প্রশিক্ষণ ও সক্ষমতা বৃদ্ধি", ar: "التدريب وبناء القدرات" })}
        subtitle={t({
          en: "Structured programmes that turn committed students into capable researchers — from short workshops to a full residential summer school.",
          bn: "সুগঠিত কর্মসূচি যা নিবেদিত শিক্ষার্থীদের দক্ষ গবেষকে পরিণত করে — সংক্ষিপ্ত কর্মশালা থেকে শুরু করে সম্পূর্ণ আবাসিক গ্রীষ্মকালীন স্কুল পর্যন্ত।",
          ar: "برامج منظمة تحوّل الطلاب الملتزمين إلى باحثين قادرين — من ورش العمل القصيرة إلى مدرسة صيفية داخلية كاملة.",
        })}
      />

      <section className="container mx-auto px-6 pb-16">
        <SectionHeading title={t({ en: "Our Programmes", bn: "আমাদের কর্মসূচিসমূহ", ar: "برامجنا" })} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programmes.map((p, i) => (
            <motion.div
              key={p.title.en}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group rounded-2xl border border-primary/10 bg-card p-7 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-accent/15 group-hover:text-accent">
                <p.icon className="h-6 w-6" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">{t(p.duration)}</span>
              <h3 className="mt-1 text-lg font-bold text-primary">{t(p.title)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(p.text)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-t border-primary/10 bg-primary/5 py-16">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t({ en: "How to Enrol", bn: "কীভাবে ভর্তি হবেন", ar: "كيفية التسجيل" })}
            description={t({
              en: "Three simple steps to join any of our programmes.",
              bn: "আমাদের যেকোনো কর্মসূচিতে যোগদানের তিনটি সহজ ধাপ।",
              ar: "ثلاث خطوات بسيطة للانضمام إلى أي من برامجنا.",
            })}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: { en: "Choose a Programme", bn: "একটি কর্মসূচি নির্বাচন করুন", ar: "اختر برنامجًا" },
                text: {
                  en: "Review the syllabus, duration and language of instruction.",
                  bn: "পাঠ্যসূচি, মেয়াদ ও শিক্ষার মাধ্যম পর্যালোচনা করুন।",
                  ar: "راجع المنهج والمدة ولغة التدريس.",
                },
              },
              {
                step: "02",
                title: { en: "Submit an Application", bn: "আবেদন জমা দিন", ar: "قدّم طلبًا" },
                text: {
                  en: "Send your academic background and a short statement of purpose.",
                  bn: "আপনার একাডেমিক পটভূমি ও উদ্দেশ্যের সংক্ষিপ্ত বিবরণ পাঠান।",
                  ar: "أرسل خلفيتك الأكاديمية وبيانًا موجزًا بالغرض.",
                },
              },
              {
                step: "03",
                title: { en: "Confirm Your Seat", bn: "আপনার আসন নিশ্চিত করুন", ar: "أكد مقعدك" },
                text: {
                  en: "Receive the admission letter and complete registration.",
                  bn: "ভর্তি পত্র গ্রহণ করুন এবং নিবন্ধন সম্পন্ন করুন।",
                  ar: "استلم خطاب القبول وأكمل التسجيل.",
                },
              },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl border border-primary/10 bg-card p-7">
                <span className="text-3xl font-bold text-accent/40">{s.step}</span>
                <h3 className="mt-3 font-bold text-primary">{t(s.title)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(s.text)}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/contact"
              className="inline-block rounded-full bg-accent px-8 py-4 font-bold text-accent-foreground transition-all hover:bg-accent/90"
            >
              {t({ en: "Enquire About Admission", bn: "ভর্তি সম্পর্কে জিজ্ঞাসা করুন", ar: "استفسر عن القبول" })}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
