import { createFileRoute } from "@tanstack/react-router";
import { DonationForm } from "@/components/home/DonationForm";
import { PaymentDetails } from "@/components/shared/PaymentDetails";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/_public/donate")({
  head: () => ({
    meta: [
      { title: "Donate — Imam Shah Waliullah Dehlawi Research Institute" },
      { name: "description", content: "Support our mission and research initiatives. Your contributions help us continue our scholarly work." },
      { property: "og:title", content: "Support the Institute — Donate Now" },
      { property: "og:description", content: "Help us preserve Islamic heritage and advance scholarly research." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DonatePage,
});

function DonatePage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-cream/30 py-12 px-4 md:py-20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-display">
            {t({ en: "Invest in Knowledge", bn: "জ্ঞানে বিনিয়োগ করুন", ar: "استثمر في العلم" })}
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t({
              en: "Your generous contributions enable the Imam Shah Waliullah Dehlawi Research Institute to publish critical research, host academic conferences, and maintain our digital archives.",
              bn: "আপনার উদার অনুদান ইমাম শাহ ওয়ালিউল্লাহ দেহলভী (রহ.) রিসার্চ ইনস্টিটিউটকে গুরুত্বপূর্ণ গবেষণা প্রকাশ করতে, একাডেমিক সম্মেলনের আয়োজন করতে এবং আমাদের ডিজিটাল আর্কাইভ সংরক্ষণ করতে সক্ষম করে।",
              ar: "تُمكّن تبرعاتكم السخية معهد الإمام شاه ولي الله الدهلوي رحمه الله للبحوث من نشر أبحاث نقدية، وعقد مؤتمرات أكاديمية، والحفاظ على أرشيفنا الرقمي.",
            })}
          </p>
        </div>

        <DonationForm />

        <PaymentDetails />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-emerald-50">
            <h3 className="font-bold text-emerald-800 mb-2">{t({ en: "Transparency", bn: "স্বচ্ছতা", ar: "الشفافية" })}</h3>
            <p className="text-sm text-muted-foreground">{t({ en: "Every taka is accounted for and dedicated specifically to scholarly advancement.", bn: "প্রতিটি টাকার হিসাব রাখা হয় এবং তা বিশেষভাবে জ্ঞানচর্চার উন্নয়নে ব্যয় করা হয়।", ar: "يُحاسَب على كل تاكا وتُخصَّص تحديداً لتطوير البحث العلمي." })}</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-emerald-50">
            <h3 className="font-bold text-emerald-800 mb-2">{t({ en: "Global Impact", bn: "বৈশ্বিক প্রভাব", ar: "الأثر العالمي" })}</h3>
            <p className="text-sm text-muted-foreground">{t({ en: "Your support reaches researchers and students of knowledge across the Ummah.", bn: "আপনার সহায়তা সমগ্র উম্মাহর গবেষক ও জ্ঞানপিপাসু ছাত্রদের কাছে পৌঁছায়।", ar: "دعمكم يصل إلى الباحثين وطلاب العلم في جميع أنحاء الأمة." })}</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-emerald-50">
            <h3 className="font-bold text-emerald-800 mb-2">{t({ en: "Legacy", bn: "উত্তরাধিকার", ar: "الإرث" })}</h3>
            <p className="text-sm text-muted-foreground">{t({ en: "Continue the intellectual legacy of Imam Shah Waliullah through your support.", bn: "আপনার সহায়তার মাধ্যমে ইমাম শাহ ওয়ালিউল্লাহ (রহ.)-এর বুদ্ধিবৃত্তিক ঐতিহ্য অব্যাহত রাখুন।", ar: "واصل الإرث الفكري للإمام شاه ولي الله من خلال دعمكم." })}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
