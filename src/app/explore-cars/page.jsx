"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { HiLocationMarker, HiCheckCircle, HiXCircle } from "react-icons/hi";

const Explore = () => {
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars`);
        setCars(res?.data || []);
      } catch (err) {
        toast.error("Failed to load cars fleet");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  // সার্চ এবং ফিল্টার লজিক
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesSearch = car?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === "All" || car?.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [cars, searchTerm, selectedType]);

  const carTypes = useMemo(() => ["All", ...new Set(cars.map((car) => car?.type).filter(Boolean))], [cars]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#020617] text-orange-500 font-bold text-xl">Loading Premium Fleet...</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center bg-gradient-to-r from-orange-500 to-white text-transparent bg-clip-text mb-12">
          Premium Car Collection
        </h1>

        {/* সার্চ বার বামে এবং ফিল্টার ডানে */}
        <div className="flex flex-col md:flex-row gap-4 max-w-7xl mx-auto mb-12 items-center justify-between">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3 bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition-all"
          />

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full md:w-auto bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 outline-none cursor-pointer hover:border-orange-500 transition-all text-gray-300"
          >
            {carTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* কার্ড গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div key={car?._id} className="group bg-[#0f172a] rounded-3xl border border-white/5 overflow-hidden hover:border-orange-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10">
              <div className="relative h-60 overflow-hidden">
                <img src={car?.image} alt={car?.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-gray-800 border border-orange-500 text-orange-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                  {car?.type}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-orange-500 transition-colors">{car?.name}</h2>
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
                  <HiLocationMarker className="text-orange-500" /> {car?.location}
                </div>
                <div className="flex justify-between items-center mb-6 border-t border-white/5 pt-6">
                  <div className="text-2xl font-bold">${car?.price} <span className="text-sm font-normal text-gray-500">/day</span></div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${car?.availability ? "text-green-500" : "text-red-500"}`}>
                    {car?.availability ? <HiCheckCircle /> : <HiXCircle />} {car?.availability ? "Available" : "Booked"}
                  </div>
                </div>
                <button
                  onClick={() => router.push(`/explore-cars/${car?._id}`)}
                  className="w-full py-3 rounded-xl font-bold border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;