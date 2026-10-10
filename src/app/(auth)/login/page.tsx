import Link from "next/link";
import { Button } from "@/components/ui/button";
import { designClasses } from "@/config/design-system";

export default function LoginPage() {
  return <section className={`${designClasses.section} w-full max-w-md space-y-6`}><div className="space-y-2"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Secure access</p><h1 className="text-2xl font-semibold tracking-tight">Sign in to dispatch</h1><p className={designClasses.mutedText}>Authentication wiring will be added in the auth module.</p></div><Button className="w-full" render={<Link href="/dashboard" />}>Continue to dashboard</Button></section>;
}
