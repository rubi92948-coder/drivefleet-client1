"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  HiLocationMarker,
  HiCalendar,
  HiCheckCircle,
} from "react-icons/hi";

const CarDetails = () => {
  const { id } = useParams();
  const router = useRouter();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars/${id}`
        );
        setCar(res.data);
      } catch (err) {
        toast.error("Failed to load car");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCar();
  }, [id]);

  // ✅ BOOKING
  const handleBooking = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user?.email) {
        toast.error("Please login first");
        return;
      }

      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`,
        {
          carId: car._id,
          carName: car.name,
          price: car.price,
          image: car.image,
          userEmail: user.email,
        }
      );

      toast.success("Booking successful 🚗");
      setShowModal(false);
    } catch (err) {
      toast.error("Booking failed");
    }
  };

  if (loading || !car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 px-4">

      {/* MAIN */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <img
          src={car.image}
          className="rounded-2xl w-full h-96 object-cover"
        />

        {/* INFO */}
        <div>

          <h1 className="text-4xl font-bold mb-3">
            {car.name}
          </h1>

          <p className="text-gray-400 mb-4">
            {car.description}
          </p>

          <p className="flex items-center gap-2 mb-2">
            <HiLocationMarker className="text-orange-500" />
            {car.location}
          </p>

          <p className="flex items-center gap-2 mb-2">
            <HiCalendar className="text-orange-500" />
            {car.date}
          </p>

          <p className="flex items-center gap-2 mb-4">
            <HiCheckCircle
              className={
                car.availability ? "text-green-500" : "text-red-500"
              }
            />
            {car.availability ? "Available" : "Unavailable"}
          </p>

          <div className="text-3xl font-bold mb-6">
            ${car.price}/day
          </div>

          {/* BOOK BUTTON */}
          <button
            onClick={() => setShowModal(true)}
            disabled={!car.availability}
            className={`w-full py-3 rounded-xl font-bold ${
              car.availability
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-gray-700"
            }`}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* BOOKING MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">

          <div className="bg-[#0f172a] p-6 rounded-xl w-full max-w-md">

            <h2 className="text-2xl font-bold mb-4">
              Confirm Booking
            </h2>

            <p className="mb-2">Car: {car.name}</p>
            <p className="mb-2">Price: ${car.price}/day</p>

            <div className="flex gap-3 mt-6">

              <button
                onClick={handleBooking}
                className="flex-1 bg-orange-500 py-2 rounded-lg font-bold"
              >
                Confirm
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-700 py-2 rounded-lg font-bold"
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