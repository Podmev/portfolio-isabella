function SkeletonPill({ className = "" }) {
  return <div className={`rounded-full bg-muted ${className}`} />;
}

function SkeletonCard() {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-border bg-card shadow-sm">
      <div className="aspect-[1.35/1] bg-muted" />
      <div className="flex flex-1 flex-col p-5">
        <SkeletonPill className="h-3 w-24" />
        <div className="mt-4 space-y-2">
          <SkeletonPill className="h-5 w-11/12" />
          <SkeletonPill className="h-5 w-3/4" />
        </div>
        <div className="mt-5 space-y-2">
          <SkeletonPill className="h-3 w-full" />
          <SkeletonPill className="h-3 w-5/6" />
        </div>
        <div className="mt-auto flex gap-2 pt-6">
          <SkeletonPill className="h-7 w-20" />
          <SkeletonPill className="h-7 w-24" />
        </div>
      </div>
    </div>
  );
}

export default function PortfolioLoading() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border bg-surface-alt px-6 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex gap-3">
            <SkeletonPill className="h-5 w-28" />
            <SkeletonPill className="h-5 w-24" />
          </div>
          <div className="mx-auto max-w-3xl text-center">
            <SkeletonPill className="mx-auto h-3 w-28" />
            <div className="mx-auto mt-4 h-12 w-full max-w-xl rounded-[28px] bg-muted md:h-16" />
            <div className="mx-auto mt-7 inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground shadow-sm">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-muted border-t-foreground" />
            Loading works
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {[0, 1, 2, 3, 4, 5, 6].map((item) => (
              <SkeletonPill key={item} className="h-10 w-24" />
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <SkeletonCard key={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
