import Link from "next/link";

export function SiteNavbar() {
  return <header className="border-b bg-card/80 px-6 py-4 sm:px-8 lg:px-12"><div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6"><Link className="font-semibold tracking-tight" href="/">Emergency Dispatch</Link><nav className="flex items-center gap-4 text-sm text-muted-foreground" aria-label="Main navigation"><Link className="hover:text-foreground" href="/">Home</Link><Link className="hover:text-foreground" href="/about">About</Link><Link className="hover:text-foreground" href="/login">Login</Link><Link className="rounded-md bg-primary px-3 py-1.5 text-primary-foreground hover:bg-primary/80" href="/register">Register</Link></nav></div></header>;
}
