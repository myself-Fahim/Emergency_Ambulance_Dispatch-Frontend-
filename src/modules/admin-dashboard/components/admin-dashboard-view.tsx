import { designClasses } from "@/config/design-system";
import { DriverApplicationActions } from "@/modules/admin-dashboard/components/driver-moderation-actions";

type RecordValue = Record<string, unknown>;
const asList = (value: unknown): RecordValue[] => {
  if (Array.isArray(value)) return value.filter((item): item is RecordValue => !!item && typeof item === "object");
  if (value && typeof value === "object") {
    const record = value as RecordValue;
    for (const key of ["data", "applications", "drivers", "results"]) if (record[key]) return asList(record[key]);
  }
  return [];
};
const field = (item: RecordValue, keys: string[]) => { for (const key of keys) if (item[key] !== undefined && item[key] !== null) return String(item[key]); return "—"; };

export function AdminDashboardView({ applications, error }: { applications: unknown; error?: string }) {
  const applicationList = asList(applications);
  const pendingApplications = applicationList.filter((application) => !["APPROVED", "ACCEPTED"].includes(field(application, ["status"]).toUpperCase()));
  return <div className="space-y-6">{error && <div role="alert" className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}<section id="applications" className={designClasses.section}><div className="mb-5"><h2 className={designClasses.sectionHeading}>Driver applications</h2><p className={`${designClasses.mutedText} mt-2`}>Review pending driver applications.</p></div>{pendingApplications.length === 0 ? <p className={designClasses.mutedText}>No pending driver applications found.</p> : <div className="space-y-3">{pendingApplications.map((application) => { const id = field(application, ["id", "_id"]); return <div className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between" key={id}><div><p className="font-medium">{field(application, ["name", "fullName"])}</p><p className={designClasses.mutedText}>{field(application, ["email"])} · {field(application, ["phone"])} · {field(application, ["status"])}</p></div><DriverApplicationActions id={id} /></div>; })}</div>}</section></div>;
}
