export default function TinTucLoading() {
  return (
    <div className="pt-20 animate-pulse">
      {/* Banner skeleton */}
      <div className="bg-neutral-200 h-[300px]" />

      {/* News grid skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-3xl border border-neutral-100 overflow-hidden">
              <div className="aspect-video bg-neutral-200" />
              <div className="p-6 space-y-3">
                <div className="h-3 bg-neutral-100 rounded w-24" />
                <div className="h-5 bg-neutral-200 rounded w-full" />
                <div className="h-5 bg-neutral-200 rounded w-3/4" />
                <div className="space-y-2 mt-2">
                  <div className="h-3 bg-neutral-100 rounded w-full" />
                  <div className="h-3 bg-neutral-100 rounded w-5/6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
