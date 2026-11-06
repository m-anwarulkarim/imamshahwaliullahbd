import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
// logoAsset import removed to use local public path directly for better production reliability
import { Mail, MapPin, Phone, Facebook, Youtube, Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage, type LocalizedText } from "@/lib/i18n";
import { subscribeToNewsletter } from "@/lib/community";

const resourceLinks: { to: string; label: LocalizedText }[] = [
  { to: "/research", label: { en: "Research Projects", bn: "গবেষণা প্রকল্প", ar: "المشاريع البحثية" } },
  { to: "/shah-waliullah-portal", label: { en: "Shah Waliullah Portal", bn: "শাহ ওয়ালিউল্লাহ পোর্টাল", ar: "بوابة شاه ولي الله" } },
  { to: "/publications", label: { en: "Latest Publications", bn: "সর্বশেষ প্রকাশনা", ar: "أحدث الإصدارات" } },
  { to: "/digital-library", label: { en: "Digital Archive", bn: "ডিজিটাল আর্কাইভ", ar: "الأرشيف الرقمي" } },
  { to: "/training", label: { en: "Certificate Courses", bn: "সার্টিফিকেট কোর্স", ar: "الدورات المعتمدة" } },
];

const departmentLinks: LocalizedText[] = [
  { en: "Qur'anic Studies", bn: "কুরআনিক স্টাডিজ", ar: "الدراسات القرآنية" },
  { en: "Hadith & Sunnah", bn: "হাদীস ও সুন্নাহ", ar: "الحديث والسنة" },
  { en: "Fiqh & Islamic Law", bn: "ফিকহ ও ইসলামী আইন", ar: "الفقه والشريعة" },
  { en: "Dawah & Research", bn: "দাওয়াহ ও গবেষণা", ar: "الدعوة والبحث" },
  { en: "Islamic Economics & Finance", bn: "ইসলামী অর্থনীতি ও ফিন্যান্স", ar: "الاقتصاد والتمويل الإسلامي" },
];

const bottomLinks: { to: string; label: LocalizedText }[] = [
  { to: "/faq", label: { en: "FAQ", bn: "প্রশ্নোত্তর", ar: "الأسئلة الشائعة" } },
  { to: "/contact", label: { en: "Privacy Policy", bn: "গোপনীয়তা নীতি", ar: "سياسة الخصوصية" } },
  { to: "/contact", label: { en: "Terms of Use", bn: "ব্যবহারের শর্তাবলি", ar: "شروط الاستخدام" } },
];

export function Footer() {
  const { t } = useLanguage();
  const subscribeFn = useServerFn(subscribeToNewsletter);
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      const result = await subscribeFn({ data: { email } });
      if (result.alreadySubscribed) {
        toast.info(t({ en: "You are already subscribed!", bn: "আপনি ইতিমধ্যে সাবস্ক্রাইব করেছেন!", ar: "أنت مشترك بالفعل!" }));
      } else {
        toast.success(t({ en: "Subscribed successfully!", bn: "সফলভাবে সাবস্ক্রাইব হয়েছে!", ar: "تم الاشتراك بنجاح!" }));
        setEmail("");
      }
    } catch {
      toast.error(t({ en: "Failed to subscribe. Please try again.", bn: "সাবস্ক্রাইব করা যায়নি। আবার চেষ্টা করুন।", ar: "فشل الاشتراك. يرجى المحاولة مرة أخرى." }));
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <footer className="relative bg-primary text-white overflow-hidden border-t border-accent/20">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Identity Column */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-3 w-fit transition-transform hover:scale-[1.02]">
              <div className="rounded-full bg-background p-1 shadow-lg ring-2 ring-accent/60">
                <img src="/logo.webp" alt="ISWDRI Logo" className="h-14 w-14 rounded-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white leading-none">ISWDRI</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent mt-1">
                  {t({ en: "Research Institute", bn: "গবেষণা প্রতিষ্ঠান", ar: "معهد البحوث" })}
                </span>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              {t({
                en: "Dedicated to advancing the scholarly research and intellectual legacy of Imam Shah Waliullah Dehlawi for the contemporary world.",
                bn: "ইমাম শাহ ওয়ালিউল্লাহ দেহলভী রহ.-এর জ্ঞানগত উত্তরাধিকার ও গবেষণাকে সমকালীন বিশ্বের সামনে তুলে ধরতে নিবেদিত।",
                ar: "مكرَّس لتعزيز البحث العلمي والإرث الفكري للإمام شاه ولي الله الدهلوي في العالم المعاصر.",
              })}
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, label: "Facebook — ISWDRI", href: "https://www.facebook.com/profile.php?id=61564670171510" },
                { icon: Facebook, label: "Facebook — Page 2", href: "https://www.facebook.com/profile.php?id=100068537184732" },
                { icon: Youtube, label: "Youtube", href: "https://www.youtube.com" },
                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com" }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all hover:bg-accent hover:border-accent hover:text-primary group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Core Resources */}
          <div>
            <h3 className="text-lg font-bold text-accent mb-8 relative inline-block">
              {t({ en: "Core Resources", bn: "মূল সম্পদসমূহ", ar: "الموارد الأساسية" })}
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-accent rounded-full" />
            </h3>
            <ul className="flex flex-col gap-4">
              {resourceLinks.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-white/70 text-sm font-medium hover:text-accent flex items-center gap-2 group transition-colors"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic Departments */}
          <div>
            <h3 className="text-lg font-bold text-accent mb-8 relative inline-block">
              {t({ en: "Departments", bn: "বিভাগসমূহ", ar: "الأقسام" })}
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-accent rounded-full" />
            </h3>
            <ul className="flex flex-col gap-4">
              {departmentLinks.map((label, idx) => (
                <li key={`${label.en}-${idx}`}>
                  <Link 
                    to="/academic" 
                    className="text-white/70 text-sm font-medium hover:text-accent flex items-center gap-2 group transition-colors"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
                    {t(label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-lg font-bold text-accent mb-8 relative inline-block">
                {t({ en: "Stay Connected", bn: "যোগাযোগ রাখুন", ar: "ابقَ على تواصل" })}
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-accent rounded-full" />
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                    <MapPin className="w-4 h-4 text-accent" />
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {t({
                      en: "House-206, Road-11, Block-B, Mirpur-12, Pallabi, Dhaka-1216, Bangladesh",
                      bn: "বাসা-২০৬, রোড-১১, ব্লক-বি, মিরপুর-১২, পল্লবী, ঢাকা-১২১৬, বাংলাদেশ",
                      ar: "منزل ٢٠٦، طريق ١١، بلوك بي، ميربور-١٢، بالابي، دكا-١٢١٦، بنغلاديش",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                    <Phone className="w-4 h-4 text-accent" />
                  </div>
                  <p className="text-sm text-white/70">01743310744, 01774392665, 01974392665</p>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                    <Mail className="w-4 h-4 text-accent" />
                  </div>
                  <p className="text-sm text-white/70 break-all">maqasidinstitutebd@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">
                {t({ en: "Newsletter", bn: "নিউজলেটার", ar: "النشرة البريدية" })}
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t({ en: "Your email address", bn: "আপনার ইমেইল ঠিকানা", ar: "بريدك الإلكتروني" })}
                  className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent transition-all placeholder:text-white/30"
                />
                <Button type="submit" size="sm" disabled={isSubmitting} className="bg-accent text-primary hover:bg-accent/90 font-bold">
                  {isSubmitting ? "..." : t({ en: "Join", bn: "যুক্ত হোন", ar: "اشترك" })}
                </Button>
              </form>

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-[10px] sm:text-xs font-medium text-center md:text-left">
            © {currentYear}{" "}
            {t({
              en: "Imam Shah Waliullah Dehlawi Research Institute. All intellectual property rights reserved.",
              bn: "ইমাম শাহ ওয়ালিউল্লাহ দেহলভী রিসার্চ ইনস্টিটিউট। সর্বস্বত্ব সংরক্ষিত।",
              ar: "معهد الإمام شاه ولي الله الدهلوي للدراسات والبحوث. جميع الحقوق محفوظة.",
            })}
          </p>
          <div className="flex items-center gap-8">
            {bottomLinks.map((link) => (
              <Link 
                key={link.label.en} 
                to={link.to} 
                className="text-white/40 text-[10px] sm:text-xs font-medium hover:text-accent transition-colors"
              >
                {t(link.label)}
              </Link>
            ))}
          </div>
          <a
            href="https://wa.me/8801602867954?text=Hello%20Anwarul%20Karim%2C%20I'd%20like%20to%20discuss%20developing%20a%20website.%20Can%20you%20help%20me%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="dev-credit text-[11px] sm:text-sm font-semibold tracking-wide"
          >
            {t({ en: "Developed by Anwarul Karim", bn: "ডেভেলপ করেছেন আনোয়ারুল করিম", ar: "تطوير: أنوار الكريم" })}
          </a>
        </div>
      </div>
    </footer>
  );
}
