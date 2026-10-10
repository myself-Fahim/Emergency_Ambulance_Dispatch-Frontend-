import { designClasses } from "@/config/design-system";
import { AuthForm } from "@/modules/auth/components/auth-form";

export default function RegisterPage() {
  return <section className={`${designClasses.section} w-full max-w-md space-y-6`}><div className="space-y-2"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Join the platform</p><h1 className="text-2xl font-semibold tracking-tight">Create your dispatch account</h1><p className={designClasses.mutedText}>Register to access emergency response operations.</p></div><AuthForm googleClientId={process.env.GOOGLE_CLIENT_ID?.trim()} initialMode="register" /></section>;
}
