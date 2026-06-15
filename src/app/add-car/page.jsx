"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddCar = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "",
    image: "",
    seats: "",
    location: "",
    date: "",
    availability: true,
    description: "",
  });

  const router = useRouter();

  useEffect(() => {
    // LocalStorage থেকে লগইন করা ইউজারকে রিট্রিভ করা
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedUser);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    
    // API কল করার জন্য ডেটা প্রিপারেশন
    const finalData = { ...formData, userEmail: user?.email };
    console.log("Submitting:", finalData);
    
    // এখানে আপনার API Call বসবে (fetch বা axios)
    toast.success("Car Added Successfully 🚗");
    router.push("/my-added-cars");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white">
      <form
        onSubmit={handleAddCar}
        className="w-full max-w-2xl bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl"
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">
            Add Your Luxury Car
          </h1>
        </div>

        {/* Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Car Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Car Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Price per day ($)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
          </div>

          {/* Car Type */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Car Type</label>
            <select name="type" value={formData.type} onChange={handleChange} required className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition-all text-white">
              <option value="">Select Category</option>
              <option value="Supercar">Supercar</option>
              <option value="Luxury">Luxury</option>
              <option value="SUV">SUV</option>
              <option value="Sports">Sports</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          {/* Seats */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Total Seats</label>
            <input type="number" name="seats" value={formData.seats} onChange={handleChange} required className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
          </div>

          {/* Date Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Available Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition-all text-white" />
          </div>

          {/* Availability Checkbox */}
          <div className="flex items-center gap-3 pt-6">
            <input type="checkbox" name="availability" checked={formData.availability} onChange={handleChange} className="w-5 h-5 accent-orange-500 rounded cursor-pointer" />
            <label className="text-sm text-slate-300 font-medium">Available for Booking</label>
          </div>

          {/* Image URL */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Image URL</label>
            <input type="url" name="image" value={formData.image} onChange={handleChange} required className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
          </div>

          {/* Description */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows="3" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none" />
          </div>
        </div>

        {/* Publish Button */}
        <button 
          type="submit" 
          className="w-full mt-8 bg-orange-500 hover:bg-orange-600 py-4 rounded-xl font-bold text-white shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
        >
          Publish Car Listing
        </button>
      </form>
    </div>
  );
};

export default AddCar;