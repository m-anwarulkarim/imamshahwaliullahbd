import { Smartphone, Landmark, Copy, Check, Building2, QrCode } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage, type LocalizedText } from "@/lib/i18n";

const mobileServices = ["bKash", "Nagad", "Rocket", "Selfin"];
const mobileNumber = "01774392665";

type BankAccount = {
  accountName: string;
  accountNo: string;
  bank: string;
  branch: string;
  routing?: string;
  swift?: string;
  /** Optional CDN QR-code image URL for scan-to-pay. */
  qrUrl?: string;
  /** Trilingual caption shown under the QR code. */
  qrCaption?: LocalizedText;
};

const bankAccounts: BankAccount[] = [
  {
    accountName: "Shah Waliullah Research Institute",
    accountNo: "20502740206064907 (MSA)",
    bank: "Islami Bank Bangladesh PLC.",
    branch: "Pallabi Branch, Dhaka-1216",
    routing: "125263580",
    swift: "IBBLBDDH274",
    qrUrl: "/islami-bank-qr.png",
    qrCaption: {
      en: "Scan for Payment from any payment Method",
      bn: "যেকোনো পেমেন্ট পদ্ধতি থেকে পেমেন্টের জন্য স্ক্যান করুন",
      ar: "امسح للدفع من أي طريقة دفع",
    },
  },
  {
    accountName: "Shah Waliullah Research Institute",
    accountNo: "0741220002561 (SND)",
    bank: "Al-Arafah Islami Bank PLC.",
    branch: "Mirpur-10 Branch, Dhaka-1216",
    routing: "015263137",
    swift: "ALARBDDH090",
  },
];

function CopyButton({ value, label }: { value: string; label: string }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(t({ en: `${label} copied`, bn: `${label} কপি করা হয়েছে`, ar: `تم نسخ ${label}` }));
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error(t({ en: "Could not copy", bn: "কপি করা যায়নি", ar: "تعذر النسخ" }));
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent/15 hover:text-accent"
      aria-label={`Copy ${label}`}
    >
      {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-emerald-50/80 last:border-0">
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground break-words">{value}</p>
      </div>
      <CopyButton value={value} label={label} />
    </div>
  );
}

export function PaymentDetails() {
  const { t } = useLanguage();
  const accountNoLabel = t({ en: "Account No.", bn: "হিসাব নং", ar: "رقم الحساب" });
  const bankLabel = t({ en: "Bank", bn: "ব্যাংক", ar: "البنك" });
  const branchLabel = t({ en: "Branch", bn: "শাখা", ar: "الفرع" });
  const routingLabel = t({ en: "Routing No.", bn: "রাউটিং নং", ar: "رقم التوجيه" });
  const swiftLabel = t({ en: "Swift Code", bn: "সুইফট কোড", ar: "رمز السويفت" });

  return (
    <section className="mt-16 scroll-mt-24" id="payment-details">
      <div className="text-center mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-2">
          {t({ en: "Payment Information", bn: "পেমেন্ট তথ্য", ar: "معلومات الدفع" })}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-primary font-display mb-3">
          {t({ en: "How to Send Your Contribution", bn: "কীভাবে আপনার অনুদান পাঠাবেন", ar: "كيفية إرسال تبرعكم" })}
        </h2>
        <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {t({
            en: "After submitting the donation form above, please complete your payment using any of the methods below. Send the transaction reference to our team for verification and receipt.",
            bn: "উপরের অনুদান ফর্মটি জমা দেওয়ার পর, অনুগ্রহ করে নিচের যেকোনো পদ্ধতিতে আপনার পেমেন্ট সম্পন্ন করুন। যাচাই ও রসিদের জন্য লেনদেনের রেফারেন্স আমাদের দলের কাছে পাঠান।",
            ar: "بعد إرسال نموذج التبرع أعلاه، يرجى إتمام الدفع باستخدام أي من الطرق أدناه. أرسل مرجع المعاملة إلى فريقنا للتحقق وإصدار الإيصال.",
          })}
        </p>
      </div>

      {/* Bank Accounts */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
          <Landmark className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-primary">{t({ en: "Bank Account Details", bn: "ব্যাংক হিসাবের বিবরণ", ar: "تفاصيل الحساب المصرفي" })}</h3>
          <p className="text-xs text-muted-foreground">{t({ en: "Choose the account that matches your donation purpose.", bn: "আপনার অনুদানের উদ্দেশ্যের সাথে সামঞ্জস্যপূর্ণ হিসাবটি নির্বাচন করুন।", ar: "اختر الحساب الذي يتوافق مع غرض تبرعك." })}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
        {bankAccounts.map((acc) => (
          <div
            key={acc.accountNo}
            className="group relative flex flex-col rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:border-accent/40"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <Building2 className="h-5 w-5" />
              </div>
              <h4 className="text-base font-bold text-primary leading-snug">{acc.accountName}</h4>
            </div>

            <div className="space-y-0">
              <DetailRow label={accountNoLabel} value={acc.accountNo} />
              <DetailRow label={bankLabel} value={acc.bank} />
              <DetailRow label={branchLabel} value={acc.branch} />
              {acc.routing && <DetailRow label={routingLabel} value={acc.routing} />}
              {acc.swift && <DetailRow label={swiftLabel} value={acc.swift} />}
            </div>

            {acc.qrUrl && acc.qrCaption && (
              <div className="mt-5 flex flex-col items-center rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 text-center">
                <div className="flex items-center gap-1.5 mb-2 text-emerald-700">
                  <QrCode className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {t({ en: "Scan to Pay", bn: "স্ক্যান করে পরিশোধ করুন", ar: "امسح للدفع" })}
                  </span>
                </div>
                <img
                  src={acc.qrUrl}
                  alt={t({ en: `${acc.bank} QR code`, bn: `${acc.bank} কিউআর কোড`, ar: `رمز QR ${acc.bank}` })}
                  className="h-40 w-40 rounded-lg border border-emerald-100 bg-white object-contain"
                  loading="lazy"
                />
                <p className="mt-3 text-xs font-medium text-emerald-800 leading-snug max-w-[15rem]">
                  {t(acc.qrCaption)}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Banking */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/80 via-white to-cream/40 p-6 md:p-8 shadow-sm mt-10">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
              <Smartphone className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-primary">{t({ en: "Mobile Banking", bn: "মোবাইল ব্যাংকিং", ar: "الخدمات المصرفية عبر الهاتف المحمول" })}</h3>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {mobileServices.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 md:text-end">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{t({ en: "Send Money Number", bn: "সেন্ড মানি নম্বর", ar: "رقم إرسال الأموال" })}</p>
            <div className="flex items-center gap-2 md:justify-end">
              <span className="text-2xl font-bold tracking-wide text-primary font-display">
                {mobileNumber}
              </span>
              <CopyButton value={mobileNumber} label={t({ en: "Mobile number", bn: "মোবাইল নম্বর", ar: "رقم الهاتف" })} />
            </div>
          </div>
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {t({
          en: "For any payment-related assistance, please contact our team — we are happy to help you complete your contribution and will issue a receipt upon verification.",
          bn: "পেমেন্ট সংক্রান্ত যেকোনো সহায়তার জন্য, অনুগ্রহ করে আমাদের দলের সাথে যোগাযোগ করুন — আমরা আপনার অনুদান সম্পন্ন করতে সাহায্য করতে পেরে আনন্দিত হব এবং যাচাইয়ের পর একটি রসিদ ইস্যু করব।",
          ar: "لأي مساعدة تتعلق بالدفع، يرجى التواصل مع فريقنا — يسعدنا مساعدتكم على إتمام تبرعكم وسنصدر إيصالاً بعد التحقق.",
        })}
      </p>
    </section>
  );
}
