import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Building2, ArrowRight } from "lucide-react";
import { useLanguage, type LocalizedText } from "@/lib/i18n";

const partners: LocalizedText[] = [
  { en: "Islamic University, Bangladesh", bn: "ইসলামী বিশ্ববিদ্যালয়, বাংলাদেশ", ar: "الجامعة الإسلامية، بنغلاديش" },
  { en: "Darul Uloom Research Academy", bn: "দারুল উলূম রিসার্চ একাডেমি", ar: "أكاديمية دار العلوم للبحوث" },
  { en: "Institute of Islamic Thought", bn: "ইনস্টিটিউট অব ইসলামিক থট", ar: "معهد الفكر الإسلامي" },
  { en: "Centre for Waliullahi Studies, Delhi", bn: "সেন্টার ফর ওয়ালিউল্লাহি স্টাডিজ, দিল্লি", ar: "مركز الدراسات الولي اللهية، دلهي" },
  { en: "Faculty of Shari'ah, Madinah", bn: "ফ্যাকাল্টি অব শরীআহ, মদীনা", ar: "كلية الشريعة، المدينة المنورة" },
  { en: "Bangla Academy of Islamic Literature", bn: "বাংলা একাডেমি অব ইসলামিক লিটারেচার", ar: "أكاديمية البنغال للأدب الإسلامي" },
];

export function AcademicPartners() {
  const { t } = useLanguage();

  return (
    <section className="border-y border-primary/10 bg-primary/5 py-16">
      <div className="container mx-auto px-6">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-bold text-primary">
              {t({ en: "Academic Partners", bn: "একাডেমিক পার্টনারসমূহ", ar: "الشركاء الأكاديميون" })}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {t({
                en: "Universities, seminaries and research centres collaborating with the institute.",
                bn: "প্রতিষ্ঠানের সঙ্গে সহযোগিতায় যুক্ত বিশ্ববিদ্যালয়, মাদরাসা ও গবেষণাকেন্দ্রসমূহ।",
                ar: "جامعات ومدارس ومراكز بحثية تتعاون مع المعهد.",
              })}
            </p>
          </div>
          <Link
            to="/academic-partners"
            className="group inline-flex items-center gap-2 font-semibold text-primary hover:text-accent"
          >
            {t({ en: "All collaborations", bn: "সব সহযোগিতা", ar: "جميع أوجه التعاون" })}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {partners.map((p, i) => (
            <motion.div
              key={p.en}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex flex-col items-center gap-3 rounded-2xl border border-primary/10 bg-card p-5 text-center transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg"
            >
              <Building2 className="h-6 w-6 text-accent" />
              <p className="text-xs font-semibold leading-snug text-primary">{t(p)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
