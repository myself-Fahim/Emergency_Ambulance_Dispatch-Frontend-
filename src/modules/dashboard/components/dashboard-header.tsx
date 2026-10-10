import Link from "next/link";

export function DashboardHeader() {
  return <header className="border-b bg-card px-6 py-4 sm:px-8 lg:px-12"><div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4"><Link className="font-semibold tracking-tight" href="/dashboard">Emergency Dispatch</Link><nav className="flex items-center gap-4 text-sm text-muted-foreground" aria-label="Dashboard navigation"><Link className="hover:text-foreground" href="/dashboard/driverDashboard">Driver</Link><Link className="hover:text-foreground" href="/dashboard/adminDashboard">Admin</Link><Link className="hover:text-foreground" href="/dashboard/customerDashboard">Customer</Link></nav></div></header>;
}
