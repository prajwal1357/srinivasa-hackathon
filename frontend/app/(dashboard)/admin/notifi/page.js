"use client";

import { useState } from "react";
import { Upload, Send } from "lucide-react";

export default function AdminNotification() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [accept, setAccept] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!accept) {
      alert("Please confirm before sending notification.");
      return;
    }

    // Later you connect API here
    console.log({
      title,
      message,
      file,
    });

    alert("Notification sent to all students!");

    // Reset
    setTitle("");
    setMessage("");
    setFile(null);
    setAccept(false);
  };

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">
        Send Notification
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-xl shadow-lg space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block mb-2 text-gray-400">
            Notification Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 
                       focus:border-blue-500 focus:outline-none"
            placeholder="Enter notification title"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block mb-2 text-gray-400">
            Notification Message
          </label>
          <textarea
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 
                       focus:border-blue-500 focus:outline-none"
            placeholder="Enter notification details"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block mb-2 text-gray-400">
            Upload File (optional)
          </label>

          <label className="flex items-center justify-center gap-3 
                            border-2 border-dashed border-gray-700 
                            rounded-lg p-6 cursor-pointer 
                            hover:border-blue-500 transition">
            <Upload size={20} />
            {file ? file.name : "Click to upload file"}
            <input
              type="file"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
        </div>

        {/* Confirm Checkbox */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={accept}
            onChange={(e) => setAccept(e.target.checked)}
            className="w-4 h-4 accent-blue-600"
          />
          <label className="text-gray-400">
            I confirm that this notification is correct and will be sent to all students.
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 
                     px-6 py-3 rounded-lg font-semibold 
                     hover:bg-blue-700 transition"
        >
          <Send size={18} />
          Send to All Students
        </button>
      </form>
    </div>
  );
}