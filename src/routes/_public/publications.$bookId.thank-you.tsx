import { createFileRoute, Link } from "@tanstack/react-router";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home } from "lucide-react";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_public/publications/$bookId/thank-you")({
  head: ({ params }) => seo({
    title: "Thank You — Order Confirmed | ISWDRI",
    description: "Your book order has been confirmed. Thank you for your purchase.",
    path: `/publications/${params.bookId}/thank-you`,
    noindex: true,
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center space-y-4">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
        <h1 className="text-2xl font-bold text-primary">{t({ en: "Thank You!", bn: "ধন্যবাদ!", ar: "شكراً!" })}</h1>
        <Link to="/"><Button variant="outline"><Home className="w-4 h-4 mr-2" />{t({ en: "Home", bn: "হোম", ar: "الرئيسية" })}</Button></Link>
      </div>
    </div>
  );
}
