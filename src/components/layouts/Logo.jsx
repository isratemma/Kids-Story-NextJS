import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <Image
        src="/favicon.ico"
        alt="Kids Story Logo"
        width={36}
        height={36}
        className="rounded-lg group-hover:scale-105 transition-transform duration-200"
      />
      <span className="text-lg font-bold tracking-tight text-gray-900 group-hover:text-primary transition-colors duration-200">
        Kids <span className="text-primary">Story</span>
      </span>
    </Link>
  );
};

export default Logo;
