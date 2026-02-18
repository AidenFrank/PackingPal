import Image from "next/image";
import Link from "next/link";
import Chat from "@/components/chat/chat";

export default function Home() {
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

      <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded">
        Go to Login
      </Link>
    </div>
  );
}
