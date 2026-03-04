"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // check for existing row using Email column
      const { data: existing, error: lookupError } = await supabase
        .from("account")
        .select("Email")
        .eq("Email", email)
        .single();

      if (existing) {
        alert("An account with that email already exists");
        return;
      }

      const { data, error } = await supabase
        .from("account")
        .insert({ Email: email, Password: password });

      if (error) {
        console.error("Error inserting user", error);
        alert(error.message);
        return;
      }

      alert("Signup successful! You can now log in.");
      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("Unexpected error during signup");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700">
      <form
        className="w-full max-w-md bg-white/90 p-8 rounded-xl shadow-xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-slate-800">
          Create an Account
        </h1>

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
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700"
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
