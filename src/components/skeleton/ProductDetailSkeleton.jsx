import React from 'react';

const ProductDetailSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Back link skeleton */}
      <div className="skeleton h-5 w-32 mb-8"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image skeleton */}
        <div className="skeleton h-96 w-full rounded-2xl"></div>

        {/* Details skeleton */}
        <div className="flex flex-col gap-4">
          {/* Title */}
          <div className="skeleton h-8 w-4/5"></div>
          <div className="skeleton h-8 w-3/5"></div>

          {/* Bangla title */}
          <div className="skeleton h-5 w-2/3"></div>

          {/* Rating row */}
          <div className="flex gap-3 mt-1">
            <div className="skeleton h-5 w-14"></div>
            <div className="skeleton h-5 w-24"></div>
            <div className="skeleton h-5 w-20"></div>
          </div>

          {/* Price */}
          <div className="flex gap-3 items-center mt-2">
            <div className="skeleton h-9 w-28"></div>
            <div className="skeleton h-6 w-20"></div>
            <div className="skeleton h-6 w-14 rounded-full"></div>
          </div>

          {/* Info list */}
          <div className="flex flex-col gap-2 mt-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton h-4 w-full"></div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <div className="skeleton h-12 w-40 rounded-full"></div>
            <div className="skeleton h-12 w-40 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Description section */}
      <div className="mt-14">
        <div className="skeleton h-7 w-40 mb-5"></div>
        <div className="flex flex-col gap-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`skeleton h-4 ${i === 4 ? 'w-2/3' : 'w-full'}`}></div>
          ))}
        </div>
      </div>

      {/* Q&A section */}
      <div className="mt-14">
        <div className="skeleton h-7 w-48 mb-5"></div>
        <div className="flex flex-col gap-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="skeleton h-5 w-3/4"></div>
              <div className="skeleton h-4 w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
