'use client';

import { BiSolidErrorAlt } from 'react-icons/bi';
import Link from 'next/link';

export default function GlobalError({ error, reset }) {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-5">
      <BiSolidErrorAlt size={100} className="text-primary" aria-hidden="true" />
      <h2 className="text-4xl font-bold text-gray-900">Something went wrong</h2>
      {error?.message && (
        <p className="text-sm text-gray-500 max-w-md text-center">{error.message}</p>
      )}
      <div className="flex gap-3">
        <button onClick={reset} className="btn btn-primary">
          Try again
        </button>
        <Link href="/" className="btn btn-outline">
          Go to home
        </Link>
      </div>
    </div>
  );
}
