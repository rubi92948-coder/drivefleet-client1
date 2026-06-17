"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCarDetails = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars/${id}`
        );

        setCar(res.data);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load car details");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Loading...
      </div>
    );

  if (!car)
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Car not found!
      </div>
    );

  return (
    <div className="bg-[#020617] min-h-screen text-white pt-24 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* IMAGE */}
        <div className="bg-[#0f172a] rounded-3xl overflow-hidden border border-gray-800 p-2 shadow-2xl">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-auto rounded-2xl"
          />
        </div>

        {/* INFO */}
        <div className="flex flex-col justify-center">

          <span className="text-amber-400 font-semibold tracking-widest text-sm mb-4 uppercase">
            ✦ {car.type}
          </span>

          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            ✧ {car.name}
          </h1>

          {/* META INFO */}
          <div className="flex flex-col gap-3 mb-6 text-gray-300">

            <p className="flex items-center gap-2">
              📍 <span className="text-gray-200">Location:</span>
              <span className="text-white font-medium">{car.location}</span>
            </p>

            <p className="flex items-center gap-2">
              🗓️ <span className="text-gray-200">Available:</span>
              <span className="text-white font-medium">{car.date}</span>
            </p>

          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            ✧ {car.description}
          </p>

          {/* PRICE */}
          <div className="text-4xl font-bold mb-10 text-white">
            💠 ${car.price}
            <span className="text-xl text-gray-500"> / day</span>
          </div>

          {/* BUTTON */}
          <button
            disabled={!car.availability}
            className={`w-full py-4 rounded-xl font-bold text-lg transition shadow-lg ${
              car.availability
                ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-90"
                : "bg-gray-700 cursor-not-allowed"
            }`}
          >
            {car.availability ? "✦ Book Now" : "✧ Currently Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;