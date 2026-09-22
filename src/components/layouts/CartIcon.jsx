'use client';

import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';

export default function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cart"
      aria-label="Open shopping cart"
      className="btn btn-ghost btn-circle relative"
    >
      <FiShoppingCart className="h-5 w-5" aria-hidden="true" />
      {totalItems > 0 && (
        <span className="badge badge-primary badge-sm absolute -right-1 -top-1 border-2 border-base-100">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Link>
  );
}
