"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Chat from "@/components/chat/chat";
import List from "@/components/list/list";
import { subscribeToPDF } from "./lib/pdfStore";

export default function Home() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pdfData, setPdfData] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("userEmail");

    if (!user) {
      router.push("/login");
    } else {
      setCheckingAuth(false);
    }
  }, []);

  // Warn users if they try to leave the page with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      // Chrome requires setting returnValue
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Subscribe to PDF changes
  useEffect(() => {
    const unsubscribe = subscribeToPDF((data) => {
      setPdfData(data);
    });

    return unsubscribe;
  }, []);

  const downloadJson = () => {
    if (!pdfData?.packingList) {
      alert("No packing list data available to download.");
      return;
    }

    const title = pdfData.basicDetails?.title || "packingList";
    const fileName = title.replace(/\s+/g, "_").toLowerCase();

    const dataStr = JSON.stringify(pdfData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.json`;
    a.click();

    URL.revokeObjectURL(url);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }
  return (
    <div className="relative min-h-screen flex bg-gradient-to-br from-slate-900 to-slate-700">
      {/*-------------------------Chat Section--------------------------------------------------------*/}
      <div className="h-screen w-1/2 p-6 backdrop-blur-sm bg-gradient-to-br from-[#E97824] to-[#FFF3EB] text-black border-r border-white/20 flex flex-col">
        <h1 className="text-3xl font-bold mb-6 text-center">PackingPal Chat</h1>
        <div className="flex-1 min-h-0">
          <Chat />
        </div>
      </div>

      {/*Packing List Section*/}
      <div className="h-screen w-1/2 p-6  backdrop-blur-sm bg-gradient-to-br from-[#FFF3EB] to-[#435A50] text-black flex flex-col">
        <h1 className="text-3xl font-bold mb-6 text-center">Packing List</h1>
        {/*List + checboxes would go here*/}
        <div className="flex-1 min-h-0">
          <List />
        </div>
      </div>

      {/* Logo in top-left */}
      <div className="absolute top-2 left-2 rounded-corners overflow-hidden">
        <Image
          src="/images/clear_logo.png"
          alt="PackingPal Logo"
          width={100} // adjust as needed
          height={100}
          border-radius="0"
          className="shadow-lg"
        />
      </div>

      {/*Hamburger Button*/}
      <div className="absolute top-4 right-4">
        <button
          className="flex flex-col justify-center space-y-2 w-8 h-8 focus:outline-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="block h-1.5 w-full bg-black rounded"></span>
          <span className="block h-1.5 w-full bg-black rounded"></span>
          <span className="block h-1.5 w-full bg-black rounded"></span>
        </button>

        {/*Slide-in Side Menu*/}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 flex flex-col space-y-4">
            <button
              className="self-end text-gray-600 font-bold text-xl cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>

            <Link
              href="/settings"
              className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition"
              onClick={() => setMenuOpen(false)}
            >
              Settings
            </Link>
            <button
              className="px-4 py-2 bg-[#E97824] text-white rounded hover:bg-[#cf671d] transition cursor-pointer"
              onClick={() => {
                downloadJson();
              }}
            >
              Download JSON
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
