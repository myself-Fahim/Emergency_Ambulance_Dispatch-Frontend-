import { designClasses } from "@/config/design-system";
import { DriverDashboardView } from "@/modules/driver-dashboard/components/driver-dashboard-view";

export default function DriverDashboardPage() {
  return <div className={designClasses.dashboardShell}><DriverDashboardView /></div>;
}
