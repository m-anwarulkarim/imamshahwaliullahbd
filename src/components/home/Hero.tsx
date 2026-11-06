import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function Hero() {
  const { t } = useLanguage();

  const stats = [
    {
      label: t({ en: "Research Projects", bn: "গবেষণা প্রকল্প", ar: "المشاريع البحثية" }),
      value: "25+",
    },
    {
      label: t({ en: "Digital Manuscripts", bn: "ডিজিটাল পাণ্ডুলিপি", ar: "المخطوطات الرقمية" }),
      value: "500+",
    },
    {
      label: t({ en: "Academic Fellows", bn: "একাডেমিক ফেলো", ar: "الزملاء الأكاديميون" }),
      value: "15",
    },
    {
      label: t({ en: "Global Partners", bn: "বৈশ্বিক অংশীদার", ar: "الشركاء الدوليون" }),
      value: "12",
    },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2560" 
          alt="Ancient Library Background" 
          className="h-full w-full object-cover transition-transform duration-[20000ms] scale-105 hover:scale-110"
        />
        {/* Layered Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/80 to-primary/95" style={{ mixBlendMode: 'multiply' }} />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>

      <div className="container relative z-10 mx-auto px-6 py-20">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-4xl">
            {/* Ornament */}
            <div className="mb-8 flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
              <img src="/logo.webp" alt="Institute Logo" className="h-32 w-auto drop-shadow-2xl rounded-full border-2 border-accent/20 object-contain" />
            </div>

            <h1 className="mb-8 text-2xl xs:text-3xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl leading-[1.2] md:leading-[1.1] drop-shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100 uppercase md:normal-case w-fit mx-auto text-balance px-4">
              {t({
                en: "Imam Shah Waliullah",
                bn: "ইমাম শাহ ওয়ালিউল্লাহ",
                ar: "معهد الإمام شاه ولي الله",
              })}{" "}
              <span className="text-accent italic font-serif lowercase md:normal-case">
                {t({ en: "Dehlawi", bn: "দেহলভী", ar: "الدهلوي" })}
              </span>{" "}
              {t({ en: "Research Institute", bn: "গবেষণা ইনস্টিটিউট", ar: "للدراسات والبحوث" })}
            </h1>

            <p className="mx-auto mb-12 max-w-2xl text-lg text-white/90 leading-relaxed md:text-xl font-medium drop-shadow-md animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              {t({
                en: "Advancing the frontiers of Islamic knowledge and preserving the intellectual legacy of the 18th-century reformer for the modern world.",
                bn: "ইসলামি জ্ঞানের সীমানা সম্প্রসারণ এবং অষ্টাদশ শতাব্দীর মহান সংস্কারকের বুদ্ধিবৃত্তিক ঐতিহ্যকে আধুনিক বিশ্বের জন্য সংরক্ষণে নিবেদিত।",
                ar: "الارتقاء بآفاق المعرفة الإسلامية والحفاظ على الإرث الفكري للمصلح الذي عاش في القرن الثامن عشر من أجل العالم المعاصر.",
              })}
            </p>

            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
              <Link to="/research">
                <Button size="lg" className="h-16 rounded-full bg-accent hover:bg-accent/90 px-10 text-lg font-bold text-primary shadow-2xl shadow-accent/20 transition-all hover:scale-105 active:scale-95">
                  <BookOpen className="mr-3 h-6 w-6" />
                  {t({ en: "Explore Research", bn: "গবেষণা দেখুন", ar: "استكشف الأبحاث" })}
                </Button>
              </Link>
              <Link to="/shah-waliullah-portal">
                <Button size="lg" className="h-16 rounded-full border border-white/40 bg-white/20 px-10 text-lg font-bold text-white hover:bg-white/30 transition-all hover:scale-105 active:scale-95 shadow-xl !opacity-100 ring-1 ring-white/30">
                  <GraduationCap className="mr-3 h-6 w-6 text-white !opacity-100" />
                  <span className="text-white !opacity-100">
                    {t({ en: "Scholarly Portal", bn: "স্কলারলি পোর্টাল", ar: "البوابة العلمية" })}
                  </span>
                </Button>
              </Link>
            </div>
            
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-1000 delay-500">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center group">
                  <div className="text-3xl font-bold text-accent transition-transform group-hover:scale-110 duration-500">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-bold mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <div className="h-12 w-[2px] bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
}
