import { designClasses } from "@/config/design-system";

export function CustomerDashboardView() {
  return <section className={designClasses.section}><h2 className={designClasses.sectionHeading}>Customer operations</h2><p className={`${designClasses.mutedText} mt-2`}>Role-specific widgets and saved views belong in this module.</p></section>;
}
