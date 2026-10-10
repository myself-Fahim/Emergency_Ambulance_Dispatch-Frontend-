import { designClasses } from "@/config/design-system";
import { CustomerDashboardView } from "@/modules/customer-dashboard/components/customer-dashboard-view";

export default function CustomerDashboardPage() {
  return <div className={designClasses.dashboardShell}><CustomerDashboardView /></div>;
}
