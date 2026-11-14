import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAdminText } from "@/lib/admin-ui";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { authClient } from "@/lib/auth/client";
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  Newspaper, 
  ShoppingCart, 
  HeartHandshake,
  Settings,
  MessageSquare,
  UserPlus,
  GraduationCap,
  Mail,
  Truck,
  LogOut,
  ChevronDown,
  ChevronRight,
  Search,
  ExternalLink,
  Flame,
  Radio,
  Sliders
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const a = useAdminText();
  const qc = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const [dashboardOpen, setDashboardOpen] = useState(true);
  const [searchFilter, setSearchFilter] = useState("");

  const isOverview = location.pathname === "/admin" || location.pathname === "/admin/";

  const navItems = [
    { label: "Orders", labelBn: "অর্ডারসমূহ", icon: ShoppingCart, href: "/orders", badge: "২" },
    { label: "Courier Hub", labelBn: "কুরিয়ার হাব", icon: Truck, href: "/orders", badge: "Hub", badgeColor: "cyan" },
    { label: "Books", labelBn: "বই প্রকাশনা", icon: BookOpen, href: "/admin/books", badge: "১১" },
    { label: "Magazine", labelBn: "মাসিক সাময়িকী", icon: Newspaper, href: "/admin/magazines" },
    { label: "Patrons", labelBn: "পৃষ্ঠপোষক পরিষদ", icon: HeartHandshake, href: "/admin/patrons", badge: "২৪", badgeColor: "emerald" },
    { label: "Short Courses", labelBn: "শর্ট কোর্সসমূহ", icon: GraduationCap, href: "/admin/short-courses" },
    { label: "Events", labelBn: "ইভেন্ট ও কনফারেন্স", icon: Calendar, href: "/admin/events" },
    { label: "News & Media", labelBn: "সংবাদ ও মিডিয়া", icon: Newspaper, href: "/admin/news" },
    { label: "Applications", labelBn: "সদস্যপদ আবেদন", icon: UserPlus, href: "/applications" },
    { label: "Enrollments", labelBn: "কোর্স ভর্তি আবেদন", icon: GraduationCap, href: "/enrollments" },
    { label: "Messages", labelBn: "মেসেজ / যোগাযোগ", icon: MessageSquare, href: "/messages" },
    { label: "Donations", labelBn: "অনুদান ফান্ড", icon: HeartHandshake, href: "/donations" },
    { label: "Newsletter", labelBn: "নিউজলেটার", icon: Mail, href: "/newsletter" },
    { label: "Admin Users", labelBn: "এডমিন ইউজার", icon: Settings, href: "/admin/users" },
  ];

  const filteredItems = searchFilter
    ? navItems.filter(item => 
        item.label.toLowerCase().includes(searchFilter.toLowerCase()) || 
        item.labelBn.includes(searchFilter)
      )
    : navItems;

  return (
    <aside className="w-64 md:w-72 shrink-0 bg-white border-r border-slate-200/80 flex flex-col h-full shadow-[2px_0_12px_rgba(0,0,0,0.02)] select-none">
      {/* Top Logo / Brand */}
      <div className="p-5 pb-4 border-b border-slate-100 flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#5542F6] to-[#7363FF] text-white flex items-center justify-center font-bold text-lg shadow-md shadow-[#5542F6]/30 group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 text-white fill-white/20" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-slate-900 text-sm tracking-tight">ISWDRI</h1>
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#5542F6]/10 text-[#5542F6] border border-[#5542F6]/20">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">imamshahwaliullahbd.com</p>
          </div>
        </Link>
      </div>

      {/* Quick Search */}
      <div className="px-4 pt-3.5 pb-2">
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="অর্ডার বা মেনু খুঁজুন..."
            className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs text-slate-700 pl-8 pr-12 py-2 rounded-xl border border-slate-200/70 focus:outline-none focus:ring-2 focus:ring-[#5542F6]/20 focus:border-[#5542F6] transition-all placeholder:text-slate-400"
          />
          <kbd className="absolute right-2 text-[10px] font-medium text-slate-400 bg-white border border-slate-200/80 px-1.5 py-0.5 rounded shadow-2xs">
            ctrl K
          </kbd>
        </div>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1.5 text-xs scrollbar-thin">
        {/* Dashboard Group matching screenshot */}
        <div className="space-y-1">
          <button
            onClick={() => setDashboardOpen(!dashboardOpen)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-[#5542F6] text-white font-semibold shadow-md shadow-[#5542F6]/25 hover:bg-[#4a37f5] transition-all"
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4 text-white" />
              <span className="text-sm">Dashboard</span>
            </div>
            <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", !dashboardOpen && "-rotate-90")} />
          </button>

          {dashboardOpen && (
            <div className="pl-6 pr-1 py-1 space-y-1">
              {/* Overview (Active) */}
              <Link
                to="/admin"
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors",
                  isOverview
                    ? "text-[#5542F6] font-semibold bg-[#5542F6]/8"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                <span className={cn("w-1.5 h-1.5 rounded-full", isOverview ? "bg-[#5542F6]" : "bg-slate-300")} />
                <span>Overview</span>
              </Link>

              {/* My Activity */}
              <Link
                to="/admin"
                onClick={onNavigate}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span>My Activity</span>
              </Link>

              {/* Visitor Analytics */}
              <div className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span>Visitor Analytics</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.5 rounded-full">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Separator / Section */}
        <div className="pt-2 pb-1">
          <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            ম্যানেজমেন্ট ও অপারেশন
          </p>
        </div>

        {/* Rest of Nav Items */}
        {filteredItems.map((item) => {
          const isActive = location.pathname === item.href && !isOverview;
          return (
            <Link
              key={item.href + item.label}
              to={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group",
                isActive
                  ? "bg-[#5542F6] text-white shadow-md shadow-[#5542F6]/20 font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isActive
                      ? "text-white"
                      : "text-slate-400 group-hover:text-slate-700"
                  )}
                />
                <span className="truncate">{item.labelBn}</span>
              </div>

              {item.badge && (
                <span
                  className={cn(
                    "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                    isActive
                      ? "bg-white/20 text-white"
                      : item.badgeColor === "cyan"
                        ? "bg-cyan-50 text-cyan-600 border border-cyan-200/60"
                        : item.badgeColor === "emerald"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200/60"
                          : "bg-slate-100 text-slate-500"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Footer Actions */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-2">
        <Link
          to="/"
          target="_blank"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-slate-200/80 hover:bg-slate-100 text-xs font-semibold text-slate-700 shadow-2xs transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          <span>ওয়েবসাইট</span>
        </Link>

        <button
          onClick={async () => {
            await qc.cancelQueries();
            qc.clear();
            await authClient.signOut();
            void navigate({ to: "/admin-login", replace: true });
          }}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl hover:bg-rose-50 text-xs font-semibold text-rose-600 transition-colors"
          title="সাইন আউট"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>লগআউট</span>
        </button>
      </div>
    </aside>
  );
}
