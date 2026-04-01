export default function SortLoading() {
  return (
    <div className="p-8 max-w-2xl animate-pulse">
      <div className="h-2.5 w-24 bg-paper-border rounded mb-4" />
      <div className="h-10 w-48 bg-paper-border rounded mb-2" />
      <div className="h-3 w-72 bg-paper-border rounded mb-8" />

      <div className="bg-paper border border-paper-border">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-4 py-3 border-b border-paper-border last:border-0"
          >
            <div className="w-4 h-4 bg-paper-border rounded shrink-0" />
            <div className="w-10 h-10 bg-paper-warm border border-paper-border shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-3/4 bg-paper-border rounded" />
              <div className="h-2.5 w-1/2 bg-paper-border rounded" />
            </div>
            <div className="h-5 w-12 bg-paper-border rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
