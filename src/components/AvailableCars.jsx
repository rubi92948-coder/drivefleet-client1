"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { HiCheckCircle, HiUserGroup, HiInformationCircle } from "react-icons/hi";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars`
        );
        setCars(data || []);
      } catch (err) {
        toast.error("Failed to load car fleet");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleBookNow = async (car) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user?.email) {
        toast.error("Please login to book a car");
        router.push("/login");
        return;
      }

      const bookingData = {
        carId: car._id,
        carName: car.name,
        image: car.image,
        price: car.price,
        userEmail: user.email,
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`,
        bookingData
      );

      toast.success(`${car.name} booked successfully! 🚗`);
    } catch (err) {
      toast.error("Booking request failed");
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-orange-500 animate-pulse">
        Loading Premium Fleet...
      </div>
    );

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      
      {/* TITLE */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold text-white mb-4">
          Our Premium Fleet
        </h2>
        <p className="text-gray-400 text-lg">
          Select your journey from our high-end collection
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {cars.slice(0, 6).map((car) => (
          <div
            key={car._id}
            className="group bg-[#0f172a] rounded-3xl border border-slate-800
                       hover:border-orange-500/50 transition-all duration-300
                       overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2"
          >

            {/* IMAGE */}
            <div className="relative h-60 overflow-hidden">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                {car.availability ? "Available" : "Booked"}
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-6">

              <h3 className="text-2xl font-bold text-white mb-2">
                {car.name}
              </h3>

              {/* SEATS */}
              <div className="flex items-center gap-4 text-gray-400 mb-6">
                <span className="flex items-center gap-1">
                  <HiUserGroup /> {car.seats} Seats
                </span>
              </div>

              {/* PRICE + DETAILS */}
              <div className="flex items-center justify-between gap-4">
                <span className="text-2xl font-bold text-orange-500">
                  ${car.price}
                  <span className="text-sm text-gray-500 font-normal">/day</span>
                </span>

                <button
                  onClick={() => router.push(`/car/${car._id}`)}
                  className="text-white hover:text-orange-500 transition font-medium flex items-center gap-1"
                >
                  <HiInformationCircle /> Details
                </button>
              </div>

              {/* BOOK BUTTON */}
              <button
                onClick={() => handleBookNow(car)}
                disabled={!car.availability}
                className={`w-full mt-6 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
                  car.availability
                    ? "bg-orange-600 hover:bg-orange-700 text-white"
                    : "bg-gray-800 text-gray-500 cursor-not-allowed"
                }`}
              >
                <HiCheckCircle />
                {car.availability
                  ? "Book Now"
                  : "Currently Unavailable"}
              </button>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default AvailableCars;