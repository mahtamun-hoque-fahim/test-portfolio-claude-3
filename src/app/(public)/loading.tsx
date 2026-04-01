export default function Loading() {
  return (
    <div className="pt-32 pb-24 max-w-8xl mx-auto px-6 md:px-12 animate-pulse">
      {/* Eyebrow */}
      <div className="h-3 w-48 bg-paper-border rounded mb-8" />
      {/* Heading */}
      <div className="h-16 w-3/4 bg-paper-border rounded mb-6" />
      <div className="h-16 w-1/2 bg-paper-border rounded mb-12" />
      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-paper-border">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-paper">
            <div className="aspect-[4/3] bg-paper-warm" />
            <div className="p-6 space-y-3">
              <div className="h-2.5 w-24 bg-paper-border rounded" />
              <div className="h-6 w-3/4 bg-paper-border rounded" />
              <div className="h-3 w-full bg-paper-border rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
