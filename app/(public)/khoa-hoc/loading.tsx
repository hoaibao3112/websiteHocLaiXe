export default function KhoaHocLoading() {
  return (
    <div className="pt-20 animate-pulse">
      {/* Banner skeleton */}
      <div className="bg-neutral-200 h-[300px]" />

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="h-6 bg-neutral-200 rounded-full w-40 mx-auto mb-4" />
          <div className="h-10 bg-neutral-200 rounded w-72 mx-auto mb-4" />
          <div className="h-4 bg-neutral-100 rounded w-60 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
              <div className="aspect-video bg-neutral-200" />
              <div className="p-6 space-y-3">
                <div className="h-6 bg-neutral-200 rounded w-3/4" />
                <div className="h-3 bg-neutral-100 rounded w-full" />
                <div className="h-3 bg-neutral-100 rounded w-5/6" />
                <div className="h-10 bg-neutral-200 rounded-xl mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
