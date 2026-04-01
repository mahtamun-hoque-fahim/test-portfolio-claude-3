export default function ContactLoading() {
  return (
    <div className="pt-32 pb-24 max-w-8xl mx-auto px-6 md:px-12 animate-pulse">
      <div className="mb-16">
        <div className="h-2.5 w-20 bg-paper-border rounded mb-4" />
        <div className="h-14 w-2/3 bg-paper-border rounded" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">
        {/* Form skeleton */}
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <div className="h-2 w-20 bg-paper-border rounded" />
              <div className="h-11 bg-paper-warm border border-paper-border rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-2 w-16 bg-paper-border rounded" />
              <div className="h-11 bg-paper-warm border border-paper-border rounded" />
            </div>
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-2 w-24 bg-paper-border rounded" />
              <div className="h-11 bg-paper-warm border border-paper-border rounded" />
            </div>
          ))}
          <div className="space-y-2">
            <div className="h-2 w-20 bg-paper-border rounded" />
            <div className="h-32 bg-paper-warm border border-paper-border rounded" />
          </div>
          <div className="h-12 bg-paper-border rounded" />
        </div>

        {/* Sidebar skeleton */}
        <div className="space-y-8">
          {[3, 4, 3].map((lines, i) => (
            <div key={i} className="space-y-3">
              <div className="h-2 w-24 bg-paper-border rounded" />
              {Array.from({ length: lines }).map((_, j) => (
                <div key={j} className="h-3.5 w-3/4 bg-paper-border rounded" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
