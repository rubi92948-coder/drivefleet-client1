"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const MyCars = () => {
  const [cars, setCars] = useState([]);

  // গাড়ি ডিলিট ফাংশন
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this car?")) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars/${id}`);
        setCars(cars.filter((c) => c._id !== id));
        toast.success("Deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-10">
      <h1 className="text-4xl font-bold mb-10">My Added Cars</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cars.map((car) => (
          <div key={car._id} className="bg-[#0f172a] p-6 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold">{car.name}</h2>
            <div className="flex gap-4 mt-4">
              {/* আপডেট বাটন - এখানে মোডাল ওপেন করার লজিক বসাবেন */}
              <button className="px-4 py-2 bg-blue-600 rounded-lg">Update</button>
              
              {/* ডিলিট বাটন */}
              <button 
                onClick={() => handleDelete(car._id)} 
                className="px-4 py-2 bg-red-600 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCars;