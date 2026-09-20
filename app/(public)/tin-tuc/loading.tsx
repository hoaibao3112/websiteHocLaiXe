export default function TinTucLoading() {
  return (
    <div className="pt-16 sm:pt-20 pb-20 sm:pb-28 bg-neutral-50/70 min-h-screen">
      {/* Banner skeleton */}
      <div className="bg-neutral-900 py-8 sm:py-14 px-4 mb-6 sm:mb-10 animate-pulse">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="h-4 bg-neutral-800 rounded w-48" />
          <div className="h-8 bg-neutral-800 rounded w-72 sm:w-96" />
          <div className="h-4 bg-neutral-800 rounded w-64 sm:w-80" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Sidebar skeleton (hidden on mobile, matches real layout) */}
          <div className="hidden lg:block lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 animate-pulse space-y-4">
              <div className="h-4 bg-neutral-200 rounded w-32" />
              <div className="h-11 bg-neutral-100 rounded-xl w-full" />
            </div>
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 animate-pulse space-y-3">
              <div className="h-4 bg-neutral-200 rounded w-40" />
              <div className="space-y-2 pt-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-9 bg-neutral-100 rounded-xl w-full" />
                ))}
              </div>
            </div>
          </div>

          {/* News grid skeleton (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/80 overflow-hidden animate-pulse flex flex-col justify-between"
                >
                  <div className="aspect-[16/10] bg-neutral-200" />
                  <div className="p-4 sm:p-5 space-y-3">
                    <div className="h-4 bg-neutral-200 rounded w-full" />
                    <div className="h-4 bg-neutral-200 rounded w-4/5" />
                    <div className="space-y-1.5 pt-2">
                      <div className="h-3 bg-neutral-100 rounded w-full" />
                      <div className="h-3 bg-neutral-100 rounded w-5/6" />
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 pt-0">
                    <div className="h-4 bg-neutral-100 rounded w-32 pt-3 border-t border-neutral-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
