import React from 'react';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';

const ProductCard = ({ product, index }) => {
  const { title, image, ratings, reviews, sold, price, discount } = product;

  const discountedPrice = discount ? price - (price * discount) / 100 : price;

  return (
    <div className="card border border-gray-200 bg-white text-black shadow-md transition duration-300 hover:shadow-xl">
      {/* Product Image */}
      <Link href={`/products/${index}`}>
        <figure className="h-56 overflow-hidden bg-gray-100 cursor-pointer">
          <img
            width={200}
            height={180}
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </figure>
      </Link>

      <div className="card-body p-5">
        {/* Title */}
        <Link href={`/products/${index}`}>
          <h2 className="card-title text-lg font-semibold line-clamp-2 hover:text-primary transition-colors cursor-pointer">
            {title}
          </h2>
        </Link>

        {/* Rating + Reviews + Sold */}
        <div className="flex items-center gap-3 text-sm mt-1">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400" />
            <span className="font-medium">{ratings}</span>
          </div>

          <span className="text-gray-500">({reviews} reviews)</span>

          <span className="text-gray-500">{sold} sold</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xl font-bold text-black">
            ৳{discountedPrice}
          </span>

          {discount > 0 && (
            <>
              <span className="text-sm text-gray-400 line-through">
                ৳{price}
              </span>

              <span className="badge badge-error text-black">-{discount}%</span>
            </>
          )}
        </div>

        {/* Add to Cart */}
        <div className="card-actions mt-4">
          <button className="btn btn-primary w-full text-black">
            <FaShoppingCart />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
