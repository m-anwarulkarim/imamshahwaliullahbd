import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage, type LocalizedText } from "@/lib/i18n";

interface Leader {
  role: LocalizedText;
  name: LocalizedText;
  image: string;
  imageAlt: string;
  excerpt: LocalizedText;
  paragraphs: LocalizedText[];
}

const leaders: Leader[] = [
  {
    role: { en: "CHAIRMAN", bn: "চেয়ারম্যান", ar: "رئيس مجلس الإدارة" },
    name: { en: "Shaykh Muhammad Salman", bn: "শায়খ মুহাম্মাদ সালমান", ar: "الشيخ محمد سلمان" },
    image: "/chairman.webp",
    imageAlt: "Shaykh Muhammad Salman, Chairman",
    excerpt: {
      en: "Our institute is dedicated to bridging the gap between classical Islamic wisdom and the complexities of the modern world.",
      bn: "আমাদের প্রতিষ্ঠান ধ্রুপদী ইসলামি প্রজ্ঞা ও আধুনিক বিশ্বের জটিলতার মধ্যকার ব্যবধান দূর করতে নিবেদিত।",
      ar: "يكرّس معهدنا جهوده لسد الفجوة بين الحكمة الإسلامية الكلاسيكية وتعقيدات العالم الحديث.",
    },
    paragraphs: [
      {
        en: "In the name of Allah, the Most Gracious, the Most Merciful. Our institute is dedicated to bridging the gap between classical Islamic wisdom and the complexities of the modern world. The intellectual legacy of Imam Shah Waliullah Dehlawi provides us with a profound framework for this endeavor.",
        bn: "পরম করুণাময়, অসীম দয়ালু আল্লাহর নামে। আমাদের প্রতিষ্ঠান ধ্রুপদী ইসলামি প্রজ্ঞা ও আধুনিক বিশ্বের জটিলতার মধ্যকার ব্যবধান দূর করতে নিবেদিত। ইমাম শাহ ওয়ালিউল্লাহ দেহলভীর জ্ঞানগত ঐতিহ্য এই প্রচেষ্টার জন্য আমাদের একটি গভীর কাঠামো প্রদান করে।",
        ar: "باسم الله الرحمن الرحيم. يكرّس معهدنا جهوده لسد الفجوة بين الحكمة الإسلامية الكلاسيكية وتعقيدات العالم الحديث. إن الإرث الفكري للإمام شاه ولي الله الدهلوي يمنحنا إطارًا عميقًا لهذا المسعى.",
      },
      {
        en: "Shah Waliullah was not merely a scholar of the past; his methodology of Tatbiq (reconciliation) and his vision of a balanced society remain more relevant today than ever. Our mission is to foster a new generation of researchers who can interpret these timeless principles for our contemporary context.",
        bn: "শাহ ওয়ালিউল্লাহ কেবল অতীতের একজন আলেম ছিলেন না; তাঁর তাতবীক (সমন্বয়সাধন)-এর পদ্ধতি এবং একটি ভারসাম্যপূর্ণ সমাজের প্রতি তাঁর দৃষ্টিভঙ্গি আজ অতীতের যেকোনো সময়ের চেয়ে বেশি প্রাসঙ্গিক। আমাদের লক্ষ্য এমন একটি নতুন প্রজন্মের গবেষক গড়ে তোলা, যারা এই চিরন্তন নীতিগুলোকে আমাদের সমসাময়িক প্রেক্ষাপটে ব্যাখ্যা করতে পারবেন।",
        ar: "لم يكن شاه ولي الله مجرد عالم من الماضي؛ فمنهجه في التطبيق (التوفيق) ورؤيته لمجتمع متوازن لا تزالان أكثر أهمية اليوم من أي وقت مضى. تتمثل مهمتنا في إعداد جيل جديد من الباحثين القادرين على تفسير هذه المبادئ الخالدة في سياقنا المعاصر.",
      },
      {
        en: "I invite you to join us in this journey of knowledge, research, and reform. Together, we can contribute to the intellectual revival of the Ummah.",
        bn: "জ্ঞান, গবেষণা ও সংস্কারের এই যাত্রায় আপনাদের সঙ্গী হওয়ার আমন্ত্রণ জানাই। একসঙ্গে আমরা উম্মাহর জ্ঞানগত পুনর্জাগরণে অবদান রাখতে পারি।",
        ar: "أدعوكم للانضمام إلينا في هذه الرحلة من العلم والبحث والإصلاح. فمعًا نستطيع أن نساهم في النهضة الفكرية للأمة.",
      },
    ],
  },
  {
    role: { en: "EXECUTIVE DIRECTOR", bn: "নির্বাহী পরিচালক", ar: "المدير التنفيذي" },
    name: { en: "Dr. Shahidul Islam Faruqi", bn: "ড. শহীদুল ইসলাম ফারুকী", ar: "الدكتور شهيد الإسلام الفاروقي" },
    image: "/founder.webp",
    imageAlt: "Dr. Shahidul Islam Faruqi, Founder",
    excerpt: {
      en: "This institute was founded with a singular vision: to revive and preserve the rich intellectual heritage of Imam Shah Waliullah Dehlawi (Rah.).",
      bn: "এই প্রতিষ্ঠানটি একটি অনন্য লক্ষ্য নিয়ে প্রতিষ্ঠিত হয়েছিল: ইমাম শাহ ওয়ালিউল্লাহ দেহলভী (রহ.)-এর সমৃদ্ধ জ্ঞানগত ঐতিহ্যকে পুনরুজ্জীবিত ও সংরক্ষণ করা।",
      ar: "تأسس هذا المعهد برؤية فريدة: إحياء وحفظ التراث الفكري الثري للإمام شاه ولي الله الدهلوي رحمه الله.",
    },
    paragraphs: [
      {
        en: "All praise is due to Allah, who has blessed us with the opportunity to serve the cause of knowledge. This institute was founded with a singular vision: to revive and preserve the rich intellectual heritage of Imam Shah Waliullah Dehlawi (Rah.) and present it to the modern world.",
        bn: "সকল প্রশংসা আল্লাহর, যিনি আমাদের জ্ঞানের সেবা করার সুযোগ দিয়ে ধন্য করেছেন। এই প্রতিষ্ঠানটি একটি অনন্য লক্ষ্য নিয়ে প্রতিষ্ঠিত হয়েছিল: ইমাম শাহ ওয়ালিউল্লাহ দেহলভী (রহ.)-এর সমৃদ্ধ জ্ঞানগত ঐতিহ্যকে পুনরুজ্জীবিত ও সংরক্ষণ করে তা আধুনিক বিশ্বের সামনে উপস্থাপন করা।",
        ar: "الحمد لله الذي منّ علينا بفرصة خدمة قضية العلم. تأسس هذا المعهد برؤية فريدة: إحياء وحفظ التراث الفكري الثري للإمام شاه ولي الله الدهلوي رحمه الله وتقديمه للعالم الحديث.",
      },
      {
        en: "From a humble beginning, our journey has been one of dedication, research, and unwavering commitment to authentic scholarship. We believe that the answers to many of today's challenges lie within the balanced, comprehensive methodology of our classical scholars — a methodology Imam Shah Waliullah embodied throughout his life.",
        bn: "একটি বিনম্র সূচনা থেকে আমাদের এই যাত্রা নিষ্ঠা, গবেষণা এবং প্রকৃত জ্ঞানচর্চার প্রতি অবিচল অঙ্গীকারে পরিপূর্ণ। আমরা বিশ্বাস করি, আজকের অনেক চ্যালেঞ্জের সমাধান নিহিত আছে আমাদের ধ্রুপদী আলেমদের ভারসাম্যপূর্ণ ও সামগ্রিক পদ্ধতিতে — এমন একটি পদ্ধতি, যা ইমাম শাহ ওয়ালিউল্লাহ তাঁর সমগ্র জীবনে ধারণ করেছিলেন।",
        ar: "منذ بداية متواضعة، كانت رحلتنا مليئة بالتفاني والبحث والالتزام الراسخ بالعلم الأصيل. ونؤمن بأن الإجابات على كثير من تحديات اليوم تكمن في المنهج المتوازن والشامل لعلمائنا الكلاسيكيين — وهو المنهج الذي جسّده الإمام شاه ولي الله طوال حياته.",
      },
      {
        en: "I am grateful to every researcher, student, and well-wisher who walks this path with us. May Allah accept our humble efforts and make this institute a beacon of knowledge for generations to come.",
        bn: "আমি প্রতিটি গবেষক, শিক্ষার্থী ও শুভাকাঙ্ক্ষীর প্রতি কৃতজ্ঞ, যাঁরা আমাদের সঙ্গে এই পথ চলছেন। আল্লাহ আমাদের বিনম্র প্রচেষ্টা কবুল করুন এবং এই প্রতিষ্ঠানকে আগামী প্রজন্মের জন্য জ্ঞানের প্রদীপশিখা করে দিন।",
        ar: "أنا ممتن لكل باحث وطالب ومحب يسير معنا في هذا الطريق. أسأل الله أن يتقبل جهودنا المتواضعة وأن يجعل هذا المعهد منارة للعلم للأجيال القادمة.",
      },
    ],
  },
  {
    role: { en: "EXECUTIVE DIRECTOR", bn: "নির্বাহী পরিচালক", ar: "المدير التنفيذي" },
    name: { en: "Executive Director", bn: "নির্বাহী পরিচালক", ar: "المدير التنفيذي" },
    image: "/executive-director.webp",
    imageAlt: "Executive Director",
    excerpt: {
      en: "My focus is on operationalizing our scholarly vision into impactful research initiatives and academic programs.",
      bn: "আমার মনোযোগ হলো আমাদের জ্ঞানগত দৃষ্টিভঙ্গিকে কার্যকর গবেষণা উদ্যোগ ও একাডেমিক কর্মসূচিতে রূপান্তরিত করা।",
      ar: "ينصبّ تركيزي على تفعيل رؤيتنا العلمية وتحويلها إلى مبادرات بحثية وبرامج أكاديمية مؤثرة.",
    },
    paragraphs: [
      {
        en: "As the Executive Director of the Imam Shah Waliullah Dehlawi Research Institute, my focus is on operationalizing our scholarly vision into impactful research initiatives and academic programs. We are committed to maintaining the highest standards of academic excellence while ensuring our work remains accessible and relevant.",
        bn: "ইমাম শাহ ওয়ালিউল্লাহ দেহলভী গবেষণা প্রতিষ্ঠানের নির্বাহী পরিচালক হিসেবে, আমার মনোযোগ হলো আমাদের জ্ঞানগত দৃষ্টিভঙ্গিকে কার্যকর গবেষণা উদ্যোগ ও একাডেমিক কর্মসূচিতে রূপান্তরিত করা। আমরা একাডেমিক শ্রেষ্ঠত্বের সর্বোচ্চ মান বজায় রাখতে প্রতিশ্রুতিবদ্ধ, একইসঙ্গে আমাদের কাজ যেন সহজলভ্য ও প্রাসঙ্গিক থাকে তা নিশ্চিত করি।",
        ar: "بصفتي المدير التنفيذي لمعهد الإمام شاه ولي الله الدهلوي للأبحاث، ينصبّ تركيزي على تفعيل رؤيتنا العلمية وتحويلها إلى مبادرات بحثية وبرامج أكاديمية مؤثرة. نحن ملتزمون بالحفاظ على أعلى معايير التميز الأكاديمي مع ضمان بقاء عملنا متاحًا وذا صلة بالواقع.",
      },
      {
        en: "Our departments are actively engaged in critical research projects that explore the intersections of Islamic thought and contemporary challenges. Through strategic partnerships and a robust digital infrastructure, we aim to share this knowledge with a global audience, fostering a community of learners and researchers dedicated to intellectual revival.",
        bn: "আমাদের বিভাগসমূহ ইসলামি চিন্তাধারা ও সমসাময়িক চ্যালেঞ্জের সংযোগস্থল অনুসন্ধানকারী গুরুত্বপূর্ণ গবেষণা প্রকল্পে সক্রিয়ভাবে নিয়োজিত। কৌশলগত অংশীদারিত্ব ও শক্তিশালী ডিজিটাল অবকাঠামোর মাধ্যমে, আমরা এই জ্ঞান বিশ্বব্যাপী দর্শকদের কাছে পৌঁছে দিতে চাই এবং জ্ঞানগত পুনর্জাগরণে নিবেদিত শিক্ষার্থী ও গবেষকদের একটি সম্প্রদায় গড়ে তুলতে চাই।",
        ar: "تنخرط أقسامنا بفاعلية في مشاريع بحثية جوهرية تستكشف نقاط التقاطع بين الفكر الإسلامي والتحديات المعاصرة. ومن خلال الشراكات الاستراتيجية والبنية التحتية الرقمية المتينة، نسعى إلى مشاركة هذه المعرفة مع جمهور عالمي، وتعزيز مجتمع من المتعلمين والباحثين المكرَّسين للنهضة الفكرية.",
      },
      {
        en: "We believe that the legacy of Imam Shah Waliullah offers a roadmap for navigating the complexities of our time, and we invite all seekers of knowledge to engage with our resources and contribute to this vital mission.",
        bn: "আমরা বিশ্বাস করি, ইমাম শাহ ওয়ালিউল্লাহর ঐতিহ্য আমাদের সময়ের জটিলতা মোকাবেলার একটি পথনির্দেশিকা প্রদান করে, এবং আমরা জ্ঞানের সকল অন্বেষণকারীকে আমাদের সম্পদসমূহের সঙ্গে যুক্ত হয়ে এই গুরুত্বপূর্ণ লক্ষ্যে অবদান রাখার আমন্ত্রণ জানাই।",
        ar: "نؤمن بأن إرث الإمام شاه ولي الله يقدم خارطة طريق للتعامل مع تعقيدات عصرنا، وندعو جميع طالبي العلم للتفاعل مع مواردنا والمساهمة في هذه المهمة الحيوية.",
      },
    ],
  },
];

function LeaderCard({ leader, index }: { leader: Leader; index: number }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: index * 0.15 }}
        className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-primary/10 bg-background/80 shadow-xl backdrop-blur-sm"
      >
        {/* Gold top accent */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-accent to-transparent" />

        <div className="flex items-center gap-4 p-5 pb-0 sm:gap-5 sm:p-8 sm:pb-0">
          {/* Compact portrait */}
          <div className="relative shrink-0">
            <div className="h-20 w-20 overflow-hidden rounded-2xl border-2 border-accent/30 shadow-lg sm:h-28 sm:w-28">
              <img
                src={leader.image}
                alt={leader.imageAlt}
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary shadow-md">
              <Quote className="h-4 w-4 text-accent" />
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
              {t(leader.role)}
            </p>
            <h3 className="mt-1 text-xl font-bold text-primary sm:text-2xl">
              {t(leader.name)}
            </h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-8">
          <p className="font-serif text-[15px] italic sm:text-[17px] leading-relaxed text-primary/80">
            “{t(leader.excerpt)}”
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-primary/10 pt-5">
            <div className="h-1 w-10 rounded-full bg-accent" />
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
            >
              {t({ en: "Read full message", bn: "সম্পূর্ণ বার্তা পড়ুন", ar: "اقرأ الرسالة كاملة" })}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </motion.article>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto rounded-3xl border-primary/10 bg-background sm:max-w-2xl">
          <DialogHeader className="flex-row items-center gap-5 space-y-0 text-left">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-accent/30 shadow-md">
              <img
                src={leader.image}
                alt={leader.imageAlt}
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div>
              <DialogDescription className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
                {t(leader.role)}
              </DialogDescription>
              <DialogTitle className="mt-1 text-2xl font-bold text-primary">
                {t(leader.name)}
              </DialogTitle>
            </div>
          </DialogHeader>
          <div className="my-2 h-1 w-16 rounded-full bg-accent" />
          <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            {leader.paragraphs.map((p, i) => (
              <p key={i}>{t(p)}</p>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function LeadershipMessages() {
  const { t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);

  const scrollTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[i] as HTMLElement | undefined;
    if (!child) return;
    track.scrollTo({
      left: child.offsetLeft - (track.clientWidth - child.clientWidth) / 2,
      behavior: "smooth",
    });
  };

  // Track the active slide while user swipes
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const center = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(track.children).forEach((el, i) => {
        const c = el as HTMLElement;
        const d = Math.abs(c.offsetLeft + c.clientWidth / 2 - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  // Gentle auto-advance on small screens only
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    if (!mq.matches) return;
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      scrollTo((active + 1) % leaders.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [active]);

  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {t({ en: "Leadership", bn: "নেতৃত্ব", ar: "القيادة" })}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">
            {t({ en: "Messages from Our Leadership", bn: "আমাদের নেতৃত্বের বার্তা", ar: "رسائل من قيادتنا" })}
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-accent" />
        </motion.div>

        {/* Mobile: smooth snap slider; Desktop: grid */}
        <div
          ref={trackRef}
          onTouchStart={() => (pausedRef.current = true)}
          onTouchEnd={() => {
            window.setTimeout(() => (pausedRef.current = false), 8000);
          }}
          className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[7.5%] pb-2 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden md:mx-auto md:grid md:max-w-7xl md:snap-none md:items-stretch md:gap-6 md:overflow-visible md:px-0 md:pb-0 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {leaders.map((leader, i) => (
            <div
              key={leader.name.en}
              className={`w-[85%] shrink-0 snap-center transition-[transform,opacity] duration-500 ease-out sm:w-[70%] md:w-auto md:shrink md:!scale-100 md:!opacity-100 ${
                active === i ? "scale-100 opacity-100" : "scale-[0.94] opacity-60"
              }`}
            >
              <LeaderCard leader={leader} index={i} />
            </div>
          ))}
        </div>

        {/* Dots (mobile only) */}
        <div className="mt-5 flex items-center justify-center gap-2 md:hidden">
          {leaders.map((leader, i) => (
            <button
              key={leader.name.en}
              type="button"
              aria-label={t({ en: `Show message ${i + 1}`, bn: `বার্তা ${i + 1} দেখান`, ar: `عرض الرسالة ${i + 1}` })}
              onClick={() => {
                pausedRef.current = true;
                scrollTo(i);
                window.setTimeout(() => (pausedRef.current = false), 8000);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === i ? "w-7 bg-accent" : "w-2 bg-primary/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
