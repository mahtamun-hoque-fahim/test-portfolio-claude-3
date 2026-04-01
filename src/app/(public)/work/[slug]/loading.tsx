export default function ProjectLoading() {
  return (
    <div className="pt-32 pb-24 max-w-8xl mx-auto px-6 md:px-12 animate-pulse">
      {/* Back link */}
      <div className="h-2.5 w-20 bg-paper-border rounded mb-12" />

      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16 pb-12 border-b border-paper-border">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-2.5 w-28 bg-paper-border rounded" />
          <div className="h-16 w-4/5 bg-paper-border rounded" />
          <div className="h-16 w-3/5 bg-paper-border rounded" />
          <div className="h-5 w-full bg-paper-border rounded mt-4" />
          <div className="h-5 w-3/4 bg-paper-border rounded" />
        </div>
        <div className="space-y-6">
          {[40, 56, 80, 48].map((w, i) => (
            <div key={i}>
              <div className="h-2 w-16 bg-paper-border rounded mb-2" />
              <div className="h-4 bg-paper-border rounded" style={{ width: w * 2 }} />
            </div>
          ))}
        </div>
      </div>

      {/* Cover image */}
      <div className="aspect-video bg-paper-warm skeleton mb-16 w-full" />

      {/* Description */}
      <div className="max-w-2xl space-y-3 mb-20">
        <div className="h-2.5 w-32 bg-paper-border rounded mb-4" />
        {[100, 90, 95, 80, 70].map((w, i) => (
          <div key={i} className="h-4 bg-paper-border rounded" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}
