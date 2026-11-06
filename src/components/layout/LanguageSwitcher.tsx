import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGES, useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ compact = false, className }: { compact?: boolean; className?: string }) {
  const { lang, setLang } = useLanguage();
  const current = LANGUAGES.find((l) => l.code === lang) ?? { code: "en", label: "English", nativeLabel: "English", dir: "ltr" as const };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Change language"
          className={cn(
            "flex items-center gap-1.5 rounded-full border border-primary/15 bg-card/70 text-primary transition-all hover:bg-primary/5 hover:border-primary/30 outline-none",
            compact ? "h-8 px-2.5 text-[11px]" : "h-9 px-3 text-xs font-semibold",
            className,
          )}
        >
          <Globe className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
          <span>{current.nativeLabel}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px] border-primary/10 bg-card/95 backdrop-blur-xl p-1.5 shadow-xl">
        {LANGUAGES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLang(l.code)}
            className={cn(
              "cursor-pointer rounded-md px-3 py-2 text-sm flex items-center justify-between gap-3",
              lang === l.code && "bg-primary/10 text-primary font-semibold",
            )}
          >
            <span>{l.nativeLabel}</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{l.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** Inline pill group version used in the mobile sidebar */
export function LanguagePills({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  return (
    <div className={cn("flex items-center gap-1 rounded-full border border-primary/15 bg-primary/5 p-1", className)}>
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={cn(
            "flex-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
            lang === l.code
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-primary/70 hover:text-primary",
          )}
        >
          {l.nativeLabel}
        </button>
      ))}
    </div>
  );
}
