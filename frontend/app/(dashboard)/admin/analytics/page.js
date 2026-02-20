"use client";

import {
  Users,
  TrendingUp,
  UserCheck,
  BookOpen,
  Award,
  AlertTriangle,
  BarChart3,
  Target
} from "lucide-react";

export default function AnalyticsPanel() {
  // 🔹 Dummy Data (Constructivist Context)
  const analytics = {
    studentEngagement: {
      activePercent: 72,
      inactiveCount: 348,
      avgDownloads: 5.4,
    },
    facultyContribution: {
      avgResources: 18,
      avgNotices: 6,
      mostActiveFaculty: "Dr. Ramesh Kumar",
    },
    subjectEngagement: {
      mostAccessed: "Data Structures",
      leastAccessed: "Discrete Mathematics",
    },
  };

  return (
    <div className="space-y-16 font-mono animate-in fade-in duration-700 pb-10">

      {/* 🟦 PAGE HEADER */}
      <div className="relative overflow-hidden bg-[#FF8A5B] border-4 border-black p-10 rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        <div className="absolute top-6 right-10 w-32 h-10 bg-[#FFD600] border-2 border-black -rotate-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-[10px] uppercase z-20">
          Live Metrics
        </div>
        
        <div className="relative z-10">
          <div className="inline-block px-4 py-1 bg-[#1E293B] border-2 border-black rounded-full text-[10px] text-white font-black uppercase tracking-widest mb-6">
            Intelligence Layer
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase leading-tight tracking-tighter">
            Engagement & Activity
          </h1>
          <p className="max-w-xl mt-4 font-bold text-black/70 leading-snug uppercase text-xs">
            Academic intelligence layer for department performance monitoring and resource distribution analysis.
          </p>
        </div>
      </div>

      {/* ================= STUDENT ENGAGEMENT ================= */}
      <section className="space-y-6">
        <div className="inline-block bg-[#1E293B] text-white px-6 py-2 border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(255,138,91,1)]">
          <h3 className="text-xl font-black uppercase italic tracking-tighter flex items-center gap-3">
            <Users size={24} strokeWidth={3} />
            Student Engagement
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8 bg-[#CCFBF1] border-4 border-black p-8 rounded-[2rem] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px', backgroundAlpha: '0.05' }}>
          
          <Card
            icon={Users}
            title="Active (7 Days)"
            value={`${analytics.studentEngagement.activePercent}%`}
            color="bg-white"
          />

          <Card
            icon={AlertTriangle}
            title="Inactive Count"
            value={analytics.studentEngagement.inactiveCount}
            color="bg-[#FDA4AF]" // Pink sticker
          />

          <Card
            icon={TrendingUp}
            title="Avg Downloads"
            value={analytics.studentEngagement.avgDownloads}
            color="bg-white"
          />
        </div>
      </section>

      {/* ================= FACULTY CONTRIBUTION ================= */}
      <section className="space-y-6">
        <div className="inline-block bg-[#1E293B] text-white px-6 py-2 border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(255,138,91,1)]">
          <h3 className="text-xl font-black uppercase italic tracking-tighter flex items-center gap-3">
            <UserCheck size={24} strokeWidth={3} />
            Faculty Contribution
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8 bg-[#DBEAFE] border-4 border-black p-8 rounded-[2rem] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>

          <Card
            icon={BookOpen}
            title="Resources / Faculty"
            value={analytics.facultyContribution.avgResources}
            color="bg-white"
          />

          <Card
            icon={BarChart3}
            title="Notices / Faculty"
            value={analytics.facultyContribution.avgNotices}
            color="bg-[#C4B5FD]" // Purple sticker
          />

          <Card
            icon={Award}
            title="Leading Faculty"
            value={analytics.facultyContribution.mostActiveFaculty}
            color="bg-[#FFD600]" // Yellow sticker
            fullWidth
          />
        </div>
      </section>

      {/* ================= SUBJECT ENGAGEMENT ================= */}
      <section className="space-y-6">
        <div className="inline-block bg-[#1E293B] text-white px-6 py-2 border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(255,138,91,1)]">
          <h3 className="text-xl font-black uppercase italic tracking-tighter flex items-center gap-3">
            <Target size={24} strokeWidth={3} />
            Subject Engagement
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8 bg-[#FEF9C3] border-4 border-black p-8 rounded-[2rem] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">

          <Card
            icon={TrendingUp}
            title="Most Accessed"
            value={analytics.subjectEngagement.mostAccessed}
            color="bg-white"
          />

          <Card
            icon={AlertTriangle}
            title="Least Accessed"
            value={analytics.subjectEngagement.leastAccessed}
            color="bg-white"
          />
        </div>
      </section>
    </div>
  );
}

/* 🔹 Reusable Neo-Brutalist Card Component */
function Card({ icon: Icon, title, value, color, fullWidth }) {
  return (
    <div className={`
        ${color} p-6 border-4 border-black rounded-2xl
        shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
        hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200
        flex flex-col justify-between min-h-[160px]
      `}>
      <div className="flex justify-between items-start">
        <div className="bg-black p-2 border-2 border-white rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
          <Icon size={20} className="text-white" strokeWidth={3} />
        </div>
        <div className="w-2 h-2 rounded-full bg-black/20" />
      </div>

      <div className="mt-4">
        <p className="text-black font-black uppercase text-[10px] tracking-widest opacity-60 mb-1 leading-none">
          {title}
        </p>
        <h4 className={`font-black tracking-tighter leading-tight text-black
          ${value.length > 15 ? 'text-lg md:text-xl' : 'text-3xl md:text-4xl'}
        `}>
          {value}
        </h4>
      </div>
    </div>
  );
}