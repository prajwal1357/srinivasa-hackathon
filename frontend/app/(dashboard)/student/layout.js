"use client";

import Sidebar from "@/components/Sidebar";
import React from "react";



export default function StudentLayout({ children }) {
  return (
    <div 
      className="flex min-h-screen bg-[#F8FAFC] text-slate-800 overflow-hidden" 
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
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

        .layout-mesh-bg {
          background-color: #f8fafc;
          background-image: 
            radial-gradient(at 0% 0%, rgba(249, 115, 22, 0.03) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(99, 102, 241, 0.03) 0px, transparent 50%);
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}} />

      {/* Sidebar Component (Logic preserved) */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative layout-mesh-bg">
        
        {/* Decorative Top Accent (Mobile/Desktop consistent) */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-orange-400 via-indigo-400 to-cyan-400 opacity-20" />

        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 custom-scrollbar pt-20 lg:pt-10">
          <div className="max-w-7xl mx-auto min-h-full flex flex-col">
            
            {/* Main Content Wrapper (Decent professional card) */}
            <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex-1 p-6 md:p-12 relative overflow-hidden flex flex-col animate-fade-in">
              
             

              {/* Background Glass Orbs (Subtle Depth) */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50/30 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50/30 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

              {/* Content Injection */}
              <div className="relative z-10 flex-1">
                {children}
              </div>
            </div>

            {/* Footer space inside main area */}
            <footer className="py-8 text-center">
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">
                Srinivasa University // Academic Management System
              </p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}