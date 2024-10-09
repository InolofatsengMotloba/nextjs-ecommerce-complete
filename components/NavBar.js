"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const pathname = usePathname();

  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  const isActive = (route) =>
    pathname === route ? "text-[#2d7942]" : "text-white";

  const isLogin = false;

  return (
    <header className="bg-black text-white py-2 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center space-x-2">
            <Image src="/Logo2.png" alt="Logo" width={60} height={60} />
            <h1 className="text-4xl text-[#2d7942] font-nerko font-bold">
              Her Store
            </h1>
          </div>
        </Link>

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleNavbar}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Larger Screens Menu */}
        <nav className="hidden md:flex flex-1 justify-center space-x-8">
          <Link
            href="/"
            className={`text-lg hover:text-gray-500 ${isActive("/")}`}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`text-lg hover:text-gray-500 ${isActive("/products")}`}
          >
            Products
          </Link>
          <Link
            href="/cart"
            className={`text-lg hover:text-gray-500 ${isActive("/cart")}`}
          >
            Cart
          </Link>
        </nav>

        {/* Login Button */}
        {!isLogin && (
          <div className="hidden md:block">
            <Link
              href="/login"
              className={`py-2 px-4 rounded hover:bg-gray-500 ${isActive(
                "/login"
              )}`}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={`py-2 px-4 rounded mr-2 hover:bg-gray-500 ${isActive(
                "/register"
              )}`}
            >
              Register
            </Link>
          </div>
        )}

        {isLogin && (
          <div>
            <Link
              href="/profile"
              className={`py-2 px-4 rounded mr-2 hover:bg-gray-500 ${isActive(
                "/profile"
              )}`}
            >
              Profile
            </Link>
            <Link
              href="/products"
              className={`py-2 px-4 rounded mr-2 hover:bg-gray-500 ${isActive(
                "/products"
              )}`}
            >
              Logout
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {isNavbarVisible && (
        <div className="md:hidden bg-black">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <Link
                href="/"
                className={`text-lg hover:underline ${isActive("/")}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className={`text-lg hover:underline ${isActive("/products")}`}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                className={`text-lg hover:underline ${isActive("/cart")}`}
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className={`text-lg hover:underline ${isActive("/register")}`}
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className={`text-lg hover:underline ${isActive("/login")}`}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
