"use client";
import { DM_Serif_Text } from "next/font/google";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("SIGNUP submitted:", { email, password });

    // later: POST /api/signup
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#435A50]">
      <form
        className="w-full max-w-md bg-white/90 p-8 rounded-xl shadow-xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-slate-800">
          Create an Account
        </h1>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-slate-700">
            First Name
          </label>
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-slate-700">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-slate-700">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Enter a password"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-slate-700">
            Confirm Password
          </label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Enter the password again"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#E97824] text-white py-2 px-4 rounded-md hover:bg-[#cf671d] transition-colors"
        >
          Sign Up
        </button>

        <p className="mt-4 text-sm text-center text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
