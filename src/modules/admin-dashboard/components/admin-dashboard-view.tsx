import { designClasses } from "@/config/design-system";

export function AdminDashboardView() {
  return <section className={designClasses.section}><h2 className={designClasses.sectionHeading}>Administration</h2><p className={`${designClasses.mutedText} mt-2`}>Users, fleet configuration, and reporting belong in this module.</p></section>;
}
