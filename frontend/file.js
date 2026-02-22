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
        headers: {
          "Content-Type": "application/json",
        },
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
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 flex items-center justify-center">
      <div className="w-full max-w-2xl space-y-8">

        {/* ===== HEADER ===== */}
        <div className="rounded-3xl p-8 bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl">
              <Megaphone size={28} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold">
                Create Notice
              </h1>
              <p className="text-white/80 text-sm mt-1">
                Publish announcements for students and faculty
              </p>
            </div>
          </div>
        </div>

        {/* ===== FORM CARD ===== */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 space-y-6">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <FileText size={16} />
                Notice Title
              </label>
              <input
                name="title"
                placeholder="e.g. End Semester Schedule"
                required
                onChange={handleChange}
                className="w-full mt-2 p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
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
                rows={5}
                onChange={handleChange}
                className="w-full mt-2 p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none"
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
                className="w-full mt-2 p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl text-lg font-semibold transition-all
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
                  Broadcast Notice
                </span>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-400">
              Admin Panel • Authorized Access Only
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}