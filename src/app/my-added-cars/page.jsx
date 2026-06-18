"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { HiPencilAlt, HiTrash, HiX, HiCheck } from "react-icons/hi";
import { createAuthClient } from "better-auth/react";

const auth = createAuthClient();

export default function MyAddedCars() {
  const { data: session } = auth.useSession();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCar, setEditCar] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // ডাটা ফেচ করার ফাংশন
  const fetchMyCars = async () => {
    if (!session?.user?.email) {
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/api/my-cars?email=${session.user.email}`
      );
      setCars(res.data || []);
    } catch (err) {
      toast.error("Failed to load your cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCars();
  }, [session]);

  const handleUpdate = async () => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/api/cars/${editCar._id}`, editCar);
      setCars((prev) => prev.map((c) => (c._id === editCar._id ? editCar : c)));
      setEditCar(null);
      toast.success("Updated successfully!");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/api/cars/${deleteId}`);
      setCars((prev) => prev.filter((c) => c._id !== deleteId));
      toast.success("Deleted successfully");
      setDeleteId(null);
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-orange-500 font-bold bg-[#020617]">Loading Fleet...</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-gray-100 p-6 md:p-10 pt-20">
      <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-orange-500 to-white text-transparent bg-clip-text">
        My Added Cars
      </h1>

      {cars.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">No cars found in your collection.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cars.map((car) => (
            <div key={car._id} className="bg-[#0b1221] p-4 rounded-3xl border border-white/5 hover:border-orange-500/30 transition-all duration-300 shadow-lg">
              <img src={car.image} alt={car.name} className="h-52 w-full object-cover rounded-2xl mb-4" />
              <div className="px-2">
                <h2 className="text-2xl font-bold mb-1">{car.name}</h2>
                <p className="text-orange-500 font-medium mb-4">${car.price}/day</p>
                <div className="flex gap-3">
                  <button onClick={() => setEditCar(car)} className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10">
                    <HiPencilAlt /> Edit
                  </button>
                  <button onClick={() => setDeleteId(car._id)} className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-xl transition-all border border-red-500/20">
                    <HiTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editCar && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#0b1221] p-8 rounded-3xl border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Edit Car</h2>
              <button onClick={() => setEditCar(null)} className="p-2 bg-white/5 rounded-full hover:bg-white/10"><HiX size={24} /></button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[ {label: "Car Name", key: "name"}, {label: "Price/Day ($)", key: "price", type: "number"}, {label: "Location", key: "location"} ].map(field => (
                <div key={field.key} className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase ml-1">{field.label}</label>
                  <input type={field.type || "text"} value={editCar[field.key] || ""} onChange={(e) => setEditCar({...editCar, [field.key]: e.target.value})} className="p-4 bg-[#020617] border border-white/10 rounded-2xl focus:border-orange-500 outline-none" />
                </div>
              ))}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Car Type</label>
                <select value={editCar.type} onChange={(e) => setEditCar({...editCar, type: e.target.value})} className="p-4 bg-[#020617] border border-white/10 rounded-2xl focus:border-orange-500 outline-none">
                  <option>Supercar</option><option>Luxury</option><option>SUV</option><option>Sports</option>
                </select>
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Image URL</label>
                <input value={editCar.image || ""} onChange={(e) => setEditCar({...editCar, image: e.target.value})} className="p-4 bg-[#020617] border border-white/10 rounded-2xl focus:border-orange-500 outline-none" />
              </div>
              <div className="flex items-center gap-3 md:col-span-2">
                <input type="checkbox" checked={editCar.availability} onChange={(e) => setEditCar({...editCar, availability: e.target.checked})} className="w-5 h-5 accent-orange-500" />
                <label className="text-sm">Available for Booking</label>
              </div>
            </div>

            <div className="flex gap-4 mt-10">
              <button onClick={() => setEditCar(null)} className="flex-1 py-4 bg-white/5 rounded-2xl font-bold hover:bg-white/10">Cancel</button>
              <button onClick={handleUpdate} className="flex-1 py-4 bg-orange-500 rounded-2xl font-bold hover:bg-orange-600 flex items-center justify-center gap-2"><HiCheck size={20}/> Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#0b1221] p-8 rounded-3xl border border-red-500/20 w-full max-w-sm text-center">
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6"><HiTrash size={32} /></div>
            <h3 className="text-2xl font-bold mb-2">Delete Car?</h3>
            <div className="flex gap-4 mt-8">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-3 bg-white/5 rounded-xl font-bold hover:bg-white/10">Cancel</button>
              <button onClick={handleDeleteConfirm} className="flex-1 py-3 bg-red-500 rounded-xl font-bold hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}