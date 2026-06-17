"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    // ✅ SAFE CHECK
    if (!user?.email) {
      console.log("No user found");
      return;
    }

    axios
      .get(`http://localhost:5000/api/bookings/${user.email}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="text-white p-10">
      <h1 className="text-2xl mb-4">My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        bookings.map((b, i) => (
          <div key={i} className="bg-slate-800 p-4 mb-3 rounded">
            <h2>{b.carName}</h2>
            <p>${b.price}</p>
          </div>
        ))
      )}
    </div>
  );
}