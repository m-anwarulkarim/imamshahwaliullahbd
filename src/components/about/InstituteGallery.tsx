import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { SectionHeading } from "@/components/layout/PageHero";
const entranceAsset = { url: "/gallery/institute-entrance.webp" };
const frontAsset = { url: "/gallery/institute-front.webp" };
const officeAsset = { url: "/gallery/institute-office.webp" };
const workspaceAsset = { url: "/gallery/library-workspace.webp" };
const receptionAsset = { url: "/gallery/library-reception.webp" };
const hallAsset = { url: "/gallery/library-hall.webp" };

export function InstituteGallery() {
  const { t } = useLanguage();

  const photos = [
    {
      src: entranceAsset.url,
      alt: "Institute entrance and signboard",
      label: t({ en: "Institute Entrance", bn: "ইনস্টিটিউটের প্রবেশপথ", ar: "مدخل المعهد" }),
    },
    {
      src: frontAsset.url,
      alt: "Institute front view with program banners",
      label: t({ en: "Front View", bn: "সামনের অংশ", ar: "الواجهة الأمامية" }),
    },
    {
      src: officeAsset.url,
      alt: "Institute office frontage",
      label: t({ en: "Office Frontage", bn: "অফিস প্রাঙ্গণ", ar: "واجهة المكتب" }),
    },
    {
      src: workspaceAsset.url,
      alt: "Research workspace and library inside the institute",
      label: t({ en: "Research Workspace", bn: "গবেষণা কর্মপরিবেশ", ar: "مساحة البحث" }),
    },
    {
      src: receptionAsset.url,
      alt: "Library and reception desk",
      label: t({ en: "Library & Reception", bn: "লাইব্রেরি ও রিসেপশন", ar: "المكتبة والاستقبال" }),
    },
    {
      src: hallAsset.url,
      alt: "Reading hall and book collection",
      label: t({ en: "Reading Hall", bn: "পাঠকক্ষ", ar: "قاعة المطالعة" }),
    },
  ];

  return (
    <section className="container mx-auto px-6 pb-16">
      <SectionHeading
        title={t({ en: "Our Campus Today", bn: "আমাদের বর্তমান প্রাঙ্গণ", ar: "مقر المعهد اليوم" })}
        description={t({
          en: "A glimpse of the institute's present home — its entrance, study spaces and growing library.",
          bn: "ইনস্টিটিউটের বর্তমান কার্যক্রম পরিচালিত হচ্ছে এই প্রাঙ্গণ থেকে — প্রবেশপথ, অধ্যায়ন কক্ষ ও ক্রমবর্ধমান লাইব্রেরির এক ঝলক।",
          ar: "لمحة عن مقر المعهد الحالي — مدخله وقاعات الدراسة ومكتبته المتنامية.",
        })}
      />
      <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
        {photos.map((photo, i) => (
          <motion.figure
            key={photo.src}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-primary/10 bg-card shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-primary/10"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={photo.src}
                alt={photo.alt}
                width={1200}
                height={900}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <figcaption className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-primary">
              <Building2 className="h-4 w-4 shrink-0 text-accent" />
              {photo.label}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
