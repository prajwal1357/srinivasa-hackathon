"use client";
import React, { useEffect, useState } from "react";
import { Megaphone, Calendar, FileText, Send, Users } from "lucide-react";

export default function FacultyCreateNotice() {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    expiryDate: "",
    classId: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAssignedClasses();
  }, []);

  const fetchAssignedClasses = async () => {
    try {
      const res = await fetch("/auth/classes");
      const data = await res.json();
      setClasses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

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
      const res = await fetch("/api/faculty/create-notice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.error("Error creating faculty notice:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-6 md:p-12 flex items-center justify-center font-mono">
      <div className="w-full max-w-xl bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-[#fb923c] p-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Megaphone size={24} className="text-black" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
            Faculty Notice
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold uppercase">
              <FileText size={16} /> Notice Title
            </label>
            <input
              name="title"
              placeholder="e.g. Tomorrow's Extra Class"
              required
              onChange={handleChange}
              className="w-full border-[3px] border-black p-4 text-lg font-bold placeholder:text-gray-400 focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold uppercase">
              <Megaphone size={16} /> Description
            </label>
            <textarea
              name="description"
              placeholder="Write your message to the students..."
              required
              rows={4}
              onChange={handleChange}
              className="w-full border-[3px] border-black p-4 text-lg font-bold placeholder:text-gray-400 focus:outline-none focus:bg-blue-50 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Expiry Date Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold uppercase">
                <Calendar size={16} /> Expiry Date
              </label>
              <input
                type="date"
                name="expiryDate"
                required
                onChange={handleChange}
                className="w-full border-[3px] border-black p-4 text-lg font-bold focus:outline-none focus:bg-purple-50 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              />
            </div>

            {/* Class Selection Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold uppercase">
                <Users size={16} /> Target Class
              </label>
              <select
                name="classId"
                required
                onChange={handleChange}
                className="w-full border-[3px] border-black p-4 text-lg font-bold appearance-none focus:outline-none focus:bg-emerald-50 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-white"
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full group relative flex items-center justify-center gap-3 border-[3px] border-black py-4 text-xl font-black uppercase transition-all 
              ${loading 
                ? 'bg-gray-200 cursor-not-allowed' 
                : 'bg-[#A3E635] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none'
              }`}
          >
            {loading ? (
              <span className="animate-pulse">Broadcasting...</span>
            ) : (
              <>
                <span>Post to Class</span>
                <Send size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t-[3px] border-black border-dashed">
          <p className="text-xs font-bold text-gray-500 uppercase">
            Faculty Portal // Notice Board System
          </p>
        </div>
      </div>
    </div>
  );
}