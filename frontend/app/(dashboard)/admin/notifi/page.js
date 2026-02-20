"use client";

import { useState } from "react";
import { Upload, Send, AlertCircle, Megaphone, Paperclip } from "lucide-react";

export default function AdminNotification() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [accept, setAccept] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!accept) {
      // In a real environment we'd use a custom modal, 
      // but keeping logic consistent with your request.
      return;
    }
    console.log({ title, message, file });
    setTitle("");
    setMessage("");
    setFile(null);
    setAccept(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 font-mono animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* 📣 PAGE HEADER - Constructivist Style */}
      <div className="relative overflow-hidden bg-[#FF8A5B] border-4 border-black p-8 rounded-[2rem] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        {/* Decorative Tape Sticker */}
        <div className="absolute -top-1 -right-4 w-32 h-10 bg-[#FFD600] border-2 border-black rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-[10px] uppercase z-20">
          Broadcast Mode
        </div>
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="bg-[#1E293B] p-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,214,0,1)] -rotate-3">
            <Megaphone size={40} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black leading-none">
              Digital Notice Board
            </h1>
            <p className="font-black text-black uppercase text-xs mt-2 tracking-widest bg-white/40 inline-block px-2 border border-black">
              Official University Dispatch
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border-4 border-black p-10 rounded-[2.5rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] space-y-10"
      >
        {/* Title Input */}
        <div className="space-y-3 group">
          <div className="flex items-center gap-2">
            <span className="inline-block bg-[#1E293B] text-white px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Subject Line
            </span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-5 border-4 border-black rounded-2xl focus:outline-none focus:bg-[#FEF9C3] font-black text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-1 focus:translate-y-1 transition-all placeholder:text-black/30"
            placeholder="e.g., URGENT: END SEMESTER SCHEDULE"
          />
        </div>

        {/* Message Textarea */}
        <div className="space-y-3 group">
          <span className="inline-block bg-[#1E293B] text-white px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Detailed Content
          </span>
          <textarea
            rows="6"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full p-5 border-4 border-black rounded-3xl focus:outline-none focus:bg-[#DBEAFE] font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-1 focus:translate-y-1 transition-all"
            placeholder="Draft your announcement here..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* File Upload Zone */}
          <div className="space-y-3">
            <span className="inline-block bg-[#1E293B] text-white px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Support Files
            </span>
            <label className="flex flex-col items-center justify-center gap-4 border-4 border-black border-dashed bg-[#F8FAFC] p-10 rounded-3xl cursor-pointer hover:bg-[#CCFBF1] transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1">
              <div className="bg-white border-4 border-black p-3 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Upload size={28} strokeWidth={3} className="text-black" />
              </div>
              <div className="text-center">
                <span className="font-black uppercase text-xs block mb-1">
                  {file ? file.name : "Drop Resources"}
                </span>
                <span className="text-[10px] font-bold text-black/50 uppercase">PDF, PNG, JPG (MAX 10MB)</span>
              </div>
              <input
                type="file"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>

          {/* Verification & Action Area */}
          <div className="flex flex-col justify-end space-y-6">
            <div className="bg-[#FFD600] border-4 border-black p-5 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex gap-4">
              <div className="bg-white border-2 border-black p-1 h-fit rounded-lg">
                <AlertCircle size={20} strokeWidth={3} className="text-black" />
              </div>
              <p className="text-[11px] font-black leading-tight uppercase tracking-tight">
                Warning: This action will push notifications to 1,240 students instantly via the Mobile App & Portal.
              </p>
            </div>

            <div className="flex items-start gap-4 p-2">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={accept}
                  onChange={(e) => setAccept(e.target.checked)}
                  className="w-8 h-8 border-4 border-black rounded-lg appearance-none checked:bg-[#4ADE80] cursor-pointer transition-colors relative z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                />
                {accept && <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none font-black text-black">✓</div>}
              </div>
              <label className="text-[11px] font-black uppercase tracking-tighter leading-snug cursor-pointer select-none">
                I authorize this broadcast and confirm all content follows institutional guidelines.
              </label>
            </div>

            <button
              type="submit"
              disabled={!accept}
              className={`flex items-center justify-center gap-4 border-4 border-black p-6 rounded-2xl font-black uppercase italic tracking-tighter text-2xl transition-all
                ${accept 
                  ? "bg-[#4ADE80] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1" 
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"}
              `}
            >
              <Send size={28} strokeWidth={3} />
              Broadcast Now
            </button>
          </div>
        </div>
      </form>

      {/* Footer Info Badge */}
      <div className="flex justify-center">
        <div className="bg-white border-4 border-black px-6 py-2 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3">
          <Paperclip size={16} strokeWidth={3} />
          <span className="text-[10px] font-black uppercase">Current Queue: 0 Pending Items</span>
        </div>
      </div>
    </div>
  );
}