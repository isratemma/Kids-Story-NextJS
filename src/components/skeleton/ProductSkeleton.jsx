import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-md border border-base-200">
      {/* Image Skeleton */}
      <div className="skeleton h-56 w-full rounded-t-2xl"></div>

      <div className="card-body p-5">
        {/* Title Skeleton */}
        <div className="skeleton h-6 w-4/5"></div>
        <div className="skeleton h-6 w-3/5"></div>

        {/* Rating Skeleton */}
        <div className="flex gap-2 mt-2">
          <div className="skeleton h-5 w-12"></div>
          <div className="skeleton h-5 w-24"></div>
          <div className="skeleton h-5 w-16"></div>
        </div>

        {/* Price Skeleton */}
        <div className="flex gap-3 mt-3">
          <div className="skeleton h-7 w-24"></div>
          <div className="skeleton h-5 w-16"></div>
        </div>

        {/* Button Skeleton */}
        <div className="skeleton h-12 w-full mt-4"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
