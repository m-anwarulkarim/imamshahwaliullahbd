import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CalendarDays, Clock, ChevronLeft, ChevronRight, Loader2, Banknote, MonitorSmartphone, ArrowRight } from "lucide-react";
import { useLanguage, type LocalizedText } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { submitCourseEnrollment } from "@/lib/courses";
import imgUsulAdDawah from "@/assets/courses/usul-ad-dawah.webp";
import imgFarzEAin from "@/assets/courses/farz-e-ain.webp";
import imgMaqasid from "@/assets/courses/maqasid-ash-shariah.webp";
import imgTahafutul from "@/assets/courses/tahafutul-malahidah.webp";
import imgResearchMethodology from "@/assets/courses/islamic-research-methodology.webp";
import imgArabicTahadduth from "@/assets/courses/arabic-tahadduth.webp";
import imgSpokenEnglish from "@/assets/courses/spoken-english.webp";

const COURSE_IMAGES: Record<string, string> = {
  "usul-ad-dawah": imgUsulAdDawah,
  "farz-e-ain": imgFarzEAin,
  "maqasid-ash-shariah": imgMaqasid,
  "tahafutul-malahidah": imgTahafutul,
  "islamic-research-methodology": imgResearchMethodology,
  "arabic-tahadduth": imgArabicTahadduth,
  "spoken-english": imgSpokenEnglish,
};

type Course = { id: string; name: LocalizedText; note: LocalizedText; image: string };

// Add more courses here as they are announced — each becomes a card in the slider.
const COURSES: Course[] = [
  {
    id: "dawah-research",
    name: { en: "Non-residential Dawah & Research Department", bn: "অনাবাসিক দাওয়াহ ও গবেষণা বিভাগ", ar: "قسم الدعوة والبحث (غير الداخلي)" },
    note: { en: "Admission open — one-year dawah programme, online & offline", bn: "ভর্তি চলছে — এক বছর মেয়াদি দাওয়াহ বিভাগ, অনলাইন ও অফলাইন", ar: "التسجيل مفتوح — برنامج دعوي لمدة سنة، حضورياً وعن بُعد" },
    image: "/courses/dawah-research-courses.webp",
  },
];

type DbCourse = {
  id: string;
  slug: string;
  titleEn: string;
  titleBn: string;
  titleAr: string;
  subtitleEn: string | null;
  subtitleBn: string | null;
  subtitleAr: string | null;
  imageUrl: string | null;
  fee: number | null;
  monthlyFee: number | null;
};

export function CoursesSlider({ dbCourses }: { dbCourses?: DbCourse[] }) {
  const { t, lang, dir } = useLanguage();
  const submitEnrollFn = useServerFn(submitCourseEnrollment);
  const trackRef = useRef<HTMLDivElement>(null);
  const shortCourses = dbCourses ?? [];
  const [selected, setSelected] = useState<Course | null>(null);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const delta = (dir === "rtl" ? -1 : 1) * direction * 300;
    track.scrollBy({ left: delta, behavior: "smooth" });
  };

  // Auto-slide: advance one card every 4s, loop back to start; pause on hover/touch.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let hovered = false;
    const onEnter = () => { hovered = true; };
    const onLeave = () => { hovered = false; };
    track.addEventListener("pointerenter", onEnter);
    track.addEventListener("pointerleave", onLeave);
    const id = setInterval(() => {
      if (hovered || document.hidden) return;
      const max = track.scrollWidth - track.clientWidth;
      if (max <= 0) return;
      const atEnd = dir === "rtl" ? track.scrollLeft >= -8 : track.scrollLeft >= max - 8;
      if (atEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: (dir === "rtl" ? -1 : 1) * 300, behavior: "smooth" });
      }
    }, 4000);
    return () => {
      track.removeEventListener("pointerenter", onEnter);
      track.removeEventListener("pointerleave", onLeave);
      clearInterval(id);
    };
  }, [dir, shortCourses?.length]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selected) return;
    const fd = new FormData(event.currentTarget);
    setSubmitting(true);
    try {
      await submitEnrollFn({
        data: {
          full_name: String(fd.get("full_name") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          course: selected.id,
          education: String(fd.get("education") ?? "") || undefined,
          message: [String(fd.get("study_mode") ?? ""), String(fd.get("message") ?? "")].filter(Boolean).join(" | ") || undefined,
        },
      });
      toast.success(t({ en: "Application submitted!", bn: "আবেদন সফলভাবে জমা হয়েছে!", ar: "تم تقديم الطلب بنجاح!" }));
      setSelected(null);
      event.currentTarget.reset();
    } catch {
      toast.error(t({ en: "Failed to submit. Please try again.", bn: "জমা দেওয়া যায়নি। আবার চেষ্টা করুন।", ar: "فشل التقديم. يرجى المحاولة مرة أخرى." }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-primary/[0.03] border-y border-primary/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent mb-2">
              {t({ en: "Admission Open", bn: "ভর্তি চলছে", ar: "التسجيل مفتوح" })}
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-primary">
              {t({
                en: "Courses",
                bn: "কোর্সসমূহ",
                ar: "الدورات",
              })}
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                {t({ en: "Every Friday", bn: "প্রতি শুক্রবার", ar: "كل جمعة" })}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                {t({ en: "8:00 AM", bn: "সকাল ৮টা", ar: "الثامنة صباحاً" })}
              </span>
            </div>
          </div>

          {(shortCourses?.length ?? 0) + COURSES.length > 1 && (
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous"
                onClick={() => scrollBy(-1)}
                className="h-10 w-10 rounded-full border border-primary/20 bg-background text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={() => scrollBy(1)}
                className="h-10 w-10 rounded-full border border-primary/20 bg-background text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-1 px-1 scrollbar-none"
        >
          {COURSES.map((course, index) => (
            <motion.article
              key={course.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="snap-start shrink-0 w-[260px] sm:w-[290px] rounded-2xl border border-primary/10 bg-background overflow-hidden shadow-sm hover:shadow-lg hover:border-accent/40 transition-all flex flex-col group"
            >
              <button
                type="button"
                onClick={() => setZoomImage(course.image)}
                aria-label={t({ en: "View full poster", bn: "পুরো পোস্টার দেখুন", ar: "عرض الملصق كاملاً" })}
                className="relative h-40 overflow-hidden bg-primary/[0.04] w-full cursor-zoom-in"
              >
                <img
                  src={course.image}
                  alt={t(course.name)}
                  width={1032}
                  height={1461}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/10 to-transparent pointer-events-none" />
              </button>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-bold text-base text-primary leading-snug">{t(course.name)}</h3>
                <p className="text-xs text-muted-foreground mt-0.5 mb-3">{t(course.note)}</p>
                <ul className="text-xs text-muted-foreground space-y-0.5 mb-3 list-disc ps-4">
                  {[
                    { en: "Duration: 1 year · 2 days/week · afternoon shift", bn: "মেয়াদ: ১ বছর · সপ্তাহে ২ দিন · বিকাল শিফট", ar: "المدة: سنة · يومان أسبوعياً · فترة مسائية" },
                    { en: "Online classes via Telegram", bn: "অনলাইন ক্লাস: টেলিগ্রাম", ar: "الدروس عبر الإنترنت: تيليجرام" },
                    { en: "Certificate on completion", bn: "কোর্স শেষে সনদ প্রদান", ar: "شهادة عند الإتمام" },
                    { en: "Spoken English & Arabic, writing & research training", bn: "ইংরেজি ও আরবি স্পোকেন, লেখালেখি ও গবেষণা প্রশিক্ষণ", ar: "محادثة إنجليزية وعربية وتدريب على الكتابة والبحث" },
                    { en: "Field dawah training & seminars", bn: "মাঠপর্যায়ে দাওয়াহ প্রশিক্ষণ ও সেমিনার", ar: "تدريب ميداني على الدعوة وندوات" },
                    { en: "Registration: 01774392665 (bKash/Nagad/Rocket)", bn: "রেজিস্ট্রেশন: 01774392665 (বিকাশ/নগদ/রকেট)", ar: "التسجيل: 01774392665" },
                  ].map((line) => <li key={line.en}>{t(line)}</li>)}
                </ul>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs mb-3">
                  <span className="inline-flex items-center gap-1">
                    <Banknote className="h-3.5 w-3.5 text-accent" />
                    <span className="text-muted-foreground">{t({ en: "Admission", bn: "ভর্তি", ar: "التسجيل" })}:</span>
                    <span className="font-bold text-primary">{t({ en: "৳1,000", bn: "১,০০০ টাকা", ar: "١٬٠٠٠" })}</span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Banknote className="h-3.5 w-3.5 text-accent" />
                    <span className="text-muted-foreground">{t({ en: "Monthly", bn: "মাসিক", ar: "شهرياً" })}:</span>
                    <span className="font-bold text-primary">{t({ en: "৳1,000", bn: "১,০০০ টাকা", ar: "١٬٠٠٠" })}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-primary">
                    <MonitorSmartphone className="h-3.5 w-3.5 text-accent" />
                    {t({ en: "Online / Offline", bn: "অনলাইন / অফলাইন", ar: "حضوري / عبر الإنترنت" })}
                  </span>
                </div>
                <Button
                  className="mt-auto w-full rounded-full"
                  onClick={() => setSelected(course)}
                >
                  {t({ en: "Apply Now", bn: "এপ্লাই নাউ", ar: "قدّم الآن" })}
                </Button>
              </div>
            </motion.article>
          ))}

          {shortCourses?.map((c, index) => {
            const title = lang === "bn" ? c.titleBn : lang === "ar" ? c.titleAr : c.titleEn;
            const subtitle =
              (lang === "bn" ? c.subtitleBn : lang === "ar" ? c.subtitleAr : c.subtitleEn) ?? "";
            const image = c.imageUrl || COURSE_IMAGES[c.slug];
            const comingSoon = t({ en: "Coming soon", bn: "শীঘ্রই", ar: "قريبًا" });
            return (
              <motion.article
                key={c.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (COURSES.length + index) * 0.05 }}
                className="snap-start shrink-0 w-[260px] sm:w-[290px] rounded-2xl border border-primary/10 bg-background overflow-hidden shadow-sm hover:shadow-lg hover:border-accent/40 transition-all flex flex-col group"
              >
                {image && (
                  <button
                    type="button"
                    onClick={() => setZoomImage(image)}
                    aria-label={t({ en: "View full image", bn: "পুরো ছবি দেখুন", ar: "عرض الصورة كاملة" })}
                    className="relative h-40 overflow-hidden bg-primary/[0.04] w-full cursor-zoom-in"
                  >
                    <img
                      src={image}
                      alt={title}
                      width={944}
                      height={704}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-primary/10 to-transparent pointer-events-none" />
                    <span className="absolute bottom-2 right-2 rounded-full bg-background/85 px-2 py-0.5 text-[11px] font-bold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </button>
                )}
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-bold text-base text-primary leading-snug">{title}</h3>
                  {subtitle && <p className="mt-0.5 mb-3 text-xs text-muted-foreground line-clamp-2">{subtitle}</p>}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs mb-3">
                    <span className="inline-flex items-center gap-1">
                      <Banknote className="h-3.5 w-3.5 text-accent" />
                      <span className="text-muted-foreground">{t({ en: "Admission", bn: "ভর্তি", ar: "التسجيل" })}:</span>
                      <span className="font-bold text-primary">
                        {c.fee != null ? `৳${Number(c.fee).toLocaleString()}` : comingSoon}
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Banknote className="h-3.5 w-3.5 text-accent" />
                      <span className="text-muted-foreground">{t({ en: "Monthly", bn: "মাসিক", ar: "شهرياً" })}:</span>
                      <span className="font-bold text-primary">
                        {c.monthlyFee != null ? `৳${Number(c.monthlyFee).toLocaleString()}` : comingSoon}
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-primary">
                      <MonitorSmartphone className="h-3.5 w-3.5 text-accent" />
                      {t({ en: "Online / Offline", bn: "অনলাইন / অফলাইন", ar: "حضوري / عبر الإنترنت" })}
                    </span>
                  </div>
                  <Button asChild className="mt-auto w-full rounded-full">
                    <Link to="/short-courses/$slug" params={{ slug: c.slug }}>
                      {t({ en: "Apply Now", bn: "এপ্লাই নাউ", ar: "قدّم الآن" })}
                      <ArrowRight className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
                    </Link>
                  </Button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <Dialog open={zoomImage !== null} onOpenChange={(open) => !open && setZoomImage(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-2 bg-background">
          {zoomImage && (
            <img
              src={zoomImage}
              alt={t({ en: "Admission poster", bn: "ভর্তি পোস্টার", ar: "ملصق التسجيل" })}
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-primary">
              {t({ en: "Course Application", bn: "ভর্তি আবেদন ফরম", ar: "استمارة التسجيل" })}
            </DialogTitle>
            <DialogDescription>{selected ? t(selected.name) : ""}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">{t({ en: "Full Name", bn: "পূর্ণ নাম", ar: "الاسم الكامل" })}</Label>
              <Input id="full_name" name="full_name" required maxLength={120} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">{t({ en: "Email", bn: "ইমেইল", ar: "البريد الإلكتروني" })}</Label>
                <Input id="email" name="email" type="email" required maxLength={255} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t({ en: "Phone", bn: "মোবাইল নম্বর", ar: "رقم الهاتف" })}</Label>
                <Input id="phone" name="phone" required maxLength={30} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="education">
                {t({ en: "Educational Background", bn: "শিক্ষাগত যোগ্যতা", ar: "المؤهل العلمي" })}
              </Label>
              <Input id="education" name="education" maxLength={200} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="study_mode">
                {t({ en: "Preferred class format", bn: "ক্লাসের পছন্দের মাধ্যম", ar: "نظام الدراسة المفضل" })}
              </Label>
              <select
                id="study_mode"
                name="study_mode"
                required
                defaultValue=""
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="" disabled>{t({ en: "Select a format", bn: "মাধ্যম নির্বাচন করুন", ar: "اختر نظام الدراسة" })}</option>
                <option value={t({ en: "Online", bn: "অনলাইন", ar: "عبر الإنترنت" })}>{t({ en: "Online", bn: "অনলাইন", ar: "عبر الإنترنت" })}</option>
                <option value={t({ en: "Offline", bn: "অফলাইন", ar: "حضوري" })}>{t({ en: "Offline", bn: "অফলাইন", ar: "حضوري" })}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">{t({ en: "Message (optional)", bn: "বার্তা (ঐচ্ছিক)", ar: "رسالة (اختياري)" })}</Label>
              <Textarea id="message" name="message" rows={3} maxLength={1000} />
            </div>
            <Button type="submit" className="w-full rounded-full" disabled={submitting}>
              {submitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              {t({ en: "Submit Application", bn: "আবেদন জমা দিন", ar: "إرسال الطلب" })}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
