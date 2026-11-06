import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
const entranceAsset = { url: "/gallery/institute-entrance.webp" };
const frontAsset = { url: "/gallery/institute-front.webp" };
const officeAsset = { url: "/gallery/institute-office.webp" };
const workspaceAsset = { url: "/gallery/library-workspace.webp" };
const receptionAsset = { url: "/gallery/library-reception.webp" };
const hallAsset = { url: "/gallery/library-hall.webp" };

export function InstituteGallerySlider() {
  const { t, dir } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  activeRef.current = active;

  const photos = [
    { src: entranceAsset.url, label: t({ en: "Institute Entrance", bn: "প্রবেশপথ", ar: "مدخل المعهد" }) },
    { src: frontAsset.url, label: t({ en: "Front View", bn: "সামনের অংশ", ar: "الواجهة" }) },
    { src: officeAsset.url, label: t({ en: "Office Frontage", bn: "অফিস প্রাঙ্গণ", ar: "المكتب" }) },
    { src: workspaceAsset.url, label: t({ en: "Research Workspace", bn: "গবেষণা কর্মপরিবেশ", ar: "مساحة البحث" }) },
    { src: receptionAsset.url, label: t({ en: "Library & Reception", bn: "লাইব্রেরি ও রিসেপশন", ar: "المكتبة" }) },
    { src: hallAsset.url, label: t({ en: "Reading Hall", bn: "পাঠকক্ষ", ar: "قاعة المطالعة" }) },
  ];

  const scrollTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = (i + photos.length) % photos.length;
    const slide = track.children[clamped] as HTMLElement | undefined;
    if (!slide) return;
    // Scroll only inside the track — never move the page itself.
    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2,
      behavior: "smooth",
    });
    setActive(clamped);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let visible = false;
    let hovered = false;
    const observer = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? false;
    });
    observer.observe(track);
    const onEnter = () => (hovered = true);
    const onLeave = () => (hovered = false);
    track.addEventListener("pointerenter", onEnter);
    track.addEventListener("pointerleave", onLeave);
    const id = setInterval(() => {
      if (visible && !hovered) scrollTo(activeRef.current + 1);
    }, 5000);
    return () => {
      observer.disconnect();
      track.removeEventListener("pointerenter", onEnter);
      track.removeEventListener("pointerleave", onLeave);
      clearInterval(id);
    };
  }, []);

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  };

  return (
    <section className="overflow-hidden border-y border-primary/10 bg-gradient-to-b from-primary/5 to-background py-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end"
        >
          <div>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-accent">
              {t({ en: "Inside the Institute", bn: "ইনস্টিটিউটের ভেতরে", ar: "داخل المعهد" })}
            </h2>
            <h3 className="text-3xl font-bold text-primary md:text-4xl">
              {t({ en: "Our Campus Today", bn: "আমাদের বর্তমান প্রাঙ্গণ", ar: "مقر المعهد اليوم" })}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              aria-label="Previous photo"
              onClick={() => scrollTo(active - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 text-primary transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next photo"
              onClick={() => scrollTo(active + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 text-primary transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <Link
              to="/about"
              className="group flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-accent"
            >
              {t({ en: "About Us", bn: "আমাদের সম্পর্কে", ar: "من نحن" })}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div
          ref={trackRef}
          onScroll={onScroll}
          dir={dir}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-6"
        >
          {photos.map((photo, i) => (
            <figure
              key={photo.src}
              onClick={() => scrollTo(i)}
              className={`relative w-[78vw] shrink-0 cursor-pointer snap-center overflow-hidden rounded-2xl border border-primary/10 shadow-md transition-all duration-500 sm:w-[46vw] lg:w-[30vw] ${
                i === active ? "scale-100 opacity-100" : "scale-[0.96] opacity-70"
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.label}
                  width={1200}
                  height={900}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 to-transparent px-4 pb-3 pt-10 text-sm font-semibold text-primary-foreground">
                {photo.label}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              aria-label={`Go to photo ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-7 bg-accent" : "w-1.5 bg-primary/25 hover:bg-primary/40"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
