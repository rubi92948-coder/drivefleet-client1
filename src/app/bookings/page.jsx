"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { HiCalendar, HiUser, HiAnnotation } from "react-icons/hi";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.email) {
      setLoading(false);
      return;
    }

    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/api/bookings/${user.email}`)
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-20 text-orange-500">Loading your bookings...</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-10 pt-20">
      <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-orange-500 to-white text-transparent bg-clip-text">
        My Bookings
      </h1>

      <div className="max-w-4xl mx-auto grid gap-6">
        {bookings.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">No bookings found in your history.</div>
        ) : (
          bookings.map((b) => (
            <div key={b._id} className="bg-[#0b1221] p-6 rounded-3xl border border-white/10 hover:border-orange-500/30 transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{b.carName}</h2>
                  <p className="text-orange-500 font-semibold mb-4">${b.price} / day</p>
                </div>
                <span className="bg-green-500/10 text-green-500 px-4 py-1 rounded-full text-xs font-bold border border-green-500/20">
                  Confirmed
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 border-t border-white/5 pt-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <HiCalendar className="text-orange-500" />
                  {new Date(b.bookingDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <HiUser className="text-orange-500" />
                  Driver: {b.driverNeeded === "Yes" ? "Included" : "Self-drive"}
                </div>
                <div className="flex items-center gap-2">
                  <HiAnnotation className="text-orange-500" />
                  {b.specialNote || "No special notes"}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}