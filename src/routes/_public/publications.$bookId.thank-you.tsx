import { createFileRoute, Link } from "@tanstack/react-router";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home } from "lucide-react";

export const Route = createFileRoute("/_public/publications/$bookId/thank-you")({
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
