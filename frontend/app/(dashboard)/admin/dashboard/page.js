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
      color: "bg-memphis-yellow",
    },
    {
      title: "Total Faculty",
      value: "58",
      icon: UserCheck,
      color: "bg-memphis-green",
    },
    {
      title: "Approved Resources",
      value: "312",
      icon: BookOpen,
      color: "bg-memphis-blue",
    },
    {
      title: "Active Users",
      value: "876",
      icon: Activity,
      color: "bg-memphis-pink",
    },
    {
      title: "New Notices",
      value: "14",
      icon: Bell,
      color: "bg-memphis-yellow",
    },
    {
      title: "Events",
      value: "06",
      icon: CalendarDays,
      color: "bg-white",
    },
  ];

  return (
    <div className="space-y-10 p-2">
      {/* 🟦 1️⃣ Department Overview Panel - Memphis Style */}
      <div className="bg-white p-8 border-4 border-black rounded-none brutal-shadow relative overflow-hidden">
        {/* Decorative Circle */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-memphis-pink border-4 border-black rounded-full opacity-20" />
        
        <div className="relative z-10">
          <div className="inline-block px-3 py-1 bg-black text-white text-xs font-black uppercase mb-4 tracking-widest">
            HOD / Admin Console
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black uppercase italic tracking-tighter">
            {departmentName}
          </h1>
          <div className="mt-4 flex items-center gap-4">
            <p className="font-bold text-slate-600 uppercase text-sm">
              Academic Year 2025-26
            </p>
            <div className="h-1 w-12 bg-black" />
            <p className="font-bold text-black uppercase text-sm">Status: Online</p>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {kpis.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className={`${item.color} border-4 border-black rounded-none p-6 brutal-shadow 
                         hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] 
                         transition-all duration-200 group cursor-pointer`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <div className="p-3 border-4 border-black bg-white inline-block">
                    <Icon size={28} className="text-black" />
                  </div>
                  <div>
                    <p className="text-black font-black uppercase text-xs tracking-wider">
                      {item.title}
                    </p>
                    <h2 className="text-4xl font-black mt-1 text-black">
                      {item.value}
                    </h2>
                  </div>
                </div>
                
                <div className="bg-black text-white p-1 rounded-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    
       
    </div>
  );
}