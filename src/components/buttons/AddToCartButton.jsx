'use client';

import { useState } from 'react';
import { FaShoppingCart, FaCheck } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';

export default function AddToCartButton({ product, className = '' }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    const discountedPrice = product.discount
      ? product.price - (product.price * product.discount) / 100
      : product.price;

    addToCart({
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      discountedPrice,
      discount: product.discount,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      className={`btn btn-primary rounded-full px-8 text-white font-semibold transition-all ${className}`}
      aria-label={added ? 'Added to cart' : 'Add to cart'}
    >
      {added ? (
        <>
          <FaCheck aria-hidden="true" />
          Added!
        </>
      ) : (
        <>
          <FaShoppingCart aria-hidden="true" />
          Add to Cart
        </>
      )}
    </button>
  );
}
