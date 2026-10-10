import { designClasses } from "@/config/design-system";
import { AdminDashboardView } from "@/modules/admin-dashboard/components/admin-dashboard-view";

export default function AdminDashboardPage() {
  return <div className={designClasses.dashboardShell}><AdminDashboardView /></div>;
}
