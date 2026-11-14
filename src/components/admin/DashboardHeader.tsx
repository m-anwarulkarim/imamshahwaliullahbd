import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { 
  Search, 
  Menu, 
  LogOut, 
  Play, 
  Headphones, 
  Bell, 
  Crown,
  Globe,
  UserCheck
} from "lucide-react";
import { authClient } from "@/lib/auth/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useAdminText } from "@/lib/admin-ui";

const destinations = [
  { label: "Orders", to: "/orders" },
  { label: "Books", to: "/admin/books" },
  { label: "Patrons", to: "/admin/patrons" },
  { label: "Events", to: "/admin/events" },
  { label: "News & Media", to: "/admin/news" },
  { label: "Magazine", to: "/admin/magazines" },
  { label: "Donations", to: "/donations" },
  { label: "Messages", to: "/messages" },
  { label: "Applications", to: "/applications" },
  { label: "Short Courses", to: "/admin/short-courses" },
];

export function DashboardHeader({ onMenu }: { onMenu: () => void }) {
  const a = useAdminText();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    void authClient.getSession().then(({ data }) => {
      setEmail(data?.user?.email ?? "admin@iswdri.org");
      setName(data?.user?.name ?? "Admin User");
    });
  }, []);

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await authClient.signOut();
    await navigate({ to: "/admin-login", replace: true });
  }

  const matches = destinations.filter((d) =>
    `${d.label} ${a(d.label)}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <header className="h-16 md:h-18 border-b border-slate-200/80 bg-white/95 backdrop-blur-sm px-4 md:px-7 flex items-center justify-between gap-3 sticky top-0 z-30 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      {/* Left side: Menu toggle for mobile + Title + Tutorial + Support */}
      <div className="flex items-center gap-3 md:gap-4 min-w-0">
        <Button
          className="lg:hidden shrink-0 text-slate-700"
          size="icon"
          variant="ghost"
          aria-label={a("Menu")}
          onClick={onMenu}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight shrink-0">
          Dashboard
        </h1>

        <div className="hidden sm:flex items-center gap-2">
          {/* Tutorial Button */}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200/90 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Play className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Tutorial</span>
          </a>

          {/* Support Button */}
          <a
            href="https://wa.me"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#5542F6] hover:bg-[#4332D6] text-white text-xs font-semibold shadow-sm shadow-[#5542F6]/20 transition-colors"
          >
            <Headphones className="w-3.5 h-3.5 text-white" />
            <span>Support</span>
          </a>
        </div>
      </div>

      {/* Right side utilities matching screenshot */}
      <div className="flex items-center gap-2.5 md:gap-3.5">
        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* Global Search Popover trigger */}
        <div className="relative hidden md:block">
          <div className="relative">
            <Search className="absolute start-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <Input
              aria-label={a("Search")}
              placeholder="সার্চ..."
              className="ps-8 h-8 w-36 lg:w-48 text-xs bg-slate-50 border-slate-200/80 rounded-full focus-visible:ring-1 focus-visible:ring-[#5542F6]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {search && (
            <nav className="absolute top-full end-0 mt-1.5 z-40 w-56 border border-slate-200 bg-white shadow-xl rounded-2xl p-1.5 text-xs animate-in fade-in-50">
              {matches.length > 0 ? (
                matches.map((d) => (
                  <Link
                    key={d.to}
                    to={d.to}
                    onClick={() => setSearch("")}
                    className="block px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-[#5542F6] font-medium transition-colors"
                  >
                    {a(d.label)}
                  </Link>
                ))
              ) : (
                <p className="px-3 py-2 text-slate-400 text-center">কিছু পাওয়া যায়নি</p>
              )}
            </nav>
          )}
        </div>

        {/* Notification Bell with red dot */}
        <button
          className="relative p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>

        {/* User Avatar with status dot */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5542F6] to-cyan-500 text-white flex items-center justify-center font-bold text-xs ring-2 ring-slate-100 shadow-xs">
              {name ? name.slice(0, 2).toUpperCase() : "IS"}
            </div>
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-bold text-slate-800 leading-tight truncate max-w-32">{name || "Admin"}</p>
            <p className="text-[10px] text-slate-400 leading-none truncate max-w-32">{email || "admin@iswdri.org"}</p>
          </div>
        </div>

        {/* Golden Premium Package Pill matching screenshot */}
        <div className="hidden lg:flex items-center gap-1.5 bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 text-amber-950 font-bold px-3 py-1 rounded-full text-[11px] shadow-sm select-none border border-amber-300">
          <Crown className="w-3.5 h-3.5 text-amber-900 fill-amber-900/30" />
          <div className="leading-tight">
            <span>Premium Package</span>
            <span className="block text-[9px] font-normal opacity-80 leading-none">Active Institute Plan</span>
          </div>
        </div>

        {/* Sign Out */}
        <Button
          size="icon"
          variant="ghost"
          title={a("Sign Out")}
          aria-label={a("Sign Out")}
          onClick={signOut}
          className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full h-8 w-8"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
