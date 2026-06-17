"use client";

import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { HiHome, HiOutlineCollection, HiPlus, HiBookmark } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white mt-16 border-t border-gray-800">

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-orange-400">
            DriveFleet
          </h2>
          <p className="text-gray-400">
            Rent premium luxury cars at affordable prices.
            Drive your dream car with comfort and style.
          </p>
        </div>

        {/* USEFUL LINKS */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Useful Links
          </h3>

          <ul className="space-y-3 text-gray-400 flex flex-col">

            <Link
              href="/"
              className="hover:text-orange-400 transition flex items-center gap-2 w-fit"
            >
              <HiHome className="text-orange-500" />
              Home
            </Link>

            <Link
              href="/explore-cars"
              className="hover:text-orange-400 transition flex items-center gap-2 w-fit"
            >
              <HiOutlineCollection className="text-orange-500" />
              Explore Cars
            </Link>

            <Link
              href="/add-car"
              className="hover:text-orange-400 transition flex items-center gap-2 w-fit"
            >
              <HiPlus className="text-orange-500" />
              Add Car
            </Link>

            <Link
              href="/my-bookings"
              className="hover:text-orange-400 transition flex items-center gap-2 w-fit"
            >
              <HiBookmark className="text-orange-500" />
              My Bookings
            </Link>

          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>

          <p className="text-gray-400 mb-3">
            Email: support@drivefleet.com
          </p>
          <p className="text-gray-400 mb-5">
            Phone: +880 1234 567 890
          </p>

          <div className="flex gap-4">

            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1e293b] hover:bg-orange-500 transition cursor-pointer">
              <FaFacebook />
            </div>

            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1e293b] hover:bg-orange-500 transition cursor-pointer">
              <FaTwitter />
            </div>

            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1e293b] hover:bg-orange-500 transition cursor-pointer">
              <FaInstagram />
            </div>

            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1e293b] hover:bg-orange-500 transition cursor-pointer">
              <FaGithub />
            </div>

          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} DriveFleet. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;