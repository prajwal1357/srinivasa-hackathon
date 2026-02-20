"use client";

import { useState } from "react";
import { Pin, AlertTriangle, CalendarDays, Send } from "lucide-react";

export default function CircularControl() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");
  const [mandatoryAck, setMandatoryAck] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const circularData = {
      title,
      message,
      isPinned,
      isUrgent,
      expiryDate,
      mandatoryAck,
    };

    console.log("Circular Data:", circularData);
    alert("Department Circular Posted Successfully!");

    setTitle("");
    setMessage("");
    setIsPinned(false);
    setIsUrgent(false);
    setExpiryDate("");
    setMandatoryAck(false);
  };

  return (
    <div className="text-white space-y-8">
      <h1 className="text-3xl font-bold text-blue-500">
        Official Communication Control
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-2xl border border-gray-800 space-y-6"
      >
        {/* Title */}
        <div>
          <label className="text-gray-400 block mb-2">
            Circular Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Message */}
        <div>
          <label className="text-gray-400 block mb-2">
            Message
          </label>
          <textarea
            rows="4"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Options */}
        <div className="grid md:grid-cols-2 gap-6">

          <Checkbox
            label="Pin This Notice"
            icon={Pin}
            checked={isPinned}
            onChange={setIsPinned}
          />

          <Checkbox
            label="Mark as Urgent"
            icon={AlertTriangle}
            checked={isUrgent}
            onChange={setIsUrgent}
          />

          <Checkbox
            label="Mandatory Acknowledgment"
            icon={Send}
            checked={mandatoryAck}
            onChange={setMandatoryAck}
          />

          <div>
            <label className="text-gray-400 block mb-2">
              Expiry Date
            </label>
            <div className="flex items-center gap-3 bg-black border border-gray-700 p-3 rounded-lg">
              <CalendarDays size={18} className="text-blue-500" />
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="bg-transparent outline-none text-white"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Publish Circular
        </button>
      </form>
    </div>
  );
}

/* Reusable Checkbox */
function Checkbox({ label, icon: Icon, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer bg-black border border-gray-700 p-3 rounded-lg hover:border-blue-500 transition">
      <Icon size={18} className="text-blue-500" />
      <span className="flex-1">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="accent-blue-600"
      />
    </label>
  );
}