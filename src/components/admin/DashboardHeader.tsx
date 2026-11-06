import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Search, Menu, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useAdminText } from "@/lib/admin-ui";

const destinations = [{ label: "Books", to: "/admin/books" }, { label: "Events", to: "/admin/events" }, { label: "News & Media", to: "/admin/news" }, { label: "Magazine", to: "/admin/magazines" }, { label: "Orders", to: "/orders" }, { label: "Donations", to: "/donations" }, { label: "Messages", to: "/messages" }, { label: "Applications", to: "/applications" }, { label: "Newsletter", to: "/newsletter" }, { label: "Short Courses", to: "/admin/short-courses" }];
export function DashboardHeader({ onMenu }: { onMenu: () => void }) {
  const a = useAdminText(); const navigate = useNavigate(); const qc = useQueryClient();
  const [email, setEmail] = useState(""); const [search, setSearch] = useState("");
  useEffect(() => { void authClient.getSession().then(({ data }) => setEmail(data?.user?.email ?? "")); }, []);
  async function signOut() { await qc.cancelQueries(); qc.clear(); await authClient.signOut(); await navigate({ to: "/admin-login", replace: true }); }
  const matches = destinations.filter(d => `${d.label} ${a(d.label)}`.toLowerCase().includes(search.toLowerCase()));
  return <header className="min-h-16 border-b border-border bg-card flex flex-wrap items-center gap-3 px-4 py-3">
    <Button className="lg:hidden" size="icon" variant="ghost" aria-label={a("Menu")} onClick={onMenu}><Menu className="h-5 w-5"/></Button>
    <div className="relative flex-1 min-w-32 max-w-md"><Search className="absolute start-3 top-3 h-4 w-4 text-muted-foreground"/><Input aria-label={a("Search")} placeholder={a("Search")} className="ps-9" value={search} onChange={e => setSearch(e.target.value)}/>
      {search && <nav className="absolute top-full mt-1 z-30 w-full border border-border bg-popover shadow-lg rounded-md p-2">{matches.map(d => <Link key={d.to} to={d.to} onClick={() => setSearch("")} className="block px-3 py-2 rounded hover:bg-muted">{a(d.label)}</Link>)}</nav>}
    </div><LanguageSwitcher/><div className="hidden md:block ms-auto max-w-52 truncate text-sm" title={email}>{email}</div><Button size="icon" variant="ghost" title={a("Sign Out")} aria-label={a("Sign Out")} onClick={signOut}><LogOut className="h-5 w-5"/></Button>
  </header>;
}

