"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="relative">
      <div className="w-12 h-12 rounded-full absolute border-4 border-dashed border-orange-500 animate-spin"></div>
      <div className="w-12 h-12 rounded-full border-4 border-orange-900/30"></div>
    </div>
  </div>
);

const Explore = () => {
  const router = useRouter();
  
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [driverNeeded, setDriverNeeded] = useState(false);
  const [specialNote, setSpecialNote] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars`);
        setCars(res.data || []);
        setFilteredCars(res.data || []);
      } catch (err) {
        toast.error("Failed to load cars fleet");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  // ফিক্সড ফিল্টার লজিক
  useEffect(() => {
    const result = cars.filter(car => {
      const nameMatch = car?.name?.toLowerCase().includes(searchTerm.toLowerCase() || "");
      const typeMatch = selectedType === "All" || car?.type === selectedType;
      return nameMatch && typeMatch;
    });
    setFilteredCars(result);
  }, [searchTerm, selectedType, cars]);

  const handleOpenBooking = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedCar) return;
    
    const bookingData = { 
      ...selectedCar, 
      driverNeeded, 
      specialNote, 
      bookingDate: new Date().toISOString() 
    };

    try {
      const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      existingBookings.push(bookingData);
      localStorage.setItem("bookings", JSON.stringify(existingBookings));
      
      toast.success(`${selectedCar.name} Booked Successfully! 🚗`);
      setShowModal(false);
      router.push("/bookings");
    } catch (error) {
      toast.error("Failed to save booking");
    }
  };

  // Type array generation with safety check
  const carTypes = ["All", ...new Set(cars.map((car) => car?.type).filter(Boolean))];

  if (loading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center"><LoadingSpinner /></div>;

  return (
    <div className="bg-[#020617] min-h-screen text-white pt-20">
      <div className="text-center pb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-500 via-orange-400 to-white text-transparent bg-clip-text">
          Explore Premium Fleet
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 mb-12 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search by car name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:max-w-md bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none"
        />
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full sm:w-auto bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-3 text-sm cursor-pointer"
        >
          {carTypes.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div key={car?._id} className="bg-[#0f172a] rounded-2xl overflow-hidden border border-gray-800/50 hover:border-orange-500/50 transition">
              <div className="relative h-56 bg-slate-950/40">
                <span className="absolute top-4 right-4 bg-white text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded uppercase border-2 border-orange-500">{car?.type || "Car"}</span>
                <img src={car?.image} alt={car?.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">{car?.name || "Unknown Car"}</h3>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-orange-500 font-extrabold text-xl">${car?.price || 0}<span className="text-xs text-gray-400">/day</span></span>
                  <button onClick={() => router.push(`/car/${car?._id}`)} className="text-xs border border-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-800">Details</button>
                </div>
                <button
                  onClick={() => handleOpenBooking(car)}
                  disabled={!car?.availability}
                  className={`w-full py-3 rounded-xl font-bold ${car?.availability ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-700 cursor-not-allowed"}`}
                >
                  {car?.availability ? "Book Now" : "Unavailable"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f172a] p-8 rounded-3xl max-w-md w-full border border-gray-800">
            <h2 className="text-2xl font-bold mb-6">Book {selectedCar?.name}</h2>
            <div className="flex gap-4 mb-6">
              <button onClick={() => setDriverNeeded(true)} className={`flex-1 py-3 rounded-xl font-bold ${driverNeeded ? 'bg-orange-500' : 'bg-gray-700'}`}>Driver: Yes</button>
              <button onClick={() => setDriverNeeded(false)} className={`flex-1 py-3 rounded-xl font-bold ${!driverNeeded ? 'bg-orange-500' : 'bg-gray-700'}`}>Driver: No</button>
            </div>
            <textarea className="w-full bg-[#020617] border border-gray-700 rounded-lg p-3 text-white mb-6" placeholder="Special notes..." rows="3" onChange={(e) => setSpecialNote(e.target.value)} />
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-gray-600 rounded-xl font-bold">Cancel</button>
              <button onClick={handleConfirmBooking} className="flex-1 py-3 bg-orange-500 rounded-xl font-bold">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;