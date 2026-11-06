import { Megaphone, BookOpen, Sparkles, HandHeart, type LucideIcon } from "lucide-react";

export type TrText = { en: string; bn: string; ar: string };

export type PayamProgram = {
  slug: string;
  icon: LucideIcon;
  title: TrText;
  tagline: TrText;
  desc: TrText;
  intro: TrText;
  objectives: TrText[];
  activities: TrText[];
};

export const payamPrograms: PayamProgram[] = [
  {
    slug: "dawah",
    icon: Megaphone,
    title: { en: "Dawah", bn: "দাওয়াহ", ar: "الدعوة" },
    tagline: {
      en: "Propagation of the Faith",
      bn: "দ্বীনের প্রচার",
      ar: "نشر الدين",
    },
    desc: {
      en: "Conveying the message of Islam to all people with wisdom and beautiful preaching.",
      bn: "হিকমাহ ও সুসুন্দর উপদেশের মাধ্যমে সবার কাছে ইসলামের বাণী পৌঁছে দেওয়া।",
      ar: "إيصال رسالة الإسلام إلى جميع الناس بالحكمة والموعظة الحسنة.",
    },
    intro: {
      en: "Dawah is the heart of our mission. Following the path of the Prophets, we invite humanity toward the pure teachings of the Qur'an and Sunnah, presenting Islam in a language the contemporary mind understands.",
      bn: "দাওয়াহ আমাদের মিশনের হৃদয়। নবীদের পথ অনুসরণ করে আমরা কুরআন ও সুন্নাহর খাঁটি শিক্ষার দিকে মানবতাকে আহ্বান জানাই এবং সমকালীন মননের ভাষায় ইসলামকে উপস্থাপন করি।",
      ar: "الدعوة هي قلب رسالتنا. ندعو البشرية إلى التعاليم النقية للقرآن والسنة على منهاج الأنبياء، ونقدم الإسلام بلغة يفهمها العقل المعاصر.",
    },
    objectives: [
      {
        en: "Present the authentic message of Islam free from distortion",
        bn: "বিকৃতিমুক্ত খাঁটি ইসলামের বাণী উপস্থাপন করা",
        ar: "تقديم رسالة الإسلام الصحيحة بعيدًا عن التحريف",
      },
      {
        en: "Answer the doubts of skepticism, atheism and materialism with knowledge and reason",
        bn: "জ্ঞান ও যুক্তির মাধ্যমে সংশয়বাদ, নাস্তিক্যবাদ ও বস্তুবাদের সংশয় দূর করা",
        ar: "الرد على شبهات الشك والإلحاد والمادية بالعلم والحجة",
      },
      {
        en: "Build a devoted group of da'is grounded in the Waliullahi thought",
        bn: "ওয়ালিউল্লাহী চিন্তাধারায় প্রোথিত নিবেদিত দায়ী গোষ্ঠী গড়ে তোলা",
        ar: "إعداد جيل من الدعاة المتسلحين بالفكر الولي اللهي",
      },
    ],
    activities: [
      {
        en: "Weekly dawah gatherings and study circles",
        bn: "সাপ্তাহিক দাওয়াহী মজলিস ও স্টাডি সার্কেল",
        ar: "مجالس الدعوة وحلقات الدراسة الأسبوعية",
      },
      {
        en: "Publication and distribution of dawah literature",
        bn: "দাওয়াহী সাহিত্য প্রকাশ ও বিতরণ",
        ar: "نشر وتوزيع الأدبيات الدعوية",
      },
      {
        en: "Dialogue programs with intellectuals and youth",
        bn: "বুদ্ধিজীবী ও তরুণদের সাথে সংলাপ কর্মসূচি",
        ar: "برامج الحوار مع المثقفين والشباب",
      },
      {
        en: "Online dawah through digital platforms",
        bn: "ডিজিটাল প্ল্যাটফর্মের মাধ্যমে অনলাইন দাওয়াহ",
        ar: "الدعوة الإلكترونية عبر المنصات الرقمية",
      },
    ],
  },
  {
    slug: "taleem",
    icon: BookOpen,
    title: { en: "Ta'leem", bn: "তা'লীম", ar: "التعليم" },
    tagline: {
      en: "Expansion of Islamic Education",
      bn: "ইসলামী শিক্ষার প্রসার",
      ar: "نشر التعليم الإسلامي",
    },
    desc: {
      en: "Spreading authentic Islamic knowledge through structured courses, research and teaching.",
      bn: "সুসংগঠিত কোর্স, গবেষণা ও শিক্ষাদানের মাধ্যমে খাঁটি ইসলামী জ্ঞানের প্রসার।",
      ar: "نشر العلم الإسلامي الصحيح من خلال الدورات المنظمة والبحث والتدريس.",
    },
    intro: {
      en: "Knowledge is the foundation of revival. Our ta'leem programs combine the classical heritage of Shah Waliullah Dehlawi with modern academic methodology, nurturing scholars and thinkers for the ummah.",
      bn: "জ্ঞানই নবজাগরণের ভিত্তি। আমাদের তা'লীম কর্মসূচিতে শাহ ওয়ালিউল্লাহ দেহলভীর সনাতন ঐতিহ্যের সাথে আধুনিক একাডেমিক পদ্ধতির সমন্বয় ঘটিয়ে উম্মাহর জন্য আলেম ও চিন্তাবিদ তৈরি করা হয়।",
      ar: "العلم أساس النهضة. تجمع برامجنا التعليمية بين التراث الأصيل للإمام شاه ولي الله الدهلوي والمنهجية الأكاديمية الحديثة لإعداد علماء ومفكرين للأمة.",
    },
    objectives: [
      {
        en: "Produce scholars capable of presenting Qur'anic thought in contemporary language",
        bn: "সমকালীন ভাষায় কুরআনীয় চিন্তা উপস্থাপনে সক্ষম আলেম তৈরি করা",
        ar: "إعداد علماء قادرين على تقديم الفكر القرآني بلغة معاصرة",
      },
      {
        en: "Revive the Waliullahi intellectual tradition",
        bn: "ওয়ালিউল্লাহী চিন্তাধারার ঐতিহ্য পুনরুজ্জীবন করা",
        ar: "إحياء التراث الفكري الولي اللهي",
      },
      {
        en: "Make Islamic education accessible to every seeker, online and offline",
        bn: "অনলাইন-অফলাইন উভয় মাধ্যমে প্রত্যেক জ্ঞানানুরাগীর কাছে ইসলামী শিক্ষা পৌঁছে দেওয়া",
        ar: "إيصال التعليم الإسلامي إلى كل طالب علم حضوريًا وعن بُعد",
      },
    ],
    activities: [
      {
        en: "Dawah & Research Courses (online and on-campus)",
        bn: "দাওয়াহ অ্যান্ড রিসার্চ কোর্স (অনলাইন ও সরাসরি)",
        ar: "دورات الدعوة والبحث (عن بُعد وحضوريًا)",
      },
      {
        en: "Qur'an, Hadith and Fiqh study circles",
        bn: "কুরআন, হাদীস ও ফিকহ স্টাডি সার্কেল",
        ar: "حلقات دراسة القرآن والحديث والفقه",
      },
      {
        en: "Research supervision and academic seminars",
        bn: "গবেষণা তত্ত্বাবধান ও একাডেমিক সেমিনার",
        ar: "الإشراف البحثي والندوات الأكاديمية",
      },
      {
        en: "Monthly magazine 'Al Furqan' publication",
        bn: "মাসিক 'আল ফুরকান' ম্যাগাজিন প্রকাশ",
        ar: "إصدار مجلة الفرقان الشهرية",
      },
    ],
  },
  {
    slug: "islah",
    icon: Sparkles,
    title: { en: "Islah", bn: "ইসলাহ", ar: "الإصلاح" },
    tagline: {
      en: "Reform of Individual & Society",
      bn: "ব্যক্তি ও সমাজের সংস্কার",
      ar: "إصلاح الفرد والمجتمع",
    },
    desc: {
      en: "Purifying hearts and reforming society upon the model of the righteous predecessors.",
      bn: "সলাফে সালেহীনের আদর্শে অন্তরের পবিত্রতা ও সমাজ সংস্কার।",
      ar: "تزكية القلوب وإصلاح المجتمع على منهج السلف الصالح.",
    },
    intro: {
      en: "True change begins within the human heart. Inspired by the tazkiyah-centered vision of Shah Waliullah, our islah programs work to purify souls, strengthen families and reform social life.",
      bn: "প্রকৃত পরিবর্তনের সূত্রপাত মানব হৃদয়ে। শাহ ওয়ালিউল্লাহর তাযকিয়াকেন্দ্রিক দর্শন থেকে অনুপ্রাণিত হয়ে আমাদের ইসলাহ কর্মসূচি আত্মশুদ্ধি, পরিবার সুদৃঢ়করণ ও সামাজিক জীবন সংস্কারে কাজ করে।",
      ar: "يبدأ التغيير الحقيقي من قلب الإنسان. واستلهامًا من رؤية الإمام شاه ولي الله المتمحورة حول التزكية، تعمل برامج الإصلاح لدينا على تزكية النفوس وتماسك الأسر وإصلاح الحياة الاجتماعية.",
    },
    objectives: [
      {
        en: "Purify the hearts through dhikr, tazkiyah and spiritual training",
        bn: "যিকির, তাযকিয়াহ ও আধ্যাত্মিক প্রশিক্ষণের মাধ্যমে অন্তর শুদ্ধ করা",
        ar: "تطهير القلوب بالذكر والتزكية والتربية الروحية",
      },
      {
        en: "Reform family and social life according to the Shari'ah",
        bn: "শরীয়াহ অনুযায়ী পারিবারিক ও সামাজিক জীবন সংস্কার করা",
        ar: "إصلاح الحياة الأسرية والاجتماعية وفق الشريعة",
      },
      {
        en: "Counter moral decline and social ills with prophetic guidance",
        bn: "নববী নির্দেশনার আলোকে নৈতিক অধঃপতন ও সামাজিক অসুস্থতার প্রতিহত করা",
        ar: "مواجهة الانحلال الأخلاقي والأمراض الاجتماعية بالهداية النبوية",
      },
    ],
    activities: [
      {
        en: "Tazkiyah retreats and spiritual gatherings",
        bn: "তাযকিয়াহ রিট্রিট ও আধ্যাত্মিক মজলিস",
        ar: "خلوات التزكية والمجالس الروحية",
      },
      {
        en: "Family guidance and counseling programs",
        bn: "পারিবারিক নির্দেশনা ও কাউন্সেলিং কর্মসূচি",
        ar: "برامج التوجيه الأسري والإرشاد",
      },
      {
        en: "Youth character-building camps",
        bn: "যুব চরিত্র গঠনমূলক ক্যাম্প",
        ar: "مخيمات بناء الشخصية للشباب",
      },
      {
        en: "Community reform initiatives",
        bn: "সম্প্রদায় সংস্কার উদ্যোগ",
        ar: "مبادرات إصلاح المجتمع المحلي",
      },
    ],
  },
  {
    slug: "khidmah",
    icon: HandHeart,
    title: { en: "Khidmah", bn: "খিদমাহ", ar: "الخدمة" },
    tagline: {
      en: "Service to Suffering Humanity",
      bn: "আর্ত মানবতার সেবা",
      ar: "خدمة الإنسانية المحتاجة",
    },
    desc: {
      en: "Serving the distressed and needy as an expression of the mercy of Islam.",
      bn: "ইসলামের মমতার প্রকাশস্বরূপ দুর্গত ও অসহায় মানুষের সেবা।",
      ar: "خدمة المتضررين والمحتاجين تجسيدًا لرحمة الإسلام.",
    },
    intro: {
      en: "The message of humanity is incomplete without service. Our khidmah initiatives reach the poor, the sick and the disaster-stricken — turning faith into compassionate action for all people, regardless of background.",
      bn: "সেবা ছাড়া মানবতার বাণী অসম্পূর্ণ। আমাদের খিদমাহ উদ্যোগ পৌঁছে যায় দরিদ্র, রোগী ও দুর্যোগকবলিত মানুষের কাছে — ধর্মপরিচয় নির্বিশেষে সব মানুষের জন্য ঈমানকে পরিণত করে সহানুভূতিশীল কর্মে।",
      ar: "لا تكتمل رسالة الإنسانية دون خدمة. تصل مبادرات الخدمة لدينا إلى الفقراء والمرضى ومنكوبي الكوارث، محوّلة الإيمان إلى عمل رحيم لجميع الناس بغض النظر عن خلفياتهم.",
    },
    objectives: [
      {
        en: "Stand beside the poor, sick and disaster-affected people",
        bn: "দরিদ্র, রোগী ও দুর্যোগকবলিত মানুষের পাশে দাঁড়ানো",
        ar: "الوقوف إلى جانب الفقراء والمرضى ومنكوبي الكوارث",
      },
      {
        en: "Build a culture of voluntary service and compassion",
        bn: "স্বেচ্ছাসেবা ও সহানুভূতির সংস্কৃতি গড়ে তোলা",
        ar: "بناء ثقافة العمل التطوعي والرحمة",
      },
      {
        en: "Present Islam through humanitarian action",
        bn: "মানবিক কর্মকাণ্ডের মাধ্যমে ইসলামকে উপস্থাপন করা",
        ar: "تقديم الإسلام من خلال العمل الإنساني",
      },
    ],
    activities: [
      {
        en: "Relief distribution for the poor and disaster victims",
        bn: "দরিদ্র ও দুর্যোগকবলিতদের মাঝে ত্রাণ বিতরণ",
        ar: "توزيع الإغاثة على الفقراء ومنكوبي الكوارث",
      },
      {
        en: "Medical assistance and health camps",
        bn: "চিকিৎসা সহায়তা ও হেলথ ক্যাম্প",
        ar: "المساعدات الطبية والمخيمات الصحية",
      },
      {
        en: "Educational support for underprivileged students",
        bn: "সুবিধাবঞ্চিত শিক্ষার্থীদের শিক্ষা সহায়তা",
        ar: "الدعم التعليمي للطلاب المحرومين",
      },
      {
        en: "Orphan care and rehabilitation programs",
        bn: "এতিম যত্ন ও পুনর্বাসন কর্মসূচি",
        ar: "برامج رعاية الأيتام وإعادة التأهيل",
      },
    ],
  },
];

export function getPayamProgram(slug: string) {
  return payamPrograms.find((p) => p.slug === slug);
}
