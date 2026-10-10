/** Shared class recipes for consistent page composition across modules. */
export const designClasses = {
  pageShell: "flex min-h-[calc(100vh-4rem)] flex-col bg-background",
  hero: "mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-6 px-6 py-16 sm:px-8 lg:px-12",
  dashboardShell: "mx-auto w-full max-w-7xl px-6 py-8 sm:px-8 lg:px-12",
  section: "rounded-2xl border bg-card p-6 shadow-sm",
  sectionHeading: "text-xl font-semibold tracking-tight text-card-foreground",
  mutedText: "text-sm leading-6 text-muted-foreground",
} as const;
