import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HeartHandshake, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { payamPrograms } from "@/lib/payam-programs";

type PayamItem = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
};

export function PayamEInsaniyat() {
  const { t } = useLanguage();
  const sliderRef = useRef<HTMLDivElement>(null);
  const items: PayamItem[] = [];

  const scrollSlider = (dir: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-slide]");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 via-background to-background relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, currentColor 0 1px, transparent 1px 24px), repeating-linear-gradient(-45deg, currentColor 0 1px, transparent 1px 24px)",
        }}
      />
      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-5 py-2 mb-5">
            <HeartHandshake className="w-4 h-4 text-accent" />
            <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-accent font-bold">
              {t({ en: "Message of Humanity", bn: "মানবতার বার্তা", ar: "رسالة الإنسانية" })}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-3">
            {t({
              en: "Payam-e-Insaniyat Bangladesh",
              bn: "পয়ামে ইনসানিয়াত বাংলাদেশ",
              ar: "بيام الإنسانية بنغلاديش",
            })}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed italic max-w-2xl mx-auto">
            {t({
              en: "A dawah and humanitarian organization founded by Mufakkir-e-Islam Syed Abul Hasan Ali Nadwi RH",
              bn: "মুফাক্কিরে ইসলাম সাইয়েদ আবুল হাসান আলী নদভী রহ. প্রতিষ্ঠিত দাওয়াতি ও মানবিক সংগঠন",
              ar: "منظمة دعوية وإنسانية أسسها مفكر الإسلام سيد أبو الحسن علي الندوي رحمه الله",
            })}
          </p>
        </motion.div>

        {/* Programs (কর্মসূচি) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-5xl mx-auto mb-14"
        >
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-primary/80 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-accent/50" />
              {t({ en: "Programs", bn: "কর্মসূচি", ar: "البرامج" })}
              <span className="h-px w-8 bg-accent/50" />
            </h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {payamPrograms.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  to="/payam/$program"
                  params={{ program: p.slug }}
                  className="group flex flex-col items-center text-center rounded-2xl border border-primary/10 bg-card p-5 md:p-6 shadow-sm hover:shadow-xl hover:shadow-accent/10 hover:border-accent/40 hover:-translate-y-1 transition-all duration-500 h-full"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-accent/15 group-hover:text-accent transition-colors duration-300">
                    <p.icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base md:text-lg font-bold text-primary">{t(p.title)}</h4>
                  <p className="mt-1 text-xs md:text-sm text-muted-foreground leading-snug">{t(p.tagline)}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[11px] md:text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    {t({ en: "Details", bn: "বিস্তারিত", ar: "التفاصيل" })}
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Image showcase — one-line slider */}
        {items.length > 0 && (
          <div className="relative">
            <div
              ref={sliderRef}
              className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                data-slide
                className="group overflow-hidden rounded-2xl border border-primary/10 bg-card shadow-sm hover:shadow-2xl hover:shadow-accent/10 hover:border-accent/40 transition-all duration-500 shrink-0 snap-start w-[78%] sm:w-[46%] lg:w-[31.5%]"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.image_url || "/programs/institute-office.webp"}
                    alt={item.title}
                    width={1280}
                    height={720}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="text-sm md:text-lg font-bold text-primary leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-1.5 text-[11px] md:text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
              ))}
            </div>
            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => scrollSlider(-1)}
                  aria-label={t({ en: "Previous", bn: "পূর্ববর্তী", ar: "السابق" })}
                  className="absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-card/95 border border-primary/10 text-primary shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollSlider(1)}
                  aria-label={t({ en: "Next", bn: "পরবর্তী", ar: "التالي" })}
                  className="absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-card/95 border border-primary/10 text-primary shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
