"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  HiPencilAlt,
  HiTrash,
  HiLocationMarker,
  HiCalendar,
  HiCheckCircle,
} from "react-icons/hi";

const CarDetails = () => {
  const { id } = useParams();
  const router = useRouter();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!id) return;

    const fetchCarDetails = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars/${id}`
        );
        setCar(res.data);
      } catch (err) {
        toast.error("Failed to load details");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  // ✅ BOOK NOW
  const handleBookNow = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user?.email) {
        toast.error("Please login first");
        return;
      }

      if (!car) {
        toast.error("Car not loaded");
        return;
      }

      const bookingData = {
        carId: car._id,
        carName: car.name,
        image: car.image,
        price: car.price,
        userEmail: user.email,
        createdAt: new Date(),
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`,
        bookingData
      );

      toast.success("Booking successful 🚗");
    } catch (err) {
      toast.error("Booking failed");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this car?")) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars/${id}`
      );
      toast.success("Deleted successfully");
      router.push("/explore-cars");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleUpdate = async () => {
    try {
      const { _id, ...dataToUpdate } = formData;

      await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars/${id}`,
        dataToUpdate
      );

      setCar({ ...car, ...dataToUpdate });
      setIsEditing(false);
      toast.success("Updated successfully! ✨");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  // ✅ SAFE RENDER (IMPORTANT FIX)
  if (loading || !car) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#020617] min-h-screen text-white pt-24 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* IMAGE SECTION */}
        <div className="bg-[#0f172a] rounded-3xl overflow-hidden border border-slate-800 p-2">
          <img
            src={car.image}
            className="rounded-2xl w-full h-full object-cover"
            alt={car.name}
          />
        </div>

        {/* INFO SECTION */}
        <div className="flex flex-col justify-center">
          <span className="text-orange-500 font-semibold tracking-widest text-sm mb-3">
            ✦ {car.type}
          </span>

          <h1 className="text-5xl font-extrabold mb-5">
            ✧ {car.name}
          </h1>

          <div className="flex flex-col gap-2 mb-6">
            <p className="text-gray-400 flex items-center gap-2">
              <HiLocationMarker className="text-orange-500" /> {car.location}
            </p>
            <p className="text-gray-400 flex items-center gap-2">
              <HiCalendar className="text-orange-500" />
              {car.date || "Available now"}
            </p>
          </div>

          <p className="text-gray-300 mb-6">
            ✧ {car.description}
          </p>

          <div className="text-4xl font-bold mb-6">
            💠 ${car.price}{" "}
            <span className="text-gray-500 text-xl">/day</span>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 mb-4">
            <button
              onClick={() => {
                setIsEditing(true);
                setFormData(car);
              }}
              className="w-full py-3 rounded-xl flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 font-bold transition border border-slate-700"
            >
              <HiPencilAlt /> Edit
            </button>

            <button
              onClick={handleDelete}
              className="w-full py-3 rounded-xl flex items-center justify-center gap-2 bg-red-900/20 text-red-500 hover:bg-red-900/40 font-bold transition border border-red-900/30"
            >
              <HiTrash /> Delete
            </button>
          </div>

          {/* BOOK NOW */}
          <button
            onClick={handleBookNow}
            disabled={!car.availability}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 ${
              car.availability
                ? "bg-orange-600 hover:bg-orange-700"
                : "bg-gray-700"
            }`}
          >
            <HiCheckCircle />
            Book Now
          </button>
        </div>
      </div>

      {/* EDIT MODAL */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0f172a] p-8 rounded-3xl w-full max-w-md border border-slate-700 shadow-2xl">

            <h2 className="text-2xl font-bold mb-6 text-white text-center">
              Edit Car ✨
            </h2>

            <div className="space-y-4">
              <input
                className="w-full p-4 rounded-xl bg-[#020617] border border-slate-700 text-white"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <input
                className="w-full p-4 rounded-xl bg-[#020617] border border-slate-700 text-white"
                value={formData.price || ""}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />

              <input
                className="w-full p-4 rounded-xl bg-[#020617] border border-slate-700 text-white"
                value={formData.location || ""}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />

              <textarea
                className="w-full p-4 rounded-xl bg-[#020617] border border-slate-700 text-white h-24"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={handleUpdate}
                className="flex-1 bg-orange-600 py-3 rounded-xl font-bold"
              >
                Save Changes
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-slate-700 py-3 rounded-xl font-bold"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;