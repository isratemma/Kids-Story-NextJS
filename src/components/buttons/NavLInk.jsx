'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLInk = ({ href, children }) => {
  const pathname = usePathname();

  // Strip hash for comparison — /#products should be active on /
  const hrefPath = href.split('#')[0] || '/';
  const isActive =
    pathname === hrefPath || (hrefPath !== '/' && pathname.startsWith(hrefPath));

  return (
    <Link className={`${isActive ? 'text-primary' : ''} font-medium`} href={href}>
      {children}
    </Link>
  );
};

export default NavLInk;
