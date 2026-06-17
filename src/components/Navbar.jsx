"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createAuthClient } from "better-auth/react";
import { HiChevronDown } from "react-icons/hi";

const auth = createAuthClient();

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: session } = auth.useSession();

  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    setDropdownOpen(false);
    router.push("/");
    router.refresh();
  };

  const linkClass = (path) =>
    `px-4 py-2 rounded-lg transition ${
      pathname === path
        ? "bg-orange-600 text-white"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <nav className="bg-black text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">

        {/* LOGO (UNCHANGED) */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-9 h-9 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3h6c5 0 8 3 8 9s-3 9-8 9H5V3z M10 8h-2v8h2c2.5 0 4-1.5 4-4s-1.5-4-4-4z"/>
            </svg>
          </div>

          <span className="text-2xl font-black">
            Drive<span className="text-orange-500">Fleet</span>
          </span>
        </Link>

        {/* MENU */}
        <div className="hidden md:flex items-center gap-3">

          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/explore-cars" className={linkClass("/explore-cars")}>Explore Cars</Link>
          <Link href="/add-car" className={linkClass("/add-car")}>Add Car</Link>
          <Link href="/bookings" className={linkClass("/bookings")}>My Bookings</Link>

          <div className="w-px h-6 bg-gray-700 mx-2" />

          {/* AUTH */}
          {!session ? (
            <>
              <Link href="/login" className={linkClass("/login")}>Login</Link>
              <Link href="/signup" className={linkClass("/signup")}>Register</Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>

              {/* SIMPLE ICON DROPDOWN BUTTON */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-gray-800 transition"
              >
                {/* AVATAR */}
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    className="w-8 h-8 rounded-full border border-orange-500 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-sm font-bold">
                    {session?.user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}

                {/* DROPDOWN ICON */}
                <HiChevronDown className="text-gray-300 text-lg" />
              </button>

              {/* SIMPLE DROPDOWN */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden">

                  <Link
                    href="/add-car"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-800"
                  >
                    Add Car
                  </Link>

                  <Link
                    href="/bookings"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-800"
                  >
                    My Bookings
                  </Link>

                  <Link
                    href="/my-added-cars"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-800"
                  >
                    My Added Cars
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800"
                  >
                    Logout
                  </button>

                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2">

          <Link href="/" className={linkClass("/")} onClick={() => setOpen(false)}>Home</Link>
          <Link href="/explore-cars" className={linkClass("/explore-cars")} onClick={() => setOpen(false)}>Explore</Link>
          <Link href="/add-car" className={linkClass("/add-car")} onClick={() => setOpen(false)}>Add Car</Link>
          <Link href="/my-bookings" className={linkClass("/my-bookings")} onClick={() => setOpen(false)}>Bookings</Link>

          {!session ? (
            <>
              <Link href="/login" className={linkClass("/login")} onClick={() => setOpen(false)}>Login</Link>
              <Link href="/signup" className={linkClass("/signup")} onClick={() => setOpen(false)}>Register</Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-400 px-4 py-2"
            >
              Logout
            </button>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;