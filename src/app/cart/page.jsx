'use client';

import Link from 'next/link';
import {
  FiArrowLeft,
  FiMinus,
  FiPlus,
  FiShield,
  FiShoppingBag,
  FiTrash2,
  FiTruck,
} from 'react-icons/fi';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalItems, totalPrice } =
    useCart();

  return (
    <section className="min-h-[70vh] bg-white px-4 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-primary"
        >
          <FiArrowLeft aria-hidden="true" />
          Continue shopping
        </Link>

        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Your little collection
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Shopping cart
            </h1>
          </div>
          <p className="text-sm font-medium text-slate-500">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} ready for story
            time
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-20 text-center shadow-sm">
            <FiShoppingBag
              className="mx-auto mb-5 h-12 w-12 text-primary"
              aria-hidden="true"
            />
            <h2 className="text-2xl font-bold text-slate-900">
              Your cart is waiting for a story
            </h2>
            <p className="mx-auto mt-3 max-w-md text-slate-500">
              Pick a new adventure or a playful surprise to bring home.
            </p>
            <Link
              href="/"
              className="btn btn-primary mt-7 rounded-full px-7 text-white"
            >
              Explore the collection
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* Items */}
            <div className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-wrap items-center gap-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-nowrap sm:p-5"
                >
                  {/* Image */}
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gray-50">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-base font-bold text-slate-900">
                      {item.title}
                    </h2>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm font-bold text-primary">
                        ৳{item.discountedPrice}
                      </span>
                      {item.discount > 0 && (
                        <span className="text-xs text-gray-400 line-through">
                          ৳{item.price}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity + Remove */}
                  <div className="flex w-full items-center justify-between sm:w-auto sm:flex-col sm:items-end sm:gap-4">
                    <div className="join rounded-full border border-gray-200 bg-gray-50">
                      <button
                        type="button"
                        className="btn btn-sm btn-ghost join-item rounded-l-full"
                        aria-label={`Decrease ${item.title} quantity`}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <FiMinus aria-hidden="true" />
                      </button>
                      <span className="flex min-w-9 items-center justify-center text-sm font-bold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="btn btn-sm btn-ghost join-item rounded-r-full"
                        aria-label={`Increase ${item.title} quantity`}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <FiPlus aria-hidden="true" />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm text-slate-400 hover:bg-red-50 hover:text-red-500"
                      aria-label={`Remove ${item.title}`}
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FiTrash2 aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Summary */}
            <aside className="h-fit rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-gray-900">Order summary</h2>
              <div className="mt-7 space-y-4 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ৳{totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-gray-900">Free</span>
                </div>
                <div className="border-t border-gray-100 pt-4 text-base">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ৳{totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary mt-8 w-full rounded-full text-white font-semibold"
              >
                Continue to checkout
              </button>
              <div className="mt-7 space-y-3 border-t border-gray-100 pt-5 text-xs text-gray-400">
                <p className="flex items-center gap-2">
                  <FiTruck aria-hidden="true" /> Ships in 2–4 sunny days
                </p>
                <p className="flex items-center gap-2">
                  <FiShield aria-hidden="true" /> Secure checkout for grown-ups
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
