import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { BookOpen, ShoppingBag, Users, HandCoins, Activity } from "lucide-react";
import { adminHead, useAdminText } from "@/lib/admin-ui";
import { getDashboardStats, getRecentActivities } from "@/lib/admin";

export const Route = createFileRoute("/_admin/admin/")({
  head: () => adminHead("Dashboard"),
  component: DashboardOverview,
});

function StatCard({ icon: Icon, label, value }: { icon: typeof BookOpen; label: string; value: number | string }) {
  const a = useAdminText();
  return (
    <div className="rounded-2xl border border-primary/10 bg-card p-6 flex items-start gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{a(label)}</p>
        <p className="mt-1 text-2xl font-bold text-primary">{value}</p>
      </div>
    </div>
  );
}

function DashboardOverview() {
  const a = useAdminText();
  const fetchStats = useServerFn(getDashboardStats);
  const fetchActivity = useServerFn(getRecentActivities);

  const statsQ = useQuery({
    queryKey: ["admin", "dashboard-stats"],
    queryFn: () => fetchStats(),
    refetchInterval: 60_000,
  });

  const activityQ = useQuery({
    queryKey: ["admin", "dashboard-activity"],
    queryFn: () => fetchActivity(),
    refetchInterval: 60_000,
  });

  const stats = statsQ.data;
  const activity = activityQ.data;

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold text-primary">{a("Dashboard")}</h1>

      {statsQ.isLoading ? (
        <p className="text-muted-foreground">{a("Loading…")}</p>
      ) : statsQ.error ? (
        <p className="text-destructive">{a("Failed to load stats.")}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={BookOpen} label="Books" value={stats?.books ?? 0} />
          <StatCard icon={ShoppingBag} label="Active Orders" value={stats?.activeOrders ?? 0} />
          <StatCard icon={Users} label="Applications" value={stats?.membershipApplications ?? 0} />
          <StatCard icon={HandCoins} label="Confirmed Donations" value={`৳${(stats?.confirmedDonations ?? 0).toLocaleString()}`} />
        </div>
      )}

      {activity && (
        <div className="grid gap-8 lg:grid-cols-3">
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary">
              <Activity className="h-5 w-5 text-accent" />
              {a("Recent Books")}
            </h2>
            <ul className="space-y-3">
              {activity.books.map((b) => (
                <li key={b.id} className="rounded-xl border border-primary/10 bg-card px-4 py-3 text-sm">
                  <p className="font-medium text-primary">{b.title}</p>
                  <p className="text-muted-foreground">{b.author}</p>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary">
              <ShoppingBag className="h-5 w-5 text-accent" />
              {a("Recent Orders")}
            </h2>
            <ul className="space-y-3">
              {activity.orders.map((o) => (
                <li key={o.id} className="rounded-xl border border-primary/10 bg-card px-4 py-3 text-sm">
                  <p className="font-medium text-primary">{o.customerName}</p>
                  <p className="text-muted-foreground">{String(o.createdAt).slice(0, 10)}</p>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary">
              <Activity className="h-5 w-5 text-accent" />
              {a("Recent Events")}
            </h2>
            <ul className="space-y-3">
              {activity.events.map((e) => (
                <li key={e.id} className="rounded-xl border border-primary/10 bg-card px-4 py-3 text-sm">
                  <p className="font-medium text-primary">{e.title}</p>
                  <p className="text-muted-foreground">{e.eventDate}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
