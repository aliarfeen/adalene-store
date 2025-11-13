
const ProductCardSkeleton = () => {
  return (
    <div className="relative px-5 pb-5 rounded-lg cursor-pointer hover:brightness-95 transition-all duration-300">
      {/* --- Skeleton Badges (placeholder position) --- */}
      <div className="absolute top-5 left-8 bg-gray-300 text-transparent text-xs px-3 py-1 rounded-full z-10 shadow-md animate-pulse">
        Loading
      </div>

      {/* --- Product Image Skeleton --- */}
      <div className="overflow-hidden rounded-lg h-96">
        <div className="h-80 w-full rounded-lg bg-gray-200 animate-pulse"></div>
      </div>

      {/* --- Product Info Skeleton --- */}
      <div className="mt-3 text-center">
        {/* Title Skeleton */}
        <div className="mx-auto mb-2 h-5 w-3/4 rounded bg-gray-200 animate-pulse"></div>
        {/* Price Skeleton */}
        <div className="mx-auto h-5 w-1/2 rounded bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
}

export default ProductCardSkeleton
