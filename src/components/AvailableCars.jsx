"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { HiUserGroup, HiInformationCircle } from "react-icons/hi";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // FETCH CARS FROM DB
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars`
        );

        setCars(Array.isArray(data) ? data : []);
      } catch (err) {
        toast.error("Failed to load cars");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // LOADING UI
  if (loading) {
    return (
      <div className="text-center py-20 text-orange-500 animate-pulse">
        Loading Available Cars...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">

      {/* TITLE */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white">
          Available Cars
        </h2>
        <p className="text-gray-400 mt-3">
          Choose your perfect ride 🚗
        </p>
      </div>

      {/* GRID (MIN 6 CARS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {cars.slice(0, 6).map((car) => (
          <div
            key={car._id}
            className="group bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden
                       hover:border-orange-500/50 hover:-translate-y-2
                       transition-all duration-300 shadow-lg"
          >

            {/* IMAGE */}
            <div className="h-52 overflow-hidden">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* CONTENT */}
            <div className="p-5">

              {/* CAR NAME */}
              <h3 className="text-xl font-bold text-white mb-2">
                {car.name}
              </h3>

              {/* SEATS */}
              <p className="text-gray-400 flex items-center gap-2 mb-3">
                <HiUserGroup className="text-orange-500" />
                {car.seats} Seats
              </p>

              {/* PRICE */}
              <p className="text-orange-500 font-bold text-lg mb-4">
                ${car.price} /day
              </p>

              {/* VIEW DETAILS BUTTON (FIXED ROUTE) */}
              <button
                onClick={() => router.push(`/explore-cars/${car._id}`)}
                className="w-full flex items-center justify-center gap-2
                           bg-gray-800 hover:bg-orange-600
                           text-white py-2 rounded-lg transition"
              >
                <HiInformationCircle />
                View Details
              </button>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default AvailableCars;