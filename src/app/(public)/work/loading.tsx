export default function WorkLoading() {
  return (
    <div className="pt-32 pb-24 max-w-8xl mx-auto px-6 md:px-12 animate-pulse">
      {/* Header */}
      <div className="mb-16">
        <div className="h-2.5 w-20 bg-paper-border rounded mb-4" />
        <div className="h-14 w-72 bg-paper-border rounded mb-4" />
        <div className="h-3 w-96 bg-paper-border rounded" />
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 mb-12 border-b border-paper-border pb-8">
        {[60, 40, 80, 60, 70].map((w, i) => (
          <div key={i} className="h-8 bg-paper-border rounded" style={{ width: w }} />
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-paper-border">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-paper">
            <div className="aspect-video bg-paper-warm skeleton" />
            <div className="p-8 space-y-3">
              <div className="h-2.5 w-24 bg-paper-border rounded" />
              <div className="h-8 w-3/4 bg-paper-border rounded" />
              <div className="h-3 w-full bg-paper-border rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
