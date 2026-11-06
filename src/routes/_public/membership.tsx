import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { HeartHandshake, GraduationCap, HandHeart, Briefcase } from "lucide-react";
import { z } from "zod";
import { PageHero, SectionHeading } from "@/components/layout/PageHero";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLanguage, type LocalizedText } from "@/lib/i18n";
import { submitMembershipApplication } from "@/lib/community";

export const Route = createFileRoute("/_public/membership")({
  head: () => ({
    meta: [
      { title: "Membership — Imam Shah Waliullah Dehlawi Research Institute" },
      { name: "description", content: "Join as a donor member, research fellow, volunteer or intern at the institute." },
      { property: "og:title", content: "Membership — Imam Shah Waliullah Dehlawi Research Institute" },
      { property: "og:description", content: "Donor membership, research fellowship, volunteering and internship opportunities." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MembershipPage,
});

const types: { id: string; icon: typeof HeartHandshake; title: LocalizedText; text: LocalizedText }[] = [
  {
    id: "Donor Membership",
    icon: HeartHandshake,
    title: { en: "Donor Membership", bn: "দাতা সদস্যপদ", ar: "عضوية المتبرعين" },
    text: {
      en: "Support manuscript digitisation and fellowships. Members receive our journal and event invitations.",
      bn: "পাণ্ডুলিপি ডিজিটাইজেশন ও ফেলোশিপকে সহায়তা করুন। সদস্যরা আমাদের জার্নাল ও অনুষ্ঠানের আমন্ত্রণ পান।",
      ar: "ادعم رقمنة المخطوطات والزمالات. يتلقى الأعضاء مجلتنا ودعوات الفعاليات.",
    },
  },
  {
    id: "Research Fellowship",
    icon: GraduationCap,
    title: { en: "Research Fellowship", bn: "গবেষণা ফেলোশিপ", ar: "الزمالة البحثية" },
    text: {
      en: "One to three years of funded research within an academic department, with publication support.",
      bn: "একটি একাডেমিক বিভাগে এক থেকে তিন বছরের অর্থায়িত গবেষণা, প্রকাশনা সহায়তাসহ।",
      ar: "بحث ممول من سنة إلى ثلاث سنوات ضمن قسم أكاديمي، مع دعم للنشر.",
    },
  },
  {
    id: "Volunteer",
    icon: HandHeart,
    title: { en: "Volunteer", bn: "স্বেচ্ছাসেবক", ar: "متطوع" },
    text: {
      en: "Contribute time to translation, proofreading, event management or library cataloguing.",
      bn: "অনুবাদ, প্রুফরিডিং, অনুষ্ঠান ব্যবস্থাপনা বা লাইব্রেরি ক্যাটালগিংয়ে সময় দান করুন।",
      ar: "ساهم بوقتك في الترجمة أو التدقيق أو إدارة الفعاليات أو فهرسة المكتبة.",
    },
  },
  {
    id: "Internship",
    icon: Briefcase,
    title: { en: "Internship", bn: "ইন্টার্নশিপ", ar: "التدريب" },
    text: {
      en: "A structured three-month placement for students in research, publishing or digital archiving.",
      bn: "গবেষণা, প্রকাশনা বা ডিজিটাল আর্কাইভিংয়ে শিক্ষার্থীদের জন্য একটি সুগঠিত তিন মাসের প্লেসমেন্ট।",
      ar: "تدريب منظم لمدة ثلاثة أشهر للطلاب في البحث أو النشر أو الأرشفة الرقمية.",
    },
  },
];

const schema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  membershipType: z.string().min(2, "Please select a membership type"),
  institution: z.string().optional(),
  statement: z.string().min(20, "Please write at least 20 characters"),
});

const errorMessages: Record<string, LocalizedText> = {
  "Full name must be at least 2 characters": { en: "Full name must be at least 2 characters", bn: "পূর্ণ নাম কমপক্ষে ২ অক্ষরের হতে হবে", ar: "يجب أن يتكون الاسم الكامل من حرفين على الأقل" },
  "Please enter a valid email address": { en: "Please enter a valid email address", bn: "একটি বৈধ ইমেইল ঠিকানা লিখুন", ar: "يرجى إدخال عنوان بريد إلكتروني صالح" },
  "Please select a membership type": { en: "Please select a membership type", bn: "একটি সদস্যপদ ধরন নির্বাচন করুন", ar: "يرجى اختيار نوع العضوية" },
  "Please write at least 20 characters": { en: "Please write at least 20 characters", bn: "কমপক্ষে ২০ অক্ষর লিখুন", ar: "يرجى كتابة ٢٠ حرفًا على الأقل" },
};

function MembershipPage() {
  const { t } = useLanguage();
  const submitFn = useServerFn(submitMembershipApplication);
  const [selected, setSelected] = React.useState(types[0]!.id);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  function translateError(message: string) {
    const lt = errorMessages[message];
    return lt ? t(lt) : message;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const values = {
      fullName: String(fd.get("fullName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? "") || undefined,
      membershipType: selected,
      institution: String(fd.get("institution") ?? "") || undefined,
      statement: String(fd.get("statement") ?? ""),
    };
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await submitFn({ data: parsed.data });
      toast.success(t({ en: "Application submitted!", bn: "আবেদন সফলভাবে জমা হয়েছে!", ar: "تم تقديم الطلب بنجاح!" }));
      form.reset();
    } catch {
      toast.error(t({ en: "Failed to submit. Please try again.", bn: "জমা দেওয়া যায়নি। আবার চেষ্টা করুন।", ar: "فشل التقديم. يرجى المحاولة مرة أخرى." }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow={t({ en: "Join Us", bn: "আমাদের সাথে যুক্ত হোন", ar: "انضم إلينا" })}
        title={t({ en: "Membership", bn: "সদস্যপদ", ar: "العضوية" })}
        subtitle={t({
          en: "Become part of a community committed to preserving and renewing Islamic scholarship — as a donor, fellow, volunteer or intern.",
          bn: "ইসলামি জ্ঞানচর্চা সংরক্ষণ ও পুনর্জাগরণে নিবেদিত একটি সম্প্রদায়ের অংশ হোন — একজন দাতা, ফেলো, স্বেচ্ছাসেবক বা ইন্টার্ন হিসেবে।",
          ar: "كن جزءًا من مجتمع ملتزم بالحفاظ على العلم الإسلامي وتجديده — كمتبرع، أو زميل، أو متطوع، أو متدرب.",
        })}
      />

      <section className="container mx-auto px-6 pb-16">
        <SectionHeading
          title={t({ en: "Membership Categories", bn: "সদস্যপদের বিভাগসমূহ", ar: "فئات العضوية" })}
          description={t({ en: "Select a category below to apply.", bn: "আবেদন করতে নিচের একটি বিভাগ নির্বাচন করুন।", ar: "اختر فئة أدناه للتقديم." })}
        />
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {types.map((typ, i) => (
            <motion.button
              key={typ.id}
              type="button"
              onClick={() => setSelected(typ.id)}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`rounded-2xl border p-6 text-left transition-all hover:-translate-y-1 hover:shadow-lg ${selected === typ.id ? "border-accent bg-accent/10" : "border-primary/10 bg-card"}`}
            >
              <typ.icon className={`mb-4 h-6 w-6 ${selected === typ.id ? "text-accent" : "text-primary"}`} />
              <h3 className="font-bold text-primary">{t(typ.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(typ.text)}</p>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="border-t border-primary/10 bg-primary/5 py-16">
        <div className="container mx-auto max-w-3xl px-6">
          <SectionHeading
            title={t({ en: "Application Form", bn: "আবেদন ফর্ম", ar: "نموذج الطلب" })}
            description={`${t({ en: "Applying for", bn: "আবেদন করা হচ্ছে", ar: "التقديم على" })}: ${t(types.find((typ) => typ.id === selected)!.title)}`}
          />
          <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-primary/10 bg-card p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <Label htmlFor="fullName">{t({ en: "Full Name", bn: "পূর্ণ নাম", ar: "الاسم الكامل" })}</Label>
                <Input id="fullName" name="fullName" placeholder={t({ en: "Your name", bn: "আপনার নাম", ar: "اسمك" })} className="mt-2" />
                {errors["fullName"] && <p className="mt-1 text-sm text-destructive">{translateError(errors["fullName"])}</p>}
              </div>
              <div>
                <Label htmlFor="email">{t({ en: "Email", bn: "ইমেইল", ar: "البريد الإلكتروني" })}</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" className="mt-2" />
                {errors["email"] && <p className="mt-1 text-sm text-destructive">{translateError(errors["email"])}</p>}
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <Label htmlFor="phone">{t({ en: "Phone (optional)", bn: "ফোন (ঐচ্ছিক)", ar: "الهاتف (اختياري)" })}</Label>
                <Input id="phone" name="phone" placeholder="+880…" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="institution">{t({ en: "Institution (optional)", bn: "প্রতিষ্ঠান (ঐচ্ছিক)", ar: "المؤسسة (اختياري)" })}</Label>
                <Input id="institution" name="institution" placeholder={t({ en: "University or organisation", bn: "বিশ্ববিদ্যালয় বা প্রতিষ্ঠান", ar: "الجامعة أو المؤسسة" })} className="mt-2" />
              </div>
            </div>
            <div>
              <Label htmlFor="statement">{t({ en: "Statement of Purpose", bn: "উদ্দেশ্যের বিবৃতি", ar: "بيان الغرض" })}</Label>
              <Textarea
                id="statement"
                name="statement"
                rows={6}
                placeholder={t({ en: "Tell us about your background and why you wish to join.", bn: "আপনার পটভূমি এবং কেন যোগ দিতে চান তা আমাদের জানান।", ar: "أخبرنا عن خلفيتك ولماذا ترغب في الانضمام." })}
                className="mt-2"
              />
              {errors["statement"] && <p className="mt-1 text-sm text-destructive">{translateError(errors["statement"])}</p>}
            </div>
            <Button type="submit" disabled={loading} className="w-full rounded-full py-6 text-base font-bold">
              {loading
                ? t({ en: "Submitting…", bn: "জমা দেওয়া হচ্ছে…", ar: "جارٍ الإرسال…" })
                : t({ en: "Submit Application", bn: "আবেদন জমা দিন", ar: "إرسال الطلب" })}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
