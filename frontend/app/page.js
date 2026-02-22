"use client";

import React, { useEffect, useState, useRef } from 'react';
import {
  GraduationCap,
  BookOpen,
  CalendarDays,
  Bell,
  Users,
  Zap,
  ArrowRight,
  ChevronDown,
  Plus
} from "lucide-react";
import Link from "next/link";

function Counter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const start = performance.now();
          const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}+</span>;
}

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const features = [
    { icon: BookOpen, title: "Smart Resources", desc: "Upload, share, and access notes and assignments in one place.", color: "bg-[#E7F7EF]", text: "text-[#2D6A4F]" },
    { icon: CalendarDays, title: "Event Hub", desc: "Create, discover, and register for campus events effortlessly.", color: "bg-[#EEF2FF]", text: "text-[#4338CA]" },
    { icon: Bell, title: "Instant Notices", desc: "Real-time notifications from admin and faculty via email.", color: "bg-[#FFFBEB]", text: "text-[#92400E]" },
    { icon: Users, title: "Role Management", desc: "Seamless admin, faculty, and student access control.", color: "bg-[#F3F4F6]", text: "text-[#374151]" },
  ];

  return (
    <div className="min-h-screen bg-[#F3F5F7] text-slate-800 selection:bg-indigo-100 selection:text-indigo-700" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      {/* ═══════════ NAV ═══════════ */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrollY > 20 ? "py-3 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm" : "py-6 bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <span className="font-bold text-xl tracking-tight text-slate-900">Campus Hub</span>
          </div>

          <div className="flex items-center gap-3">
            <a href="#login" className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
              Log In
            </a>
            <a href="#signup" className="px-6 py-2.5 bg-slate-900 text-white rounded-2xl text-sm font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all hover:-translate-y-0.5">
              Sign Up
            </a>
          </div>
        </div>
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        {/* Soft Animated Blobs */}
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-green-200/40 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-indigo-200/40 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 text-center max-w-4xl flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 bg-white border border-gray-100 shadow-sm rounded-full animate-fade-in-down">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-ping"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">Srinivasa University Platform</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-slate-900 leading-[1.05] tracking-[-0.03em] mb-8">
            Campus <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-green-500">
              Event Hub.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl font-medium text-slate-500 leading-relaxed mb-12 tracking-tight">
            One unified dashboard for notes, events, notices, and academic growth. 
            Designed for the modern student and faculty experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 ">

            <Link href="/sign-in" className='group flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-3xl font-bold text-lg shadow-2xl shadow-slate-300 hover:bg-slate-800 transition-all hover:-translate-y-1'>
                Get Started
               <ArrowRight size={22} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
            </Link>
             <Link href="/login" className='group flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-3xl font-bold text-lg shadow-2xl shadow-slate-300 transition-all hover:-translate-y-1'>
                Login
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-300 animate-bounce">
          <span className="text-[10px] font-bold uppercase tracking-widest">Scroll</span>
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight leading-tight">Everything you need in one place</h2>
            <p className="text-slate-500 font-medium text-lg tracking-tight">Simplified tools to help you stay organized and ahead of your schedule.</p>
          </div>
          <button className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm text-slate-400 hover:text-slate-900 transition-colors">
             <Plus size={24} />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="group bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 hover:shadow-xl hover:shadow-slate-200/50 transition-all hover:-translate-y-2">
                <div className={`${f.color} ${f.text} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon size={28} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-3 tracking-tight">{f.title}</h3>
                <p className="text-[15px] font-medium text-slate-500 leading-relaxed tracking-tight">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <section id="stats" className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 shadow-2xl shadow-slate-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 blur-3xl rounded-full" />
          
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Active Students", value: 12500, color: "text-green-400" },
              { label: "Events Monthly", value: 85, color: "text-indigo-400" },
              { label: "Study Resources", value: 3400, color: "text-amber-400" },
              { label: "Expert Faculty", value: 450, color: "text-rose-400" },
            ].map((stat, i) => (
              <div key={i}>
                <div className={`text-4xl md:text-6xl font-extrabold tracking-tighter mb-3 ${stat.color}`}>
                  <Counter target={stat.value} />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 opacity-80">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ROLES ═══════════ */}
      <section id="roles" className="max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Tailored for your role</h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto italic text-lg tracking-tight">A specialized experience whether you&apos;re learning, teaching, or leading.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { role: "Student", desc: "Access notes, track assignments, register for events, and stay updated with notices.", color: "bg-[#EEF2FF]", text: "text-[#4338CA]", icon: GraduationCap },
            { role: "Faculty", desc: "Upload resources, send notices, create events, verify students, and manage your classes.", color: "bg-[#E7F7EF]", text: "text-[#2D6A4F]", icon: BookOpen },
            { role: "Admin", desc: "Full dashboard analytics, user management, email broadcasting, and platform oversight.", color: "bg-slate-900 text-white", text: "text-white", icon: Zap },
          ].map((r, i) => {
            const Icon = r.icon;
            const isDark = r.role === 'Admin';
            return (
              <div key={i} className={`${r.color} rounded-[2.5rem] p-10 flex flex-col min-h-[340px] shadow-sm border border-gray-50 hover:shadow-xl transition-all`}>
                <div className={`${isDark ? 'bg-slate-800' : 'bg-white'} w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-sm`}>
                  <Icon size={28} className={isDark ? 'text-indigo-400' : r.text} />
                </div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight">{r.role}</h3>
                <p className={`text-[16px] font-medium leading-relaxed opacity-80 tracking-tight ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {r.desc}
                </p>
                <div className="mt-auto pt-8">
                  <button className={`flex items-center gap-2 font-bold text-sm uppercase tracking-widest ${isDark ? 'text-indigo-400' : r.text}`}>
                    Learn More <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="bg-white rounded-[3rem] p-12 md:p-20 text-center shadow-2xl shadow-slate-200 border border-gray-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500 via-green-500 to-rose-500" />
          
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
            Elevate your campus <br /> experience today.
          </h2>
          <p className="font-medium text-slate-500 text-lg mb-12 max-w-lg mx-auto tracking-tight">
            Join thousands of students and faculty at Srinivasa University&apos;s most advanced digital hub.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#signup" className="px-10 py-5 bg-slate-900 text-white rounded-3xl font-bold text-xl shadow-xl shadow-slate-300 hover:scale-105 transition-all tracking-tight">
              Create Free Account
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-white border-t border-gray-100 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
            &copy; 2025 Srinivasa University
          </p>
          </div>
          
         
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 1s ease-out forwards;
        }
        
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        html {
          scroll-behavior: smooth;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #F3F5F7;
        }
        ::-webkit-scrollbar-thumb {
          background: #CBD5E1;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #94A3B8;
        }
      `}</style>
    </div>
  );
}