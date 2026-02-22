"use client";
import React, { useState } from "react";
import { Megaphone, Calendar, FileText, Send, Loader2 } from "lucide-react";

export default function CreateNoticePage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    expiryDate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/create-notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.error("Error creating notice:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col">

      {/* ===== HEADER SECTION ===== */}
      <div className="w-full bg-slate-900 text-white px-6 md:px-20 py-12 rounded-2xl">
        <div className="max-w-6xl mx-auto flex items-center gap-5">
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl">
            <Megaphone size={30} />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-semibold">
              Create Notice
            </h1>
            <p className="text-white/80 mt-2 text-sm md:text-base">
              Publish official announcements for students and faculty
            </p>
          </div>
        </div>
      </div>

      {/* ===== FORM SECTION ===== */}
      <div className="flex-1 w-full px-6 md:px-20 py-10">
        <div className="max-w-5xl mx-auto">

          <form
            onSubmit={handleSubmit}
            className="space-y-10"
          >

            {/* Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <FileText size={16} />
                Notice Title
              </label>
              <input
                name="title"
                placeholder="e.g. End Semester Examination Schedule"
                required
                onChange={handleChange}
                className="w-full mt-3 p-4 border border-slate-300 rounded-xl text-base focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Megaphone size={16} />
                Description
              </label>
              <textarea
                name="description"
                placeholder="Provide detailed information here..."
                required
                rows={8}
                onChange={handleChange}
                className="w-full mt-3 p-4 border border-slate-300 rounded-xl text-base focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none"
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Calendar size={16} />
                Expiry Date
              </label>
              <input
                type="date"
                name="expiryDate"
                required
                onChange={handleChange}
                className="w-full mt-3 p-4 border border-slate-300 rounded-xl text-base focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full md:w-auto px-10 py-4 rounded-2xl text-lg font-semibold transition-all
                  ${
                    loading
                      ? "bg-slate-300 text-slate-500"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
                  }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={20} className="animate-spin" />
                    Creating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send size={20} />
                    Publish Notice
                  </span>
                )}
              </button>
            </div>

          </form>

        </div>
      </div>

    </div>
  );
}