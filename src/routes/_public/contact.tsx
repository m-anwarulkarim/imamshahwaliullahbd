import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { z } from "zod";
import { PageHero, SectionHeading } from "@/components/layout/PageHero";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLanguage, type LocalizedText } from "@/lib/i18n";
import { submitContactMessage } from "@/lib/community";

export const Route = createFileRoute("/_public/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Imam Shah Waliullah Dehlawi Research Institute" },
      { name: "description", content: "Reach the institute for research enquiries, admissions, collaborations and media requests." },
      { property: "og:title", content: "Contact Us — Imam Shah Waliullah Dehlawi Research Institute" },
      { property: "og:description", content: "Office address, phone, email and a direct enquiry form." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const errorMessages = {
  nameMin: { en: "Name must be at least 2 characters", bn: "নাম কমপক্ষে ২ অক্ষরের হতে হবে", ar: "يجب أن يتكون الاسم من حرفين على الأقل" },
  emailInvalid: { en: "Please enter a valid email address", bn: "একটি বৈধ ইমেইল ঠিকানা প্রদান করুন", ar: "يرجى إدخال بريد إلكتروني صحيح" },
  subjectMin: { en: "Subject must be at least 3 characters", bn: "বিষয় কমপক্ষে ৩ অক্ষরের হতে হবে", ar: "يجب أن يتكون الموضوع من ثلاثة أحرف على الأقل" },
  messageMin: { en: "Message must be at least 10 characters", bn: "বার্তাটি কমপক্ষে ১০ অক্ষরের হতে হবে", ar: "يجب أن تتكون الرسالة من عشرة أحرف على الأقل" },
} satisfies Record<string, LocalizedText>;

const details: { icon: typeof MapPin; label: LocalizedText; value: string }[] = [
  { icon: MapPin, label: { en: "Address", bn: "ঠিকানা", ar: "العنوان" }, value: "বাসা-২০৬, রোড-১১, ব্লক-বি, মিরপুর-১২, পল্লবী, ঢাকা-১২১৬" },
  { icon: Phone, label: { en: "Phone", bn: "ফোন", ar: "الهاتف" }, value: "01743310744, 01774392665" },
  { icon: Mail, label: { en: "Email", bn: "ইমেইল", ar: "البريد الإلكتروني" }, value: "maqasidinstitutebd@gmail.com" },
  { icon: Clock, label: { en: "Office Hours", bn: "অফিস সময়", ar: "ساعات العمل" }, value: "Sunday – Thursday, 9:00 AM – 5:00 PM" },
];

function ContactPage() {
  const { t, lang } = useLanguage();
  const submitFn = useServerFn(submitContactMessage);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const schema = React.useMemo(
    () =>
      z.object({
        name: z.string().min(2, t(errorMessages.nameMin)),
        email: z.string().email(t(errorMessages.emailInvalid)),
        phone: z.string().optional(),
        subject: z.string().min(3, t(errorMessages.subjectMin)),
        message: z.string().min(10, t(errorMessages.messageMin)),
      }),
    [lang],
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const values = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? "") || undefined,
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
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
      toast.success(t({ en: "Message sent successfully!", bn: "বার্তা সফলভাবে পাঠানো হয়েছে!", ar: "تم إرسال الرسالة بنجاح!" }));
      form.reset();
    } catch {
      toast.error(t({ en: "Failed to send message. Please try again.", bn: "বার্তা পাঠানো যায়নি। আবার চেষ্টা করুন।", ar: "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى." }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow={t({ en: "Get in Touch", bn: "যোগাযোগ করুন", ar: "تواصل معنا" })}
        title={t({ en: "Contact Us", bn: "যোগাযোগ", ar: "اتصل بنا" })}
        subtitle={t({
          en: "For research enquiries, admissions, partnerships or media requests, our academic office will be glad to assist you.",
          bn: "গবেষণা সংক্রান্ত জিজ্ঞাসা, ভর্তি, অংশীদারিত্ব বা গণমাধ্যম সংক্রান্ত অনুরোধের জন্য আমাদের একাডেমিক দপ্তর আপনাকে সহায়তা করতে সদা প্রস্তুত।",
          ar: "لاستفسارات البحث، أو القبول، أو الشراكات، أو طلبات الإعلام، سيكون مكتبنا الأكاديمي سعيداً بمساعدتك.",
        })}
      />

      <section className="container mx-auto px-6 pb-20">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <SectionHeading title={t({ en: "Send an Enquiry", bn: "জিজ্ঞাসা পাঠান", ar: "أرسل استفسارًا" })} />
            <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-primary/10 bg-card p-8">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">{t({ en: "Full Name", bn: "পূর্ণ নাম", ar: "الاسم الكامل" })}</Label>
                  <Input id="name" name="name" placeholder={t({ en: "Your name", bn: "আপনার নাম", ar: "اسمك" })} className="mt-2" />
                  {errors["name"] && <p className="mt-1 text-sm text-destructive">{errors["name"]}</p>}
                </div>
                <div>
                  <Label htmlFor="email">{t({ en: "Email", bn: "ইমেইল", ar: "البريد الإلكتروني" })}</Label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" className="mt-2" />
                  {errors["email"] && <p className="mt-1 text-sm text-destructive">{errors["email"]}</p>}
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <Label htmlFor="phone">{t({ en: "Phone (optional)", bn: "ফোন (ঐচ্ছিক)", ar: "الهاتف (اختياري)" })}</Label>
                  <Input id="phone" name="phone" placeholder="+880…" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="subject">{t({ en: "Subject", bn: "বিষয়", ar: "الموضوع" })}</Label>
                  <Input id="subject" name="subject" placeholder={t({ en: "Reason for contact", bn: "যোগাযোগের কারণ", ar: "سبب التواصل" })} className="mt-2" />
                  {errors["subject"] && <p className="mt-1 text-sm text-destructive">{errors["subject"]}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="message">{t({ en: "Message", bn: "বার্তা", ar: "الرسالة" })}</Label>
                <Textarea id="message" name="message" rows={6} placeholder={t({ en: "How can we help you?", bn: "আমরা কীভাবে আপনাকে সাহায্য করতে পারি?", ar: "كيف يمكننا مساعدتك؟" })} className="mt-2" />
                {errors["message"] && <p className="mt-1 text-sm text-destructive">{errors["message"]}</p>}
              </div>
              <Button type="submit" disabled={loading} className="w-full rounded-full py-6 text-base font-bold">
                {loading ? t({ en: "Sending…", bn: "পাঠানো হচ্ছে…", ar: "جارٍ الإرسال…" }) : t({ en: "Send Message", bn: "বার্তা পাঠান", ar: "إرسال الرسالة" })}
              </Button>
            </form>
          </div>

          <div className="lg:col-span-2">
            <SectionHeading title={t({ en: "Institute Office", bn: "ইনস্টিটিউট কার্যালয়", ar: "مكتب المعهد" })} />
            <div className="space-y-4">
              {details.map((d) => (
                <div key={d.value} className="flex items-start gap-4 rounded-xl border border-primary/10 bg-card p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <d.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">{t(d.label)}</p>
                    <p className="mt-1 font-medium text-primary">{d.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-primary/10">
              <iframe
                title="Institute location map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=90.35%2C23.72%2C90.45%2C23.80&layer=mapnik"
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
