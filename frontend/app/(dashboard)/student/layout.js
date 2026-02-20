"use client";
import React, { useState } from "react";
import {
  LayoutDashboard,
  Upload,
  LogOut,
  List,
  Zap,
  Moon,
  Sun,
  GraduationCap,
  ChevronRight,
  Sparkles
} from "lucide-react";

/**
 * THEME: "Electric Sunrise & Midnight"
 * Style: Neo-Brutalist / Neo-Memphis
 * Color Palette: 
 * - Primary: Sunset Orange (#FB923C)
 * - Secondary: Midnight Navy (#0F172A)
 * - Accent: Sunflower Yellow (#FDE047)
 * - BG: Warm Paper (#FFF7ED)
 */

export default function App() {
  const [currentPath, setCurrentPath] = useState("/student/dashboard");
  const [darkMode, setDarkMode] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
    { name: "Upload notes", path: "/student/uploadNotes", icon: Upload },
    { name: "View notes", path: "/student/viewNotes", icon: List },
  ];

  const handleLogout = () => {
    console.log("Student logging out...");
  };

  return (
    <div className={`${darkMode ? "dark" : ""} font-mono`}>
      {/* Background: Warm Paper with a bold dot grid */}
      <div className="flex min-h-screen bg-[#FFF7ED]  transition-all duration-300" 
           style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }}>

        {/* Sidebar: Neo-Brutalist Midnight Sidebar */}
        <aside className="w-72 bg-white  border-r-4 border-black flex flex-col sticky top-0 h-screen shadow-[8px_0px_0px_0px_rgba(0,0,0,1)] z-20">

          {/* Header: Sunset Orange Sticker Style */}
          <div className="p-8 border-b-4 border-black bg-[#FB923C] text-black">
            <div className="flex items-center gap-3">
              <div className="p-2 border-4 border-black bg-white rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <GraduationCap size={24} strokeWidth={3} />
              </div>
              <div>
                <h1 className="text-xl font-black uppercase tracking-tighter leading-none">
                  Student
                </h1>
                <h1 className="text-xl font-black uppercase tracking-tighter leading-none">
                  Portal
                </h1>
              </div>
            </div>
            <p className="text-[9px] mt-4 font-black uppercase tracking-[0.3em] opacity-60">
              Learning Management System
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-4 mt-4 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;

              return (
                <button
                  key={item.name}
                  onClick={() => setCurrentPath(item.path)}
                  className={`flex items-center gap-4 px-5 py-4 border-4 border-black rounded-2xl transition-all font-black uppercase text-xs italic tracking-tighter w-full text-left
                    ${
                      isActive
                        ? "bg-[#0F172A] text-white shadow-[6px_6px_0px_0px_rgba(251,146,60,1)] -translate-x-1 -translate-y-1"
                        : "bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-[#FDE047] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1"
                    }`}
                >
                  <Icon size={20} strokeWidth={3} />
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* Bottom Section */}
          <div className="p-6 border-t-4 border-black space-y-4 bg-white dark:bg-gray-900">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center justify-center gap-3 w-full px-5 py-3 border-4 border-black rounded-xl bg-[#FDE047] text-black font-black uppercase text-[10px] hover:bg-[#FB923C] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              {darkMode ? <Sun size={18} strokeWidth={3} /> : <Moon size={18} strokeWidth={3} />}
              Day/Night
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-3 w-full px-5 py-3 border-4 border-black rounded-xl bg-[#0F172A] text-white font-black uppercase text-[10px] shadow-[6px_6px_0px_0px_rgba(251,146,60,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              <LogOut size={18} strokeWidth={3} />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-10 overflow-y-auto relative">
          
          <div className="max-w-6xl mx-auto">
            {/* Content Container: Off-white "Canvas" with massive midnight shadow */}
            <div className="min-h-[85vh] bg-white dark:bg-gray-900 border-4 border-black rounded-[2.5rem] shadow-[20px_20px_0px_0px_rgba(15,23,42,1)] p-12 relative overflow-hidden">
              
              {/* Decorative Corner Sticker */}
              <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden pointer-events-none">
                 <div className="absolute top-4 -right-10 w-40 h-10 bg-[#FB923C] border-2 border-black rotate-45 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="text-[10px] font-black text-black uppercase tracking-widest italic">STU-2025</span>
                 </div>
              </div>

              <div className="relative z-10">
                <header className="mb-12 flex items-end justify-between border-b-8 border-black pb-6">
                  <div>
                    <div className="inline-block px-4 py-1 bg-[#FDE047] text-black border-2 border-black rounded-lg text-[10px] font-black uppercase tracking-widest mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      Student / Workspace
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-[ -0.05em] leading-none">
                      {menuItems.find(i => i.path === currentPath)?.name}
                    </h2>
                  </div>
                  <div className="hidden md:block">
                     <Sparkles size={64} strokeWidth={4} className="text-[#FDE047] fill-current" />
                  </div>
                </header>
                
                {/* Content Placeholder */}
                <div className="border-8 border-dashed border-black/10 rounded-3xl p-24 text-center bg-[#FFFBEB] relative group">
                   <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-white border-4 border-black font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-[#FDE047] transition-colors">
                      Status: Active
                   </div>
                   <p className="font-black uppercase text-black/20 italic text-3xl tracking-tighter">
                    Academic Resources Loading...
                   </p>
                   <div className="mt-8 flex justify-center">
                     <button className="bg-[#FB923C] border-4 border-black px-8 py-3 rounded-2xl font-black uppercase italic shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-2">
                       Refresh View <Zap size={18} fill="currentColor" />
                     </button>
                   </div>
                </div>

                {/* Info Badges Footer */}
                <div className="mt-12 flex flex-wrap gap-6">
                  <div className="flex items-center gap-3 bg-white border-4 border-black px-6 py-3 rounded-2xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-rotate-1 cursor-help">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-black" />
                    <span className="font-black uppercase text-[10px] tracking-widest">Profile: Verified</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white border-4 border-black px-6 py-3 rounded-2xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-transform hover:rotate-1 cursor-help">
                    <span className="font-black uppercase text-[10px] tracking-widest italic">Course: B.Tech CSE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}