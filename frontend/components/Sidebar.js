"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Upload, 
  List, 
  LogOut, 
  GraduationCap, 
  Menu, 
  X, 
  Fullscreen,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
    { name: "Upload notes", path: "/student/uploadNotes", icon: Upload },
    { name: "View notes", path: "/student/viewNotes", icon: List },
    { name: "Events", path: "/student/events", icon: Fullscreen },
  ];

  const handlelogout = async () => {
    try {
      // Logic from your provided code
      const res = await fetch("/auth/logout", {
        method: "POST",
      });
      if (res.ok) {
        window.location.href = "/login";
        toast.success("Logged out successfully");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong");
    }
  };

  const NavContent = () => (
    <div className="flex flex-col h-full bg-white">
      {/* ═══════════ HEADER (Professional Orange) ═══════════ */}
      <div className="p-8 pb-10">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-[#F97316] p-2.5 rounded-2xl shadow-lg shadow-orange-100 transition-transform group-hover:scale-105">
            <GraduationCap size={24} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
               <h1 className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                 StudentHub
               </h1>
               <Sparkles size={12} className="text-orange-400" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-1 block">
              University Portal
            </span>
          </div>
        </div>
      </div>

      {/* ═══════════ NAVIGATION ═══════════ */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
       
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link 
              key={item.name} 
              href={item.path}
              onClick={() => setIsOpen(false)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group relative ${
                isActive
                  ? "bg-orange-600 text-black shadow-xl shadow-slate-200"
                  : "text-slate-500 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              <Icon 
                onClick={() => handleNavItemClick(item.path)} 
                size={20} 
                strokeWidth={isActive ? 2.5 : 2} 
                className={isActive ? "text-black" : "text-slate-400 group-hover:text-[#F97316]"} 
              />
              <span className={`text-sm font-bold tracking-tight ${isActive ? "opacity-100" : "opacity-80"}`}>
                {item.name}
              </span>
              {isActive && (
                <div className="ml-auto">
                  <ChevronRight size={14} className="opacity-50" />
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ═══════════ BOTTOM SECTION ═══════════ */}
      <div className="p-6 border-t border-gray-50">
        
       

        <button 
          onClick={handlelogout} 
          className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-2xl bg-white border border-rose-100 text-rose-500 font-bold text-sm hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-sm"
        >
          <LogOut size={16} strokeWidth={2.5} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ═══════════ CSS INJECTOR ═══════════ */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        
        html {
          scroll-behavior: smooth;
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}} />

      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 left-6 z-[60] p-3 bg-white border border-gray-100 text-slate-900 rounded-xl shadow-xl active:scale-95 transition-all"
      >
        {isOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
      </button>

      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-gray-100 flex-col sticky top-0 h-screen z-50">
        <NavContent />
      </aside>

      {/* Sidebar Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm animate-in" 
            onClick={() => setIsOpen(false)} 
          />
          <aside className="fixed top-0 left-0 w-72 h-full bg-white border-r border-gray-100 flex flex-col shadow-2xl animate-in">
            <NavContent />
          </aside>
        </div>
      )}
    </>
  );
}