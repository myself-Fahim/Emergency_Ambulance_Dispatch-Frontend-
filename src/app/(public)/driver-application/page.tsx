import { designClasses } from "@/config/design-system";
import { DriverApplicationForm } from "@/modules/driver-dashboard/components/driver-application-form";

export default function DriverApplicationPage({ searchParams }: { searchParams: Promise<{ submitted?: string }> }) {
  return <DriverApplicationContent searchParams={searchParams} />;
}

async function DriverApplicationContent({ searchParams }: { searchParams: Promise<{ submitted?: string }> }) {
  const params = await searchParams;
  return <section className={`${designClasses.section} mx-auto my-12 w-full max-w-2xl`}><div className="mb-8 space-y-2"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Join our response team</p><h1 className="text-3xl font-semibold tracking-tight">Driver application</h1><p className={designClasses.mutedText}>Submit your details for review by the emergency dispatch administration team.</p></div>{params.submitted ? <div className="rounded-lg bg-primary/10 p-4 text-sm">Your application was submitted successfully and is awaiting review.</div> : <DriverApplicationForm />}</section>;
}
