"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    try {
      // query custom table using Email column
      const { data, error } = await supabase
        .from("account")
        .select("Password")
        .eq("Email", email)
        .single();

      if (error || !data) {
        console.error("Login lookup error", error);
        alert("Invalid email or password");
        return;
      }

      if (data.Password !== password) {
        alert("Invalid email or password");
        return;
      }

      // record success and redirect
      try {
        localStorage.setItem("userEmail", email);
      } catch {}
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Unexpected error during login");
    }
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
        {/* Logo in top-left */}
      <div className="absolute top-2 left-2 rounded-corners overflow-hidden">
        <Image
            src="/images/clear_logo.png"
            alt="PackingPal Logo"
            width={100} // adjust as needed
            height={100}
            className="shadow-lg"
        />
      </div>

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
                      focus:border-transparent transition text-black"
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
                      focus:border-transparent transition text-black"
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
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>

      </form>
    </div>
  );
}