"use client";
import { useState, useEffect } from "react";

const CarCards = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // ডাটাবেস থেকে ডেটা নিয়ে আসা
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/api/cars`)
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.error("Error fetching cars:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {cars.map((car) => (
        <div key={car._id} className="bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white shadow-xl">
          <img src={car.image} alt={car.name} className="w-full h-48 object-cover rounded-xl mb-4" />
          <h2 className="text-xl font-bold">{car.name}</h2>
          <p className="text-slate-400 text-sm">{car.type} • {car.seats} Seats</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-orange-500 font-bold text-lg">${car.price}/day</span>
            <button className="bg-orange-500 px-4 py-2 rounded-lg font-bold">Book Now</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarCards;