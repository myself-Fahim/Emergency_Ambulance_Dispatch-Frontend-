import Link from "next/link";
import { Button } from "@/components/ui/button";
import { designClasses } from "@/config/design-system";

const dashboards = [
  { href: "/dashboard/driverDashboard", label: "Driver dashboard", description: "For active ambulance crews and trip updates." },
  { href: "/dashboard/adminDashboard", label: "Admin dashboard", description: "For operations, users, and system oversight." },
  { href: "/dashboard/customerDashboard", label: "Customer dashboard", description: "For role-specific operational views." },
];

export default function DashboardIndexPage() {
  return <div className={designClasses.dashboardShell}><div className="mb-8 space-y-2"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Workspace</p><h1 className="text-3xl font-semibold tracking-tight">Choose a dashboard</h1><p className={designClasses.mutedText}>Each dashboard is isolated as a feature module.</p></div><div className="grid gap-4 md:grid-cols-3">{dashboards.map((dashboard) => <section className={designClasses.section} key={dashboard.href}><h2 className={designClasses.sectionHeading}>{dashboard.label}</h2><p className={`${designClasses.mutedText} mt-2`}>{dashboard.description}</p><Button className="mt-6" variant="outline" render={<Link href={dashboard.href} />}>Open</Button></section>)}</div></div>;
}
