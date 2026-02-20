"use client";

import { useState } from "react";
import { Pin, AlertTriangle, CalendarDays, Send, ShieldCheck, Zap } from "lucide-react";

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
    setTitle("");
    setMessage("");
    setIsPinned(false);
    setIsUrgent(false);
    setExpiryDate("");
    setMandatoryAck(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 font-mono animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* 🔷 PAGE HEADER - Constructivist Style */}
      <div className="relative overflow-hidden bg-[#1E293B] border-4 border-black p-8 rounded-4xl shadow-[10px_10px_0px_0px_rgba(255,138,91,1)] text-white">
        {/* Floating Sticker */}
        <div className="absolute top-4 right-8 w-24 h-24 bg-[#FFD600] border-4 border-black rounded-full flex items-center justify-center -rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black font-black text-xs uppercase text-center leading-none z-20">
          Admin<br/>Control
        </div>
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="bg-[#FF8A5B] p-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] rotate-3">
            <Zap size={40} className="text-black" strokeWidth={3} />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
              Communication Hub
            </h1>
            <p className="font-black text-[#FF8A5B] uppercase text-[10px] mt-2 tracking-[0.3em]">
              Central Circular Management
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border-4 border-black p-10 rounded-[2.5rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] space-y-10"
      >
        {/* Circular Title */}
        <div className="space-y-3">
          <span className="inline-block bg-[#1E293B] text-white px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Circular Headline
          </span>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-5 border-4 border-black rounded-2xl bg-[#F8FAFC] focus:bg-[#FEF9C3] outline-none font-black text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-1 focus:translate-y-1 transition-all"
            placeholder="ENTER OFFICIAL TITLE..."
          />
        </div>

        {/* Message */}
        <div className="space-y-3">
          <span className="inline-block bg-[#1E293B] text-white px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Message Body
          </span>
          <textarea
            rows="5"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-5 border-4 border-black rounded-4xl bg-[#F8FAFC] focus:bg-[#DBEAFE] outline-none font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-1 focus:translate-y-1 transition-all"
            placeholder="Enter the core message here..."
          />
        </div>

        {/* Options Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          
          <Checkbox
            label="Pin to Dashboard"
            icon={Pin}
            checked={isPinned}
            onChange={setIsPinned}
            color="bg-[#A5F3FC]" // Cyan
          />

          <Checkbox
            label="Mark as Urgent"
            icon={AlertTriangle}
            checked={isUrgent}
            onChange={setIsUrgent}
            color="bg-[#FDA4AF]" // Pink/Red
          />

          <Checkbox
            label="Require Receipt"
            icon={ShieldCheck}
            checked={mandatoryAck}
            onChange={setMandatoryAck}
            color="bg-[#86EFAC]" // Green
          />

          <div className="space-y-2">
            <span className="inline-block bg-[#1E293B] text-white px-4 py-1 text-[9px] font-black uppercase tracking-widest border-2 border-black">
              Expiry Configuration
            </span>
            <div className="flex items-center gap-4 bg-white border-4 border-black p-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CalendarDays size={24} strokeWidth={3} className="text-[#FF8A5B]" />
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="bg-transparent outline-none font-black uppercase text-sm w-full"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="group relative w-full flex items-center justify-center gap-4 bg-[#FFD600] border-4 border-black p-6 rounded-2xl font-black uppercase italic tracking-tighter text-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all active:scale-95"
        >
          <Send size={32} strokeWidth={3} className="group-hover:rotate-12 transition-transform" />
          Publish Circular
        </button>
      </form>

      {/* Security Disclaimer */}
      <div className="border-4 border-dashed border-black/20 rounded-2xl p-6 text-center">
         <p className="text-[10px] font-black uppercase text-black/40">
           Authorized Access Only • Srinivasa University • Security Protocol v2.5
         </p>
      </div>
    </div>
  );
}

/* Reusable Neo-Brutalist Checkbox */
function Checkbox({ label, icon: Icon, checked, onChange, color }) {
  return (
    <label 
      className={`flex items-center gap-4 cursor-pointer border-4 border-black p-5 rounded-2xl transition-all duration-200 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
        ${checked ? color : 'bg-white'} 
        ${checked ? 'translate-x-1 translate-y-1 shadow-none' : 'hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'}
      `}
    >
      <div className={`p-2 border-2 border-black rounded-lg ${checked ? 'bg-white' : 'bg-gray-50'}`}>
        <Icon size={20} strokeWidth={3} className="text-black" />
      </div>
      <span className="flex-1 font-black uppercase text-xs tracking-tight leading-none">{label}</span>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-8 h-8 border-4 border-black rounded-lg appearance-none checked:bg-black cursor-pointer transition-colors"
        />
        {checked && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-white font-black">
            ✓
          </div>
        )}
      </div>
    </label>
  );
}