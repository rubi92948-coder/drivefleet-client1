"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CarCards = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars`
        );
        const data = await res.json();
        setCars(data || []);
      } catch (err) {
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-orange-500">
        Loading cars...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      
      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden hover:scale-[1.02] transition"
          >
            
            {/* IMAGE */}
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-48 object-cover"
            />

            {/* CONTENT */}
            <div className="p-5 text-white">

              <h2 className="text-xl font-bold mb-1">{car.name}</h2>

              <p className="text-gray-400 text-sm mb-2">
                {car.type} • {car.seats} Seats
              </p>

              <p className="text-gray-400 text-sm mb-2">
                📍 {car.location}
              </p>

              <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                {car.description}
              </p>

              {/* PRICE + STATUS */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-orange-500 font-bold">
                  ${car.price}/day
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    car.availability
                      ? "bg-green-600/20 text-green-400"
                      : "bg-red-600/20 text-red-400"
                  }`}
                >
                  {car.availability ? "Available" : "Booked"}
                </span>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-2">
                
                <button
                  onClick={() => router.push(`/car/${car._id}`)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 py-2 rounded-lg"
                >
                  View Details
                </button>

                <button
                  className="flex-1 bg-orange-600 hover:bg-orange-700 py-2 rounded-lg"
                  disabled={!car.availability}
                >
                  Book
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default CarCards;