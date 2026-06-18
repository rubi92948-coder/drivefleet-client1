"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createAuthClient } from "better-auth/react";

const auth = createAuthClient();

const AddCar = () => {
  const { data: session } = auth.useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "",
    image: "",
    seats: "",
    location: "",
    date: "",
    availability: true,
    description: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleAddCar = async (e) => {
    e.preventDefault();

    // চেক করুন ইউজার লগইন আছে কি না
    if (!session?.user?.email) {
      toast.error("Please login to add a car!");
      return;
    }

    const finalData = {
      ...formData,
      price: parseFloat(formData.price),
      seats: parseInt(formData.seats),
      userEmail: session.user.email // সেশন থেকে প্রাপ্ত ইমেইল ব্যবহার করা হলো
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/api/cars`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (res.ok) {
        toast.success("Car Added Successfully 🚗");
        router.push("/my-added-cars");
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to add car");
      }
    } catch (error) {
      toast.error("Server connection error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white">
      <form onSubmit={handleAddCar} className="w-full max-w-2xl bg-slate-900/50 p-8 rounded-3xl border border-slate-800 shadow-xl">
        <h1 className="text-3xl font-black text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">
          Add Your Luxury Car
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" name="name" value={formData.name} placeholder="Car Name" onChange={handleChange} required className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 outline-none" />
          <input type="number" name="price" value={formData.price} placeholder="Price/Day" onChange={handleChange} required className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 outline-none" />
          
          <select name="type" value={formData.type} onChange={handleChange} required className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 outline-none">
            <option value="">Select Category</option>
            <option value="Supercar">Supercar</option>
            <option value="Luxury">Luxury</option>
            <option value="SUV">SUV</option>
            <option value="Sports">Sports</option>
            <option value="Electric">Electric</option>
          </select>
          
          <input type="number" name="seats" value={formData.seats} placeholder="Seats" onChange={handleChange} required className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 outline-none" />
          <input type="text" name="location" value={formData.location} placeholder="Location" onChange={handleChange} required className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 outline-none" />
          <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 outline-none" />
          
          <div className="flex items-center gap-3 md:col-span-2">
            <input type="checkbox" name="availability" checked={formData.availability} onChange={handleChange} className="w-5 h-5 accent-orange-500 cursor-pointer" />
            <label className="text-sm">Available for Booking</label>
          </div>
          
          <input type="url" name="image" value={formData.image} placeholder="Image URL" onChange={handleChange} required className="md:col-span-2 w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 outline-none" />
          <textarea name="description" value={formData.description} placeholder="Description" onChange={handleChange} required rows="3" className="md:col-span-2 w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 outline-none" />
        </div>

        <button type="submit" className="w-full mt-8 bg-orange-500 hover:bg-orange-600 py-4 rounded-xl font-bold transition-all cursor-pointer">
          Add Cars
        </button>
      </form>
    </div>
  );
};

export default AddCar;