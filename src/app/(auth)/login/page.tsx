import { designClasses } from "@/config/design-system";
import { AuthForm } from "@/modules/auth/components/auth-form";

export default function LoginPage() {
  return <section className={`${designClasses.section} w-full max-w-md space-y-6`}><div className="space-y-2"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Secure access</p><h1 className="text-2xl font-semibold tracking-tight">Emergency dispatch portal</h1><p className={designClasses.mutedText}>Sign in or create an account to continue.</p></div><AuthForm googleClientId={process.env.GOOGLE_CLIENT_ID?.trim()} initialMode="login" /></section>;
}
