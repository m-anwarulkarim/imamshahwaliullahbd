import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Clock } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/layout/PageHero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPublishedEvents } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_public/events/")({
  head: () => seo({
    title: "Programs & Events — Imam Shah Waliullah Dehlawi Research Institute",
    description: "Upcoming and past seminars, conferences, workshops and public lectures.",
    path: "/events",
  }),
  loader: () => getPublishedEvents(),
  component: EventsPage,
});

function formatDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface EventItem {
  title: string | null;
  description?: string | null;
  date: string;
  time: string;
  venue: string | null;
  type: string;
  image: string | null;
  day: number;
  month: string;
}

function EventCard({ event, index }: { event: EventItem; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.06 }}
      className="group overflow-hidden rounded-2xl border border-primary/10 bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title ?? ""}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-primary text-primary-foreground">
            <span className="text-4xl font-bold">{event.day}</span>
            <span className="text-sm uppercase tracking-widest">{event.month}</span>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-foreground backdrop-blur">
          {event.type}
        </span>
        <span className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
          <CalendarDays className="h-3.5 w-3.5" />
          {event.date}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold leading-snug text-primary transition-colors group-hover:text-accent">
          {event.title}
        </h3>
        {event.description && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{event.description}</p>
        )}
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent" />
            {event.time}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent" />
            {event.venue}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function EventsPage() {
  const { t, lang } = useLanguage();
  const events = Route.useLoaderData();
  const today = new Date().toISOString().slice(0, 10);
  const tbaText = t({ en: "To be announced", bn: "শীঘ্রই ঘোষণা করা হবে", ar: "سيُعلن لاحقًا" });
  const eventText = t({ en: "Event", bn: "অনুষ্ঠান", ar: "فعالية" });

  const pick = (bn: string | null | undefined, en: string | null | undefined, ar: string | null | undefined) =>
    lang === "en" && en ? en : lang === "ar" && ar ? ar : bn ?? null;

  const toItem = (e: (typeof events)[number]): EventItem => ({
    title: pick(e.title, e.titleEn, e.titleAr),
    description: pick(e.description, e.descriptionEn, e.descriptionAr),
    date: formatDate(e.eventDate),
    time: e.eventTime ?? tbaText,
    venue: pick(e.location, e.locationEn, e.locationAr),
    type: e.category ?? eventText,
    image: e.imageUrl,
    day: new Date(`${e.eventDate}T00:00:00`).getDate(),
    month: new Date(`${e.eventDate}T00:00:00`).toLocaleString("en-GB", { month: "short" }),
  });

  const upcoming = events.filter((e) => e.eventDate >= today).map(toItem);
  const past = events
    .filter((e) => e.eventDate < today)
    .reverse()
    .map(toItem);

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow={t({ en: "Calendar", bn: "ক্যালেন্ডার", ar: "التقويم" })}
        title={t({ en: "Programs & Events", bn: "কর্মসূচি ও অনুষ্ঠান", ar: "البرامج والفعاليات" })}
        subtitle={t({
          en: "Conferences, seminars, workshops and public lectures hosted by the institute throughout the academic year.",
          bn: "শিক্ষাবর্ষ জুড়ে ইনস্টিটিউট আয়োজিত সম্মেলন, সেমিনার, কর্মশালা ও জনসাধারণের জন্য বক্তৃতা।",
          ar: "المؤتمرات والندوات وورش العمل والمحاضرات العامة التي يستضيفها المعهد على مدار العام الدراسي.",
        })}
      />

      <section className="container mx-auto px-6 pb-20">
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-10">
            <TabsTrigger value="upcoming">
              {t({ en: "Upcoming Events", bn: "আসন্ন অনুষ্ঠান", ar: "الفعاليات القادمة" })} ({upcoming.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              {t({ en: "Past Events", bn: "অতীত অনুষ্ঠান", ar: "الفعاليات السابقة" })} ({past.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <SectionHeading title={t({ en: "Upcoming Events", bn: "আসন্ন অনুষ্ঠান", ar: "الفعاليات القادمة" })} />
            {upcoming.length === 0 ? (
              <p className="text-muted-foreground">
                {t({ en: "No upcoming events are scheduled right now.", bn: "বর্তমানে কোনো আসন্ন অনুষ্ঠান নির্ধারিত নেই।", ar: "لا توجد فعاليات قادمة مقررة حاليًا." })}
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {upcoming.map((e, i) => <EventCard key={`${e.title}-${i}`} event={e} index={i} />)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">
            <SectionHeading title={t({ en: "Past Events", bn: "অতীত অনুষ্ঠান", ar: "الفعاليات السابقة" })} />
            {past.length === 0 ? (
              <p className="text-muted-foreground">
                {t({ en: "No past events recorded yet.", bn: "এখনও কোনো অতীত অনুষ্ঠান নথিভুক্ত করা হয়নি।", ar: "لم تُسجَّل أي فعاليات سابقة بعد." })}
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {past.map((e, i) => <EventCard key={`${e.title}-${i}`} event={e} index={i} />)}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
