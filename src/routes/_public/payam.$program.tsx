import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ListChecks, HeartHandshake } from "lucide-react";
import { getPayamProgram, payamPrograms } from "@/lib/payam-programs";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/_public/payam/$program")({
  beforeLoad: ({ params }) => {
    if (!getPayamProgram(params.program)) throw notFound();
  },
  head: ({ params }) => {
    const p = getPayamProgram(params.program);
    const title = `${p?.title.en ?? "Program"} — Payam-e-Insaniyat Bangladesh`;
    const desc = p?.desc.en ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: PayamProgramPage,
});

function PayamProgramPage() {
  const { program } = Route.useParams();
  const { t } = useLanguage();
  const p = getPayamProgram(program)!;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background">
      {/* Hero */}
      <div className="relative overflow-hidden bg-primary text-primary-foreground">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, currentColor 0 1px, transparent 1px 24px), repeating-linear-gradient(-45deg, currentColor 0 1px, transparent 1px 24px)",
          }}
        />
        <div className="container mx-auto px-6 py-16 md:py-24 relative">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t({ en: "Back to Home", bn: "হোমে ফিরে যান", ar: "العودة إلى الرئيسية" })}
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-start gap-5"
          >
            <div className="flex h-16 w-16 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-2xl bg-accent/20 text-accent">
              <p.icon className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1 mb-3">
                <HeartHandshake className="w-3.5 h-3.5 text-accent" />
                <span className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-accent font-semibold">
                  {t({ en: "Payam-e-Insaniyat Program", bn: "পয়ামে ইনসানিয়াত কর্মসূচি", ar: "برنامج بيام الإنسانية" })}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold">{t(p.title)}</h1>
              <p className="mt-2 text-lg md:text-xl text-primary-foreground/80">{t(p.tagline)}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 md:py-16 max-w-4xl">
        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-base md:text-xl leading-relaxed text-foreground/90 border-l-4 border-accent pl-5 md:pl-7"
        >
          {t(p.intro)}
        </motion.p>

        {/* Objectives */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12"
        >
          <h2 className="text-xl md:text-2xl font-bold text-primary inline-flex items-center gap-3 mb-6">
            <ListChecks className="w-6 h-6 text-accent" />
            {t({ en: "Objectives", bn: "উদ্দেশ্যসমূহ", ar: "الأهداف" })}
          </h2>
          <div className="grid gap-4">
            {p.objectives.map((o, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-2xl border border-primary/10 bg-card p-5 shadow-sm"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent font-bold text-sm">
                  {i + 1}
                </span>
                <p className="text-sm md:text-base leading-relaxed text-foreground/90">{t(o)}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12"
        >
          <h2 className="text-xl md:text-2xl font-bold text-primary inline-flex items-center gap-3 mb-6">
            <CheckCircle2 className="w-6 h-6 text-accent" />
            {t({ en: "Key Activities", bn: "মূল কার্যক্রম", ar: "الأنشطة الرئيسية" })}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {p.activities.map((a, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-card p-5 shadow-sm hover:border-accent/40 hover:shadow-lg transition-all duration-300"
              >
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="text-sm md:text-base leading-relaxed text-foreground/90">{t(a)}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Other programs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <h3 className="text-center text-sm uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-5">
            {t({ en: "Other Programs", bn: "অন্যান্য কর্মসূচি", ar: "برامج أخرى" })}
          </h3>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {payamPrograms
              .filter((x) => x.slug !== p.slug)
              .map((x) => (
                <Link
                  key={x.slug}
                  to="/payam/$program"
                  params={{ program: x.slug }}
                  className="group flex flex-col items-center text-center rounded-2xl border border-primary/10 bg-card p-4 md:p-5 shadow-sm hover:shadow-lg hover:border-accent/40 transition-all duration-300"
                >
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-accent/15 group-hover:text-accent transition-colors">
                    <x.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm md:text-base font-bold text-primary">{t(x.title)}</span>
                  <span className="mt-0.5 text-[11px] md:text-xs text-muted-foreground leading-snug">
                    {t(x.tagline)}
                  </span>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
