import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown,
  ShieldCheck,
  Star,
  HeartHandshake,
  Award,
  Users,
  Phone,
  MapPin,
  Copy,
  Check,
  Search,
  LayoutGrid,
  List as ListIcon,
  ChevronRight,
  UserCheck,
  Building,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Filter,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { PageHero, SectionHeading } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { getPublishedPatrons, type PatronsPayload } from "@/lib/patrons";
import type { PatronCategoryKey, PatronMember } from "@/lib/patrons";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_public/administration/patrons")({
  head: () =>
    seo({
      title: "Patron Council (পৃষ্ঠপোষক পরিষদ) — Imam Shah Waliullah Dehlawi Research Institute",
      description:
        "Patron Council of Imam Shah Waliullah Dehlawi Research Institute featuring 6 prestigious patron tiers, member directory, contact details and regional representations.",
      path: "/administration/patrons",
    }),
  loader: () => getPublishedPatrons(),
  component: PatronCouncilPage,
});

const categoryIcons: Record<PatronCategoryKey, React.ElementType> = {
  chief: Crown,
  founder: ShieldCheck,
  special: Star,
  life: HeartHandshake,
  honorary: Award,
  general: Users,
};

function PatronCouncilPage() {
  const { t, lang } = useLanguage();
  const rawData = Route.useLoaderData() as PatronsPayload | undefined;
  const data: PatronsPayload = rawData ?? {
    categories: [],
    patrons: [],
    stats: { totalPatrons: 0, totalCategories: 0, districtsCount: 0 },
    districts: [],
  };

  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = React.useState<string>("all");
  const [viewMode, setViewMode] = React.useState<"grid" | "table">("grid");
  const [copiedPhoneId, setCopiedPhoneId] = React.useState<string | null>(null);

  const pick = (item: { bn: string; en?: string | undefined; ar?: string | undefined } | undefined | null) => {
    if (!item) return "";
    if (lang === "en" && item.en) return item.en;
    if (lang === "ar" && item.ar) return item.ar;
    return item.bn;
  };

  const handleCopyPhone = (phone: string, id: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhoneId(id);
    toast.success(
      t({
        bn: `ফোন নম্বর কপি করা হয়েছে: ${phone}`,
        en: `Phone number copied: ${phone}`,
        ar: `تم نسخ رقم الهاتف: ${phone}`,
      }),
    );
    setTimeout(() => {
      setCopiedPhoneId(null);
    }, 2000);
  };

  // Filter patrons
  const filteredPatrons = React.useMemo(() => {
    return data.patrons.filter((p) => {
      // Category filter
      if (activeCategory !== "all" && p.category !== activeCategory) {
        return false;
      }
      // District filter
      if (selectedDistrict !== "all" && p.district.bn !== selectedDistrict) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch =
          p.name.bn.toLowerCase().includes(q) ||
          (p.name.en && p.name.en.toLowerCase().includes(q)) ||
          (p.name.ar && p.name.ar.toLowerCase().includes(q));
        const addressMatch =
          p.address.bn.toLowerCase().includes(q) ||
          (p.address.en && p.address.en.toLowerCase().includes(q)) ||
          p.district.bn.toLowerCase().includes(q);
        const phoneMatch = p.phone.toLowerCase().includes(q);
        const designationMatch =
          p.designation?.bn.toLowerCase().includes(q) ||
          (p.designation?.en && p.designation.en.toLowerCase().includes(q));

        return nameMatch || addressMatch || phoneMatch || designationMatch;
      }
      return true;
    });
  }, [data.patrons, activeCategory, selectedDistrict, searchQuery]);

  // Counts per category
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = { all: data.patrons.length };
    data.categories.forEach((c) => {
      counts[c.key] = data.patrons.filter((p) => p.category === c.key).length;
    });
    return counts;
  }, [data.patrons, data.categories]);

  const activeCategoryMeta = data.categories.find((c) => c.key === activeCategory);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero */}
      <PageHero
        eyebrow={t({
          en: "Governance & Administration",
          bn: "প্রশাসন ও পরিচালনা",
          ar: "الإدارة والحوكمة",
        })}
        title={t({
          en: "Patron Council",
          bn: "পৃষ্ঠপোষক পরিষদ",
          ar: "مجلس الرعاة والمؤسسين",
        })}
        subtitle={t({
          en: "The distinguished Patrons and Benefactors supporting the scholarly and educational mission of Imam Shah Waliullah Dehlawi Research Institute.",
          bn: "ইমাম শাহ ওয়ালীউল্লাহ দেহলভী (রহ.) রিসার্চ ইনস্টিটিউটের পৃষ্ঠপোষক পরিষদের সদস্যবৃন্দ—যাঁদের পৃষ্ঠপোষকতা ও দোয়ায় প্রতিষ্ঠানটি ইলম ও গবেষণার খেদমতে এগিয়ে চলেছে।",
          ar: "أعضاء مجلس رعاة معهد الإمام شاه ولي الله الدهلوي للبحوث، الذين يسهمون في دعم مسيرته العلمية والفكرية.",
        })}
      />

      {/* Breadcrumb Navigation */}
      <div className="border-b border-primary/10 bg-card/60 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              {t({ en: "Home", bn: "হোম", ar: "الرئيسية" })}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/administration" className="hover:text-primary transition-colors">
              {t({ en: "Administration", bn: "প্রশাসন", ar: "الإدارة" })}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium text-primary">
              {t({ en: "Patron Council", bn: "পৃষ্ঠপোষক পরিষদ", ar: "مجلس الرعاة" })}
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 pt-10">
        {/* Statistics Bar */}
        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <div className="rounded-2xl border border-primary/10 bg-card p-4 sm:p-5 shadow-sm text-center">
            <p className="text-2xl sm:text-3xl font-extrabold text-primary">
              {data.stats.totalPatrons}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {t({ en: "Total Patrons", bn: "মোট পৃষ্ঠপোষক", ar: "إجمالي الرعاة" })}
            </p>
          </div>
          <div className="rounded-2xl border border-primary/10 bg-card p-4 sm:p-5 shadow-sm text-center">
            <p className="text-2xl sm:text-3xl font-extrabold text-accent">
              {data.stats.totalCategories}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {t({ en: "Patron Categories", bn: "সদস্য ক্যাটাগরি", ar: "فئات الرعاة" })}
            </p>
          </div>
          <div className="rounded-2xl border border-primary/10 bg-card p-4 sm:p-5 shadow-sm text-center">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {data.stats.districtsCount}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {t({ en: "Districts & Regions", bn: "জেলা ও অঞ্চল", ar: "المناطق والمحافظات" })}
            </p>
          </div>
          <div className="rounded-2xl border border-primary/10 bg-card p-4 sm:p-5 shadow-sm text-center">
            <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
              ১০০%
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {t({ en: "Verified Directory", bn: "যাচাইকৃত তালিকা", ar: "دليل موثق" })}
            </p>
          </div>
        </div>

        {/* 6 Category Tabs Filter */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t({
                en: "Filter by Member Category (6 Tiers)",
                bn: "সদস্য ক্যাটাগরি অনুসারে ফিল্টার (৬টি স্তর)",
                ar: "تصفية حسب فئة الأعضاء (٦ فئات)",
              })}
            </h2>
            {activeCategory !== "all" && (
              <button
                onClick={() => setActiveCategory("all")}
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                <X className="h-3 w-3" />
                {t({ en: "Clear filter", bn: "সকল ক্যাটাগরি দেখুন", ar: "إلغاء التصفية" })}
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {/* All tab */}
            <button
              onClick={() => setActiveCategory("all")}
              className={cn(
                "group relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all shadow-sm",
                activeCategory === "all"
                  ? "bg-primary text-primary-foreground shadow-primary/20"
                  : "bg-card border border-primary/10 text-foreground/80 hover:bg-primary/5 hover:text-primary",
              )}
            >
              <Users className="h-4 w-4" />
              <span>{t({ en: "All Patrons", bn: "সকল সদস্য", ar: "جميع الرعاة" })}</span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-semibold",
                  activeCategory === "all"
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-primary/10 text-primary",
                )}
              >
                {categoryCounts["all"]}
              </span>
            </button>

            {/* 6 Categories */}
            {data.categories.map((cat) => {
              const Icon = categoryIcons[cat.key] || Users;
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={cn(
                    "group relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all shadow-sm",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-primary/20 font-semibold"
                      : "bg-card border border-primary/10 text-foreground/80 hover:bg-primary/5 hover:text-primary",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-transform group-hover:scale-110",
                      isActive ? "text-primary-foreground" : cat.textColor,
                    )}
                  />
                  <span>{pick(cat.label)}</span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-semibold",
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-primary/10 text-primary",
                    )}
                  >
                    {categoryCounts[cat.key] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active category description banner */}
          {activeCategoryMeta && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "mt-4 rounded-xl border p-4 text-sm flex items-start gap-3",
                activeCategoryMeta.badgeBg,
                activeCategoryMeta.badgeBorder,
              )}
            >
              {(() => {
                const Icon = categoryIcons[activeCategoryMeta.key] || Users;
                return <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", activeCategoryMeta.textColor)} />;
              })()}
              <div>
                <p className={cn("font-bold", activeCategoryMeta.textColor)}>
                  {pick(activeCategoryMeta.label)}
                </p>
                <p className="text-muted-foreground mt-0.5">
                  {pick(activeCategoryMeta.description)}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Search, District Filter & View Toggle Bar */}
        <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-primary/10 bg-card p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t({
                en: "Search by name, address, phone number or title...",
                bn: "নাম, ঠিকানা, ফোন নম্বর বা পদবি লিখে খুঁজুন...",
                ar: "ابحث بالاسم، العنوان، رقم الهاتف...",
              })}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-9 bg-background/60 border-primary/15 rounded-xl h-10 text-sm focus-visible:ring-primary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Right controls: District select & View mode */}
          <div className="flex items-center gap-3">
            {/* District Filter */}
            <div className="flex items-center gap-2 shrink-0">
              <Filter className="h-4 w-4 text-muted-foreground hidden sm:block" />
              <select
                aria-label={t({ en: "Filter by district", bn: "জেলা নির্বাচন করুন", ar: "اختر المحافظة" })}
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="h-10 rounded-xl border border-primary/15 bg-background/60 px-3 py-1.5 text-xs sm:text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">
                  {t({ en: "All Districts", bn: "সকল জেলা", ar: "جميع المناطق" })}
                </option>
                {data.districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-xl border border-primary/15 bg-muted/40 p-1 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-label={t({ en: "Grid View", bn: "গ্রিড কার্ড ভিউ", ar: "عرض شبكي" })}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
                  viewMode === "grid"
                    ? "bg-card text-primary shadow-sm font-semibold"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden sm:inline">{t({ en: "Cards", bn: "কার্ড", ar: "بطاقات" })}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                aria-label={t({ en: "Directory Table View", bn: "টেবিল ভিউ", ar: "عرض جدولي" })}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
                  viewMode === "table"
                    ? "bg-card text-primary shadow-sm font-semibold"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <ListIcon className="h-4 w-4" />
                <span className="hidden sm:inline">{t({ en: "Table", bn: "টেবিল", ar: "جدول" })}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results summary bar */}
        <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground px-1">
          <p>
            {t({
              en: `Showing ${filteredPatrons.length} of ${data.patrons.length} patrons`,
              bn: `মোট ${data.patrons.length} জনের মধ্যে ${filteredPatrons.length} জন সদস্য প্রদর্শিত হচ্ছে`,
              ar: `يتم عرض ${filteredPatrons.length} من إجمالي ${data.patrons.length} راعٍ`,
            })}
          </p>
          {(searchQuery || activeCategory !== "all" || selectedDistrict !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
                setSelectedDistrict("all");
              }}
              className="text-primary hover:underline font-medium"
            >
              {t({ en: "Reset all filters", bn: "সব ফিল্টার রিসেট করুন", ar: "إعادة تعيين الكل" })}
            </button>
          )}
        </div>

        {/* Content: Grid Cards View vs Table View */}
        {filteredPatrons.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-primary/20 bg-card/50 p-12 text-center">
            <Users className="mx-auto h-12 w-12 text-muted-foreground/40" />
            <h3 className="mt-4 text-base font-bold text-foreground">
              {t({
                en: "No patrons found",
                bn: "কোনো পৃষ্ঠপোষক সদস্য পাওয়া যায়নি",
                ar: "لم يتم العثور على أي راعٍ",
              })}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {t({
                en: "Try searching with a different name, district or clear the filters.",
                bn: "ভিন্ন নাম বা জেলা লিখে অনুসন্ধান করুন অথবা ফিল্টার রিসেট করুন।",
                ar: "جرب البحث باسم آخر أو أعد ضبط خيارات التصفية.",
              })}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
                setSelectedDistrict("all");
              }}
            >
              {t({ en: "Clear Filters", bn: "ফিল্টার মুছুন", ar: "مسح التصفية" })}
            </Button>
          </div>
        ) : viewMode === "grid" ? (
          /* Grid Cards View */
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filteredPatrons.map((patron, idx) => {
                const catMeta = data.categories.find((c) => c.key === patron.category);
                const Icon = categoryIcons[patron.category] || Users;
                const isCopied = copiedPhoneId === patron.id;

                return (
                  <motion.div
                    key={patron.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, delay: Math.min(idx * 0.03, 0.3) }}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-primary/10 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl"
                  >
                    {/* Top card bar: Category badge & Icon */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <Badge
                          variant="outline"
                          className={cn(
                            "flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg",
                            catMeta?.badgeBg,
                            catMeta?.badgeBorder,
                            catMeta?.textColor,
                          )}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          <span>{pick(catMeta?.label)}</span>
                        </Badge>

                        <span className="text-[11px] font-medium text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-md">
                          {pick(patron.district)}
                        </span>
                      </div>

                      {/* Header with avatar + Name */}
                      <div className="flex items-start gap-3.5 mb-3">
                        {patron.avatarUrl ? (
                          <img
                            src={patron.avatarUrl}
                            alt={pick(patron.name)}
                            className="h-13 w-13 rounded-full border-2 border-primary/20 object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/20 border border-primary/15 text-primary font-bold text-lg shadow-inner">
                            {patron.name.bn.slice(0, 2)}
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base sm:text-lg text-primary leading-tight group-hover:text-accent transition-colors">
                            {pick(patron.name)}
                          </h3>
                          {patron.designation && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                              {pick(patron.designation)}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Address detail */}
                      <div className="mt-4 pt-3 border-t border-primary/10 space-y-2 text-xs text-foreground/80">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{pick(patron.address)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom: Phone & Contact actions */}
                    <div className="mt-5 pt-3 border-t border-primary/10">
                      <div className="flex items-center justify-between gap-2 bg-muted/40 rounded-xl p-2.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <Phone className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-foreground truncate">
                            {patron.phone}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {/* Copy button */}
                          <button
                            type="button"
                            onClick={() => handleCopyPhone(patron.phone, patron.id)}
                            title={t({ en: "Copy phone", bn: "নম্বর কপি করুন", ar: "نسخ الرقم" })}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-background hover:text-foreground transition-colors"
                          >
                            {isCopied ? (
                              <Check className="h-4 w-4 text-emerald-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>

                          {/* Dial Call button */}
                          <a
                            href={`tel:${patron.phone.replace(/[^0-9+]/g, "")}`}
                            title={t({ en: "Call now", bn: "কল করুন", ar: "اتصال" })}
                            className="rounded-lg bg-primary/10 hover:bg-primary hover:text-primary-foreground p-1.5 text-primary transition-colors"
                          >
                            <Phone className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          /* Table View */
          <div className="overflow-hidden rounded-2xl border border-primary/10 bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-primary/10 bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3.5 w-12 text-center">#</th>
                    <th className="px-4 py-3.5">
                      {t({ en: "Patron Name & Designation", bn: "নাম ও পদবি", ar: "الاسم والمنصب" })}
                    </th>
                    <th className="px-4 py-3.5">
                      {t({ en: "Category", bn: "ক্যাটাগরি", ar: "الفئة" })}
                    </th>
                    <th className="px-4 py-3.5">
                      {t({ en: "Address", bn: "ঠিকানা ও জেলা", ar: "العنوان والمنطقة" })}
                    </th>
                    <th className="px-4 py-3.5 text-right">
                      {t({ en: "Contact Phone", bn: "মোবাইল নম্বর", ar: "رقم التواصل" })}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {filteredPatrons.map((patron, idx) => {
                    const catMeta = data.categories.find((c) => c.key === patron.category);
                    const Icon = categoryIcons[patron.category] || Users;
                    const isCopied = copiedPhoneId === patron.id;

                    return (
                      <tr
                        key={patron.id}
                        className="transition-colors hover:bg-primary/5 group"
                      >
                        <td className="px-4 py-4 text-center font-mono text-xs text-muted-foreground">
                          {idx + 1}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xs">
                              {patron.name.bn.slice(0, 2)}
                            </div>
                            <div>
                              <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                                {pick(patron.name)}
                              </p>
                              {patron.designation && (
                                <p className="text-xs text-muted-foreground line-clamp-1">
                                  {pick(patron.designation)}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <Badge
                            variant="outline"
                            className={cn(
                              "inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-md",
                              catMeta?.badgeBg,
                              catMeta?.badgeBorder,
                              catMeta?.textColor,
                            )}
                          >
                            <Icon className="h-3 w-3" />
                            <span>{pick(catMeta?.label)}</span>
                          </Badge>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-xs space-y-0.5 max-w-xs">
                            <p className="text-foreground/90 font-medium">{pick(patron.address)}</p>
                            <span className="inline-block text-[11px] text-muted-foreground bg-muted/70 px-1.5 py-0.5 rounded">
                              {pick(patron.district)}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5 bg-muted/50 rounded-lg px-2.5 py-1">
                            <span className="font-mono text-xs font-semibold text-foreground">
                              {patron.phone}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopyPhone(patron.phone, patron.id)}
                              title={t({ en: "Copy phone", bn: "নম্বর কপি করুন", ar: "نسخ الرقم" })}
                              className="rounded p-1 text-muted-foreground hover:bg-background hover:text-foreground"
                            >
                              {isCopied ? (
                                <Check className="h-3.5 w-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="h-3.5 w-3.5" />
                              )}
                            </button>
                            <a
                              href={`tel:${patron.phone.replace(/[^0-9+]/g, "")}`}
                              title={t({ en: "Call now", bn: "কল করুন", ar: "اتصال" })}
                              className="rounded bg-primary/10 hover:bg-primary hover:text-primary-foreground p-1 text-primary transition-colors"
                            >
                              <Phone className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CTA Banner: Join Patron Council */}
        <div className="mt-16 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-accent/10 p-8 sm:p-12 shadow-sm text-center relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-accent/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-2xl pointer-events-none" />

          <Sparkles className="mx-auto h-8 w-8 text-accent mb-3" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary">
            {t({
              en: "Support the Legacy of Imam Shah Waliullah Dehlawi",
              bn: "আপনিও কি পৃষ্ঠপোষক পরিষদে যুক্ত হতে চান?",
              ar: "هل ترغب في الانضمام إلى مجلس رعاة المعهد؟",
            })}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
            {t({
              en: "Scholars, benefactors, researchers and well-wishers are cordially invited to participate in the intellectual revival and research mission.",
              bn: "দ্বীন ও ইলমের গবেষণা, পাণ্ডুলিপি সংরক্ষণ এবং নবীন আলেমদের ফেলোশিপ কার্যক্রমে সহযোগিতা করতে আপনিও ইনস্টিটিউটের পৃষ্ঠপোষক হতে পারেন।",
              ar: "نرحب بالعلماء والباحثين والمحسنين للمشاركة في دعم برامج البحث وتحقيق المخطوطات والزمالات العلمية.",
            })}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link to="/membership">
              <Button className="rounded-full px-6 py-5 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
                {t({
                  en: "Apply for Patron Membership",
                  bn: "পৃষ্ঠপোষক সদস্যপদের আবেদন",
                  ar: "طلب عضوية الرعاية",
                })}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="rounded-full px-6 py-5 border-primary/20">
                {t({
                  en: "Contact Administration",
                  bn: "প্রশাসনের সাথে যোগাযোগ",
                  ar: "تواصل مع الإدارة",
                })}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
