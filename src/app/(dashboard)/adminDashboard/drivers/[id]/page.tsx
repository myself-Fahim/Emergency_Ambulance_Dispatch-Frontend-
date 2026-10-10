import { notFound } from "next/navigation";
import { designClasses } from "@/config/design-system";
import { driverGet } from "@/lib/api/server";

export default async function DriverDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let driver: Record<string, unknown>;
  try {
    driver = await driverGet(`driver/${encodeURIComponent(id)}`) as Record<string, unknown>;
  } catch {
    notFound();
  }
  const data = (driver.data && typeof driver.data === "object" ? driver.data : driver) as Record<string, unknown>;
  return <div className={designClasses.dashboardShell}><section className={designClasses.section}><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Driver profile</p><h1 className="mt-2 text-3xl font-semibold">{String(data.name ?? data.fullName ?? data.email ?? "Driver")}</h1><dl className="mt-6 grid gap-4 sm:grid-cols-2">{Object.entries(data).filter(([key]) => !["password", "token"].includes(key)).map(([key, value]) => <div className="rounded-lg border p-3" key={key}><dt className="text-xs uppercase text-muted-foreground">{key}</dt><dd className="mt-1 text-sm">{typeof value === "object" ? JSON.stringify(value) : String(value ?? "—")}</dd></div>)}</dl></section></div>;
}
