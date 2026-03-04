"use client";

import { useState, useEffect, useRef } from "react";
import { updatePDF } from "@/app/lib/pdfStore";

const MAX_CHARS = 1500;

export default function Chat() {
  // Used to hold messages, also includes default message
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm PackingPal, a helpful tool designed to help you create the perfect packing list for your camping trip. Why don't you start by telling me a bit about your trip?",
    },
  ]);
  // Used to hold campingTrip json
  const [campingTrip, setCampingTrip] = useState(null);
  // Used to hold user input
  const [input, setInput] = useState("");
  // Used to set thinking/not thinking
  const [loading, setLoading] = useState(false);
  // Used to mark the bottom of the chat, so auto-scroll can work
  const bottomRef = useRef(null);
  // Used to define the textarea and set boundaries
  const textareaRef = useRef(null);
  const handleInput = (e) => {
    setInput(e.target.value);
    const el = textareaRef.current;
    el.style.height = "auto"; // reset height
    el.style.height = Math.min(el.scrollHeight, 150) + "px"; // grow up to 150px
  };
  // Auto-scroll when messages fill the bottom of the chat
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);
  // The function called when users send a message
  async function sendMessage() {
    // Stops blank messages
    if (!input.trim()) return;
    // Prevents messages that are too long
    if (input.length > MAX_CHARS) {
      alert("Message exceeds the character count.");
      return;
    }
    // Input from user
    const userMessage = {
      role: "user",
      content: input,
    };
    // Sets message in chatbox
    setMessages((prev) => [...prev, userMessage]);
    // Clears the input form at the bottom
    setInput("");
    // Begins loading
    setLoading(true);
    // Creates array of past messages plus the current message
    const updatedMessages = [...messages, userMessage];
    try {
      // Sends updatedMessages array to openai
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages, campingTrip }),
      });
      // Recieves response from openai
      const data = await response.json();
      setCampingTrip(data.campingTrip);
      updatePDF(data.campingTrip);
      // Creates message from openai
      const botMessage = {
        role: "assistant",
        content: data.reply,
      };
      // Sets the message
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      // Sets error message if there was a problem
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Server error." },
      ]);
    }
    // Turns off loading
    setLoading(false);
  }

  return (
    <div className="flex flex-col h-full w-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto min-h-0 p-4 flex flex-col space-y-2">
        {/* Creates bubble for every message */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[70%] px-4 py-2 text-sm relative ${
              msg.role === "user"
                ? "self-end bg-gray-200 text-gray-900 rounded-2xl rounded-br-sm"
                : "self-start bg-[#668a7a] text-white rounded-2xl rounded-bl-sm"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="self-start max-w-[70%] px-4 py-2 rounded-2xl rounded-bl-sm bg-[#668a7a] text-white text-sm animate-pulse">
            Thinking...
          </div>
        )}

        <div ref={bottomRef} />
      </div>
      {/*Input count*/}
      <div
        className={`text-xs px-2 p-1 text-left ${
          input.length > MAX_CHARS * 0.9 ? "text-red-500" : "text-gray-500"
        }`}
      >
        {input.length}/{MAX_CHARS}
      </div>
      {/* Input Area */}
      <div className="flex rounded-lg bg-white">
        <textarea
          ref={textareaRef}
          className="flex-1 px-4 py-3 outline-none text-sm text-black resize-none overflow-y-auto max-h-[150px]"
          value={input}
          maxLength={MAX_CHARS}
          onChange={handleInput}
          onChangeCapture={(e) => {
            if (e.target.value.length <= MAX_CHARS) {
              setInput(e.target.value);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
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
