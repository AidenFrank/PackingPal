"use client";

import { useState, useEffect, useRef } from "react";

export default function Chat() {
  // Used to hold messages, also includes default message
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm PackingPal, a helpful tool designed to help you create the perfect packing list for your camping trip. Why don't you start by telling me a bit about your trip?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  // Auto-scroll when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    // Stops blank messages
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const updatedMessages = [...messages, userMessage];

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();

      const botMessage = {
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Server error." },
      ]);
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col h-full w-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto min-h-0 p-4 flex flex-col space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[70%] px-4 py-2 rounded-xl text-sm ${
              msg.role === "user"
                ? "self-start bg-gray-200 text-gray-900"
                : "self-end bg-[#668a7a] text-white"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="self-end max-w-[70%] px-4 py-2 rounded-xl bg-[#668a7a] text-white text-sm animate-pulse">
            Thinking...
          </div>
        )}

        <div ref={bottomRef} />
      </div>
      {/* Input Area */}
      <div className="flex rounded-lg bg-white">
        <input
          className="flex-1 px-4 py-3 outline-none text-sm text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="px-5 py-3 rounded-r-lg bg-[#668a7a] text-white text-sm hover:bg-[#435A50] transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
