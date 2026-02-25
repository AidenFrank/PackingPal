"use client";

import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import Chat from "@/components/chat/chat";


export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex bg-gradient-to-br from-slate-900 to-slate-700">
      {/*Chat Section*/}
      <div className="h-screen w-1/2 p-6 backdrop-blur-sm bg-black/40 text-white border-r border-white/20 flex flex-col">
        <h1 className="text-3xl font-bold mb-6 text-center">PackingPal Chat</h1>
        <div className="flex-1 min-h-0">
          <Chat />
        </div>
      </div>
      {/*Packing List Section*/}
      <div className="w-1/2 p-8 backdrop-blur-sm bg-white/50 text-black">
        <h1 className="text-3xl font-bold mb-6 text-center">Packing List</h1>
        {/*List + checboxes would go here*/}
      </div>

      {/* Logo in top-left */}
      <div className="absolute top-4 left-4">
        <Image
          src="/images/PackingPal.webp"
          alt="PackingPal Logo"
          width={60} // adjust as needed
          height={60}
          className="rounded-xl shadow-lg"
        />
      </div>

      {/*Hamburger Button*/}
      <div className="absolute top-4 right-4">
        <button className="flex flex-col justify-center w-8 h-6 focus:outline-none"
        onClick={()=> setMenuOpen(!menuOpen)}>
          <span className="block h-1 w-full bg-white rounded"></span>
          <span className="block h-1 w-full bg-white rounded"></span>
          <span className="block h-1 w-full bg-white rounded"></span>
        </button>

       {/*Slide-in Side Menu*/}
        <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col space-y-4">
          <button
            className="self-end text-gray-600 font-bold text-xl"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>

          <Link
            href="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>

          <Link
            href="/settings"
            className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            Settings
          </Link>

          {/* Add more links here if needed */}
        </div>
      </div>



       {/*Optional overlay*/}
        {menuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded shadow-lg text-black">
            <Link
                href="/login"
                className="block px-4 py-2 hover:bg-blue-600 hover:text-white rounded"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              

            </div>
        )}

      </div>
    </div>
  );
}
