import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Heart } from "lucide-react";
import { useLanguage, type LocalizedText } from "@/lib/i18n";
import { submitDonation } from "@/lib/community";

const errorMessages = {
  fullNameMin: { en: "Full name must be at least 2 characters", bn: "পূর্ণ নাম কমপক্ষে ২ অক্ষরের হতে হবে", ar: "يجب أن يتكون الاسم الكامل من حرفين على الأقل" },
  emailInvalid: { en: "Invalid email address", bn: "অবৈধ ইমেইল ঠিকানা", ar: "بريد إلكتروني غير صالح" },
  phoneMin: { en: "Phone number must be at least 10 characters", bn: "ফোন নম্বর কমপক্ষে ১০ অক্ষরের হতে হবে", ar: "يجب أن يتكون رقم الهاتف من عشرة أحرف على الأقل" },
  amountPositive: { en: "Amount must be greater than 0", bn: "পরিমাণ ০ এর চেয়ে বেশি হতে হবে", ar: "يجب أن يكون المبلغ أكبر من 0" },
  donationTypeRequired: { en: "Please select a donation type", bn: "অনুগ্রহ করে অনুদানের ধরন নির্বাচন করুন", ar: "يرجى اختيار نوع التبرع" },
} satisfies Record<string, LocalizedText>;

export function DonationForm() {
  const { t, lang } = useLanguage();
  const submitFn = useServerFn(submitDonation);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const donationFormSchema = useMemo(
    () =>
      z.object({
        fullName: z.string().min(2, t(errorMessages.fullNameMin)),
        email: z.string().email(t(errorMessages.emailInvalid)),
        phone: z.string().min(10, t(errorMessages.phoneMin)),
        amount: z.coerce.number().positive(t(errorMessages.amountPositive)),
        donationType: z.string().min(1, t(errorMessages.donationTypeRequired)),
        message: z.string().optional(),
      }),
    [lang],
  );

  type DonationFormValues = z.infer<typeof donationFormSchema>;

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      amount: 0,
      donationType: "general",
      message: "",
    },
  });

  const onSubmit = async (data: DonationFormValues) => {
    setIsSubmitting(true);
    try {
      await submitFn({ data });
      toast.success(t({ en: "Donation recorded! Our team will contact you for payment.", bn: "অনুদান নথিভুক্ত হয়েছে! পেমেন্টের জন্য আমাদের দল যোগাযোগ করবে।", ar: "تم تسجيل التبرع! سيتواصل فريقنا معك للدفع." }));
      form.reset();
    } catch {
      toast.error(t({ en: "Failed to submit. Please try again.", bn: "জমা দেওয়া যায়নি। আবার চেষ্টা করুন।", ar: "فشل الإرسال. يرجى المحاولة مرة أخرى." }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const amountPresets = [500, 1000, 5000, 10000];

  const donationTypes: { value: string; label: LocalizedText }[] = [
    { value: "general", label: { en: "General Donation", bn: "সাধারণ অনুদান", ar: "تبرع عام" } },
    { value: "research", label: { en: "Research Fund", bn: "গবেষণা তহবিল", ar: "صندوق البحث" } },
    { value: "zakat", label: { en: "Zakat", bn: "যাকাত", ar: "الزكاة" } },
    { value: "sadaqah", label: { en: "Sadaqah Jariyah", bn: "সদকায়ে জারিয়া", ar: "صدقة جارية" } },
    { value: "library", label: { en: "Library Development", bn: "লাইব্রেরি উন্নয়ন", ar: "تطوير المكتبة" } },
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-emerald-100">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
          <Heart className="text-emerald-600 w-6 h-6" />
        </div>
        <CardTitle className="text-2xl font-bold text-primary">{t({ en: "Support Our Research", bn: "আমাদের গবেষণায় সহায়তা করুন", ar: "ادعم بحثنا" })}</CardTitle>
        <CardDescription>
          {t({ en: "Your contribution helps us preserve Islamic heritage and advance scholarly research.", bn: "আপনার অবদান আমাদেরকে ইসলামি ঐতিহ্য সংরক্ষণ করতে এবং জ্ঞানচর্চার অগ্রগতিতে সহায়তা করে।", ar: "مساهمتكم تساعدنا على الحفاظ على التراث الإسلامي وتطوير البحث العلمي." })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">{t({ en: "Full Name", bn: "পূর্ণ নাম", ar: "الاسم الكامل" })}</Label>
              <Input
                id="fullName"
                placeholder="Imam Waliullah"
                {...form.register("fullName")}
                className={form.formState.errors.fullName ? "border-destructive" : ""}
              />
              {form.formState.errors.fullName && (
                <p className="text-xs text-destructive">{form.formState.errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t({ en: "Email Address", bn: "ইমেইল ঠিকানা", ar: "البريد الإلكتروني" })}</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                {...form.register("email")}
                className={form.formState.errors.email ? "border-destructive" : ""}
              />
              {form.formState.errors.email && (
                <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">{t({ en: "Phone Number", bn: "ফোন নম্বর", ar: "رقم الهاتف" })}</Label>
              <Input
                id="phone"
                placeholder="+880 1XXX XXXXXX"
                {...form.register("phone")}
                className={form.formState.errors.phone ? "border-destructive" : ""}
              />
              {form.formState.errors.phone && (
                <p className="text-xs text-destructive">{form.formState.errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="donationType">{t({ en: "Donation Type", bn: "অনুদানের ধরন", ar: "نوع التبرع" })}</Label>
              <Select
                onValueChange={(value) => form.setValue("donationType", value)}
                defaultValue={form.getValues("donationType")}
              >
                <SelectTrigger id="donationType">
                  <SelectValue placeholder={t({ en: "Select type", bn: "ধরন নির্বাচন করুন", ar: "اختر النوع" })} />
                </SelectTrigger>
                <SelectContent>
                  {donationTypes.map((dt) => (
                    <SelectItem key={dt.value} value={dt.value}>{t(dt.label)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <Label htmlFor="amount">{t({ en: "Donation Amount (BDT)", bn: "অনুদানের পরিমাণ (টাকা)", ar: "مبلغ التبرع (تاكا)" })}</Label>
            <div className="grid grid-cols-4 gap-2">
              {amountPresets.map((preset) => (
                <Button
                  key={preset}
                  type="button"
                  variant="outline"
                  className={form.watch("amount") === preset ? "bg-emerald-50 border-emerald-600 text-emerald-700" : ""}
                  onClick={() => form.setValue("amount", preset)}
                >
                  {preset}
                </Button>
              ))}
            </div>
            <Input
              id="amount"
              type="number"
              placeholder={t({ en: "Enter custom amount", bn: "কাঙ্ক্ষিত পরিমাণ লিখুন", ar: "أدخل مبلغاً مخصصاً" })}
              {...form.register("amount")}
              className={form.formState.errors.amount ? "border-destructive" : ""}
            />
            {form.formState.errors.amount && (
              <p className="text-xs text-destructive">{form.formState.errors.amount.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t({ en: "Message (Optional)", bn: "বার্তা (ঐচ্ছিক)", ar: "رسالة (اختياري)" })}</Label>
            <Textarea
              id="message"
              placeholder={t({ en: "Any specific instructions or prayers...", bn: "কোনো নির্দিষ্ট নির্দেশনা বা দোয়া...", ar: "أي تعليمات أو أدعية محددة..." })}
              {...form.register("message")}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full text-lg h-12" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t({ en: "Processing...", bn: "প্রক্রিয়াকরণ চলছে...", ar: "جارٍ المعالجة..." })}
              </>
            ) : (
              t({ en: "Confirm Donation Detail", bn: "অনুদানের বিবরণ নিশ্চিত করুন", ar: "تأكيد تفاصيل التبرع" })
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-4">
            {t({ en: "After submitting, our team will contact you for payment verification and receipt.", bn: "জমা দেওয়ার পর, আমাদের দল পেমেন্ট যাচাই ও রসিদের জন্য আপনার সাথে যোগাযোগ করবে।", ar: "بعد الإرسال، سيتواصل معكم فريقنا للتحقق من الدفع وإصدار الإيصال." })}
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
