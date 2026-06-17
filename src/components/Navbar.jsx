"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createAuthClient } from "better-auth/react";

// Auth client ইনিশিয়ালাইজ করুন
const auth = createAuthClient();

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // better-auth থেকে সেশন ডাটা নিচ্ছি
  const { data: session } = auth.useSession();
  
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut(); // সার্ভার থেকে সাইনআউট
    localStorage.removeItem("user"); 
    setDropdownOpen(false);
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  const getLinkClass = (path) => {
    const baseClass = "px-4 py-2 rounded-lg transition-colors";
    return pathname === path 
      ? `${baseClass} bg-orange-600 text-white` 
      : `${baseClass} text-gray-300 hover:text-white`;
  };

  return (
    <nav className="bg-black text-white border-b border-gray-800 relative z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-9 h-9 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3h6c5 0 8 3 8 9s-3 9-8 9H5V3z M10 8h-2v8h2c2.5 0 4-1.5 4-4s-1.5-4-4-4z" /></svg>
          </div>
          <span className="text-2xl font-black text-white">Drive<span className="text-orange-500">Fleet</span></span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-1 font-medium">
          <Link href="/" className={getLinkClass("/")}>Home</Link>
          <Link href="/explore-cars" className={getLinkClass("/explore-cars")}>Explore Cars</Link>
          <Link href="/add-car" className={getLinkClass("/add-car")}>Add Car</Link>
          <Link href="/my-added-cars" className={getLinkClass("/my-added-cars")}>My Added Cars</Link>
          <Link href="/my-bookings" className={getLinkClass("/my-bookings")}>My Bookings</Link>

          <div className="h-6 w-[1px] bg-gray-700 mx-3"></div>

          {!session ? (
            <div className="flex gap-2 items-center ml-2">
              <Link href="/login" className={getLinkClass("/login")}>LogIn</Link>
              <Link href="/signup" className={getLinkClass("/signup")}>Register</Link>
            </div>
          ) : (
            <div className="relative ml-2">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)} 
                className="flex items-center gap-2 hover:bg-gray-800 p-1 rounded-full transition-all"
              >
                {/* প্রোফাইল ইমেজ বা নাম */}
                {session.user.image ? (
                  <img src={session.user.image} alt={session.user.name} className="w-10 h-10 rounded-full border-2 border-orange-500 object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center font-bold text-white border-2 border-orange-500">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-gray-900 border border-gray-700 rounded-xl p-2 shadow-2xl z-50">
                  <div className="px-4 py-2 text-sm border-b border-gray-700 mb-1">
                    <p className="font-bold">{session.user.name}</p>
                    <p className="text-gray-400 text-xs truncate">{session.user.email}</p>
                  </div>
                  <button onClick={handleLogout} className="text-red-400 w-full text-left p-2 hover:bg-gray-800 rounded transition">Log Out</button>
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
        <div className="md:hidden bg-black p-4 flex flex-col gap-2 border-t border-gray-800">
          <Link href="/" className={getLinkClass("/")} onClick={() => setOpen(false)}>Home</Link>
          <Link href="/explore-cars" className={getLinkClass("/explore-cars")} onClick={() => setOpen(false)}>Explore Cars</Link>
          <Link href="/add-car" className={getLinkClass("/add-car")} onClick={() => setOpen(false)}>Add Car</Link>
          <Link href="/my-bookings" className={getLinkClass("/my-bookings")} onClick={() => setOpen(false)}>My Bookings</Link>
          {!session && <Link href="/signup" className={getLinkClass("/signup")} onClick={() => setOpen(false)}>SignUp</Link>}
          {session && <button onClick={handleLogout} className="text-red-500 text-left p-2 hover:bg-gray-900 rounded">Log Out</button>}
        </div>
      )}
    </nav>
  );
};

export default Navbar;