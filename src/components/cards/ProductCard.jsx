'use client';

import { useState } from 'react';
import { FaStar, FaShoppingCart, FaCheck } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCart } from '@/context/CartContext';

const ProductCard = ({ product, index }) => {
  const { title, image, ratings, reviews, sold, price, discount } = product;
  const { addToCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const discountedPrice = discount
    ? Math.round((price - (price * discount) / 100) * 100) / 100
    : price;

  const handleAddToCart = () => {
    if (!session) {
      const callbackUrl = encodeURIComponent(window.location.pathname);
      router.push(`/login?callbackUrl=${callbackUrl}`);
      return;
    }
    addToCart({ id: index, title, image, price, discountedPrice, discount });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300 overflow-hidden flex flex-col">
      {/* Image */}
      <Link href={`/products/${index}`}>
        <div className="h-52 bg-gray-50 overflow-hidden">
          <img
            width={200}
            height={180}
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1 gap-2">
        {/* Title */}
        <Link href={`/products/${index}`}>
          <h2 className="text-base font-semibold text-gray-900 line-clamp-2 hover:text-primary transition-colors leading-snug">
            {title}
          </h2>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400" aria-hidden="true" />
            <span className="font-semibold text-gray-700">{ratings}</span>
          </div>
          <span>·</span>
          <span>{reviews} reviews</span>
          <span>·</span>
          <span>{sold} sold</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-auto pt-2">
          <span className="text-xl font-bold text-gray-900">৳{discountedPrice}</span>
          {discount > 0 && (
            <>
              <span className="text-sm text-gray-400 line-through">৳{price}</span>
              <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                -{discount}%
              </span>
            </>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="btn btn-primary w-full rounded-xl text-white font-semibold mt-2"
          aria-label={added ? 'Added to cart' : 'Add to cart'}
        >
          {added ? (
            <><FaCheck aria-hidden="true" /> Added!</>
          ) : (
            <><FaShoppingCart aria-hidden="true" /> Add to Cart</>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
