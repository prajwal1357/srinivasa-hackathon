"use client";
import React, { useState} from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bell,
  Upload,
  CheckCircle,
  LogOut,
  MessageCircleCode,
  Zap,
  Moon,
  Sun,
  BookOpen
} from "lucide-react";

/**
 * THEME: "Digital Mint & Deep Jet"
 * Style: Neo-Brutalist / Neo-Memphis
 * Color Palette: 
 * - Primary: Mint (#4ADE80)
 * - Secondary: Jet (#0F172A)
 * - Accent: Purple (#A855F7)
 * - BG: Silver (#E2E8F0)
 */

export default function App() {
  const [currentPath, setCurrentPath] = useState("/faculty/dashboard");
 const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/faculty/dashboard", icon: LayoutDashboard },
    { name: "Notify Student", path: "/faculty/notifyStu", icon: Bell },
    { name: "Upload Notes", path: "/faculty/uploadNotes", icon: Upload },
    { name: "Verify", path: "/faculty/verify", icon: CheckCircle },
    { name: "Send Message", path: "/faculty/sendmsg", icon: MessageCircleCode },
  ];

  const handleLogout = async () => {
    try {
      const res = await fetch("/auth/logout", { method: "POST" });
      if (res.ok) router.replace("/login");
      else alert("Logout failed");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
   
      <div className="flex min-h-screen bg-[#E2E8F0] transition-all duration-300" 
           style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }}>

        {/* Sidebar: Neo-Brutalist Jet Sidebar */}
        <aside className="w-72 bg-white  border-r-4 border-black flex flex-col sticky top-0 h-screen shadow-[8px_0px_0px_0px_rgba(0,0,0,1)] z-20">

          {/* Header: High-Contrast Mint Sticker Style */}
          <div className="p-8 border-b-4 border-black bg-[#4ADE80] text-black">
            <div className="flex items-center gap-3">
              <div className="p-2 border-4 border-black bg-white rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <BookOpen size={24} strokeWidth={3} />
              </div>
              <div>
                <h1 className="text-xl font-black uppercase tracking-tighter leading-none">
                  Faculty
                </h1>
                <h1 className="text-xl font-black uppercase tracking-tighter leading-none">
                  Panel
                </h1>
              </div>
            </div>
            <p className="text-[9px] mt-4 font-black uppercase tracking-[0.3em] opacity-60">
              Academic Control Layer
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
                        ? "bg-[#A855F7] text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -translate-x-1 -translate-y-1"
                        : "bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-[#4ADE80] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1"
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
              onClick={handleLogout}
              className="flex items-center justify-center gap-3 w-full px-5 py-3 border-4 border-black rounded-xl bg-[#4ADE80] text-black font-black uppercase text-[10px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              <LogOut size={18} strokeWidth={3} />
              End Session
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-10 overflow-y-auto relative">
          
          <div className="max-w-6xl mx-auto">
            {/* Content Container: Off-white "Canvas" with massive hard shadow */}
            <div className="min-h-[85vh] bg-white border-4 border-black rounded-[2.5rem] shadow-[20px_20px_0px_0px_rgba(15,23,42,1)] p-12 relative overflow-hidden">
              
              {/* Decorative Blueprint Corner Sticker */}
              <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden pointer-events-none">
                 <div className="absolute top-4 -right-10 w-40 h-10 bg-[#A855F7] border-2 border-black rotate-45 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">FAC-ID-88</span>
                 </div>
              </div>

              <div className="relative z-10">
                <header className="mb-12 flex items-end justify-between border-b-8 border-black pb-6">
                  <div>
                    <div className="inline-block px-4 py-1 bg-[#0F172A] text-white border-2 border-black rounded-lg text-[10px] font-black uppercase tracking-widest mb-4">
                      Academic / Control
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-[ -0.05em] leading-none">
                      {menuItems.find(i => i.path === currentPath)?.name}
                    </h2>
                  </div>
                  <div className="hidden md:block">
                     <Zap size={64} strokeWidth={4} className="text-[#4ADE80] fill-current" />
                  </div>
                </header>
                
                {/* Content Placeholder */}
                <div className="border-8 border-dashed border-black/10 rounded-3xl p-24 text-center bg-[#F1F5F9] relative group">
                   <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-white border-4 border-black font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-[#4ADE80] transition-colors">
                      Live Interface
                   </div>
                   <p className="font-black uppercase text-black/20 italic text-3xl tracking-tighter">
                    Ready for Department Operations
                   </p>
                </div>

               
                
              </div>
            </div>
          </div>
        </main>

      </div>
    
  );
}