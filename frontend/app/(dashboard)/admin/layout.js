"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Bell,
  Upload,
  LogOut,
  LineChart,
  CheckCircle,
  UserCheck,
  Users,
  Zap,
  ChevronRight,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";


const AdminLayout = ({ children }) => {


  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);


  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Manage Users", path: "/admin/users", icon: Users },
    { name: "Notify Student", path: "/admin/notifi", icon: Bell },
    { name: "Notice Control", path: "/admin/notice", icon: Upload },
    { name: "Analytics", path: "/admin/analytics", icon: LineChart },
    { name: "Verify Faculty", path: "/admin/approvedfac", icon: CheckCircle },
    { name: "Assign Faculty", path: "/admin/assign-faculty", icon: UserCheck },
  ];

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
      
      {/* ═══════════ SIDEBAR ═══════════ */}
             {isOpen && (
  <div
    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
    onClick={() => setIsOpen(false)}
  />
)}

   <aside
  className={`fixed lg:static z-40 top-0 left-0 h-screen w-72 bg-white border-r border-gray-100 flex flex-col transform transition-transform duration-300
  ${isOpen ? "translate-x-0" : "-translate-x-full"} 
  lg:translate-x-0`}
>
        
 
        {/* Brand Section */}
        <div className="p-8 pb-10">
          <div className="flex items-center gap-3 group cursor-pointer">
            
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                AdminPanel
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-1 block">
                Management
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.path);

            return (
              <Link
  href={item.path}
  key={item.name}
  onClick={() => {
    setIsOpen(false);
  }}
  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group relative ${
    isActive
      ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
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
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 flex items-center justify-between z-10">
         <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden p-2 rounded-xl border border-gray-200"
        >
          ☰
        </button>
          <div className="relative w-64 group hidden md:block">
            
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 text-slate-400 hover:text-slate-900 bg-white border border-gray-100 rounded-xl shadow-sm transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-gray-100 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900 leading-tight">University Dashboard</p>
                <p className="text-[10px] text-green-500 font-bold tracking-widest uppercase">Live View</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                <LayoutDashboard size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {/* Main Wrapper with Soft Rounded Corners */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm min-h-full p-6 md:p-10 relative overflow-hidden">
               {/* Decorative background subtle accent */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/30 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-50/30 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2" />
               
               <div className="relative z-10">
                {children || (
                  <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200 mb-6">
                       <LayoutDashboard size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                      Viewing {pathname.split('/').pop()?.replace(/^\w/, c => c.toUpperCase())}
                    </h2>
                    <p className="text-slate-500 max-w-sm font-medium">
                      This layout is optimized for high-level university management. Your content will populate here based on the selected route.
                    </p>
                  </div>
                )}
               </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
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

        th {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #94A3B8;
          font-weight: 700;
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;