import products from '@/data/toys.json';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { FiArrowLeft, FiShoppingBag } from 'react-icons/fi';

export async function generateStaticParams() {
  return products.map((_, index) => ({ id: String(index) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = products[Number(id)];
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.title} | Kids Story`,
    description: product.description?.slice(0, 150),
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = products[Number(id)];

  if (!product) notFound();

  const {
    title,
    bangla,
    image,
    price,
    discount,
    description,
    ratings,
    reviews,
    sold,
    info,
    qna,
  } = product;

  const discountedPrice = discount ? price - (price * discount) / 100 : price;

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 text-black">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary transition-colors mb-8"
      >
        <FiArrowLeft aria-hidden="true" />
        Back to products
      </Link>

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Product image */}
        <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 shadow-md">
          <img
            src={image}
            alt={title}
            className="w-full h-96 object-cover hover:scale-105 transition duration-300"
          />
        </div>

        {/* Product info */}
        <div className="flex flex-col gap-3">
          {/* Titles */}
          <h1 className="text-3xl font-bold leading-snug">{title}</h1>
          {bangla && (
            <p className="text-base text-gray-500 font-medium">{bangla}</p>
          )}

          {/* Rating row */}
          <div className="flex items-center gap-3 text-sm mt-1">
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-400" aria-hidden="true" />
              <span className="font-semibold">{ratings}</span>
            </div>
            <span className="text-gray-500">({reviews} reviews)</span>
            <span className="text-gray-500">{sold} sold</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mt-2">
            <span className="text-3xl font-bold">৳{discountedPrice}</span>
            {discount > 0 && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  ৳{price}
                </span>
                <span className="badge badge-error text-black font-semibold">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          {/* Info highlights */}
          {info?.length > 0 && (
            <ul className="mt-3 space-y-2">
              {info.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          )}

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button className="btn btn-primary rounded-full px-8 text-black">
              <FaShoppingCart aria-hidden="true" />
              Add to Cart
            </button>
            <Link href="/cart">
              <button className="btn btn-outline rounded-full px-8">
                <FiShoppingBag aria-hidden="true" />
                View Cart
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="mt-14">
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            {description.split('\n\n').map((para, i) => (
              <p key={i} className="mb-4">
                {para}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Q&A */}
      {qna?.length > 0 && (
        <div className="mt-14">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {qna.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm"
              >
                <p className="font-semibold text-black">{item.question}</p>
                <p className="mt-2 text-sm text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
