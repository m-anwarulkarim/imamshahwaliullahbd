import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Menu, ChevronDown, MoreHorizontal } from "lucide-react";
// logoAsset import removed to use local public path directly for better production reliability
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { LanguageSwitcher, LanguagePills } from "@/components/layout/LanguageSwitcher";

const navLinks = [
  { to: "/", label: { en: "Home", bn: "হোম", ar: "الرئيسية" } },
  { to: "/about", label: { en: "About", bn: "পরিচিতি", ar: "عن المعهد" } },
  { to: "/administration", label: { en: "Administration", bn: "প্রশাসন", ar: "الإدارة" } },
  { to: "/academic", label: { en: "Academic", bn: "একাডেমিক", ar: "الأكاديمية" } },
  { to: "/research", label: { en: "Research", bn: "গবেষণা", ar: "البحوث" } },
  { to: "/academic-partners", label: { en: "Partners", bn: "সহযোগী", ar: "الشركاء" } },
  { to: "/publications", label: { en: "Publications", bn: "প্রকাশনা", ar: "المنشورات" } },
  { to: "/magazine", label: { en: "Magazine", bn: "পত্রিকা", ar: "المجلة" } },
  { to: "/digital-library", label: { en: "Library", bn: "লাইব্রেরি", ar: "المكتبة" } },
  { to: "/shah-waliullah-portal", label: { en: "Portal", bn: "পোর্টাল", ar: "البوابة" } },
  { to: "/short-courses", label: { en: "Short Courses", bn: "শর্ট কোর্স", ar: "الدورات القصيرة" } },
  { to: "/training", label: { en: "Training", bn: "প্রশিক্ষণ", ar: "التدريب" } },
  { to: "/news-media", label: { en: "News", bn: "সংবাদ", ar: "الأخبار" } },
  { to: "/events", label: { en: "Events", bn: "কার্যক্রম", ar: "الفعاليات" } },
  { to: "/faq", label: { en: "FAQ", bn: "জিজ্ঞাসা", ar: "الأسئلة الشائعة" } },
  { to: "/membership", label: { en: "Membership", bn: "সদস্যপদ", ar: "العضوية" } },
  { to: "/contact", label: { en: "Contact", bn: "যোগাযোগ", ar: "اتصل بنا" } },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMoreOpen, setIsMoreOpen] = React.useState(false);
  const { t } = useLanguage();

  const visibleLinks = navLinks.slice(0, 5);
  const moreLinks = navLinks.slice(5);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-[1.02]">
          <img src="/logo.webp" alt="ISWDRI Logo" className="h-16 w-auto drop-shadow-sm rounded-full border border-primary/10 object-contain" />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-primary leading-none">ISWDRI</span>
            <span className="hidden text-[10px] font-medium uppercase tracking-widest text-primary/70 sm:block">
              {t({ en: "Research Institute", bn: "রিসার্চ ইনস্টিটিউট", ar: "معهد البحوث" })}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1">
          {visibleLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ className: "text-primary bg-primary/5 font-semibold" }}
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-all hover:bg-primary/5 hover:text-primary"
            >
              {t(link.label)}
            </Link>
          ))}

          {/* "More" Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsMoreOpen(true)}
            onMouseLeave={() => setIsMoreOpen(false)}
          >
            <DropdownMenu open={isMoreOpen} onOpenChange={setIsMoreOpen} modal={false}>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-all hover:bg-primary/5 hover:text-primary outline-none",
                    isMoreOpen && "bg-primary/5 text-primary"
                  )}
                >
                  {t({ en: "More", bn: "আরও", ar: "المزيد" })} <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isMoreOpen && "rotate-180")} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-[280px] border-primary/10 bg-card/95 backdrop-blur-xl p-3 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
              >
              <div className="grid grid-cols-2 gap-1">
                {moreLinks.map((link) => (
                  <DropdownMenuItem key={link.to} asChild className="p-0">
                    <Link
                      to={link.to}
                      onClick={() => setIsMoreOpen(false)}
                      activeProps={{ className: "text-primary bg-primary/5 font-semibold" }}
                      className="flex w-full cursor-pointer items-center rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-primary/5 hover:text-primary"
                    >
                      {t(link.label)}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

          <div className="ms-4 ps-4 border-s border-primary/10 flex items-center gap-2">
            <LanguageSwitcher />
            <Link to="/donate">
              <Button variant="default" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95">
                {t({ en: "Donate", bn: "দান করুন", ar: "تبرع" })}
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 xl:hidden">
          <LanguageSwitcher compact />
          <Link to="/donate" className="block">
            <Button variant="default" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-3 sm:px-4 text-[10px] sm:text-xs h-8 sm:h-9">
              {t({ en: "Donate", bn: "দান করুন", ar: "تبرع" })}
            </Button>
          </Link>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] border-r border-primary/10 bg-card p-0 sm:w-[350px]">
              <div className="flex flex-col h-full">
                <SheetHeader className="border-b border-primary/10 p-6 text-start">
                  <SheetTitle className="flex items-center gap-3">
                    <img src="/logo.webp" alt="ISWDRI Logo" className="h-16 w-auto rounded-full border border-primary/10" />
                    <span className="text-xl font-bold text-primary">ISWDRI</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex-1 overflow-y-auto py-6 px-4">
                  <LanguagePills className="mb-4" />
                  <div className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setIsOpen(false)}
                        activeProps={{ className: "bg-primary/10 text-primary font-bold" }}
                        className="flex items-center rounded-lg px-4 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary"
                      >
                        {t(link.label)}
                      </Link>
                    ))}
                  </div>
                </nav>
                <div className="border-t border-primary/10 p-6">
                  <Link to="/donate" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl py-6 text-lg font-bold shadow-lg shadow-primary/20">
                      {t({ en: "Support Our Research", bn: "আমাদের গবেষণায় সহায়তা করুন", ar: "ادعم أبحاثنا" })}
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
