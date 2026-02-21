"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import {
  GraduationCap,
  BookOpen,
  CalendarDays,
  Bell,
  Users,
  Zap,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

// ─── Animated counter ───
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

  return <span ref={ref}>{count}+</span>;
}

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const features = [
    { icon: BookOpen, title: "Smart Resources", desc: "Upload, share, and access notes and assignments in one place.", color: "bg-[#01FFFF]" },
    { icon: CalendarDays, title: "Event Hub", desc: "Create, discover, and register for campus events effortlessly.", color: "bg-[#FF71CE]" },
    { icon: Bell, title: "Instant Notices", desc: "Real-time notifications from admin and faculty via email.", color: "bg-[#FFD600]" },
    { icon: Users, title: "Role Management", desc: "Seamless admin, faculty, and student access control.", color: "bg-[#05FFA1]" },
  ];

  return (
    <div className="min-h-screen bg-[#FDF6E3] font-mono overflow-x-hidden"
      style={{ backgroundImage: "radial-gradient(#000 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}>

      {/* ═══════════ NAV ═══════════ */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrollY > 50 ? "bg-white/90 backdrop-blur-md border-b-4 border-black shadow-[0_4px_0px_0px_rgba(0,0,0,1)]" : ""}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FFD600] border-3 border-black rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Zap size={20} strokeWidth={3} fill="black" />
            </div>
            <span className="font-black text-lg uppercase tracking-tighter hidden sm:block">Campus Hub</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login"
              className="px-5 py-2 border-3 border-black rounded-xl font-black text-xs uppercase bg-white hover:bg-[#FEF9C3] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
              Log In
            </Link>
            <Link href="/sign-in"
              className="px-5 py-2 border-3 border-black rounded-xl font-black text-xs uppercase bg-[#FFD600] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        {/* Floating shapes — parallax */}
        <div className="absolute top-32 left-[10%] w-16 h-16 bg-[#01FFFF] border-4 border-black rounded-full animate-bounce-slow"
          style={{ transform: `translateY(${scrollY * 0.15}px) rotate(${scrollY * 0.1}deg)` }} />
        <div className="absolute top-52 right-[12%] w-12 h-12 bg-[#FF71CE] border-4 border-black rotate-45"
          style={{ transform: `translateY(${scrollY * 0.1}px) rotate(${45 + scrollY * 0.08}deg)` }} />
        <div className="absolute bottom-40 left-[20%] w-20 h-8 bg-[#FFD600] border-3 border-black"
          style={{ transform: `translateY(${-scrollY * 0.12}px)` }} />
        <div className="absolute bottom-60 right-[18%] w-14 h-14 bg-[#05FFA1] border-4 border-black rounded-full"
          style={{ transform: `translateY(${-scrollY * 0.08}px)` }} />

        <div className="relative z-10 text-center max-w-4xl animate-fade-up">
          <div className="inline-block px-5 py-2 mb-8 bg-[#1E293B] text-white border-3 border-black rounded-full font-black text-[10px] uppercase tracking-[0.3em] shadow-[4px_4px_0px_0px_rgba(255,214,0,1)]">
            <Zap size={12} className="inline mr-2" />
            Srinivasa University Platform
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter mb-6">
            Campus
            <span className="block text-transparent bg-clip-text"
              style={{ WebkitTextStroke: "3px black" }}>
              Event Hub
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-sm md:text-base font-bold text-black/60 leading-relaxed mb-10 uppercase tracking-tight">
            One platform for notes, events, notices & academic collaboration.
            Built for students, faculty, and administrators.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/sign-in"
              className="group flex items-center gap-3 px-8 py-4 bg-[#FFD600] border-4 border-black rounded-2xl font-black text-lg uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              Get Started
              <ArrowRight size={22} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/login"
              className="px-8 py-4 bg-white border-4 border-black rounded-2xl font-black text-lg uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              Log In
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={28} strokeWidth={3} />
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16 animate-fade-up">
          <span className="inline-block px-4 py-1 bg-[#01FFFF] border-3 border-black rounded-lg font-black text-[10px] uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-4">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
            Everything You Need
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i}
                className={`group ${f.color} border-4 border-black rounded-3xl p-7 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-default`}
                style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-14 h-14 bg-white border-3 border-black rounded-xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-5 group-hover:rotate-6 transition-transform">
                  <Icon size={28} strokeWidth={3} />
                </div>
                <h3 className="font-black text-lg uppercase tracking-tight mb-2">{f.title}</h3>
                <p className="text-xs font-bold text-black/60 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-[#1E293B] text-white border-4 border-black rounded-[2.5rem] p-10 md:p-14 shadow-[12px_12px_0px_0px_rgba(255,214,0,1)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Students", value: 500 },
              { label: "Events", value: 50 },
              { label: "Resources", value: 200 },
              { label: "Faculty", value: 30 },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-black tracking-tighter text-[#FFD600]">
                  <Counter target={stat.value} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest mt-2 opacity-60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ROLES ═══════════ */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-[#FF71CE] border-3 border-black rounded-lg font-black text-[10px] uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-4">
            For Everyone
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
            Built For Your Role
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { role: "Student", desc: "Access notes, track assignments, register for events, and stay updated with notices.", color: "bg-[#FF71CE]", icon: GraduationCap },
            { role: "Faculty", desc: "Upload resources, send notices, create events, verify students, and manage your classes.", color: "bg-[#01FFFF]", icon: BookOpen },
            { role: "Admin", desc: "Full dashboard analytics, user management, email broadcasting, and platform oversight.", color: "bg-[#FFD600]", icon: Zap },
          ].map((r, i) => {
            const Icon = r.icon;
            return (
              <div key={i} className={`${r.color} border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all`}>
                <div className="w-12 h-12 bg-white border-3 border-black rounded-xl flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-5">
                  <Icon size={24} strokeWidth={3} />
                </div>
                <h3 className="font-black text-2xl uppercase tracking-tight mb-3">{r.role}</h3>
                <p className="text-xs font-bold text-black/60 leading-relaxed">{r.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="relative bg-[#FF8A5B] border-4 border-black rounded-[2.5rem] p-10 md:p-14 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          <div className="absolute top-4 right-8 w-20 h-6 bg-[#FFD600] border-2 border-black rotate-12 hidden md:block" />
          <div className="absolute -bottom-4 left-12 w-16 h-16 bg-[#01FFFF] border-4 border-black rounded-full hidden md:block" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
              Ready to Start?
            </h2>
            <p className="font-bold text-black/60 text-sm uppercase mb-8 max-w-md mx-auto">
              Join Srinivasa University&apos;s Campus Event Hub today.
            </p>
            <Link href="/sign-in"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#1E293B] text-white border-4 border-black rounded-2xl font-black text-xl uppercase shadow-[8px_8px_0px_0px_rgba(255,214,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              Create Account
              <ArrowRight size={24} strokeWidth={3} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t-4 border-black bg-[#1E293B] text-white">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FFD600] border-2 border-black rounded-full">
              <Zap size={16} strokeWidth={3} className="text-black" fill="black" />
            </div>
            <span className="font-black uppercase text-sm tracking-tight">Campus Event Hub</span>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">
            &copy; 2025 Srinivasa University. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ═══════════ CSS ANIMATIONS ═══════════ */}
      <style jsx global>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fade-up 0.8s ease-out both;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
