import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";
import { submitCourseEnrollment } from "@/lib/courses";

export const Route = createFileRoute("/_public/short-courses/enroll")({
  head: () => ({
    meta: [
      { title: "Enrol in a Course — ISWDRI" },
      { name: "description", content: "Submit your enrolment application for a short course at ISWDRI." },
    ],
  }),
  validateSearch: z.object({ course: z.string().optional() }),
  component: EnrollPage,
});

const schema = z.object({
  full_name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  course: z.string().min(1),
  education: z.string().optional(),
  message: z.string().optional(),
});

function EnrollPage() {
  const { t } = useLanguage();
  const { course: preselectedCourse } = Route.useSearch();
  const submitFn = useServerFn(submitCourseEnrollment);
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const values = {
      full_name: String(fd.get("full_name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      course: String(fd.get("course") ?? ""),
      education: String(fd.get("education") ?? "") || undefined,
      message: String(fd.get("message") ?? "") || undefined,
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
      setSubmitted(true);
      toast.success(t({ en: "Application submitted!", bn: "আবেদন সফলভাবে জমা হয়েছে!", ar: "تم تقديم الطلب بنجاح!" }));
    } catch {
      toast.error(t({ en: "Failed to submit. Please try again.", bn: "জমা দেওয়া যায়নি। আবার চেষ্টা করুন।", ar: "فشل التقديم. يرجى المحاولة مرة أخرى." }));
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="container mx-auto max-w-xl px-6 py-24 text-center">
        <div className="rounded-2xl border border-primary/10 bg-card p-10">
          <h2 className="text-2xl font-bold text-primary">
            {t({ en: "Thank you!", bn: "আপনাকে ধন্যবাদ!", ar: "شكراً لك!" })}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t({
              en: "Your enrolment application has been received. Our team will contact you within 2–3 working days.",
              bn: "আপনার নথিভুক্তি আবেদন পাওয়া গেছে। আমাদের দল ২–৩ কার্যদিবসের মধ্যে আপনার সাথে যোগাযোগ করবে।",
              ar: "تم استلام طلب تسجيلك. سيتواصل فريقنا معك خلال ٢–٣ أيام عمل.",
            })}
          </p>
          <Button asChild className="mt-8 rounded-full" size="lg">
            <Link to="/short-courses">
              {t({ en: "Browse More Courses", bn: "আরও কোর্স দেখুন", ar: "تصفح المزيد من الدورات" })}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-primary/10 bg-primary/5 py-6">
        <div className="container mx-auto px-6">
          <Link to="/short-courses" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            {t({ en: "All Courses", bn: "সব কোর্স", ar: "جميع الدورات" })}
          </Link>
        </div>
      </div>

      <div className="container mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-3xl font-bold text-primary">
          {t({ en: "Course Enrolment", bn: "কোর্সে নথিভুক্তি", ar: "التسجيل في الدورة" })}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {t({ en: "Fill in the form below and our team will confirm your place.", bn: "নিচের ফর্মটি পূরণ করুন এবং আমাদের দল আপনার আসন নিশ্চিত করবে।", ar: "يُرجى ملء النموذج أدناه وسيؤكد فريقنا مكانك." })}
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5 rounded-2xl border border-primary/10 bg-card p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="full_name">{t({ en: "Full Name", bn: "পূর্ণ নাম", ar: "الاسم الكامل" })}</Label>
              <Input id="full_name" name="full_name" className="mt-2" />
              {errors["full_name"] && <p className="mt-1 text-sm text-destructive">{errors["full_name"]}</p>}
            </div>
            <div>
              <Label htmlFor="email">{t({ en: "Email", bn: "ইমেইল", ar: "البريد الإلكتروني" })}</Label>
              <Input id="email" name="email" type="email" className="mt-2" />
              {errors["email"] && <p className="mt-1 text-sm text-destructive">{errors["email"]}</p>}
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="phone">{t({ en: "Phone", bn: "ফোন", ar: "الهاتف" })}</Label>
              <Input id="phone" name="phone" placeholder="+880…" className="mt-2" />
              {errors["phone"] && <p className="mt-1 text-sm text-destructive">{errors["phone"]}</p>}
            </div>
            <div>
              <Label htmlFor="course">{t({ en: "Course", bn: "কোর্স", ar: "الدورة" })}</Label>
              <Input id="course" name="course" defaultValue={preselectedCourse ?? ""} className="mt-2" />
              {errors["course"] && <p className="mt-1 text-sm text-destructive">{errors["course"]}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="education">{t({ en: "Education Background (optional)", bn: "শিক্ষাগত যোগ্যতা (ঐচ্ছিক)", ar: "الخلفية التعليمية (اختياري)" })}</Label>
            <Input id="education" name="education" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="message">{t({ en: "Message (optional)", bn: "বার্তা (ঐচ্ছিক)", ar: "رسالة (اختياري)" })}</Label>
            <Textarea id="message" name="message" rows={4} className="mt-2" />
          </div>
          <Button type="submit" disabled={loading} className="w-full rounded-full py-6 text-base font-bold">
            {loading
              ? t({ en: "Submitting…", bn: "জমা দেওয়া হচ্ছে…", ar: "جارٍ الإرسال…" })
              : t({ en: "Submit Application", bn: "আবেদন জমা দিন", ar: "إرسال الطلب" })}
          </Button>
        </form>
      </div>
    </div>
  );
}
