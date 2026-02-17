
"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Temporary
    console.log("Login submitted:", { email, password });
    // later will need to send to database / auth service
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-[#435A50] to-[#3b4f46] px-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/95 backdrop-blur-md 
                  p-10 rounded-2xl shadow-2xl"
      >

        <h1 className="text-3xl font-bold text-center text-slate-800">
          Welcome Back
        </h1>

        <p className="text-center text-slate-500 mt-2 mb-8">
          Let’s get you packed for your next adventure.
        </p>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2 text-slate-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-slate-300 
                      rounded-lg focus:outline-none 
                      focus:ring-2 focus:ring-[#E97824] 
                      focus:border-transparent transition"
            placeholder="you@example.com"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-slate-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-slate-300 
                      rounded-lg focus:outline-none 
                      focus:ring-2 focus:ring-[#E97824] 
                      focus:border-transparent transition"
            placeholder="Enter your password"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-[#E97824] text-white 
                    py-3 rounded-lg font-semibold 
                    hover:bg-[#cf671d] transition-all 
                    duration-200 shadow-md hover:shadow-lg"
        >
          Login
        </button>

        {/* Links */}
        <p className="mt-6 text-center text-sm text-slate-600">
          Don’t have an account?{" "}
          <Link
            href="/sign_up"
            className="text-[#435A50] font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>

      </form>
    </div>
  );
}
