import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Building2, Handshake, Globe2, FileSignature } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/layout/PageHero";
import { useLanguage } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_public/academic-partners")({
  head: () => seo({
    title: "Academic Partners & Collaborations — Imam Shah Waliullah Dehlawi Research Institute",
    description: "Universities, research centres and academic bodies collaborating with the institute on research, publishing and training.",
    path: "/academic-partners",
  }),
  component: PartnersPage,
});

const partners = [
  { name: { en: "Islamic University, Bangladesh", bn: "ইসলামি বিশ্ববিদ্যালয়, বাংলাদেশ", ar: "الجامعة الإسلامية، بنغلاديش" }, type: { en: "University", bn: "বিশ্ববিদ্যালয়", ar: "جامعة" }, scope: { en: "Joint supervision of MPhil and PhD research in Hadith sciences.", bn: "হাদিস শাস্ত্রে এমফিল ও পিএইচডি গবেষণার যৌথ তত্ত্বাবধান।", ar: "الإشراف المشترك على أبحاث الماجستير والدكتوراه في علوم الحديث." } },
  { name: { en: "Darul Uloom Research Academy", bn: "দারুল উলুম গবেষণা একাডেমি", ar: "أكاديمية دار العلوم للبحوث" }, type: { en: "Seminary", bn: "মাদরাসা", ar: "معهد ديني" }, scope: { en: "Manuscript editing and classical text verification.", bn: "পাণ্ডুলিপি সম্পাদনা ও প্রথাগত গ্রন্থ যাচাই।", ar: "تحقيق المخطوطات والتحقق من النصوص الكلاسيكية." } },
  { name: { en: "Institute of Islamic Thought", bn: "ইসলামি চিন্তা গবেষণা ইনস্টিটিউট", ar: "معهد الفكر الإسلامي" }, type: { en: "Research Centre", bn: "গবেষণা কেন্দ্র", ar: "مركز بحثي" }, scope: { en: "Co-publication of Maqasid ash-Shari'ah studies.", bn: "মাকাসিদ আশ-শারিয়াহ গবেষণার যৌথ প্রকাশনা।", ar: "النشر المشترك لدراسات مقاصد الشريعة." } },
  { name: { en: "Centre for Waliullahi Studies, Delhi", bn: "ওয়ালিউল্লাহি গবেষণা কেন্দ্র, দিল্লি", ar: "مركز الدراسات الولي اللهية، دلهي" }, type: { en: "Research Centre", bn: "গবেষণা কেন্দ্র", ar: "مركز بحثي" }, scope: { en: "Shared digital archive of Shah Waliullah manuscripts.", bn: "শাহ ওয়ালিউল্লাহর পাণ্ডুলিপির যৌথ ডিজিটাল আর্কাইভ।", ar: "أرشيف رقمي مشترك لمخطوطات شاه ولي الله." } },
  { name: { en: "Faculty of Shari'ah, Madinah", bn: "শরিয়াহ অনুষদ, মদিনা", ar: "كلية الشريعة، المدينة المنورة" }, type: { en: "University", bn: "বিশ্ববিদ্যালয়", ar: "جامعة" }, scope: { en: "Visiting scholar exchange and seminar series.", bn: "ভিজিটিং স্কলার বিনিময় ও সেমিনার সিরিজ।", ar: "تبادل الأساتذة الزائرين وسلسلة الندوات." } },
  { name: { en: "Bangla Academy of Islamic Literature", bn: "বাংলা ইসলামি সাহিত্য একাডেমি", ar: "الأكاديمية البنغالية للأدب الإسلامي" }, type: { en: "Academy", bn: "একাডেমি", ar: "أكاديمية" }, scope: { en: "Bangla translation of core Waliullahi works.", bn: "মূল ওয়ালিউল্লাহি রচনাবলির বাংলা অনুবাদ।", ar: "ترجمة الأعمال الولي اللهية الأساسية إلى البنغالية." } },
  { name: { en: "Journal of Contemporary Fiqh", bn: "জার্নাল অব কনটেম্পোরারি ফিকহ", ar: "مجلة الفقه المعاصر" }, type: { en: "Journal", bn: "জার্নাল", ar: "مجلة" }, scope: { en: "Peer-review partnership and article exchange.", bn: "পিয়ার-রিভিউ অংশীদারিত্ব ও প্রবন্ধ বিনিময়।", ar: "شراكة المراجعة العلمية وتبادل المقالات." } },
  { name: { en: "Global Interfaith Dialogue Forum", bn: "গ্লোবাল ইন্টারফেইথ ডায়ালগ ফোরাম", ar: "المنتدى العالمي للحوار بين الأديان" }, type: { en: "Forum", bn: "ফোরাম", ar: "منتدى" }, scope: { en: "Comparative religion roundtables and public lectures.", bn: "তুলনামূলক ধর্মতত্ত্ব রাউন্ডটেবিল ও জনবক্তৃতা।", ar: "موائد مستديرة في الأديان المقارنة ومحاضرات عامة." } },
];

const modes = [
  { icon: FileSignature, title: { en: "Memoranda of Understanding", bn: "সমঝোতা স্মারক", ar: "مذكرات التفاهم" }, text: { en: "Formal MoUs covering research supervision, data sharing and joint degrees.", bn: "গবেষণা তত্ত্বাবধান, তথ্য বিনিময় ও যৌথ ডিগ্রি সংক্রান্ত আনুষ্ঠানিক সমঝোতা স্মারক।", ar: "مذكرات تفاهم رسمية تغطي الإشراف البحثي وتبادل البيانات والدرجات المشتركة." } },
  { icon: Handshake, title: { en: "Joint Research Projects", bn: "যৌথ গবেষণা প্রকল্প", ar: "المشاريع البحثية المشتركة" }, text: { en: "Co-funded projects with shared authorship and open-access outputs.", bn: "যৌথ অর্থায়নে পরিচালিত প্রকল্প, যাতে যৌথ লেখকত্ব ও উন্মুক্ত-অ্যাক্সেস ফলাফল রয়েছে।", ar: "مشاريع ممولة بشكل مشترك مع تأليف مشترك ونتائج متاحة للوصول المفتوح." } },
  { icon: Globe2, title: { en: "Scholar Exchange", bn: "শিক্ষাবিদ বিনিময়", ar: "تبادل العلماء" }, text: { en: "Visiting fellowships, guest lectures and cross-institutional seminars.", bn: "ভিজিটিং ফেলোশিপ, অতিথি বক্তৃতা ও আন্তঃপ্রাতিষ্ঠানিক সেমিনার।", ar: "الزمالات الزائرة والمحاضرات الضيفية والندوات بين المؤسسات." } },
  { icon: Building2, title: { en: "Co-Publishing", bn: "যৌথ প্রকাশনা", ar: "النشر المشترك" }, text: { en: "Books, journals and critical editions issued under joint imprint.", bn: "যৌথ প্রকাশনা প্রতিষ্ঠানের অধীনে গ্রন্থ, জার্নাল ও সমালোচনামূলক সংস্করণ প্রকাশ।", ar: "كتب ومجلات وطبعات محققة تصدر تحت اسم نشر مشترك." } },
];

function PartnersPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow={t({ en: "Collaborations", bn: "সহযোগিতা", ar: "التعاون" })}
        title={t({ en: "Academic Partners & Collaborations", bn: "একাডেমিক অংশীদার ও সহযোগিতা", ar: "الشركاء الأكاديميون والتعاون" })}
        subtitle={t({
          en: "Scholarship grows through partnership. We work with universities, seminaries, journals and research centres across Bangladesh and the wider Muslim world.",
          bn: "অংশীদারিত্বের মাধ্যমে জ্ঞানচর্চা বিকশিত হয়। আমরা বাংলাদেশ ও ব্যাপক মুসলিম বিশ্বের বিশ্ববিদ্যালয়, মাদরাসা, জার্নাল ও গবেষণা কেন্দ্রের সাথে কাজ করি।",
          ar: "تنمو العلوم من خلال الشراكة. نعمل مع الجامعات والمعاهد الدينية والمجلات ومراكز البحث في بنغلاديش والعالم الإسلامي الأوسع.",
        })}
      />

      <section className="container mx-auto px-6 pb-16">
        <SectionHeading title={t({ en: "Forms of Collaboration", bn: "সহযোগিতার ধরন", ar: "أشكال التعاون" })} />
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {modes.map((m, i) => (
            <motion.div
              key={m.title.en}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-primary/10 bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg"
            >
              <m.icon className="mb-4 h-6 w-6 text-accent" />
              <h3 className="mb-2 font-bold text-primary">{t(m.title)}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{t(m.text)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-y border-primary/10 bg-primary/5 py-16">
        <div className="container mx-auto px-6">
          <SectionHeading title={t({ en: "Our Partners", bn: "আমাদের অংশীদার", ar: "شركاؤنا" })} description={t({ en: "Institutions currently collaborating with the institute.", bn: "বর্তমানে প্রতিষ্ঠানের সাথে সহযোগিতাকারী প্রতিষ্ঠানসমূহ।", ar: "المؤسسات المتعاونة حاليًا مع المؤسسة." })} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {partners.map((p, i) => (
              <motion.div
                key={p.name.en}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="rounded-2xl border border-primary/10 bg-card p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Building2 className="h-6 w-6" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">{t(p.type)}</span>
                <h3 className="mt-1 font-bold text-primary">{t(p.name)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(p.scope)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="rounded-3xl bg-primary p-10 text-center text-primary-foreground shadow-2xl md:p-14">
          <h2 className="mb-4 text-3xl font-bold">{t({ en: "Partner With Us", bn: "আমাদের সাথে অংশীদার হোন", ar: "شاركنا" })}</h2>
          <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/80">
            {t({
              en: "We welcome proposals for joint research, co-publishing and academic exchange from institutions committed to rigorous Islamic scholarship.",
              bn: "কঠোর ইসলামি জ্ঞানচর্চায় প্রতিশ্রুতিবদ্ধ প্রতিষ্ঠানসমূহ থেকে যৌথ গবেষণা, যৌথ প্রকাশনা ও একাডেমিক বিনিময়ের প্রস্তাব আমরা স্বাগত জানাই।",
              ar: "نرحب بمقترحات البحث المشترك والنشر المشترك والتبادل الأكاديمي من المؤسسات الملتزمة بالدراسات الإسلامية الدقيقة.",
            })}
          </p>
          <Link
            to="/contact"
            className="inline-block rounded-full bg-accent px-8 py-4 font-bold text-accent-foreground transition-all hover:bg-accent/90"
          >
            {t({ en: "Contact the Academic Office", bn: "একাডেমিক অফিসে যোগাযোগ করুন", ar: "التواصل مع المكتب الأكاديمي" })}
          </Link>
        </div>
      </section>
    </div>
  );
}
