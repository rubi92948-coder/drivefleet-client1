"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/signup`,
        form
      );

      toast.success("Account created successfully ✨");
      router.push("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">

      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-slate-900 p-8 rounded-2xl border border-slate-800"
      >

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Account ✨
        </h1>

        {/* INPUTS WRAPPER */}
        <div className="space-y-4">

          {/* NAME */}
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="input"
            required
          />

          {/* IMAGE */}
          <input
            name="image"
            placeholder="Profile Image URL"
            onChange={handleChange}
            className="input"
          />

          {/* EMAIL */}
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="input"
            required
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              className="input pr-20"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-sm text-gray-400"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full mt-6 bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-bold transition"
        >
          Create Account
        </button>
      </form>

      {/* STYLE */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          background: #0f172a;
          border: 1px solid #334155;
          outline: none;
          color: white;
        }
      `}</style>

    </div>
  );
};

export default Signup;