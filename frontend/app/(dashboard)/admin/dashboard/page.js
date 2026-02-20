"use client";

import {
  Users,
  UserCheck,
  BookOpen,
  Activity,
  Bell,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";

export default function AdminDashboard() {
  const departmentName = "Computer Science & Engineering";

  const kpis = [
    {
      title: "Total Students",
      value: "1,240",
      icon: Users,
      color: "bg-[#CCFBF1]", // Mint
    },
    {
      title: "Total Faculty",
      value: "58",
      icon: UserCheck,
      color: "bg-[#FFEDD5]", // Peach
    },
    {
      title: "Approved Resources",
      value: "312",
      icon: BookOpen,
      color: "bg-[#DBEAFE]", // Soft Blue
    },
    {
      title: "Active Users",
      value: "876",
      icon: Activity,
      color: "bg-[#F3E8FF]", // Lilac
    },
    {
      title: "New Notices",
      value: "14",
      icon: Bell,
      color: "bg-[#FEF9C3]", // Soft Yellow
    },
    {
      title: "Events",
      value: "06",
      icon: CalendarDays,
      color: "bg-[#FFD1D1]", // Soft Red
    },
  ];

  return (
    <div className="space-y-12 font-mono">
      {/* 🔷 New Style: Constructivist Coral Section */}
      <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-black p-10 bg-[#FF8A5B] text-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        
        {/* Decorative Floating Elements (Tape & Sticker Style) */}
        <div className="absolute top-6 right-12 w-28 h-8 bg-[#FFD600] border-2 border-black -rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-[10px] uppercase hidden md:flex">
          Top Priority
        </div>
        <div className="absolute -bottom-4 right-24 w-20 h-20 bg-[#3B82F6] border-4 border-black rounded-full rotate-45 hidden md:block" />

        <div className="relative z-10">
          {/* Replaced black background with deep indigo */}
          <div className="inline-block px-5 py-2 bg-[#1E293B] border-2 border-black rounded-lg text-[10px] text-white font-black uppercase tracking-[0.2em] mb-8 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]">
            HOD / Admin Console
          </div>

          <h1 className="text-4xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-4">
            {departmentName}
          </h1>

          <div className="mt-10 flex flex-wrap items-center gap-4 text-xs">
            <div className="px-4 py-2 bg-white border-4 border-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Term: 2025–26
            </div>
            
            {/* Replaced black background with a clean white/thick border style */}
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="w-3 h-3 bg-[#4ADE80] rounded-full animate-ping" />
              <span className="font-black uppercase tracking-widest text-[10px]">Active Node</span>
            </div>
          </div>
        </div>
      </div>

      {/* 🔷 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {kpis.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className={`group relative border-4 border-black rounded-[2rem] p-7 transition-all duration-300 
                ${item.color} shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 cursor-pointer`}
            >
              <div className="flex flex-col justify-between h-full space-y-10">
                <div className="flex justify-between items-start">
                  {/* Icon Box with high contrast */}
                  <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <Icon size={32} strokeWidth={3} className="text-black" />
                  </div>
                  
                  <div className="bg-white border-2 border-black p-2 rounded-full group-hover:bg-[#FFD600] transition-colors">
                    <ArrowUpRight size={20} strokeWidth={3} />
                  </div>
                </div>

                <div>
                  <p className="text-black text-xs font-black uppercase tracking-tight opacity-60">
                    {item.title}
                  </p>
                  <h2 className="text-5xl font-black mt-1 text-black tracking-tighter">
                    {item.value}
                  </h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔷 Status Banner - Using dashed borders and bright yellow */}
    
    </div>
  );
}