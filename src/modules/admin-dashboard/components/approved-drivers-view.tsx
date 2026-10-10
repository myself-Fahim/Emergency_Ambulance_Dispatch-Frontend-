import Link from "next/link";
import { designClasses } from "@/config/design-system";

type RecordValue = Record<string, unknown>;
const asList = (value: unknown): RecordValue[] => {
  if (Array.isArray(value)) return value.filter((item): item is RecordValue => !!item && typeof item === "object");
  if (value && typeof value === "object") {
    const record = value as RecordValue;
    for (const key of ["data", "drivers", "results"]) if (record[key]) return asList(record[key]);
  }
  return [];
};
const field = (item: RecordValue, keys: string[]) => { for (const key of keys) if (item[key] !== undefined && item[key] !== null) return String(item[key]); return "—"; };

export function ApprovedDriversView({ drivers, error }: { drivers: unknown; error?: string }) {
  const driverList = asList(drivers);
  return <section className={designClasses.section}>{error && <div role="alert" className="mb-4 rounded-lg bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}<div className="mb-5"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Admin fleet</p><h1 className="mt-2 text-2xl font-semibold tracking-tight">Approved drivers</h1><p className={`${designClasses.mutedText} mt-2`}>Drivers accepted into the emergency response team.</p></div>{driverList.length === 0 ? <p className={designClasses.mutedText}>No approved drivers found.</p> : <div className="space-y-3">{driverList.map((driver) => { const id = field(driver, ["id", "_id"]); return <div className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between" key={id}><div><Link className="font-medium hover:underline" href={`/dashboard/adminDashboard/drivers/${encodeURIComponent(id)}`}>{field(driver, ["name", "fullName", "email"])}</Link><p className={designClasses.mutedText}>{field(driver, ["email"])} · {field(driver, ["phone"])}</p></div><div className="flex gap-2"><button disabled className="cursor-not-allowed rounded-md bg-primary/20 px-3 py-2 text-xs font-medium text-primary" type="button">Approved</button><button disabled className="cursor-not-allowed rounded-md bg-muted px-3 py-2 text-xs font-medium text-muted-foreground" type="button">Reject</button></div></div>; })}</div>}</section>;
}
