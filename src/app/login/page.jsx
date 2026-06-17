"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc"; // Google আইকন
import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient();

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ইমেইল দিয়ে লগইন
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`, form);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Welcome back! ✨");
      router.push("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  // Google দিয়ে লগইন
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", // লগইন সফল হলে যেখানে রিডাইরেক্ট হবে
      });
    } catch (err) {
      toast.error("Google Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-[#0f172a] p-10 rounded-3xl border border-slate-800 shadow-2xl transition-all hover:border-orange-500/30"
      >
        <h1 className="text-4xl font-extrabold mb-2 text-center text-white">Welcome Back</h1>
        <p className="text-gray-400 text-center mb-8">Please enter your details to log in.</p>

        {/* Google Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full mb-6 flex items-center justify-center gap-3 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 transition-all font-semibold"
        >
          <FcGoogle className="text-2xl" /> Continue with Google
        </button>

        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute w-full border-t border-slate-700"></div>
          <span className="bg-[#0f172a] px-3 text-gray-500 text-sm z-10">OR</span>
        </div>

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          onChange={handleChange}
          className="w-full p-4 mb-4 rounded-xl bg-[#020617] border border-slate-700 outline-none focus:border-orange-500 transition-all"
          required
        />

        <div className="relative mb-6">
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
            className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-orange-500 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <HiEyeOff /> : <HiEye />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-700 py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-900/20 transition-all active:scale-95"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-orange-500 hover:underline font-bold">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;