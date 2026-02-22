"use client";

import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Bell,
  Upload,
  CheckCircle,
  LogOut,
  MessageCircleCode,
  NotebookPen,
  Zap,
  ChevronRight,
  Settings,
  Search,
  Menu,
  X,
  ZapIcon,
  
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";


const App = ({ children }) => {
  const [pathname, setPathname] = useState("/faculty/dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/faculty/dashboard", icon: LayoutDashboard },
    { name: "Notify Student", path: "/faculty/notifyStu", icon: Bell },
    { name: "Upload Notes", path: "/faculty/uploadNotes", icon: Upload },
    { name: "Verify", path: "/faculty/verify", icon: CheckCircle },
    { name: "Send Message", path: "/faculty/sendmsg", icon: MessageCircleCode },
    { name: "Approve Notes", path: "/faculty/pending-notes", icon: NotebookPen },
    { name: "Create Event", path: "/faculty/createEvent", icon: ZapIcon },
  ];

  const handleNavItemClick = (path) => {
    setPathname(path);
    setIsMobileMenuOpen(false);
  };

  const handlelogout = async () => {
    try {
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
  }

  return (
    <div className="min-h-screen bg-[#F3F5F7] text-slate-800 flex overflow-hidden w-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      {/* ═══════════ CSS INJECTOR ═══════════ */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}} />

      {/* ═══════════ MOBILE SIDEBAR OVERLAY ═══════════ */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-60 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ═══════════ SIDEBAR ═══════════ */}
      <aside className={`
        fixed inset-y-0 left-0 z-70 w-72 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:h-screen
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        
        {/* Brand Section */}
        <div className="p-8 pb-10 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
        
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                FacultyHub
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-1 block">
                Academic Management
              </span>
            </div>
          </div>
          <button 
            className="lg:hidden p-2 text-slate-400 hover:text-slate-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => handleNavItemClick(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group relative ${
                  isActive
                    ? "bg-cyan-500  text-black shadow-xl shadow-slate-200"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon 
                  size={20} 
                  strokeWidth={isActive ? 2.5 : 2} 
                  className={isActive ? "text-white" : "text-slate-400 group-hover:text-slate-900"} 
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

        {/* User / Bottom Section */}
        <div className="p-6 border-t border-gray-50 bg-white">
    
          <button
            onClick={handlelogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-2xl bg-white border border-rose-100 text-rose-500 font-bold text-sm hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-sm"
          >
            <LogOut size={16} strokeWidth={2.5} />
            Logout Session
          </button>
        </div>
      </aside>

      {/* ═══════════ MAIN CONTENT ═══════════ */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden w-full">
        
        {/* Top Header Bar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 md:px-8 flex items-center justify-between z-50">
          <div className="flex items-center gap-4">
            {/* Hamburger Toggle */}
            <button 
              className="lg:hidden p-2.5 text-slate-600 bg-slate-50 border border-gray-100 rounded-xl hover:bg-white transition-all shadow-sm"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>

           
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <button className="p-2.5 text-slate-400 hover:text-slate-900 bg-white border border-gray-100 rounded-xl shadow-sm transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-gray-100 mx-1 hidden sm:block"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-xs font-bold text-slate-900 leading-tight">Academic Portal</p>
                <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest">Faculty View</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-200">
                <Zap size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto min-h-full flex flex-col">
            {/* Main Wrapper with Soft Rounded Corners */}
            <div className="bg-white rounded-3xl md:rounded-[2.5rem] border border-gray-100 shadow-sm flex-1 p-5 md:p-10 relative overflow-hidden flex flex-col">
               {/* Decorative background subtle accent */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-50/30 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50/30 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
               
               <div className="relative z-10 flex-1">
                {children || (
                  <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200 mb-6">
                       <LayoutDashboard size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                      Viewing {pathname.split('/').pop()?.replace(/^\w/, c => c.toUpperCase())}
                    </h2>
                    <p className="text-slate-500 max-w-sm font-medium">
                      This panel provides specialized tools for faculty tasks, resources, and communication.
                    </p>
                  </div>
                )}
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;