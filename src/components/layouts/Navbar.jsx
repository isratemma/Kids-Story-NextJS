import React from 'react';
import Logo from './Logo';
import NavLInk from '../buttons/NavLInk';
import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';


const Navbar = () => {
  const nav = (
    <>
      <li>
        <NavLInk href={'/'}>Home</NavLInk>
      </li>
      <li>
        <NavLInk href={'/#products'}>Products</NavLInk>
      </li>
      <li>
        <NavLInk href={'/blog'}>Blog</NavLInk>
      </li>
      <li>
        <NavLInk href={'/contact'}>Contact</NavLInk>
      </li>
      
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100 ">
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
                {' '}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{' '}
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {nav}
            </ul>
          </div>

          <Logo></Logo>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{nav}</ul>
        </div>
        <div className="navbar-end gap-2">
          <Link
            href="/cart"
            aria-label="Open shopping cart"
            className="btn btn-ghost btn-circle relative"
          >
            <FiShoppingCart className="h-5 w-5" aria-hidden="true" />
            <span className="badge badge-primary badge-sm absolute -right-1 -top-1 border-2 border-base-100">
              2
            </span>
          </Link>
          <Link href={'/login'}>
            <button className="btn btn-primary">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
