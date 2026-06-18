"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { createAuthClient } from "better-auth/react";

// authClient ইনিশিয়ালাইজ করুন
const authClient = createAuthClient();

const Signup = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    image: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ইমেইল সাইনআপ
  const handleSignup = async (e) => {
    e.preventDefault();

    const { password } = form;

    // Password Validation
    if (
      password.length < 6 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password)
    ) {
      toast.error(
        "Password must be at least 6 characters and contain 1 uppercase & 1 lowercase letter"
      );
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/signup`,
        form
      );

      toast.success("Account created successfully! ✨");
      router.push("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // Better Auth এর মাধ্যমে Google সাইন-ইন
  const handleGoogleSignup = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", // লগইন হওয়ার পর যেখানে পাঠাতে চান
      });
    } catch (err) {
      toast.error("Google Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white px-4 py-10">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-[#0f172a] p-8 rounded-3xl border border-slate-800 shadow-2xl transition-all hover:border-orange-500/30"
      >
        <h1 className="text-3xl font-extrabold mb-2 text-center">
          Create Account
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Join DriveFleet today.
        </p>

        {/* Google Signup বাটন */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full mb-6 flex items-center justify-center gap-3 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 transition-all font-semibold"
        >
          <FcGoogle className="text-2xl" /> Continue with Google
        </button>

        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute w-full border-t border-slate-700"></div>
          <span className="bg-[#0f172a] px-3 text-gray-500 text-sm z-10">
            OR
          </span>
        </div>

        <div className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#020617] border border-slate-700 outline-none focus:border-orange-500 transition-all"
            required
          />

          <input
            name="image"
            placeholder="Profile Image URL"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#020617] border border-slate-700 outline-none focus:border-orange-500 transition-all"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#020617] border border-slate-700 outline-none focus:border-orange-500 transition-all"
            required
          />

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-[#020617] border border-slate-700 outline-none focus:border-orange-500 transition-all"
              required
            />

            <button
              type="button"
              className="absolute right-4 top-4 text-xl text-gray-500 hover:text-orange-500 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </button>
          </div>

          <p className="text-xs text-gray-500">
            Password must be at least 6 characters and contain 1 uppercase &
            1 lowercase letter.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 bg-orange-600 hover:bg-orange-700 py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-900/20 transition-all active:scale-95"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Already a member?{" "}
          <a
            href="/login"
            className="text-orange-500 hover:underline font-bold"
          >
            Log in
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;