import React from 'react';
import Logo from './Logo';
import NavLInk from '../buttons/NavLInk';
import Link from 'next/link';
import CartIcon from './CartIcon';
import { auth } from '@/auth';
import { FiUser } from 'react-icons/fi';
import SignOutButton from '../buttons/SignOutButton';

const Navbar = async () => {
  const session = await auth();

  const nav = (
    <>
      <li><NavLInk href={'/'}>Home</NavLInk></li>
      <li><NavLInk href={'/#products'}>Products</NavLInk></li>
      <li><NavLInk href={'/blog'}>Blog</NavLInk></li>
      <li><NavLInk href={'/contact'}>Contact</NavLInk></li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
              {nav}
            </ul>
          </div>
          <Logo />
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{nav}</ul>
        </div>

        <div className="navbar-end gap-2">
          <CartIcon />
          {session?.user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                <FiUser className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline max-w-[120px] truncate">
                  {session.user.name ?? session.user.email}
                </span>
              </div>
              <SignOutButton />
            </div>
          ) : (
            <Link href="/login" className="btn btn-primary text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
