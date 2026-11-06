import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { ArrowRight, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

type EventItem = {
  id: string;
  title: string;
  titleEn: string | null;
  titleAr: string | null;
  description: string | null;
  descriptionEn: string | null;
  descriptionAr: string | null;
  location: string | null;
  locationEn: string | null;
  locationAr: string | null;
  eventDate: string;
  eventTime: string | null;
  category: string | null;
  imageUrl: string | null;
};

const FALLBACK_IMG = "/programs/seminar.jpg";

function titleFor(e: EventItem, lang: string) {
  if (lang === "en" && e.titleEn) return e.titleEn;
  if (lang === "ar" && e.titleAr) return e.titleAr;
  return e.title;
}
function locFor(e: EventItem, lang: string) {
  if (lang === "en" && e.locationEn) return e.locationEn;
  if (lang === "ar" && e.locationAr) return e.locationAr;
  return e.location;
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function ProgramsActivities({ events: eventsProp }: { events?: EventItem[] }) {
  const { t, lang } = useLanguage();
  // Show at most 8 programs on the homepage
  const programs = (eventsProp ?? []).slice(0, 8);

  if (programs.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm uppercase tracking-[0.3em] text-accent font-bold mb-4">
                {t({ en: "Our Initiatives", bn: "আমাদের উদ্যোগ", ar: "مبادراتنا" })}
              </h2>
              <h3 className="text-3xl md:text-5xl font-bold text-primary mb-4">
                {t({ en: "Programs & Activities", bn: "কার্যক্রম ও অনুষ্ঠান", ar: "البرامج والأنشطة" })}
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t({
                  en: "A glimpse of the seminars, conferences, and scholarly gatherings that define our ongoing mission of intellectual revival.",
                  bn: "সেমিনার, কনফারেন্স ও জ্ঞানচর্চামূলক সমাবেশের এক ঝলক, যা আমাদের চলমান বুদ্ধিবৃত্তিক পুনর্জাগরণের মিশনকে সংজ্ঞায়িত করে।",
                  ar: "لمحة عن الندوات والمؤتمرات والملتقيات العلمية التي تجسد رسالتنا المستمرة في النهضة الفكرية.",
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
            <Link to="/events">
              <Button
                variant="outline"
                className="rounded-full px-8 group border-primary/20 hover:border-primary text-primary font-bold"
              >
                {t({ en: "View All Programs", bn: "সব কার্যক্রম দেখুন", ar: "عرض جميع البرامج" })}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {programs.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
              className="group overflow-hidden rounded-2xl border border-primary/10 bg-card shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:border-accent/30 transition-all duration-500 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.imageUrl || FALLBACK_IMG}
                  alt={titleFor(item, lang)}
                  width={800}
                  height={600}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                {item.category && (
                  <span className="absolute top-3 left-3 rounded-full bg-accent px-3 py-1 text-[10px] md:text-xs font-bold uppercase tracking-wide text-accent-foreground shadow">
                    {item.category}
                  </span>
                )}
              </div>
              <div className="p-4 md:p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-[11px] md:text-xs text-muted-foreground mb-2">
                  <CalendarDays className="w-3.5 h-3.5 text-accent" />
                  <span>{formatDate(item.eventDate)}</span>
                </div>
                <h4 className="text-sm md:text-lg font-bold text-primary leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                  {titleFor(item, lang)}
                </h4>
                {locFor(item, lang) && (
                  <p className="mt-1 text-[11px] md:text-xs text-muted-foreground line-clamp-1">
                    {locFor(item, lang)}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
