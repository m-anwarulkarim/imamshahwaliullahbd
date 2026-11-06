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

  LogOut,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuGroups = [
  {
    label: "Overview",
    items: [
      { label: "Admin Home", icon: LayoutDashboard, href: "/admin" },
    ]
  },
  {
    label: "Publications",
    items: [
      { label: "Books", icon: BookOpen, href: "/admin/books" },
      { label: "Magazine", icon: Newspaper, href: "/admin/magazines" },
    ]
  },
  {
    label: "Community",
    items: [
      { label: "Events", icon: Calendar, href: "/admin/events" },
      { label: "News & Media", icon: Newspaper, href: "/admin/news" },
    ]
  },
  {
    label: "Commerce",
    items: [
      { label: "Orders", icon: ShoppingCart, href: "/orders" },
      { label: "Donations", icon: HeartHandshake, href: "/donations" },
    ]
  },
  {
    label: "Inbox",
    items: [
      { label: "Messages", icon: MessageSquare, href: "/messages" },
      { label: "Applications", icon: UserPlus, href: "/applications" },
      { label: "Newsletter", icon: Mail, href: "/newsletter" },
      { label: "Course Applications", icon: GraduationCap, href: "/enrollments" },
      { label: "Short Courses", icon: BookOpen, href: "/admin/short-courses" },
    ]
  },
  {
    label: "Settings",
    items: [
      { label: "Admin Users", icon: Settings, href: "/admin/users" },
    ]
  }

];

export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const a = useAdminText();
  const qc = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="w-64 shrink-0 bg-primary text-primary-foreground flex flex-col h-full border-r border-primary/20">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-accent-foreground font-bold text-xl group-hover:scale-105 transition-transform">
            IS
          </div>
          <div>
            <h1 className="font-bold text-sm leading-tight">{a("Institute Admin")}</h1>
            <p className="text-[10px] text-primary-foreground/60 uppercase tracking-wider">{a("Administrator")}</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
        {menuGroups.map((group) => (
          <div key={a(group.label)}>
            <h2 className="px-3 text-[10px] font-semibold text-primary-foreground/40 uppercase tracking-widest mb-2">
              {a(group.label)}
            </h2>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={a(item.label)}
                    to={item.href} onClick={onNavigate}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all group",
                      isActive 
                        ? "bg-accent text-accent-foreground font-medium shadow-lg" 
                        : "hover:bg-primary-foreground/10 text-primary-foreground/80 hover:text-primary-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={cn("w-4 h-4", isActive ? "text-accent-foreground" : "text-primary-foreground/60 group-hover:text-primary-foreground")} />
                      <span>{a(item.label)}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3 h-3" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-primary/20 bg-primary-foreground/5">
        <Button
          variant="ghost"
          className="w-full justify-start text-primary-foreground/70 hover:bg-destructive/10 hover:text-destructive group"
          onClick={async () => {
            await qc.cancelQueries(); qc.clear();
            await authClient.signOut();
            void navigate({ to: "/admin-login", replace: true });
          }}
        >
          <LogOut className="w-4 h-4 mr-3" />
          {a("Sign Out")}
        </Button>
      </div>
    </aside>
  );
}

