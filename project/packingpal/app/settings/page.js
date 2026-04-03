"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  // protect route (must be logged in)
  useEffect(() => {
    const user = localStorage.getItem("userEmail");

    if (!user) {
      router.push("/login");
    } else {
      setEmail(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

return (
  <div className="min-h-screen flex items-center justify-center 
                  bg-gradient-to-br from-[#E97824] to-[#1f1f1f] px-4">

    <div className="w-full max-w-xl bg-white/95 backdrop-blur-md 
                    p-10 rounded-2xl shadow-2xl text-slate-800">

      <h1 className="text-3xl font-bold text-center mb-6">
        Settings
      </h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Account:</h2>
        <p>
          Logged in as: <span className="font-bold">{email}</span>
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="w-full bg-red-500 hover:bg-red-600 transition 
                   text-white py-3 rounded-lg font-semibold shadow-md"
      >
        Log out
      </button>

      <button
        onClick={() => router.push("/")}
        className="w-full mt-4 underline text-gray-600 hover:text-black"
      >
        ← Back to App
      </button>

    </div>
  </div>
);
}