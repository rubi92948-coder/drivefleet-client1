"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { HiPencilAlt, HiTrash, HiX, HiCheck } from "react-icons/hi";

export default function MyAddedCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCar, setEditCar] = useState(null);

  // ডাটা ফেচ করার লজিক
  useEffect(() => {
    const fetchMyCars = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setLoading(false);
        return;
      }

      const user = JSON.parse(storedUser);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/api/my-cars/${user.email}`
        );
        setCars(res.data || []);
      } catch (err) {
        toast.error("Failed to load your cars");
      } finally {
        setLoading(false);
      }
    };
    fetchMyCars();
  }, []);

  // আপডেট করার লজিক
  const handleUpdate = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/api/cars/${editCar._id}`,
        editCar
      );
      setCars((prev) =>
        prev.map((c) => (c._id === editCar._id ? editCar : c))
      );
      setEditCar(null);
      toast.success("Car updated successfully!");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  // ডিলিট করার লজিক
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this car?")) return;
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/api/cars/${id}`
      );
      setCars((prev) => prev.filter((c) => c._id !== id));
      toast.success("Deleted successfully");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-orange-500 font-bold bg-[#020617]">
        Loading Fleet...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-10 pt-20">
      <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-orange-500 to-white text-transparent bg-clip-text">
        My Added Cars
      </h1>

      {cars.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">No cars found in your collection.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cars.map((car) => (
            <div
              key={car._id}
              className="bg-[#0f172a] rounded-3xl border border-white/5 overflow-hidden hover:border-orange-500/30 transition-all duration-300"
            >
              <img src={car.image} alt={car.name} className="h-52 w-full object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-1">{car.name}</h2>
                <p className="text-orange-500 text-sm font-medium mb-4">{car.type}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditCar(car)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-orange-500 hover:text-white rounded-xl transition-all border border-white/10"
                  >
                    <HiPencilAlt /> Update
                  </button>
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all border border-red-500/20"
                  >
                    <HiTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Standardized Update Modal */}
      {editCar && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#0b1221] p-8 rounded-3xl border border-white/10 w-full max-w-2xl shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white">Edit Car Details</h2>
                <p className="text-gray-400 mt-1">Update your vehicle information</p>
              </div>
              <button
                onClick={() => setEditCar(null)}
                className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-all"
              >
                <HiX size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Car Name</label>
                <input
                  value={editCar.name || ""}
                  onChange={(e) => setEditCar({ ...editCar, name: e.target.value })}
                  className="w-full p-4 bg-[#020617] border border-white/5 rounded-2xl focus:border-orange-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Price/Day ($)</label>
                <input
                  type="number"
                  value={editCar.price || ""}
                  onChange={(e) => setEditCar({ ...editCar, price: e.target.value })}
                  className="w-full p-4 bg-[#020617] border border-white/5 rounded-2xl focus:border-orange-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Image URL</label>
                <input
                  value={editCar.image || ""}
                  onChange={(e) => setEditCar({ ...editCar, image: e.target.value })}
                  className="w-full p-4 bg-[#020617] border border-white/5 rounded-2xl focus:border-orange-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Description</label>
                <textarea
                  value={editCar.description || ""}
                  onChange={(e) => setEditCar({ ...editCar, description: e.target.value })}
                  className="w-full p-4 bg-[#020617] border border-white/5 rounded-2xl focus:border-orange-500 outline-none transition-all"
                  rows="3"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-10">
              <button
                onClick={() => setEditCar(null)}
                className="flex-1 py-4 bg-white/5 rounded-2xl font-bold hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-orange-500 rounded-2xl font-bold hover:bg-orange-600 shadow-lg shadow-orange-500/20 transition-all"
              >
                <HiCheck size={20} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}