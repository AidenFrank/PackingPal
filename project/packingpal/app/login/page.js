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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/90 backdrop-blue-md p-8 rounded-xl shadow-xl"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-slate-800">
          Login to PackingPal
        </h1>

        {/*Email*/}
        <div className="mb-4">
          <label className="block text0sm font-medium mb-1 text-slate-700">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="you@example.com"
          />
        </div>
        {/*Password*/}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-slate-700">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Enter your password"
          />
        </div>
        {/*Submit*/}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Login
        </button>

        {/*Navigation*/}
        <p className="mt-4 text-center text-sm text-slate-600">
          Back to{" "}
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </p>
        <p className="mt-4 text-sm text-center text-slate-600">
          Don’t have an account?{" "}
          <Link href="/sign_up" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
