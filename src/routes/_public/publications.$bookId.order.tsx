import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getBookById, placeOrder } from "@/lib/books";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { z } from "zod";
import { useLanguage, type LocalizedText } from "@/lib/i18n";

const errorMessages = {
  nameMin: { en: "Please enter your full name", bn: "অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন", ar: "يرجى إدخال اسمك الكامل" },
  emailInvalid: { en: "Please enter a valid email address", bn: "একটি বৈধ ইমেইল ঠিকানা প্রদান করুন", ar: "يرجى إدخال بريد إلكتروني صحيح" },
  phoneMin: { en: "Phone number must be at least 10 digits", bn: "ফোন নম্বর কমপক্ষে ১০ অঙ্কের হতে হবে", ar: "يجب أن يتكون رقم الهاتف من عشرة أرقام على الأقل" },
  addressMin: { en: "Address must be at least 10 characters", bn: "ঠিকানা কমপক্ষে ১০ অক্ষরের হতে হবে", ar: "يجب أن يتكون العنوان من عشرة أحرف على الأقل" },
} satisfies Record<string, LocalizedText>;

export const Route = createFileRoute("/_public/publications/$bookId/order")({
  head: ({ loaderData }) => ({
    meta: [
      { property: "og:title", content: "Order a Book — Imam Shah Waliullah Dehlawi Research Institute" },
      { property: "og:description", content: "Submit a purchase order for institute publications." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: `Order ${(loaderData as any)?.title || "Book"} — ISWDRI` },
      { name: "description", content: "Place your order for ISWDRI publications." },
    ],
  }),
  loader: async ({ context, params }) => {
    return context.queryClient.ensureQueryData({
      queryKey: ["book", params.bookId],
      queryFn: () => getBookById({ data: { id: params.bookId } }),
    });
  },
  component: OrderFormPage,
});

function OrderFormPage() {
  const { t, lang } = useLanguage();
  const { bookId } = Route.useParams();
  const navigate = useNavigate();
  const { data: book } = useSuspenseQuery({
    queryKey: ["book", bookId],
    queryFn: () => getBookById({ data: { id: bookId } }),
  });

  const orderSchema = useMemo(
    () =>
      z.object({
        customerName: z.string().trim().min(2, t(errorMessages.nameMin)),
        customerEmail: z.string().trim().email(t(errorMessages.emailInvalid)),
        customerPhone: z.string().trim().min(10, t(errorMessages.phoneMin)).max(20),
        address: z.string().trim().min(10, t(errorMessages.addressMin)).max(500),
      }),
    [lang],
  );

  const placeOrderFn = useServerFn(placeOrder);
  const [isOrdering, setIsOrdering] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const parsed = orderSchema.safeParse({
      customerName: formData.get("name"),
      customerEmail: formData.get("email"),
      customerPhone: formData.get("phone"),
      address: formData.get("address"),
    });

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        fieldErrors[String(issue.path[0])] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error(
        t({ en: "Please correct the highlighted fields.", bn: "অনুগ্রহ করে চিহ্নিত ঘরগুলো সংশোধন করুন।", ar: "يرجى تصحيح الحقول المحددة." }),
      );
      return;
    }

    setErrors({});
    setIsOrdering(true);

    try {
      await placeOrderFn({
        data: { bookId: book!.id, ...parsed.data, quantity: 1 },
      });
      toast.success(
        t({ en: "Order placed successfully!", bn: "অর্ডারটি সফলভাবে দেওয়া হয়েছে!", ar: "تم تقديم الطلب بنجاح!" }),
      );
      navigate({ to: "/publications/$bookId/thank-you", params: { bookId: book!.id } });
    } catch (error) {
      console.error(error);
      toast.error(
        t({ en: "Failed to place order. Please try again.", bn: "অর্ডার দেওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।", ar: "فشل تقديم الطلب. يرجى المحاولة مرة أخرى." }),
      );
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-2xl">
      <Link
        to="/publications/$bookId"
        params={{ bookId }}
        className="inline-flex items-center gap-2 text-primary hover:text-accent font-medium mb-10 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t({ en: "Back to Details", bn: "বিবরণে ফিরে যান", ar: "العودة إلى التفاصيل" })}
      </Link>

      <div className="bg-card rounded-3xl border border-primary/10 p-8 md:p-12 shadow-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-16 w-12 rounded-lg overflow-hidden border border-primary/10 shadow-sm flex-shrink-0">
            <img src={book!.coverUrl || ""} alt="" className="h-full w-full object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary leading-tight">
              {t({ en: "Order Confirmation", bn: "অর্ডার নিশ্চিতকরণ", ar: "تأكيد الطلب" })}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t({ en: "You are ordering:", bn: "আপনি অর্ডার করছেন:", ar: "أنت تطلب:" })}{" "}
              <span className="font-bold text-accent">{book!.title}</span>
            </p>
          </div>
        </div>

        <form onSubmit={handleOrder} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-primary/60 px-1">
                {t({ en: "Full Name", bn: "পূর্ণ নাম", ar: "الاسم الكامل" })}
              </label>
              <Input name="name" required placeholder="John Doe" className="h-12 rounded-xl border-primary/10 focus:ring-accent" />
              {errors["customerName"] && (
                <p className="text-xs text-destructive px-1">{errors["customerName"]}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-primary/60 px-1">
                {t({ en: "Email Address", bn: "ইমেইল ঠিকানা", ar: "البريد الإلكتروني" })}
              </label>
              <Input name="email" type="email" required placeholder="john@example.com" className="h-12 rounded-xl border-primary/10 focus:ring-accent" />
              {errors["customerEmail"] && (
                <p className="text-xs text-destructive px-1">{errors["customerEmail"]}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-primary/60 px-1">
              {t({ en: "Phone Number", bn: "ফোন নম্বর", ar: "رقم الهاتف" })}
            </label>
            <Input name="phone" type="tel" required minLength={10} placeholder="+880 1234 567890" className="h-12 rounded-xl border-primary/10 focus:ring-accent" />
            {errors["customerPhone"] && (
              <p className="text-xs text-destructive px-1">{errors["customerPhone"]}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-primary/60 px-1">
              {t({ en: "Full Shipping Address", bn: "সম্পূর্ণ শিপিং ঠিকানা", ar: "عنوان الشحن الكامل" })}
            </label>
            <Textarea
              name="address"
              required
              minLength={10}
              placeholder={t({ en: "House, Road, Area, City, Postcode", bn: "বাড়ি, রোড, এলাকা, শহর, পোস্টকোড", ar: "المنزل، الشارع، المنطقة، المدينة، الرمز البريدي" })}
              className="rounded-xl border-primary/10 focus:ring-accent min-h-[120px]"
            />
            {errors["address"] && (
              <p className="text-xs text-destructive px-1">{errors["address"]}</p>
            )}
          </div>

          <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-center justify-between">
            <span className="font-bold text-primary">
              {t({ en: "Total Payable (৳)", bn: "মোট প্রদেয় (৳)", ar: "المجموع المستحق (৳)" })}
            </span>
            <span className="text-2xl font-black text-primary">৳{book!.price}</span>
          </div>

          <Button
            type="submit"
            disabled={isOrdering}
            className="w-full h-16 bg-primary text-white text-lg font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all"
          >
            {isOrdering
              ? t({ en: "Processing Order...", bn: "অর্ডার প্রক্রিয়াকরণ চলছে...", ar: "جارٍ معالجة الطلب..." })
              : t({ en: "Confirm Purchase Order", bn: "ক্রয় আদেশ নিশ্চিত করুন", ar: "تأكيد طلب الشراء" })}
          </Button>

          <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest">
            <ShoppingCart className="w-3 h-3" />
            <span>{t({ en: "Secure Checkout", bn: "নিরাপদ চেকআউট", ar: "دفع آمن" })}</span>
          </div>
        </form>
      </div>
    </div>
  );
}
