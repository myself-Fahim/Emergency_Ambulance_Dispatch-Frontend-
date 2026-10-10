import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { getSessionRole } from "@/lib/auth/server";

export async function DashboardHeader() {
  const role = await getSessionRole();
  return <header className="border-b bg-card px-6 py-4 sm:px-8 lg:px-12"><div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4"><Link className="font-semibold tracking-tight" href="/dashboard">Emergency Dispatch</Link><nav className="flex items-center gap-4 text-sm text-muted-foreground" aria-label="Dashboard navigation">{role === "DRIVER" && <Link className="hover:text-foreground" href="/dashboard/driverDashboard">Driver</Link>}{role === "ADMIN" && <Link className="hover:text-foreground" href="/dashboard/adminDashboard">Applications</Link>}{role === "ADMIN" && <Link className="hover:text-foreground" href="/dashboard/adminDashboard/drivers">Approved drivers</Link>}{role === "CUSTOMER" && <Link className="hover:text-foreground" href="/dashboard/customerDashboard">Customer</Link>}<form action={logout}><button className="hover:text-foreground" type="submit">Sign out</button></form></nav></div></header>;
}
