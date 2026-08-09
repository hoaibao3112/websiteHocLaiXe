export default function PublicLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="relative min-h-[92vh] bg-neutral-200" />

      {/* Stats skeleton */}
      <div className="relative -mt-12 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg border border-neutral-100/80 p-6 text-center">
              <div className="w-10 h-10 bg-neutral-200 rounded-full mx-auto mb-3" />
              <div className="h-8 bg-neutral-200 rounded w-20 mx-auto mb-2" />
              <div className="h-3 bg-neutral-100 rounded w-24 mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Why Us skeleton */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="h-6 bg-neutral-200 rounded-full w-48 mx-auto mb-4" />
          <div className="h-10 bg-neutral-200 rounded w-80 mx-auto mb-4" />
          <div className="h-4 bg-neutral-100 rounded w-64 mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-neutral-100 p-7">
              <div className="w-14 h-14 bg-neutral-200 rounded-2xl mb-5" />
              <div className="h-5 bg-neutral-200 rounded w-32 mb-3" />
              <div className="space-y-2">
                <div className="h-3 bg-neutral-100 rounded w-full" />
                <div className="h-3 bg-neutral-100 rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
