import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
  return (
    <div>
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/logo.png"
          alt="Logo"
          width={50}
          height={50}
          className="mr-2"
        />
        <h2 className="font-bold text-lg">Kids <span className='text-primary'>Story</span></h2>
      </Link>
    </div>
  );
};

export default Logo;
