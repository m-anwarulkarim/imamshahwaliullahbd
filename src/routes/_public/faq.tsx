import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/layout/PageHero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_public/faq")({
  head: () => seo({
    title: "Frequently Asked Questions — Imam Shah Waliullah Dehlawi Research Institute",
    description: "Answers about admissions, fellowships, publications, donations and the digital library.",
    path: "/faq",
  }),
  component: FAQPage,
});

const groups = [
  {
    group: { en: "About the Institute", bn: "ইনস্টিটিউট সম্পর্কে", ar: "عن المعهد" },
    items: [
      {
        q: { en: "What is the primary focus of the institute?", bn: "ইনস্টিটিউটের মূল লক্ষ্য কী?", ar: "ما هو التركيز الأساسي للمعهد؟" },
        a: {
          en: "We research, edit and publish the works of Imam Shah Waliullah Dehlawi and the wider Islamic tradition, and apply his balanced, purpose-oriented method to contemporary questions.",
          bn: "আমরা ইমাম শাহ ওয়ালীউল্লাহ দেহলভীর রচনাসমূহ ও ব্যাপক ইসলামি ঐতিহ্য নিয়ে গবেষণা, সম্পাদনা ও প্রকাশনা করি এবং তাঁর সুষম, উদ্দেশ্যমুখী পদ্ধতি সমকালীন প্রশ্নে প্রয়োগ করি।",
          ar: "نقوم بالبحث في أعمال الإمام شاه ولي الله الدهلوي والتراث الإسلامي الأوسع وتحقيقها ونشرها، ونطبّق منهجه المتوازن والهادف على القضايا المعاصرة.",
        },
      },
      {
        q: { en: "Where is the institute located?", bn: "ইনস্টিটিউটটি কোথায় অবস্থিত?", ar: "أين يقع المعهد؟" },
        a: {
          en: "Our academic office and library are in Dhaka, Bangladesh. Many of our courses and seminars are also delivered online.",
          bn: "আমাদের একাডেমিক অফিস ও লাইব্রেরি বাংলাদেশের ঢাকায় অবস্থিত। আমাদের অনেক কোর্স ও সেমিনার অনলাইনেও প্রদান করা হয়।",
          ar: "يقع مكتبنا الأكاديمي ومكتبتنا في دكا، بنغلاديش. كما تُقدَّم العديد من دوراتنا وندواتنا عبر الإنترنت.",
        },
      },
      {
        q: { en: "Who governs the institute?", bn: "ইনস্টিটিউট কারা পরিচালনা করেন?", ar: "من يدير المعهد؟" },
        a: {
          en: "An Advisory Council of senior scholars sets academic policy, while an Executive Committee under the Chairman and Executive Director manages daily operations.",
          bn: "প্রবীণ পণ্ডিতদের একটি উপদেষ্টা পরিষদ একাডেমিক নীতি নির্ধারণ করে, আর চেয়ারম্যান ও নির্বাহী পরিচালকের অধীনে একটি নির্বাহী কমিটি দৈনন্দিন কার্যক্রম পরিচালনা করে।",
          ar: "يضع مجلس استشاري من كبار العلماء السياسة الأكاديمية، بينما تدير لجنة تنفيذية برئاسة الرئيس والمدير التنفيذي العمليات اليومية.",
        },
      },
    ],
  },
  {
    group: { en: "Research & Fellowships", bn: "গবেষণা ও ফেলোশিপ", ar: "البحث والزمالات" },
    items: [
      {
        q: { en: "How can I become a research fellow?", bn: "কীভাবে গবেষণা ফেলো হওয়া যায়?", ar: "كيف يمكنني أن أصبح زميلًا بحثيًا؟" },
        a: {
          en: "Apply through the Membership page, selecting Research Fellowship. Shortlisted candidates are interviewed by the relevant academic department.",
          bn: "মেম্বারশিপ পাতা থেকে রিসার্চ ফেলোশিপ নির্বাচন করে আবেদন করুন। বাছাইকৃত প্রার্থীদের সংশ্লিষ্ট একাডেমিক বিভাগ সাক্ষাৎকার নেয়।",
          ar: "قدّم طلبًا من خلال صفحة العضوية باختيار الزمالة البحثية. تُجري الدائرة الأكاديمية المعنية مقابلات مع المرشحين المختارين.",
        },
      },
      {
        q: { en: "Do you offer research grants?", bn: "আপনারা কি গবেষণা অনুদান প্রদান করেন?", ar: "هل تقدمون منحًا بحثية؟" },
        a: {
          en: "Yes — manuscript digitisation, doctoral research and translation grants are available. Details are on the Research page.",
          bn: "হ্যাঁ — পাণ্ডুলিপি ডিজিটাইজেশন, ডক্টরাল গবেষণা ও অনুবাদ অনুদান উপলব্ধ। বিস্তারিত রিসার্চ পাতায় রয়েছে।",
          ar: "نعم — تتوفر منح لرقمنة المخطوطات، والبحث الدكتوراه، والترجمة. التفاصيل موجودة في صفحة البحث.",
        },
      },
      {
        q: { en: "Can I submit an article to your journal?", bn: "আমি কি আপনার জার্নালে একটি নিবন্ধ জমা দিতে পারি?", ar: "هل يمكنني تقديم مقال إلى مجلتكم؟" },
        a: {
          en: "Our peer-reviewed journal accepts submissions year-round in Bangla, Arabic and English. See the Call for Papers section on the Research page.",
          bn: "আমাদের পিয়ার-রিভিউড জার্নাল সারাবছর বাংলা, আরবি ও ইংরেজিতে নিবন্ধ গ্রহণ করে। রিসার্চ পাতায় কল ফর পেপার্স বিভাগ দেখুন।",
          ar: "تقبل مجلتنا المحكّمة الأبحاث على مدار العام باللغات البنغالية والعربية والإنجليزية. راجع قسم الدعوة لتقديم الأبحاث في صفحة البحث.",
        },
      },
    ],
  },
  {
    group: { en: "Courses & Events", bn: "কোর্স ও অনুষ্ঠান", ar: "الدورات والفعاليات" },
    items: [
      {
        q: { en: "Are your courses available online?", bn: "আপনার কোর্সগুলো কি অনলাইনে পাওয়া যায়?", ar: "هل دوراتكم متاحة عبر الإنترنت؟" },
        a: {
          en: "Yes. We run live and recorded online courses in Bangla and English, alongside in-person certificate programmes in Dhaka.",
          bn: "হ্যাঁ। আমরা বাংলা ও ইংরেজিতে লাইভ ও রেকর্ডকৃত অনলাইন কোর্স চালাই, পাশাপাশি ঢাকায় সরাসরি সনদ কর্মসূচিও রয়েছে।",
          ar: "نعم. ندير دورات مباشرة ومسجَّلة عبر الإنترنت باللغتين البنغالية والإنجليزية، إلى جانب برامج شهادات حضورية في دكا.",
        },
      },
      {
        q: { en: "Is there a fee for webinars and public lectures?", bn: "ওয়েবিনার ও জনসাধারণের বক্তৃতার জন্য কি কোনো ফি রয়েছে?", ar: "هل هناك رسوم للندوات الإلكترونية والمحاضرات العامة؟" },
        a: {
          en: "Webinars and public lectures are free and open to all. Certificate courses and the summer school carry a modest fee.",
          bn: "ওয়েবিনার ও জনসাধারণের বক্তৃতা সবার জন্য বিনামূল্যে ও উন্মুক্ত। সনদ কোর্স ও গ্রীষ্মকালীন স্কুলের জন্য একটি সামান্য ফি রয়েছে।",
          ar: "الندوات الإلكترونية والمحاضرات العامة مجانية ومفتوحة للجميع. أما الدورات الشهادية والمدرسة الصيفية فتحمل رسومًا رمزية.",
        },
      },
      {
        q: { en: "How do I register for an event?", bn: "কীভাবে একটি অনুষ্ঠানে নিবন্ধন করব?", ar: "كيف أسجل في فعالية؟" },
        a: {
          en: "Registration links are published with each event on the Events page, or you may contact the academic office directly.",
          bn: "ইভেন্টস পাতায় প্রতিটি অনুষ্ঠানের সাথে নিবন্ধন লিংক প্রকাশিত হয়, অথবা আপনি সরাসরি একাডেমিক অফিসে যোগাযোগ করতে পারেন।",
          ar: "تُنشر روابط التسجيل مع كل فعالية في صفحة الفعاليات، أو يمكنك التواصل مباشرة مع المكتب الأكاديمي.",
        },
      },
    ],
  },
  {
    group: { en: "Publications & Library", bn: "প্রকাশনা ও লাইব্রেরি", ar: "المنشورات والمكتبة" },
    items: [
      {
        q: { en: "Are your publications available online?", bn: "আপনার প্রকাশনাগুলো কি অনলাইনে পাওয়া যায়?", ar: "هل منشوراتكم متاحة عبر الإنترنت؟" },
        a: {
          en: "Many titles are available in the Digital Library as free PDFs or e-books, while printed editions can be ordered from the Publications page.",
          bn: "অনেক শিরোনাম ডিজিটাল লাইব্রেরিতে বিনামূল্যে পিডিএফ বা ই-বুক আকারে পাওয়া যায়, আর মুদ্রিত সংস্করণ প্রকাশনা পাতা থেকে অর্ডার করা যায়।",
          ar: "تتوفر العديد من العناوين في المكتبة الرقمية كملفات PDF أو كتب إلكترونية مجانية، بينما يمكن طلب النسخ المطبوعة من صفحة المنشورات.",
        },
      },
      {
        q: { en: "How do I order a printed book?", bn: "কীভাবে একটি মুদ্রিত বই অর্ডার করব?", ar: "كيف أطلب كتابًا مطبوعًا؟" },
        a: {
          en: "Open the book from the Publications page, click Order This Book Now, and complete the short order form. We will confirm delivery details by phone.",
          bn: "প্রকাশনা পাতা থেকে বইটি খুলুন, \"এখনই এই বইটি অর্ডার করুন\" এ ক্লিক করুন এবং সংক্ষিপ্ত অর্ডার ফর্মটি পূরণ করুন। আমরা ফোনের মাধ্যমে সরবরাহের বিবরণ নিশ্চিত করব।",
          ar: "افتح الكتاب من صفحة المنشورات، وانقر على \"اطلب هذا الكتاب الآن\"، وأكمل نموذج الطلب القصير. سنؤكد تفاصيل التسليم عبر الهاتف.",
        },
      },
      {
        q: { en: "Can I access the manuscripts archive?", bn: "আমি কি পাণ্ডুলিপি সংগ্রহশালা দেখতে পারি?", ar: "هل يمكنني الوصول إلى أرشيف المخطوطات؟" },
        a: {
          en: "Digitised folios are released progressively in the Digital Archive. Researchers may request access to unpublished material through the contact form.",
          bn: "ডিজিটাইজড পাতাগুলো ক্রমান্বয়ে ডিজিটাল আর্কাইভে প্রকাশিত হয়। গবেষকরা যোগাযোগ ফর্মের মাধ্যমে অপ্রকাশিত উপাদানের প্রবেশাধিকার অনুরোধ করতে পারেন।",
          ar: "تُنشر الأوراق المرقمنة تدريجيًا في الأرشيف الرقمي. يمكن للباحثين طلب الوصول إلى المواد غير المنشورة عبر نموذج الاتصال.",
        },
      },
    ],
  },
  {
    group: { en: "Donations & Support", bn: "অনুদান ও সহায়তা", ar: "التبرعات والدعم" },
    items: [
      {
        q: { en: "How are donations used?", bn: "অনুদান কীভাবে ব্যবহৃত হয়?", ar: "كيف تُستخدم التبرعات؟" },
        a: {
          en: "Donations fund manuscript digitisation, research fellowships, publications and free public programmes.",
          bn: "অনুদান পাণ্ডুলিপি ডিজিটাইজেশন, গবেষণা ফেলোশিপ, প্রকাশনা ও বিনামূল্যে জনসাধারণের কর্মসূচিতে অর্থায়ন করে।",
          ar: "تموّل التبرعات رقمنة المخطوطات والزمالات البحثية والمنشورات والبرامج العامة المجانية.",
        },
      },
      {
        q: { en: "Will I receive a receipt?", bn: "আমি কি রসিদ পাব?", ar: "هل سأتلقى إيصالًا؟" },
        a: {
          en: "Yes. Every donation is recorded and a confirmation is sent to the email address provided in the donation form.",
          bn: "হ্যাঁ। প্রতিটি অনুদান নথিভুক্ত করা হয় এবং অনুদান ফর্মে প্রদত্ত ইমেইল ঠিকানায় একটি নিশ্চিতকরণ পাঠানো হয়।",
          ar: "نعم. يتم تسجيل كل تبرع ويُرسل تأكيد إلى عنوان البريد الإلكتروني المُقدَّم في نموذج التبرع.",
        },
      },
      {
        q: { en: "Can I support a specific project?", bn: "আমি কি একটি নির্দিষ্ট প্রকল্পকে সহায়তা করতে পারি?", ar: "هل يمكنني دعم مشروع معين؟" },
        a: {
          en: "Yes — mention the project in the message field of the donation form, or contact the office to discuss dedicated sponsorship.",
          bn: "হ্যাঁ — অনুদান ফর্মের বার্তা ক্ষেত্রে প্রকল্পটি উল্লেখ করুন, অথবা নিবেদিত পৃষ্ঠপোষকতা নিয়ে আলোচনা করতে অফিসে যোগাযোগ করুন।",
          ar: "نعم — اذكر المشروع في حقل الرسالة في نموذج التبرع، أو تواصل مع المكتب لمناقشة الرعاية المخصصة.",
        },
      },
    ],
  },
];

function FAQPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow={t({ en: "Help Centre", bn: "সহায়তা কেন্দ্র", ar: "مركز المساعدة" })}
        title={t({ en: "Frequently Asked Questions", bn: "সচরাচর জিজ্ঞাসিত প্রশ্ন", ar: "الأسئلة الشائعة" })}
        subtitle={t({
          en: "Answers to the questions we receive most often about our research, courses, publications and how to support the institute.",
          bn: "আমাদের গবেষণা, কোর্স, প্রকাশনা এবং ইনস্টিটিউটকে কীভাবে সহায়তা করা যায় সে সম্পর্কে আমরা সবচেয়ে বেশি প্রাপ্ত প্রশ্নগুলোর উত্তর।",
          ar: "إجابات على الأسئلة الأكثر شيوعًا حول بحوثنا ودوراتنا ومنشوراتنا وكيفية دعم المعهد.",
        })}
      />

      <section className="container mx-auto max-w-4xl px-6 pb-20">
        {groups.map((g) => (
          <div key={g.group.en} className="mb-12">
            <SectionHeading title={t(g.group)} />
            <Accordion type="single" collapsible className="rounded-2xl border border-primary/10 bg-card px-6">
              {g.items.map((item) => (
                <AccordionItem key={item.q.en} value={item.q.en}>
                  <AccordionTrigger className="text-left font-semibold text-primary">{t(item.q)}</AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-muted-foreground">{t(item.a)}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}

        <div className="rounded-3xl bg-primary p-10 text-center text-primary-foreground">
          <h2 className="text-2xl font-bold">{t({ en: "Still have a question?", bn: "এখনও কোনো প্রশ্ন আছে?", ar: "هل لا يزال لديك سؤال؟" })}</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            {t({
              en: "Our academic office replies to enquiries within two working days.",
              bn: "আমাদের একাডেমিক অফিস দুই কর্মদিবসের মধ্যে জিজ্ঞাসার জবাব দেয়।",
              ar: "يرد مكتبنا الأكاديمي على الاستفسارات في غضون يومي عمل.",
            })}
          </p>
          <Link
            to="/contact"
            className="mt-7 inline-block rounded-full bg-accent px-8 py-4 font-bold text-accent-foreground transition-all hover:bg-accent/90"
          >
            {t({ en: "Contact Us", bn: "যোগাযোগ করুন", ar: "اتصل بنا" })}
          </Link>
        </div>
      </section>
    </div>
  );
}
