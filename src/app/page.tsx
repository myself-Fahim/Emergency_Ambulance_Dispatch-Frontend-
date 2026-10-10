import Link from "next/link";

import { Button } from "@/components/ui/button";
import { designClasses } from "@/config/design-system";

export default function HomePage() {
  return (
    <main className={designClasses.pageShell}>
      <section className={designClasses.hero}>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Emergency response platform</p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">Emergency ambulance dispatch, organized for speed.</h1>
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground">The application foundation is ready for dispatchers, drivers, administrators, and customer operational dashboards.</p>
        <div className="flex flex-wrap gap-3">
          <Button render={<Link href="/login" />}>Open dispatch portal</Button>
          <Button variant="outline" render={<Link href="/about" />}>Learn more</Button>
        </div>
      </section>
    </main>
  );
}
