'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  FiArrowLeft,
  FiMinus,
  FiPlus,
  FiShield,
  FiShoppingBag,
  FiTrash2,
  FiTruck,
} from 'react-icons/fi';

const starterItems = [
  {
    id: 1,
    name: 'The Moonlight Adventure',
    detail: 'Hardcover storybook',
    price: 24,
    color: 'bg-cyan-100',
    art: 'moon',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Hero Kid Sticker Set',
    detail: '24 colorful stickers',
    price: 8,
    color: 'bg-amber-100',
    art: 'star',
    quantity: 1,
  },
];

function ItemArtwork({ art }) {
  return (
    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white/70 text-4xl shadow-inner">
      {art === 'moon' ? '🌙' : '⭐'}
    </div>
  );
}

export default function CartPage() {
  const [items, setItems] = useState(starterItems);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const updateQuantity = (id, change) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <section className="min-h-[70vh] bg-slate-50 px-4 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/products"
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
            {itemCount} {itemCount === 1 ? 'item' : 'items'} ready for story
            time
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center shadow-sm">
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
              href="/products"
              className="btn btn-primary mt-7 rounded-full px-7"
            >
              Explore the collection
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-wrap items-center gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-nowrap sm:p-5"
                >
                  <div className={`rounded-2xl p-2 ${item.color}`}>
                    <ItemArtwork art={item.art} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-lg font-bold text-slate-900">
                      {item.name}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
                    <p className="mt-3 font-bold text-primary">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-between sm:w-auto sm:flex-col sm:items-end sm:gap-4">
                    <div className="join rounded-full border border-slate-200 bg-slate-50">
                      <button
                        type="button"
                        className="btn btn-sm btn-ghost join-item rounded-l-full"
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <FiMinus aria-hidden="true" />
                      </button>
                      <span className="flex min-w-9 items-center justify-center text-sm font-bold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="btn btn-sm btn-ghost join-item rounded-r-full"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <FiPlus aria-hidden="true" />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm text-slate-400 hover:bg-red-50 hover:text-red-500"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => updateQuantity(item.id, -item.quantity)}
                    >
                      <FiTrash2 aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-3xl bg-zinc-100 p-6 text-black shadow-xl shadow-slate-200 sm:p-8">
              <h2 className="text-xl font-bold">Order summary</h2>
              <div className="mt-7 space-y-4 text-sm text-black">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-black">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-black">Free</span>
                </div>
                <div className="border-t border-slate-700 pt-4 text-base">
                  <div className="flex justify-between">
                    <span className="font-semibold text-black">Total</span>
                    <span className="text-2xl font-bold text-black">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary mt-8 w-full rounded-full text-black"
              >
                Continue to checkout
              </button>
              <div className="mt-7 space-y-3 border-t border-slate-700 pt-5 text-xs text-black">
                <p className="flex items-center gap-2">
                  <FiTruck aria-hidden="true" /> Ships in 2-4 sunny days
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
