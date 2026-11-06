import { motion } from "framer-motion";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  image?: string;
};

export function PageHero({
  title,
  subtitle,
  eyebrow,
  image = "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      <div className="absolute inset-0 z-0">
        <img src={image} alt="" aria-hidden className="h-full w-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>
      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {eyebrow && (
            <span className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {eyebrow}
            </span>
          )}
          <h1 className="text-balance text-4xl font-bold text-primary md:text-6xl">{title}</h1>
          {subtitle && (
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export function SectionHeading({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-primary md:text-3xl">{title}</h2>
      {description && <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>}
      <div className="mt-4 h-1 w-16 rounded-full bg-accent" />
    </div>
  );
}
