import type { ReactNode } from "react";
import { DashboardHeader } from "@/modules/dashboard/components/dashboard-header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-muted/30"><DashboardHeader /><main>{children}</main></div>;
}
