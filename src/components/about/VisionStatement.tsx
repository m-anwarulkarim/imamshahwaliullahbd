import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

export function VisionStatement() {
  const { t, lang } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23065534' stroke-width='1'%3E%3Cpath d='M30 0l30 30-30 30L0 30z'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-accent/50" />
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
              {t({ en: "Our Vision", bn: "আমাদের লক্ষ্য", ar: "رؤيتنا" })}
            </h2>
            <span className="h-px w-10 bg-accent/50" />
          </div>

          <blockquote className="relative">
            <span
              className="absolute -top-6 left-0 select-none font-serif text-6xl leading-none text-accent/25"
              aria-hidden
            >
              {lang === "ar" ? "❝" : "\u201C"}
            </span>
            <p className="text-balance font-serif text-lg leading-relaxed text-foreground/90 md:text-2xl md:leading-relaxed">
              {t({
                en: "To cultivate a community of scholars and intellectual leadership capable of confronting present and future skepticism, atheism, materialism, and other challenging philosophies — presenting the knowledge and vision of the Qur'an clearly through contemporary language and reasoning, and playing an effective role in establishing the Qur'an's relevance as a living truth and guide for human life.",
                bn: "এমন একদল আলেম ও বুদ্ধিবৃত্তিক নেতৃত্ব গড়ে তোলা, যারা বর্তমান ও ভবিষ্যতের সংশয়বাদ, নাস্তিক্যবাদ, বস্তুবাদ ও অন্যান্য চ্যালেঞ্জিং দর্শনের মোকাবিলায় কুরআনের জ্ঞান ও দৃষ্টিভঙ্গিকে সমকালীন ভাষা ও যুক্তির মাধ্যমে সুস্পষ্টভাবে উপস্থাপন করতে সক্ষম হবেন এবং মানবজীবনের পথনির্দেশক ও জীবন্ত সত্য হিসেবে কুরআনের প্রাসঙ্গিকতা প্রতিষ্ঠায় কার্যকর ভূমিকা রাখবেন।",
                ar: "بناء نخبة من العلماء والقيادة الفكرية القادرة على مواجهة الشك والإلحاد والمادية وغيرها من الفلسفات التحديّة في الحاضر والمستقبل، وتقديم معرفة القرآن ورؤيته بوضوح عبر لغة العصر ومنطقه، والإسهام بفعالية في إثبات صلاحية القرآن كحقيقة حية وهادفة لحياة الإنسان.",
              })}
            </p>
            <span
              className="absolute -bottom-10 right-0 select-none font-serif text-6xl leading-none text-accent/25"
              aria-hidden
            >
              {lang === "ar" ? "❞" : "\u201D"}
            </span>
          </blockquote>

          <div className="mx-auto mt-10 h-1 w-16 rounded-full bg-gradient-to-r from-primary via-accent to-primary" />
        </motion.div>
      </div>
    </section>
  );
}
