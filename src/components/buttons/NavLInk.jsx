'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLInk = ({ href, children }) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <Link
      className={`${isActive ? 'text-primary' : ''} font-medium`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavLInk;
