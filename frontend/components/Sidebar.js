"use client";
import React, { useState } from "react";
import { 
  LayoutDashboard, Upload, List, LogOut, Moon, Sun, 
  GraduationCap, Menu, X, 
  Fullscreen
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
    { name: "Upload notes", path: "/student/uploadNotes", icon: Upload },
    { name: "View notes", path: "/student/viewNotes", icon: List },
    { name: "Events", path: "/student/events", icon: Fullscreen},
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

  const NavContent = () => (
    <>
      {/* Header: Sunset Orange */}
      <div className="p-8 border-b-4 border-black bg-[#FB923C] text-black">
        <div className="flex items-center gap-3">
          <div className="p-2 border-4 border-black bg-white rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <GraduationCap size={24} strokeWidth={3} />
          </div>
          <div>
            <h1 className="text-xl font-black uppercase tracking-tighter leading-none">Student</h1>
            <h1 className="text-xl font-black uppercase tracking-tighter leading-none">Portal</h1>
          </div>
        </div>
        <p className="text-[9px] mt-4 font-black uppercase tracking-[0.3em] opacity-60">LMS System</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-4 mt-4 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link key={item.name} href={item.path} onClick={() => setIsOpen(false)}>
              <div className={`flex items-center gap-4 px-5 py-4 border-4 border-black rounded-2xl transition-all font-black uppercase text-xs italic tracking-tighter w-full mb-4
                ${isActive 
                  ? "bg-[#0F172A] text-white shadow-[6px_6px_0px_0px_rgba(251,146,60,1)] -translate-x-1 -translate-y-1" 
                  : "bg-white text-black hover:bg-[#FDE047] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1"
                }`}
              >
                <Icon size={20} strokeWidth={3} />
                {item.name}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-6 border-t-4 border-black space-y-4 bg-white">
        
        <button onClick={handlelogout} className="flex items-center justify-center gap-3 w-full px-5 py-3 border-4 border-black rounded-xl bg-[#0F172A] text-white font-black uppercase text-[10px] shadow-[6px_6px_0px_0px_rgba(251,146,60,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
          <LogOut size={18} strokeWidth={3} />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 p-3 bg-[#FB923C] border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        {isOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
      </button>

      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-72 bg-white border-r-4 border-black flex-col sticky top-0 h-screen shadow-[8px_0px_0px_0px_rgba(0,0,0,1)] z-20">
        <NavContent />
      </aside>

      {/* Sidebar Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <aside className="fixed top-0 left-0 w-72 h-full bg-white border-r-4 border-black flex flex-col shadow-[8px_0px_0px_0px_rgba(0,0,0,1)] animate-in slide-in-from-left duration-300">
            <NavContent />
          </aside>
        </div>
      )}
    </>
  );
}