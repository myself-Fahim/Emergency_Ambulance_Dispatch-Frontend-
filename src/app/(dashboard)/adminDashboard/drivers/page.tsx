import { designClasses } from "@/config/design-system";
import { driverGet } from "@/lib/api/server";
import { ApprovedDriversView } from "@/modules/admin-dashboard/components/approved-drivers-view";

export default async function ApprovedDriversPage() {
  let drivers: unknown = [];
  let error: string | undefined;
  try { drivers = await driverGet("driver"); } catch (caught) { error = caught instanceof Error ? caught.message : "Unable to load approved drivers."; }
  return <div className={designClasses.dashboardShell}><ApprovedDriversView drivers={drivers} error={error} /></div>;
}
