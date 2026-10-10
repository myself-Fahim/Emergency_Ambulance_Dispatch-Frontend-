import Link from "next/link";
import { Button } from "@/components/ui/button";
import { designClasses } from "@/config/design-system";
import { getSessionRole } from "@/lib/auth/server";

const dashboards = [
  { href: "/dashboard/driverDashboard", label: "Driver dashboard", description: "For active ambulance crews and trip updates.", role: "DRIVER" },
  { href: "/dashboard/adminDashboard", label: "Admin dashboard", description: "For operations, users, and system oversight.", role: "ADMIN" },
  { href: "/dashboard/customerDashboard", label: "Customer dashboard", description: "For role-specific operational views.", role: "CUSTOMER" },
];

export default async function DashboardIndexPage() {
  const role = await getSessionRole();
  const visible = dashboards.filter((dashboard) => dashboard.role === role || !role);
  return <div className={designClasses.dashboardShell}><div className="mb-8 space-y-2"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Workspace</p><h1 className="text-3xl font-semibold tracking-tight">Your dashboard</h1><p className={designClasses.mutedText}>Only the operational area assigned to your role is shown.</p></div><div className="grid gap-4 md:grid-cols-3">{visible.map((dashboard) => <section className={designClasses.section} key={dashboard.href}><h2 className={designClasses.sectionHeading}>{dashboard.label}</h2><p className={`${designClasses.mutedText} mt-2`}>{dashboard.description}</p><Button nativeButton={false} className="mt-6" variant="outline" render={<Link href={dashboard.href} />}>Open</Button></section>)}</div></div>;
}
