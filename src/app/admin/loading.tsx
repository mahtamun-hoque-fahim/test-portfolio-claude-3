export default function AdminLoading() {
  return (
    <div className="p-8 animate-pulse">
      <div className="h-3 w-24 bg-paper-border rounded mb-4" />
      <div className="h-10 w-64 bg-paper-border rounded mb-2" />
      <div className="h-3 w-48 bg-paper-border rounded mb-10" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-paper border border-paper-border p-6">
            <div className="h-4 w-4 bg-paper-border rounded mb-6" />
            <div className="h-10 w-16 bg-paper-border rounded mb-2" />
            <div className="h-2.5 w-24 bg-paper-border rounded" />
          </div>
        ))}
      </div>

      <div className="bg-paper border border-paper-border">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-paper-border last:border-0">
            <div className="h-3 w-3/4 bg-paper-border rounded" />
            <div className="h-3 w-16 bg-paper-border rounded ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
