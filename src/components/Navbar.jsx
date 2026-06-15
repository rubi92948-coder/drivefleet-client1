'use client'; // Required for client-side components

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // Load user from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedUser = JSON.parse(localStorage.getItem("user"));
      setUser(loggedUser);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    setOpen(false);
    router.push("/");
  };

  const isActive = (path) => pathname === path;

  return (
    <nav className="bg-black text-white border-b border-gray-800 relative z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3.5">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-9 h-9 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3h6c5 0 8 3 8 9s-3 9-8 9H5V3z M10 8h-2v8h2c2.5 0 4-1.5 4-4s-1.5-4-4-4z" /></svg>
          </div>
          <span className="text-2xl font-black text-white">Drive<span className="text-orange-500">Fleet</span></span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6 font-medium text-gray-300">
          <Link href="/" className={isActive("/") ? "text-orange-500" : "hover:text-white"}>Home</Link>
          <Link href="/explore-cars" className={isActive("/explore-cars") ? "text-orange-500" : "hover:text-white"}>Explore Cars</Link>
          <Link href="/add-car" className={isActive("/add-car") ? "text-orange-500" : "hover:text-white"}>Add Car</Link>

          {!user ? (
            <div className="flex gap-4">
              <button onClick={() => router.push("/login")} className="hover:text-white">LogIn</button>
              <button onClick={() => router.push("/signup")} className="bg-orange-500 px-4 py-2 rounded-lg text-white">Register</button>
            </div>
          ) : (
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="bg-gray-800 px-4 py-2 rounded-full">{user.name.split(" ")[0]}</button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-700 rounded-lg p-2">
                  <button onClick={handleLogout} className="text-red-400 w-full text-left p-2">Log Out</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>☰</button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black p-4 flex flex-col gap-4 border-t border-gray-800">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/explore-cars" onClick={() => setOpen(false)}>Explore Cars</Link>
          <button onClick={handleLogout} className="text-red-500 text-left">Log Out</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;