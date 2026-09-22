import products from '@/data/toys.json';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaStar } from 'react-icons/fa';
import { FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import AddToCartButton from '@/components/buttons/AddToCartButton';

export async function generateStaticParams() {
  return products.map((_, index) => ({ id: String(index) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = products[Number(id)];
  if (!product) return { title: 'Product Not Found' };

  const description = product.description?.slice(0, 150) ?? '';

  return {
    title: product.title,
    description,
    openGraph: {
      title: product.title,
      description,
      images: [{ url: product.image, alt: product.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description,
      images: [product.image],
    },
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

  const discountedPrice = discount
    ? Math.round((price - (price * discount) / 100) * 100) / 100
    : price;

  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-6xl mx-auto px-4 py-10">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-primary transition-colors mb-8"
        >
          <FiArrowLeft aria-hidden="true" />
          Back to products
        </Link>

        {/* Top card: image + info */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Image */}
            <div className="bg-gray-50 flex items-center justify-center p-8 min-h-80">
              <img
                src={image}
                alt={title}
                className="w-full max-h-96 object-contain hover:scale-105 transition duration-300"
              />
            </div>

            {/* Info */}
            <div className="p-8 flex flex-col gap-4 border-l border-gray-100">

              <div>
                <h1 className="text-2xl font-bold text-gray-900 leading-snug">
                  {title}
                </h1>
                {bangla && (
                  <p className="mt-1 text-sm text-gray-400">{bangla}</p>
                )}
              </div>

              <hr className="border-gray-100" />

              {/* Ratings */}
              <div className="flex items-center gap-2 text-sm">
                <FaStar className="text-yellow-400" aria-hidden="true" />
                <span className="font-semibold text-gray-800">{ratings}</span>
                <span className="text-gray-300">·</span>
                <span className="text-gray-500">{reviews} reviews</span>
                <span className="text-gray-300">·</span>
                <span className="text-gray-500">{sold} sold</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  ৳{discountedPrice}
                </span>
                {discount > 0 && (
                  <>
                    <span className="text-base text-gray-400 line-through">
                      ৳{price}
                    </span>
                    <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                      -{discount}%
                    </span>
                  </>
                )}
              </div>

              <hr className="border-gray-100" />

              {/* Info bullets */}
              {info?.length > 0 && (
                <ul className="space-y-2">
                  {info.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 mt-2">
                <AddToCartButton
                  product={{ id: Number(id), title, image, price, discount }}
                />
                <Link href="/cart">
                  <button className="btn btn-outline rounded-full px-8 font-semibold text-gray-700 border-gray-300 hover:bg-gray-50">
                    <FiShoppingBag aria-hidden="true" />
                    View Cart
                  </button>
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* Description */}
        {description && (
          <div className="mt-6 bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Description</h2>
            <div className="space-y-3">
              {description.split('\n\n').map((para, i) => (
                <p key={i} className="text-sm text-gray-600 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Q&A */}
        {qna?.length > 0 && (
          <div className="mt-6 bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {qna.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-gray-50 border border-gray-100 p-5"
                >
                  <p className="font-semibold text-sm text-gray-800">
                    {item.question}
                  </p>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </section>
    </div>
  );
}
