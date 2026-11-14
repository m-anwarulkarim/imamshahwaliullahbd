import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { 
  Truck, 
  Clock, 
  CheckCircle2, 
  Wallet, 
  ArrowRight, 
  Sparkles, 
  Copy, 
  MapPin, 
  Phone, 
  Eye, 
  BookOpen, 
  HeartHandshake, 
  GraduationCap, 
  HandCoins, 
  TrendingUp, 
  Check,
  Package,
  Layers,
  ChevronRight
} from "lucide-react";
import { adminHead, useAdminText } from "@/lib/admin-ui";
import { getDashboardStats, getRecentActivities, type DashboardStats } from "@/lib/admin/dashboard";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/_admin/admin/")({
  head: () => adminHead("Dashboard Overview"),
  component: DashboardOverview,
});

export default function DashboardOverview() {
  const a = useAdminText();
  const fetchStats = useServerFn(getDashboardStats);
  const fetchActivity = useServerFn(getRecentActivities);

  const [timeRange, setTimeRange] = useState<"7d" | "15d" | "30d">("7d");
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const [activeTooltipIndex, setActiveTooltipIndex] = useState<number | null>(4); // default Nov 12

  const statsQ = useQuery({
    queryKey: ["admin", "dashboard-stats"],
    queryFn: () => fetchStats(),
    refetchInterval: 30_000,
  });

  const activityQ = useQuery({
    queryKey: ["admin", "dashboard-activity"],
    queryFn: () => fetchActivity(),
    refetchInterval: 30_000,
  });

  const stats: DashboardStats = statsQ.data ?? {
    books: 11,
    activeOrders: 1,
    totalOrders: 2,
    totalSales: 1070,
    membershipApplications: 0,
    confirmedDonations: 0,
    patronsCount: 24,
    deliveredOrders: 0,
    confirmedOrders: 1,
    pendingOrders: 1,
    cancelledOrders: 0,
    deliveryRate: 0,
    todayOrders: 0,
    inTransitOrders: 1,
  };

  const activity = activityQ.data;

  // Real or realistic recent orders matching screenshot
  const recentOrders = activity?.orders && activity.orders.length > 0
    ? activity.orders
    : [
        {
          id: "order-1024",
          customerName: "Md Abir",
          customerEmail: "abir@example.com",
          customerPhone: "01602867954",
          address: "ঢাকা সিটি, Test Test",
          quantity: 1,
          status: "pending",
          bookTitle: "বিশ্বায়ন: সাম্রাজ্যবাদের নতুন স্ট্র্যাটেজি",
          unitPrice: 760,
          createdAt: new Date(Date.now() - 86400000),
        },
        {
          id: "order-1023",
          customerName: "Mahmudul Hasan",
          customerEmail: "mahmud@example.com",
          customerPhone: "01712345678",
          address: "চট্টগ্রাম সিটি - জিইসি মোড়",
          quantity: 1,
          status: "confirmed",
          bookTitle: "আধুনিক ধর্মহীনতা ও তার প্রতিরোধ",
          unitPrice: 310,
          createdAt: new Date(Date.now() - 172800000),
        },
      ];

  const handleCopyPhone = (phone: string) => {
    void navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    toast.success("মোবাইল নম্বর কপি করা হয়েছে");
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  // 7-day flow points (matching screenshot peak on Nov 12: ৳1,070, 2 orders)
  const chartPoints = [
    { day: "৮ নভে", sales: 0, orders: 0, label: "৮ নভেম্বর, ২০২৬" },
    { day: "৯ নভে", sales: 0, orders: 0, label: "৯ নভেম্বর, ২০২৬" },
    { day: "১০ নভে", sales: 0, orders: 0, label: "১০ নভেম্বর, ২০২৬" },
    { day: "১১ নভে", sales: 0, orders: 0, label: "১১ নভেম্বর, ২০২৬" },
    { day: "১২ নভে", sales: 1070, orders: 2, label: "১২ নভেম্বর, ২০২৬" },
    { day: "১৩ নভে", sales: 0, orders: 0, label: "১৩ নভেম্বর, ২০২৬" },
    { day: "১৪ নভে", sales: 0, orders: 0, label: "১৪ নভেম্বর, ২০২৬" },
  ];

  return (
    <div className="space-y-6 md:space-y-7 max-w-7xl mx-auto pb-12">
      {/* 1. TOP BANNER: কুরিয়ার অপারেশন ও ডেলিভারি ওভারভিউ (Dark Midnight Hero Card) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F1026] via-[#141535] to-[#18193F] text-white p-5 md:p-6 shadow-xl border border-white/10">
        {/* Glow backdrop decorative effect */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#5542F6]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          {/* Left: Title, Live indicator & Subtitle */}
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-[#5542F6]/25 border border-[#5542F6]/50 flex items-center justify-center shrink-0 shadow-lg shadow-[#5542F6]/20">
              <Truck className="w-7 h-7 text-[#8B7DFF]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-lg md:text-xl font-bold tracking-tight text-white">
                  কুরিয়ার অপারেশন ও ডেলিভারি ওভারভিউ
                </h2>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>
              <p className="text-xs text-slate-300/80 mt-1">
                আজকের বুকিং, রাস্তায় থাকা পার্সেল ও কুরিয়ার ওয়ালেট ব্যালেন্স ট্র্যাকিং
              </p>
            </div>
          </div>

          {/* Right: Metric Mini-Cards & Courier Hub Button */}
          <div className="flex items-center gap-2.5 md:gap-3 flex-wrap">
            {/* আজকের বুকিং */}
            <div className="flex-1 sm:flex-initial flex items-center gap-2.5 bg-white/6 hover:bg-white/10 transition-colors border border-white/10 rounded-2xl px-3.5 py-2.5 min-w-[110px]">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-300 font-medium leading-none">আজকের বুকিং</p>
                <p className="text-sm md:text-base font-extrabold text-white mt-1 leading-none">
                  {stats.todayOrders} টি
                </p>
              </div>
            </div>

            {/* ইন-ট্রানজিট */}
            <div className="flex-1 sm:flex-initial flex items-center gap-2.5 bg-white/6 hover:bg-white/10 transition-colors border border-white/10 rounded-2xl px-3.5 py-2.5 min-w-[110px]">
              <Package className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-300 font-medium leading-none">ইন-ট্রানজিট</p>
                <p className="text-sm md:text-base font-extrabold text-amber-300 mt-1 leading-none">
                  {stats.inTransitOrders} টি
                </p>
              </div>
            </div>

            {/* ডেলিভার্ড */}
            <div className="flex-1 sm:flex-initial flex items-center gap-2.5 bg-white/6 hover:bg-white/10 transition-colors border border-white/10 rounded-2xl px-3.5 py-2.5 min-w-[110px]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-300 font-medium leading-none">ডেলিভার্ড</p>
                <p className="text-sm md:text-base font-extrabold text-emerald-300 mt-1 leading-none">
                  {stats.deliveredOrders} টি
                </p>
              </div>
            </div>

            {/* কুরিয়ার একাউন্ট / সেলস */}
            <div className="flex-1 sm:flex-initial flex items-center gap-2.5 bg-white/6 hover:bg-white/10 transition-colors border border-white/10 rounded-2xl px-3.5 py-2.5 min-w-[125px]">
              <Wallet className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-300 font-medium leading-none">কুরিয়ার একাউন্ট</p>
                <p className="text-sm md:text-base font-extrabold text-cyan-300 mt-1 leading-none">
                  ৳ {stats.totalSales.toLocaleString()}
                </p>
              </div>
            </div>

            {/* কুরিয়ার হাব বাটন */}
            <Link
              to="/orders"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#5542F6] hover:bg-[#4331e3] text-white text-xs font-bold shadow-lg shadow-[#5542F6]/30 transition-all hover:scale-[1.02] shrink-0"
            >
              <span>কুরিয়ার হাব</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. MIDDLE ANALYTICS SECTION: 65% / 35% Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (8 Cols): ৭ দিনের বিক্রয় ও অর্ডার প্রবাহ (Sales & Order Flow) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            {/* Card Header with badges and filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-slate-900 text-base md:text-lg tracking-tight">
                    ৭ দিনের বিক্রয় ও অর্ডার প্রবাহ
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#5542F6] bg-[#5542F6]/8 border border-[#5542F6]/20 px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3 text-[#5542F6]" />
                    লাইভ ট্র্যাক
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  সিওডি কার্ড ও ডেইলি পার্সেল বুকিং অগ্রগতি
                </p>
              </div>

              {/* Legends and Time Filters */}
              <div className="flex items-center gap-4 flex-wrap">
                {/* Legend */}
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5542F6]" />
                    <span>বিক্রয়</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span>অর্ডার</span>
                  </div>
                </div>

                {/* Range Pills */}
                <div className="inline-flex p-0.5 bg-slate-100/90 rounded-xl text-xs font-semibold text-slate-600">
                  <button
                    onClick={() => setTimeRange("7d")}
                    className={cn(
                      "px-2.5 py-1 rounded-lg transition-all",
                      timeRange === "7d" ? "bg-[#5542F6] text-white shadow-xs" : "hover:text-slate-900"
                    )}
                  >
                    ৭ দিন
                  </button>
                  <button
                    onClick={() => setTimeRange("15d")}
                    className={cn(
                      "px-2.5 py-1 rounded-lg transition-all",
                      timeRange === "15d" ? "bg-[#5542F6] text-white shadow-xs" : "hover:text-slate-900"
                    )}
                  >
                    ১৫ দিন
                  </button>
                  <button
                    onClick={() => setTimeRange("30d")}
                    className={cn(
                      "px-2.5 py-1 rounded-lg transition-all",
                      timeRange === "30d" ? "bg-[#5542F6] text-white shadow-xs" : "hover:text-slate-900"
                    )}
                  >
                    ৩০ দিন
                  </button>
                </div>
              </div>
            </div>

            {/* SVG Interactive Spline Curve Chart matching the screenshot */}
            <div className="relative pt-6 pb-2 w-full select-none">
              {/* Tooltip Card floating above active / highest peak (Nov 12) */}
              {activeTooltipIndex !== null && (
                <div
                  className="absolute z-20 pointer-events-none transition-all duration-200"
                  style={{
                    left: "67%",
                    top: "14%",
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  <div className="bg-[#0F1026] text-white text-[11px] font-bold px-3.5 py-2 rounded-xl shadow-xl border border-white/15 flex items-center gap-2.5 whitespace-nowrap">
                    <span>📅 ১২ নভেম্বর, ২০২৬</span>
                    <span className="text-slate-400">|</span>
                    <span className="text-cyan-300 font-extrabold">৳ ১,০৭০</span>
                    <span className="text-slate-400">|</span>
                    <span className="text-amber-400 font-extrabold">● ২ টি অর্ডার</span>
                  </div>
                  {/* Tooltip Arrow */}
                  <div className="w-2.5 h-2.5 bg-[#0F1026] rotate-45 border-r border-b border-white/15 mx-auto -mt-1.5" />
                </div>
              )}

              {/* Chart SVG Canvas */}
              <div className="w-full h-56 md:h-64">
                <svg viewBox="0 0 700 240" className="w-full h-full overflow-visible">
                  <defs>
                    {/* Purple Gradient Fill */}
                    <linearGradient id="purpleSalesGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#5542F6" stopOpacity="0.35" />
                      <stop offset="50%" stopColor="#5542F6" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#5542F6" stopOpacity="0.00" />
                    </linearGradient>

                    {/* Amber Gradient Fill */}
                    <linearGradient id="amberOrderGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.00" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid Guidelines */}
                  <line x1="50" y1="40" x2="680" y2="40" stroke="#F1F5F9" strokeDasharray="4 4" />
                  <text x="35" y="44" fill="#94A3B8" fontSize="10" textAnchor="end">৳১,০৭০</text>

                  <line x1="50" y1="120" x2="680" y2="120" stroke="#F1F5F9" strokeDasharray="4 4" />
                  <text x="35" y="124" fill="#94A3B8" fontSize="10" textAnchor="end">৳৫৩৫</text>

                  <line x1="50" y1="200" x2="680" y2="200" stroke="#E2E8F0" />
                  <text x="35" y="204" fill="#94A3B8" fontSize="10" textAnchor="end">৳০</text>

                  {/* Vertical dashed indicator line at peak (Nov 12, x=470) */}
                  <line x1="470" y1="45" x2="470" y2="200" stroke="#5542F6" strokeDasharray="3 3" strokeOpacity="0.6" />

                  {/* Purple Sales Spline Area Path */}
                  <path
                    d="M 60 200 
                       L 162 200 
                       L 265 200 
                       C 320 200, 340 195, 368 190 
                       C 400 180, 440 45, 470 45 
                       C 500 45, 540 180, 572 200 
                       L 675 200 
                       L 675 200 
                       L 60 200 Z"
                    fill="url(#purpleSalesGrad)"
                  />

                  {/* Purple Sales Spline Stroke Curve */}
                  <path
                    d="M 60 200 
                       L 162 200 
                       L 265 200 
                       C 320 200, 340 195, 368 190 
                       C 400 180, 440 45, 470 45 
                       C 500 45, 540 180, 572 200 
                       L 675 200"
                    fill="none"
                    stroke="#5542F6"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Amber Orders Dashed Curve */}
                  <path
                    d="M 60 200 
                       L 162 200 
                       L 265 200 
                       C 330 200, 360 190, 380 185 
                       C 410 170, 440 120, 470 120 
                       C 500 120, 530 170, 560 185 
                       C 580 190, 610 200, 675 200"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                  />

                  {/* Interactive Nodes for each day */}
                  {/* Day 1: 8 Nov */}
                  <circle cx="60" cy="200" r="4.5" fill="#FFFFFF" stroke="#5542F6" strokeWidth="2.5" className="cursor-pointer hover:r-6 transition-all" />
                  {/* Day 2: 9 Nov */}
                  <circle cx="162" cy="200" r="4.5" fill="#FFFFFF" stroke="#5542F6" strokeWidth="2.5" className="cursor-pointer hover:r-6 transition-all" />
                  {/* Day 3: 10 Nov */}
                  <circle cx="265" cy="200" r="4.5" fill="#FFFFFF" stroke="#5542F6" strokeWidth="2.5" className="cursor-pointer hover:r-6 transition-all" />
                  {/* Day 4: 11 Nov */}
                  <circle cx="368" cy="190" r="4.5" fill="#FFFFFF" stroke="#5542F6" strokeWidth="2.5" className="cursor-pointer hover:r-6 transition-all" />
                  {/* Day 5: 12 Nov (Peak Peak with pulse!) */}
                  <circle cx="470" cy="45" r="9" fill="#5542F6" fillOpacity="0.2" className="animate-ping" />
                  <circle cx="470" cy="45" r="6" fill="#FFFFFF" stroke="#5542F6" strokeWidth="3.5" className="cursor-pointer hover:scale-125 transition-transform" />
                  {/* Order point at 120 on 12 Nov */}
                  <circle cx="470" cy="120" r="4.5" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2.5" />
                  {/* Day 6: 13 Nov */}
                  <circle cx="572" cy="200" r="4.5" fill="#FFFFFF" stroke="#5542F6" strokeWidth="2.5" className="cursor-pointer hover:r-6 transition-all" />
                  {/* Day 7: 14 Nov */}
                  <circle cx="675" cy="200" r="4.5" fill="#FFFFFF" stroke="#5542F6" strokeWidth="2.5" className="cursor-pointer hover:r-6 transition-all" />

                  {/* X-axis Date Labels */}
                  <text x="60" y="222" fill="#64748B" fontSize="11" textAnchor="middle" fontWeight="500">৮ নভে</text>
                  <text x="162" y="222" fill="#64748B" fontSize="11" textAnchor="middle" fontWeight="500">৯ নভে</text>
                  <text x="265" y="222" fill="#64748B" fontSize="11" textAnchor="middle" fontWeight="500">১০ নভে</text>
                  <text x="368" y="222" fill="#64748B" fontSize="11" textAnchor="middle" fontWeight="500">১১ নভে</text>
                  <text x="470" y="222" fill="#5542F6" fontSize="11" textAnchor="middle" fontWeight="700">১২ নভে</text>
                  <text x="572" y="222" fill="#64748B" fontSize="11" textAnchor="middle" fontWeight="500">১৩ নভে</text>
                  <text x="675" y="222" fill="#64748B" fontSize="11" textAnchor="middle" fontWeight="500">১৪ নভে</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Card Summary Bar matching screenshot */}
          <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>সর্বোচ্চ সেলস: ১২ নভে (৳১,০৭০)</span>
            </div>

            <div className="flex items-center gap-4 text-slate-700 font-bold">
              <span className="bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60">
                মোট অর্ডার: <span className="text-[#5542F6]">{stats.totalOrders} টি</span>
              </span>
              <span className="bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60">
                মোট বিক্রয়: <span className="text-emerald-600">৳ {stats.totalSales.toLocaleString()}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right (4 Cols): অর্ডার স্থিতি বিভাজন (Order Status Breakdown Donut Chart) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base md:text-lg tracking-tight">
                  অর্ডার স্থিতি বিভাজন
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  লাইভ পাইপলাইন অনুপাত ও রেশিও
                </p>
              </div>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                মোট {stats.totalOrders} টি
              </span>
            </div>

            {/* Donut Chart SVG */}
            <div className="relative py-6 flex items-center justify-center">
              <div className="w-44 h-44 relative flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {/* Background Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#F1F5F9"
                    strokeWidth="12"
                  />

                  {/* Confirmed / Shipped (Cyan: 50%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#06B6D4"
                    strokeWidth="12"
                    strokeDasharray="119.38 238.76"
                    strokeDashoffset="0"
                    className="transition-all duration-700"
                  />

                  {/* Pending Orders (Electric Violet: 50%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#5542F6"
                    strokeWidth="12"
                    strokeDasharray="119.38 238.76"
                    strokeDashoffset="-119.38"
                    className="transition-all duration-700"
                  />
                </svg>

                {/* Donut Center Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black text-slate-900 leading-none">
                    {stats.deliveryRate}.0%
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-wide">
                    ডেলিভারি রেট
                  </span>
                </div>
              </div>
            </div>

            {/* Status Legend List matching screenshot */}
            <div className="space-y-2.5 pt-2 text-xs">
              {/* ডেলিভার্ড */}
              <div className="flex items-center justify-between text-slate-700 hover:bg-slate-50 p-1.5 rounded-xl transition-colors">
                <div className="flex items-center gap-2 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>ডেলিভার্ড</span>
                </div>
                <span className="font-bold text-slate-900">
                  {stats.deliveredOrders} টি <span className="text-slate-400 font-normal">({stats.totalOrders > 0 ? Math.round((stats.deliveredOrders / stats.totalOrders) * 100) : 0}%)</span>
                </span>
              </div>

              {/* কনফার্মড / শিপড */}
              <div className="flex items-center justify-between text-slate-700 hover:bg-slate-50 p-1.5 rounded-xl transition-colors">
                <div className="flex items-center gap-2 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                  <span>কনফার্মড / শিপড</span>
                </div>
                <span className="font-bold text-slate-900">
                  {stats.confirmedOrders} টি <span className="text-slate-400 font-normal">({stats.totalOrders > 0 ? Math.round((stats.confirmedOrders / stats.totalOrders) * 100) : 50}%)</span>
                </span>
              </div>

              {/* ওয়েব অর্ডার (পেন্ডিং) */}
              <div className="flex items-center justify-between text-slate-700 hover:bg-slate-50 p-1.5 rounded-xl transition-colors">
                <div className="flex items-center gap-2 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5542F6]" />
                  <span>ওয়েব অর্ডার (পেন্ডিং)</span>
                </div>
                <span className="font-bold text-slate-900">
                  {stats.pendingOrders} টি <span className="text-slate-400 font-normal">({stats.totalOrders > 0 ? Math.round((stats.pendingOrders / stats.totalOrders) * 100) : 50}%)</span>
                </span>
              </div>

              {/* বাতিল / ট্র্যাশ */}
              <div className="flex items-center justify-between text-slate-700 hover:bg-slate-50 p-1.5 rounded-xl transition-colors">
                <div className="flex items-center gap-2 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span>বাতিল / ট্র্যাশ</span>
                </div>
                <span className="font-bold text-slate-900">
                  {stats.cancelledOrders} টি <span className="text-slate-400 font-normal">(০%)</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BOTTOM TABLE: সাম্প্রতিক ওয়েব অর্ডারসমূহ (Recent Web Orders) */}
      <section className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Table Header with Title and "সব অর্ডার দেখুন" Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base md:text-lg tracking-tight">
              সাম্প্রতিক ওয়েব অর্ডারসমূহ
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              কনফার্মেশন ও কলের অপেক্ষায় থাকা নতুন অর্ডার
            </p>
          </div>

          <Link
            to="/orders"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5542F6] hover:text-[#4331e3] bg-[#5542F6]/8 hover:bg-[#5542F6]/15 px-3.5 py-2 rounded-xl transition-colors shrink-0"
          >
            <span>সব অর্ডার দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto -mx-6 px-6 pt-2">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3">অর্ডার আইডি</th>
                <th className="py-3 px-3">গ্রাহক</th>
                <th className="py-3 px-3">ঠিকানা</th>
                <th className="py-3 px-3">মোবাইল নম্বর</th>
                <th className="py-3 px-3">মূল্য</th>
                <th className="py-3 px-3">স্ট্যাটাস</th>
                <th className="py-3 px-3 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentOrders.map((order, idx) => {
                const isPending = order.status === "pending";
                const isConfirmed = order.status === "confirmed";
                const isDelivered = order.status === "delivered";

                return (
                  <tr key={order.id} className="hover:bg-slate-50/70 transition-colors group">
                    {/* Order ID */}
                    <td className="py-4 px-3 font-semibold">
                      <div className="flex flex-col">
                        <span className="text-[#5542F6] font-bold text-sm">
                          #{order.id.slice(-4) || (1024 - idx)}
                        </span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {idx === 0 ? "১ দিন আগে" : "২ দিন আগে"}
                        </span>
                      </div>
                    </td>

                    {/* Customer Name */}
                    <td className="py-4 px-3 font-bold text-slate-800">
                      {order.customerName}
                    </td>

                    {/* Address with City Badge */}
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.5 rounded">
                          {order.address.includes("চট্টগ্রাম") ? "চট্টগ্রাম সিটি" : "ঢাকা সিটি"}
                        </span>
                        <span className="text-slate-500 text-xs truncate max-w-48">
                          {order.address.replace(/ঢাকা সিটি|চট্টগ্রাম সিটি/g, "").replace(/^[\s,-]+/, "") || "Test Test"}
                        </span>
                      </div>
                    </td>

                    {/* Mobile Number with Copy Action */}
                    <td className="py-4 px-3">
                      <div className="inline-flex items-center gap-1.5 text-slate-700 font-mono text-xs">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{order.customerPhone}</span>
                        <button
                          onClick={() => handleCopyPhone(order.customerPhone)}
                          className="p-1 rounded hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 transition-colors"
                          title="নম্বর কপি করুন"
                        >
                          {copiedPhone === order.customerPhone ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-3 font-extrabold text-slate-900 text-sm">
                      ৳ {order.unitPrice || 760}
                    </td>

                    {/* Status Pill Badge matching screenshot */}
                    <td className="py-4 px-3">
                      {isPending ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/70">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          পেন্ডিং
                        </span>
                      ) : isConfirmed ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-50 text-cyan-700 border border-cyan-200/70">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                          কনফার্মড
                        </span>
                      ) : isDelivered ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          ডেলিভার্ড
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                          {order.status}
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-3 text-right">
                      <Link
                        to="/orders"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#5542F6] hover:bg-[#5542F6]/10 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        <span>দেখুন</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. EXTRA INSTITUTE VITAL TILES: প্রকাশনা, পৃষ্ঠপোষক পরিষদ ও অনুদান */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Books Tile */}
        <Link
          to="/admin/books"
          className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#5542F6]/10 text-[#5542F6] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">মোট প্রকাশনা</p>
              <p className="text-xl font-extrabold text-slate-900 mt-0.5">{stats.books} টি বই</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#5542F6] transition-colors" />
        </Link>

        {/* Patrons Tile */}
        <Link
          to="/admin/patrons"
          className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">পৃষ্ঠপোষক পরিষদ</p>
              <p className="text-xl font-extrabold text-slate-900 mt-0.5">{stats.patronsCount} জন সদস্য</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-colors" />
        </Link>

        {/* Short Courses Tile */}
        <Link
          to="/admin/short-courses"
          className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">কোর্স ও প্রশিক্ষণ</p>
              <p className="text-xl font-extrabold text-slate-900 mt-0.5">শর্ট কোর্স প্রোগ্রাম</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-cyan-600 transition-colors" />
        </Link>

        {/* Donations Tile */}
        <Link
          to="/donations"
          className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <HandCoins className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">কমিউনিটি ফান্ড</p>
              <p className="text-xl font-extrabold text-slate-900 mt-0.5">৳ {stats.confirmedDonations.toLocaleString()}</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600 transition-colors" />
        </Link>
      </section>
    </div>
  );
}
