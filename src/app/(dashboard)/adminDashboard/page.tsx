import { designClasses } from "@/config/design-system";
import { AdminDashboardView } from "@/modules/admin-dashboard/components/admin-dashboard-view";
import { driverGet } from "@/lib/api/server";

export default async function AdminDashboardPage() {
  let applications: unknown = [];
  let error: string | undefined;
  try {
    applications = await driverGet("driver/application");
  } catch (caught) {
    error = caught instanceof Error ? caught.message : "Unable to load driver administration data.";
  }
  return <div className={designClasses.dashboardShell}><AdminDashboardView applications={applications} error={error} /></div>;
}
