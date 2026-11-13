import type { PatronCategoryMeta, PatronMember } from "./types";

export const PATRON_CATEGORIES: PatronCategoryMeta[] = [
  {
    key: "chief",
    label: {
      bn: "প্রধান পৃষ্ঠপোষক",
      en: "Chief Patron",
      ar: "الرئيس الفخري / الراعي الرئيسي",
    },
    shortLabel: {
      bn: "প্রধান",
      en: "Chief",
      ar: "الرئيسي",
    },
    description: {
      bn: "প্রতিষ্ঠানের আদর্শ ও নীতিমালার শীর্ষ অভিভাবক ও প্রধান পৃষ্ঠপোষকবৃন্দ।",
      en: "Apex guardians and chief patron scholars guiding the institute's mission.",
      ar: "كبار رعاة المعهد وحراسه الموجهون لرسالته العلمية والدعوية.",
    },
    color: "amber",
    badgeBg: "bg-amber-500/10 dark:bg-amber-500/20",
    badgeBorder: "border-amber-500/30",
    textColor: "text-amber-700 dark:text-amber-300",
    iconName: "crown",
    sortOrder: 1,
  },
  {
    key: "founder",
    label: {
      bn: "স্থায়ী ও প্রতিষ্ঠাতা পৃষ্ঠপোষক",
      en: "Permanent & Founder Patron",
      ar: "الراعي الدائم والمؤسس",
    },
    shortLabel: {
      bn: "স্থায়ী ও প্রতিষ্ঠাতা",
      en: "Founder",
      ar: "المؤسس",
    },
    description: {
      bn: "প্রতিষ্ঠার শুভলগ্নে ঐতিহাসিক ভূমিকা পালনকারী ও স্থায়ী পৃষ্ঠপোষকতায় নিয়োজিত ব্যক্তিত্ব।",
      en: "Founding figures and permanent benefactors sustaining our long-term vision.",
      ar: "الشخصيات المؤسسة والرعاة الدائمون الداعمون لرؤية المعهد طويل الأجل.",
    },
    color: "emerald",
    badgeBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    badgeBorder: "border-emerald-500/30",
    textColor: "text-emerald-700 dark:text-emerald-300",
    iconName: "shield",
    sortOrder: 2,
  },
  {
    key: "special",
    label: {
      bn: "বিশিষ্ট ও বিশেষ পৃষ্ঠপোষক",
      en: "Distinguished & Special Patron",
      ar: "الراعي المتميز والخاص",
    },
    shortLabel: {
      bn: "বিশিষ্ট পৃষ্ঠপোষক",
      en: "Distinguished",
      ar: "المتميز",
    },
    description: {
      bn: "ইসলামী গবেষণা, পাণ্ডুলিপি সংরক্ষণ ও বড় প্রকল্পে বিশেষ অনুদান ও পৃষ্ঠপোষকতাকারী।",
      en: "Distinguished contributors supporting major research, manuscript digitisation and facilities.",
      ar: "مساهمون متميزون يدعمون مشاريع البحث الكبرى ورقمنة المخطوطات.",
    },
    color: "indigo",
    badgeBg: "bg-indigo-500/10 dark:bg-indigo-500/20",
    badgeBorder: "border-indigo-500/30",
    textColor: "text-indigo-700 dark:text-indigo-300",
    iconName: "star",
    sortOrder: 3,
  },
  {
    key: "life",
    label: {
      bn: "আজীবন পৃষ্ঠপোষক",
      en: "Life Patron",
      ar: "الراعي مدى الحياة",
    },
    shortLabel: {
      bn: "আজীবন",
      en: "Life",
      ar: "مدى الحياة",
    },
    description: {
      bn: "প্রতিষ্ঠানের জ্ঞানতাত্ত্বিক প্রচার ও শিক্ষা কার্যক্রমে এককালীন ও আজীবন পৃষ্ঠপোষকতাদানকারী।",
      en: "Endowment contributors and life patrons supporting scholars and publication.",
      ar: "الداعمون مدى الحياة لأنشطة المعهد العلمية ونشر كتبه وأبحاثه.",
    },
    color: "teal",
    badgeBg: "bg-teal-500/10 dark:bg-teal-500/20",
    badgeBorder: "border-teal-500/30",
    textColor: "text-teal-700 dark:text-teal-300",
    iconName: "heart",
    sortOrder: 4,
  },
  {
    key: "honorary",
    label: {
      bn: "সম্মানিত পৃষ্ঠপোষক",
      en: "Honorary Patron",
      ar: "الراعي الفخري",
    },
    shortLabel: {
      bn: "সম্মানিত",
      en: "Honorary",
      ar: "الفخري",
    },
    description: {
      bn: "বরেণ্য শিক্ষাবিদ, গবেষক ও সমাজে সুপরিচিত গণ্যমান্য শুভানুধ্যায়ী ব্যক্তিত্ব।",
      en: "Eminent academicians, jurists and civil patrons sharing our intellectual mission.",
      ar: "أكاديميون وعلماء ومفكرون بارزون يدعمون الرسالة الفكرية للمعهد.",
    },
    color: "purple",
    badgeBg: "bg-purple-500/10 dark:bg-purple-500/20",
    badgeBorder: "border-purple-500/30",
    textColor: "text-purple-700 dark:text-purple-300",
    iconName: "award",
    sortOrder: 5,
  },
  {
    key: "general",
    label: {
      bn: "সাধারণ ও সহযোগী পৃষ্ঠপোষক",
      en: "General & Associate Patron",
      ar: "الراعي العام والمعاون",
    },
    shortLabel: {
      bn: "সহযোগী",
      en: "Associate",
      ar: "المعاون",
    },
    description: {
      bn: "নিয়মিত বার্ষিক অনুদান ও সাংগঠনিক কার্যক্রমে নিবেদিতপ্রাণ পৃষ্ঠপোষক সদস্যবৃন্দ।",
      en: "Annual sustaining patrons and active associate contributors across the country.",
      ar: "الرعاة السنويون والمشاركون النشطون في مختلف مناطق البلاد.",
    },
    color: "sky",
    badgeBg: "bg-sky-500/10 dark:bg-sky-500/20",
    badgeBorder: "border-sky-500/30",
    textColor: "text-sky-700 dark:text-sky-300",
    iconName: "users",
    sortOrder: 6,
  },
];

export const INITIAL_PATRONS: PatronMember[] = [
  // 1. প্রধান পৃষ্ঠপোষক (Chief Patrons)
  {
    id: "patron-chief-1",
    name: {
      bn: "মুফতি আবুল কাসেম নোমানী",
      en: "Mufti Abul Qasim Nomani",
      ar: "المفتي أبو القاسم النعماني",
    },
    category: "chief",
    designation: {
      bn: "মুহতামিম, দারুল উলূম দেওবন্দ",
      en: "Vice Chancellor, Darul Uloom Deoband",
      ar: "رئيس جامعة دار العلوم ديوبند",
    },
    address: {
      bn: "দারুল উলূম, দেওবন্দ, সাহারানপুর",
      en: "Darul Uloom, Deoband, Saharanpur",
      ar: "دار العلوم، ديوبند، سهارنبور",
    },
    district: {
      bn: "আন্তর্জাতিক",
      en: "International",
      ar: "دولي",
    },
    phone: "+91 98370 12345",
    sortOrder: 1,
    featured: true,
  },
  {
    id: "patron-chief-2",
    name: {
      bn: "শায়খ খলীলুর রহমান সাজ্জাদ নোমানী",
      en: "Shaykh Khalilur Rahman Sajjad Nomani",
      ar: "الشيخ خليل الرحمن سجاد النعماني",
    },
    category: "chief",
    designation: {
      bn: "বিশিষ্ট ইসলামী চিন্তাবিদ ও লেখক",
      en: "Distinguished Islamic Thinker & Author",
      ar: "مفكر إسلامي ومؤلف بارز",
    },
    address: {
      bn: "লখনৌ, উত্তর প্রদেশ",
      en: "Lucknow, Uttar Pradesh",
      ar: "لكهنؤ، أوتار براديش",
    },
    district: {
      bn: "আন্তর্জাতিক",
      en: "International",
      ar: "دولي",
    },
    phone: "+91 94150 98765",
    sortOrder: 2,
    featured: true,
  },
  {
    id: "patron-chief-3",
    name: {
      bn: "মাওলানা মাহমুদুল হাসান",
      en: "Mawlana Mahmudul Hasan",
      ar: "المولانا محمود الحسن",
    },
    category: "chief",
    designation: {
      bn: "মুহতামিম, জামিয়া ইসলামিয়া দারুল উলুম মাদানিয়া যাত্রাবাড়ী",
      en: "Rector, Jamia Islamia Darul Uloom Madania Jatrabari",
      ar: "رئيس الجامعة الإسلامية دار العلوم مدنية جاتراباري",
    },
    address: {
      bn: "যাত্রাবাড়ী, ঢাকা-১২০৪",
      en: "Jatrabari, Dhaka-1204",
      ar: "جاتراباري، دكا-1204",
    },
    district: {
      bn: "ঢাকা",
      en: "Dhaka",
      ar: "دكا",
    },
    phone: "+880 1711-543210",
    sortOrder: 3,
    featured: true,
  },
  {
    id: "patron-chief-4",
    name: {
      bn: "শায়খ খলীলুর রহমান নেসারাবাদী",
      en: "Shaykh Khalilur Rahman Nesarabadi",
      ar: "الشيخ خليل الرحمن نيسرابادي",
    },
    category: "chief",
    designation: {
      bn: "পীর সাহেব নেছারাবাদ ও বিশিষ্ট শিক্ষাবিদ",
      en: "Pir of Nesarabad & Eminent Educationist",
      ar: "شيخ نيسراباد وتربوي بارز",
    },
    address: {
      bn: "নেছারাবাদ কমপ্লেক্স, ঝালকাঠি",
      en: "Nesarabad Complex, Jhalakathi",
      ar: "مجمع نيسراباد، جالكاتي",
    },
    district: {
      bn: "ঝালকাঠি",
      en: "Jhalakathi",
      ar: "جالكاتي",
    },
    phone: "+880 1715-987654",
    sortOrder: 4,
    featured: true,
  },

  // 2. স্থায়ী ও প্রতিষ্ঠাতা পৃষ্ঠপোষক (Permanent & Founder Patrons)
  {
    id: "patron-founder-1",
    name: {
      bn: "হাজী মুহাম্মদ শামসুল আলম",
      en: "Haji Muhammad Shamsul Alam",
      ar: "الحاج محمد شمس العالم",
    },
    category: "founder",
    designation: {
      bn: "বিশিষ্ট সমাজসেবক ও শিল্পপতি",
      en: "Prominent Industrialist & Philanthropist",
      ar: "رجل أعمال بارز وفاعل خير",
    },
    address: {
      bn: "রোড নং ৭, সেক্টর ৪, উত্তরা, ঢাকা",
      en: "Road 7, Sector 4, Uttara, Dhaka",
      ar: "شارع 7، قطاع 4، أوتارا، دكا",
    },
    district: {
      bn: "ঢাকা",
      en: "Dhaka",
      ar: "دكا",
    },
    phone: "+880 1819-234567",
    sortOrder: 1,
  },
  {
    id: "patron-founder-2",
    name: {
      bn: "আলহাজ্ব মাওলানা নূরুল ইসলাম",
      en: "Alhaj Mawlana Nurul Islam",
      ar: "الحاج مولانا نور الإسلام",
    },
    category: "founder",
    designation: {
      bn: "প্রতিষ্ঠাতা ট্রাস্টি ও শিক্ষানুরাগী",
      en: "Founding Trustee & Educational Patron",
      ar: "أمين مؤسس وراعي تعليمي",
    },
    address: {
      bn: "আন্দরকিল্লা, কোতোয়ালী, চট্টগ্রাম",
      en: "Anderkilla, Kotwali, Chattogram",
      ar: "أندر قلعة، كوتوالي، تشاتوغرام",
    },
    district: {
      bn: "চট্টগ্রাম",
      en: "Chattogram",
      ar: "تشاتوغرام",
    },
    phone: "+880 1713-345678",
    sortOrder: 2,
  },
  {
    id: "patron-founder-3",
    name: {
      bn: "ইঞ্জিনিয়ার মোস্তফা কামাল",
      en: "Engr. Mostafa Kamal",
      ar: "المهندس مصطفى كمال",
    },
    category: "founder",
    designation: {
      bn: "ম্যানেজিং ডিরেক্টর ও ট্রাস্ট সদস্য",
      en: "Managing Director & Trust Member",
      ar: "العضو المنتدب وعضو الوقف",
    },
    address: {
      bn: "উপশহর, হাউজিং স্টেট, সিলেট",
      en: "Uposhahar, Housing Estate, Sylhet",
      ar: "أوبوشاهار، سيلهيت",
    },
    district: {
      bn: "সিলেট",
      en: "Sylhet",
      ar: "سيلهيت",
    },
    phone: "+880 1712-456789",
    sortOrder: 3,
  },
  {
    id: "patron-founder-4",
    name: {
      bn: "আলহাজ্ব সিরাজুল হক ভূঁইয়া",
      en: "Alhaj Sirajul Haque Bhuiyan",
      ar: "الحاج سراج الحق بهويا",
    },
    category: "founder",
    designation: {
      bn: "ভূমিদাতা ও দাতা সদস্য",
      en: "Land Donor & Endowment Benefactor",
      ar: "واقف الأرض ومتبرع",
    },
    address: {
      bn: "কান্দিরপাড়, আদর্শ সদর, কুমিল্লা",
      en: "Kandirpar, Adarsha Sadar, Cumilla",
      ar: "كانديربار، كوميلا",
    },
    district: {
      bn: "কুমিল্লা",
      en: "Cumilla",
      ar: "كوميلا",
    },
    phone: "+880 1911-567890",
    sortOrder: 4,
  },

  // 3. বিশিষ্ট ও বিশেষ পৃষ্ঠপোষক (Distinguished & Special Patrons)
  {
    id: "patron-special-1",
    name: {
      bn: "ব্যারিস্টার শাহরিয়ার আহমেদ",
      en: "Barrister Shahriar Ahmed",
      ar: "المحامي شهريار أحمد",
    },
    category: "special",
    designation: {
      bn: "আইনজীবী ও সংবিধান বিশেষজ্ঞ",
      en: "Advocate & Constitutional Jurist",
      ar: "محامٍ وخبير قانوني",
    },
    address: {
      bn: "ধানমন্ডি আবাসিক এলাকা, ঢাকা",
      en: "Dhanmondi R/A, Dhaka",
      ar: "دانموندي، دكا",
    },
    district: {
      bn: "ঢাকা",
      en: "Dhaka",
      ar: "دكا",
    },
    phone: "+880 1817-678901",
    sortOrder: 1,
  },
  {
    id: "patron-special-2",
    name: {
      bn: "ড. মুহাম্মদ মনজুর ইলাহী",
      en: "Dr. Muhammad Manzur Ilahi",
      ar: "د. محمد منظور إلهي",
    },
    category: "special",
    designation: {
      bn: "অধ্যাপক ও আন্তর্জাতিক ইসলামী গবেষক",
      en: "Professor & Islamic Studies Scholar",
      ar: "أستاذ وباحث في الدراسات الإسلامية",
    },
    address: {
      bn: "মিরপুর ডিওএইচএস, ঢাকা",
      en: "Mirpur DOHS, Dhaka",
      ar: "ميربور DOHS، دكا",
    },
    district: {
      bn: "ঢাকা",
      en: "Dhaka",
      ar: "دكا",
    },
    phone: "+880 1716-789012",
    sortOrder: 2,
  },
  {
    id: "patron-special-3",
    name: {
      bn: "মাওলানা মুফতি ফয়জুল্লাহ কাসেমী",
      en: "Mawlana Mufti Faizullah Qasemi",
      ar: "المولانا المفتي فيض الله القاسمي",
    },
    category: "special",
    designation: {
      bn: "মুফতি ও শায়খুল হাদিস",
      en: "Mufti & Shaykh al-Hadith",
      ar: "مفتي وشيخ الحديث",
    },
    address: {
      bn: "ঘাসিটপাড়া, ময়মনসিংহ সদর",
      en: "Ghashitpara, Mymensingh Sadar",
      ar: "ميمينسينغ",
    },
    district: {
      bn: "ময়মনসিংহ",
      en: "Mymensingh",
      ar: "ميمينسينغ",
    },
    phone: "+880 1714-890123",
    sortOrder: 3,
  },
  {
    id: "patron-special-4",
    name: {
      bn: "আলহাজ্ব আখতারুজ্জামান চৌধুরী",
      en: "Alhaj Akhtaruzzaman Chowdhury",
      ar: "الحاج اختر الزمان تشودري",
    },
    category: "special",
    designation: {
      bn: "রপ্তানিকারক ও বিশিষ্ট শিল্পপতি",
      en: "Exporter & Business Leader",
      ar: "رجل أعمال ومصدر",
    },
    address: {
      bn: "নাসিরাবাদ হাউজিং সোসাইটি, চট্টগ্রাম",
      en: "Nasirabad Housing Society, Chattogram",
      ar: "ناصرباد، تشاتوغرام",
    },
    district: {
      bn: "চট্টগ্রাম",
      en: "Chattogram",
      ar: "تشاتوغرام",
    },
    phone: "+880 1819-901234",
    sortOrder: 4,
  },

  // 4. আজীবন পৃষ্ঠপোষক (Life Patrons)
  {
    id: "patron-life-1",
    name: {
      bn: "ড. এ. কে. এম. মাহবুবুর রহমান",
      en: "Dr. A. K. M. Mahbubur Rahman",
      ar: "د. أ. ك. م. محبوب الرحمن",
    },
    category: "life",
    designation: {
      bn: "সাবেক প্রিন্সিপাল ও ইতিহাসবিদ",
      en: "Former Principal & Historian",
      ar: "مدير سابق ومؤرخ",
    },
    address: {
      bn: "বোয়ালিয়া, রাজশাহী সদর, রাজশাহী",
      en: "Boalia, Rajshahi Sadar, Rajshahi",
      ar: "بواليا، راجشاهي",
    },
    district: {
      bn: "রাজশাহী",
      en: "Rajshahi",
      ar: "راجشاهي",
    },
    phone: "+880 1711-012345",
    sortOrder: 1,
  },
  {
    id: "patron-life-2",
    name: {
      bn: "মাওলানা আব্দুল বারী নেদভী",
      en: "Mawlana Abdul Bari Nadwi",
      ar: "المولانا عبد الباري الندوي",
    },
    category: "life",
    designation: {
      bn: "অনুবাদক ও শিক্ষক",
      en: "Translator & Academician",
      ar: "مترجم وأكاديمي",
    },
    address: {
      bn: "দরগাহ মহল্লা, সিলেট",
      en: "Dargah Mohalla, Sylhet",
      ar: "محلة دركاه، سيلهيت",
    },
    district: {
      bn: "সিলেট",
      en: "Sylhet",
      ar: "سيلهيت",
    },
    phone: "+880 1718-123456",
    sortOrder: 2,
  },
  {
    id: "patron-life-3",
    name: {
      bn: "জনাব রফিকুল ইসলাম শিকদার",
      en: "Mr. Rafiqul Islam Shikder",
      ar: "السيد رفيق الإسلام شيكدار",
    },
    category: "life",
    designation: {
      bn: "সমাজসেবক ও ব্যবসায়ী",
      en: "Social Activist & Entrepreneur",
      ar: "ناشط اجتماعي ورجل أعمال",
    },
    address: {
      bn: "খালিশপুর, খুলনা সদর, খুলনা",
      en: "Khalishpur, Khulna Sadar, Khulna",
      ar: "خاليشبور، خولنا",
    },
    district: {
      bn: "খুলনা",
      en: "Khulna",
      ar: "خولنا",
    },
    phone: "+880 1914-234567",
    sortOrder: 3,
  },
  {
    id: "patron-life-4",
    name: {
      bn: "মাওলানা শফিকুর রহমান যশোরী",
      en: "Mawlana Shafiqur Rahman Jashori",
      ar: "المولانا شفيق الرحمن الجسوري",
    },
    category: "life",
    designation: {
      bn: "মুহাদ্দিস ও ওয়ায়েজিন",
      en: "Muhaddith & Speaker",
      ar: "محدث وواعظ",
    },
    address: {
      bn: "ঘোপ সেন্ট্রাল রোড, যশোর",
      en: "Ghop Central Road, Jashore",
      ar: "غوب سنترال، جسور",
    },
    district: {
      bn: "যশোর",
      en: "Jashore",
      ar: "جسور",
    },
    phone: "+880 1712-345670",
    sortOrder: 4,
  },

  // 5. সম্মানিত পৃষ্ঠপোষক (Honorary Patrons)
  {
    id: "patron-honorary-1",
    name: {
      bn: "বিচারপতি মো. আবু হানিফ (অব.)",
      en: "Justice Md. Abu Hanif (Retd.)",
      ar: "القاضي محمد أبو حنيف (متقاعد)",
    },
    category: "honorary",
    designation: {
      bn: "সাবেক বিচারপতি, সুপ্রিম কোর্ট",
      en: "Former Justice, Supreme Court of Bangladesh",
      ar: "قاضٍ سابق في المحكمة العليا",
    },
    address: {
      bn: "গুলশান-২, ঢাকা",
      en: "Gulshan-2, Dhaka",
      ar: "غولشان 2، دكا",
    },
    district: {
      bn: "ঢাকা",
      en: "Dhaka",
      ar: "دكا",
    },
    phone: "+880 1711-456781",
    sortOrder: 1,
  },
  {
    id: "patron-honorary-2",
    name: {
      bn: "প্রফেসর ড. মুহাম্মদ আব্দুস সবুর",
      en: "Prof. Dr. Muhammad Abdus Sabur",
      ar: "أ. د. محمد عبد الصبور",
    },
    category: "honorary",
    designation: {
      bn: "সাবেক ডিন, ইসলামিক স্টাডিজ অনুষদ",
      en: "Former Dean, Faculty of Islamic Studies",
      ar: "عميد سابق لكلية الدراسات الإسلامية",
    },
    address: {
      bn: "বিশ্ববিদ্যালয় আবাসিক এলাকা, ঢাকা",
      en: "University Residential Area, Dhaka",
      ar: "المنطقة السكنية الجامعية، دكا",
    },
    district: {
      bn: "ঢাকা",
      en: "Dhaka",
      ar: "دكا",
    },
    phone: "+880 1819-567892",
    sortOrder: 2,
  },
  {
    id: "patron-honorary-3",
    name: {
      bn: "মাওলানা আব্দুল মালেক নদভী",
      en: "Mawlana Abdul Malek Nadwi",
      ar: "المولانا عبد المالك الندوي",
    },
    category: "honorary",
    designation: {
      bn: "লেখক ও পাণ্ডুলিপি গবেষক",
      en: "Author & Manuscript Scholar",
      ar: "مؤلف وباحث مخطوطات",
    },
    address: {
      bn: "পাহাড়তলী, চট্টগ্রাম",
      en: "Pahartali, Chattogram",
      ar: "باهارتالي، تشاتوغرام",
    },
    district: {
      bn: "চট্টগ্রাম",
      en: "Chattogram",
      ar: "تشاتوغرام",
    },
    phone: "+880 1713-678903",
    sortOrder: 3,
  },
  {
    id: "patron-honorary-4",
    name: {
      bn: "ড. শায়খ মোস্তফা আল-হুসাইনি",
      en: "Dr. Shaykh Mostafa Al-Husseini",
      ar: "د. الشيخ مصطفى الحسيني",
    },
    category: "honorary",
    designation: {
      bn: "ইসলামী পাণ্ডুলিপি বিশেষজ্ঞ ও গবেষক",
      en: "Islamic Manuscript Specialist",
      ar: "خبير المخطوطات الإسلامية",
    },
    address: {
      bn: "লন্ডন, যুক্তরাজ্য",
      en: "London, United Kingdom",
      ar: "لندن، المملكة المتحدة",
    },
    district: {
      bn: "আন্তর্জাতিক",
      en: "International",
      ar: "دولي",
    },
    phone: "+44 7700 900123",
    sortOrder: 4,
  },

  // 6. সাধারণ ও সহযোগী পৃষ্ঠপোষক (General & Associate Patrons)
  {
    id: "patron-general-1",
    name: {
      bn: "মাওলানা তারিক জামিল নোমান",
      en: "Mawlana Tariq Jamil Noman",
      ar: "المولانا طارق جميل نعمان",
    },
    category: "general",
    designation: {
      bn: "খতিব ও তরুণ উদ্যোক্তা",
      en: "Khatib & Young Entrepreneur",
      ar: "خطيب ورائد أعمال",
    },
    address: {
      bn: "মালিবাগ রেলগেট, ঢাকা",
      en: "Malibagh Railgate, Dhaka",
      ar: "ماليباغ، دكا",
    },
    district: {
      bn: "ঢাকা",
      en: "Dhaka",
      ar: "دكا",
    },
    phone: "+880 1912-789014",
    sortOrder: 1,
  },
  {
    id: "patron-general-2",
    name: {
      bn: "জনাব হাসিবুল হাসান মারুফ",
      en: "Mr. Hasibul Hasan Maruf",
      ar: "السيد حسيب الحسن معروف",
    },
    category: "general",
    designation: {
      bn: "সফটওয়্যার প্রকৌশলী ও সহযোগী সদস্য",
      en: "Software Engineer & Associate Contributor",
      ar: "مهندس برمجيات وداعم مشارك",
    },
    address: {
      bn: "বনশ্রী, রামপুরা, ঢাকা",
      en: "Banasree, Rampura, Dhaka",
      ar: "باناسري، رامبورا، دكا",
    },
    district: {
      bn: "ঢাকা",
      en: "Dhaka",
      ar: "دكا",
    },
    phone: "+880 1611-890125",
    sortOrder: 2,
  },
  {
    id: "patron-general-3",
    name: {
      bn: "মাওলানা আব্দুল কাইয়ূম সিদ্দিকী",
      en: "Mawlana Abdul Qayyum Siddiqui",
      ar: "المولانا عبد القيوم الصديقي",
    },
    category: "general",
    designation: {
      bn: "মাদরাসা শিক্ষক ও প্রচারক",
      en: "Madrasah Educator & Coordinator",
      ar: "معلم مدرسة ومنسق دعوي",
    },
    address: {
      bn: "চৌমুহনী, বেগমগঞ্জ, নোয়াখালী",
      en: "Chowmuhani, Begumganj, Noakhali",
      ar: "تشوموهاني، نواخالي",
    },
    district: {
      bn: "নোয়াখালী",
      en: "Noakhali",
      ar: "نواخالي",
    },
    phone: "+880 1717-901236",
    sortOrder: 3,
  },
  {
    id: "patron-general-4",
    name: {
      bn: "জনাব মাহমুদুর রহমান সুমন",
      en: "Mr. Mahmudur Rahman Sumon",
      ar: "السيد محمود الرحمن سومون",
    },
    category: "general",
    designation: {
      bn: "ব্যবসায়ী ও সমাজকর্মী",
      en: "Businessman & Social Worker",
      ar: "رجل أعمال وناشط مجتمعي",
    },
    address: {
      bn: "সদর রোড, বগুড়া",
      en: "Sadar Road, Bogura",
      ar: "سادار رود، بوغورا",
    },
    district: {
      bn: "বগুড়া",
      en: "Bogura",
      ar: "بوغورا",
    },
    phone: "+880 1715-012347",
    sortOrder: 4,
  },
];
