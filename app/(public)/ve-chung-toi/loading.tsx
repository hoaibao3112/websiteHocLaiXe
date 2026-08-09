export default function VeChungToiLoading() {
  return (
    <div className="pt-20 animate-pulse">
      {/* Banner skeleton */}
      <div className="bg-neutral-200 h-[450px]" />

      {/* Overview skeleton */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="h-4 bg-neutral-200 rounded w-40" />
            <div className="h-10 bg-neutral-200 rounded w-80" />
            <div className="space-y-2">
              <div className="h-4 bg-neutral-100 rounded w-full" />
              <div className="h-4 bg-neutral-100 rounded w-5/6" />
              <div className="h-4 bg-neutral-100 rounded w-4/6" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-[4/3] bg-neutral-200 rounded-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
