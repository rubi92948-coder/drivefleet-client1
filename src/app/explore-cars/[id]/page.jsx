"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
        toast.error("Failed to load car details");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  // =======================
  // DELETE
  // =======================
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars/${id}`
      );

      toast.success("Car deleted successfully");
      router.push("/explore-cars");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // =======================
  // UPDATE
  // =======================
  const handleUpdate = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars/${id}`,
        formData
      );

      setCar({ ...car, ...formData });
      setIsEditing(false);
      toast.success("Updated successfully");
    } catch (err) {
      toast.error("Update failed");
    }
  };

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
        <div className="bg-[#0f172a] rounded-3xl overflow-hidden border border-gray-800 p-2">
          <img src={car.image} className="rounded-2xl w-full" />
        </div>

        {/* INFO */}
        <div className="flex flex-col justify-center">

          <span className="text-amber-400 font-semibold tracking-widest text-sm mb-3">
            ✦ {car.type}
          </span>

          <h1 className="text-5xl font-extrabold mb-5">
            ✧ {car.name}
          </h1>

          <p className="text-gray-400 mb-4">📍 {car.location}</p>
          <p className="text-gray-400 mb-4">🗓️ {car.date}</p>

          <p className="text-gray-300 mb-6">✧ {car.description}</p>

          <div className="text-4xl font-bold mb-6">
            💠 ${car.price} <span className="text-gray-500 text-xl">/day</span>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 mb-4">

            <button
              onClick={() => {
                setIsEditing(true);
                setFormData(car);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500"
            >
              ✨ Edit
            </button>

            <button
              onClick={handleDelete}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500"
            >
              🗑 Delete
            </button>

          </div>

          <button
            disabled={!car.availability}
            className={`w-full py-4 rounded-xl font-bold ${
              car.availability
                ? "bg-gradient-to-r from-orange-500 to-amber-500"
                : "bg-gray-700"
            }`}
          >
            {car.availability ? "✦ Book Now" : "✧ Unavailable"}
          </button>
        </div>
      </div>

      {/* EDIT MODAL */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-[#0f172a] p-6 rounded-2xl w-[400px]">

            <h2 className="text-xl mb-4">Edit Car ✨</h2>

            <input
              className="w-full p-2 mb-2 bg-gray-800 rounded"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Name"
            />

            <input
              className="w-full p-2 mb-2 bg-gray-800 rounded"
              value={formData.price || ""}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder="Price"
            />

            <input
              className="w-full p-2 mb-2 bg-gray-800 rounded"
              value={formData.location || ""}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Location"
            />

            <textarea
              className="w-full p-2 mb-3 bg-gray-800 rounded"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Description"
            />

            <div className="flex gap-2">

              <button
                onClick={handleUpdate}
                className="w-full bg-green-500 py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="w-full bg-gray-600 py-2 rounded"
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