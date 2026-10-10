import { designClasses } from "@/config/design-system";

export function DriverDashboardView() {
  return <section className={designClasses.section}><h2 className={designClasses.sectionHeading}>Driver operations</h2><p className={`${designClasses.mutedText} mt-2`}>Trip status, availability, and navigation features belong in this module.</p></section>;
}
