import React, { useState, useEffect } from 'react';

// Simple Inline SVG Icon Components
const IconGraduation = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
);
const IconArrowRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
);
const IconZap = ({ fill = "none" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
);
const IconSparkles = ({ fill = "none" }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v1m0 16v1m9-9h-1M4 11H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>
);
const IconShield = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
);
const IconBook = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
);
const IconUsers = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const IconStar = ({ fill = "none" }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
);
const IconLayers = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 2 10 5-10 5L2 7l10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>
);
const IconChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);
const IconActivity = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
);
const IconPlus = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
);
const IconMinus = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
);
const IconTerminal = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 11 2-2-2-2M11 13h4M22 17H2"/></svg>
);

const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-4 border-black mb-4 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex justify-between items-center text-left hover:bg-[#FDE047] transition-colors"
      >
        <span className="font-black uppercase text-xl italic tracking-tight">{title}</span>
        {isOpen ? <IconMinus /> : <IconPlus />}
      </button>
      {isOpen && (
        <div className="p-6 border-t-4 border-black font-bold text-lg leading-relaxed bg-[#FFF7ED]">
          {content}
        </div>
      )}
    </div>
  );
};

const StatBox = ({ label, value, color }) => (
  <div className={`p-8 border-4 border-black rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${color} group hover:-translate-y-1 transition-transform`}>
    <h4 className="text-5xl font-black mb-2 italic tracking-tighter">{value}</h4>
    <p className="font-black uppercase text-sm tracking-widest opacity-80">{label}</p>
  </div>
);

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF7ED] font-mono text-black selection:bg-[#FB923C] selection:text-white overflow-x-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '40px 40px' }} />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 p-4 md:p-8 bg-[#FFF7ED]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 bg-white border-4 border-black p-2 pr-6 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform cursor-pointer group">
            <div className="bg-[#FB923C] p-2 border-2 border-black rounded-lg group-hover:rotate-12 transition-transform">
              <IconGraduation />
            </div>
            <span className="font-black uppercase tracking-tighter text-2xl">Team HackPack</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex gap-8 mr-8 font-black uppercase text-sm italic">
              <a href="#" className="hover:text-[#FB923C] transition-colors">Nodes</a>
              <a href="#" className="hover:text-[#FB923C] transition-colors">Engines</a>
              <a href="#" className="hover:text-[#FB923C] transition-colors">Pricing</a>
            </div>
            <a href="/login" className="hidden sm:block font-black uppercase text-sm border-4 border-transparent px-6 py-2 hover:border-black rounded-xl transition-all">
              Login
            </a>
            <a href="/signup" className="bg-[#FDE047] border-4 border-black px-6 py-3 rounded-xl font-black uppercase text-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              Join Engine
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-32 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#01FFFF] border-4 border-black rounded-xl text-xs font-black uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <IconActivity /> System Operational: {currentTime}
          </div>
          
          <h1 className="text-6xl md:text-[7.5rem] font-black uppercase tracking-tighter leading-[0.8]">
            Lethal <br />
            <span className="text-[#FB923C] italic underline decoration-black decoration-[12px] underline-offset-[12px]">Efficiency.</span>
          </h1>

          <p className="text-xl md:text-3xl font-black leading-tight max-w-lg italic">
            The high-octane Learning Management System built for <span className="bg-[#FDE047] px-2 border-2 border-black">elite performance</span> in academia.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 pt-6">
            <button className="group relative bg-[#0F172A] text-white border-4 border-black px-10 py-6 rounded-3xl font-black uppercase italic text-2xl shadow-[10px_10px_0px_0px_rgba(251,146,60,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-4">
              Ignite Terminal <span className="group-hover:translate-x-3 transition-transform"><IconArrowRight /></span>
            </button>
            <button className="bg-white border-4 border-black px-10 py-6 rounded-3xl font-black uppercase italic text-2xl shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Hero Visuals */}
        <div className="relative h-[600px] hidden lg:block">
          <div className="absolute inset-0 bg-[#0F172A] border-8 border-black rounded-[4rem] shadow-[24px_24px_0px_0px_rgba(251,146,60,1)] overflow-hidden">
             {/* Mock Dashboard UI */}
             <div className="p-6 border-b-4 border-black bg-[#1E293B] flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <div className="w-3 h-3 rounded-full bg-[#10B981]" />
             </div>
             <div className="p-8 space-y-6">
                <div className="flex gap-4">
                  <div className="h-32 w-1/2 border-4 border-[#01FFFF] rounded-2xl bg-[#01FFFF]/10 p-4 flex flex-col justify-end">
                    <span className="text-[#01FFFF] font-black uppercase text-xs">Knowledge Yield</span>
                    <span className="text-white text-3xl font-black italic">+94.2%</span>
                  </div>
                  <div className="h-32 w-1/2 border-4 border-[#FB923C] rounded-2xl bg-[#FB923C]/10 p-4 flex flex-col justify-end">
                    <span className="text-[#FB923C] font-black uppercase text-xs">Latency</span>
                    <span className="text-white text-3xl font-black italic">14ms</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-12 w-full border-2 border-white/20 rounded-xl bg-white/5 flex items-center px-4 gap-4">
                      <div className="w-2 h-2 rounded-full bg-[#FDE047]" />
                      <div className="h-2 w-24 bg-white/20 rounded" />
                      <div className="h-2 flex-grow bg-white/5 rounded" />
                    </div>
                  ))}
                </div>
             </div>
          </div>

          {/* Floating Accents */}
          <div className="absolute -top-10 -right-10 w-48 bg-[#FDE047] border-4 border-black p-4 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-12 z-20 animate-bounce">
             <div className="flex items-center gap-2 mb-2 font-black uppercase text-[10px]">
               <IconZap fill="currentColor" /> Live Feed
             </div>
             <p className="font-black uppercase text-xs">System Node 4 Connected</p>
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <div className="relative border-y-8 border-black bg-white py-8 overflow-hidden flex whitespace-nowrap z-20">
        <div className="flex animate-marquee gap-12 items-center">
          {[1,2,3,4].map(i => (
            <React.Fragment key={i}>
              <span className="text-5xl font-black uppercase tracking-tighter italic">MAXIMUM THROUGHPUT</span>
              <span className="text-[#FB923C]"><IconSparkles fill="currentColor" /></span>
              <span className="text-5xl font-black uppercase tracking-tighter italic">ZERO LATENCY NOTES</span>
              <span className="text-[#01FFFF]"><IconLayers /></span>
              <span className="text-5xl font-black uppercase tracking-tighter italic">FACULTY VERIFIED CORE</span>
              <span className="text-[#FDE047]"><IconStar fill="currentColor" /></span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatBox label="Active Nodes" value="12,842" color="bg-[#01FFFF]" />
        <StatBox label="Daily Files" value="440k+" color="bg-[#FDE047]" />
        <StatBox label="System Uptime" value="99.9%" color="bg-[#FB923C]" />
        <StatBox label="Global Ranking" value="#1" color="bg-[#FF71CE]" />
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-20 space-y-4">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">The Engine <br />Specification</h2>
          <div className="h-6 w-96 bg-[#01FFFF] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: <IconTerminal />, title: "Terminal Sync", text: "Instant synchronization across all devices with sub-second delta updates.", color: "bg-[#FDE047]" },
            { icon: <IconShield />, title: "Ironclad Security", text: "Blockchain-verified credentials and end-to-end encrypted resource sharing.", color: "bg-[#FB923C]" },
            { icon: <span className="font-bold text-xl tracking-tighter">[M]</span>, title: "Brutal Chat", text: "No fluff communication. Direct, peer-to-peer scholarly exchange channels.", color: "bg-[#01FFFF]" },
            { icon: <span className="font-bold text-xl tracking-tighter">|l|</span>, title: "Deep Analytics", text: "Understand your learning velocity with massive data visualizations.", color: "bg-[#FF71CE]" },
            { icon: <span className="font-bold text-xl tracking-tighter">[D]</span>, title: "Event Matrix", text: "A global schedule that adapts to your performance levels in real-time.", color: "bg-white" },
            { icon: <span className="font-bold text-xl tracking-tighter">[V]</span>, title: "Bulk Fetch", text: "One-click export of entire course libraries in standardized data formats.", color: "bg-[#0F172A] text-white" },
          ].map((feat, i) => (
            <div key={i} className={`${feat.color} border-4 border-black p-8 rounded-[2.5rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all group`}>
              <div className="bg-white border-4 border-black p-4 inline-block rounded-2xl mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black">
                {feat.icon}
              </div>
              <h3 className="text-3xl font-black uppercase mb-4 italic tracking-tight">{feat.title}</h3>
              <p className="font-bold text-lg leading-tight opacity-80">{feat.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Role Sections */}
      <section className="bg-black py-32 mt-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-[6rem] font-black uppercase tracking-tighter italic text-white leading-none">Choose Your <br />Deployment</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Student */}
            <div className="bg-white border-8 border-[#01FFFF] p-12 rounded-[4rem] flex flex-col items-center text-center group hover:-rotate-2 transition-transform">
              <div className="w-24 h-24 bg-[#01FFFF] border-4 border-black rounded-3xl flex items-center justify-center mb-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <IconUsers />
              </div>
              <h3 className="text-4xl font-black uppercase mb-6 italic tracking-tighter">Student Node</h3>
              <p className="font-bold text-lg mb-10 text-black/60 italic">"I consume knowledge at the speed of light. I need resources now."</p>
              <ul className="space-y-4 font-black uppercase text-sm mb-12 w-full text-left bg-black/5 p-6 rounded-2xl">
                <li className="flex items-center gap-3"><IconChevronRight /> Unlimited Repository Access</li>
                <li className="flex items-center gap-3"><IconChevronRight /> Performance Tracking</li>
                <li className="flex items-center gap-3"><IconChevronRight /> Peer Discovery</li>
              </ul>
              <button className="mt-auto w-full py-6 bg-black text-white rounded-2xl font-black uppercase italic text-xl hover:bg-[#01FFFF] hover:text-black transition-colors">Initialize</button>
            </div>

            {/* Faculty */}
            <div className="bg-[#FB923C] border-8 border-black p-12 rounded-[4rem] flex flex-col items-center text-center group hover:scale-105 transition-transform z-10">
              <div className="w-24 h-24 bg-white border-4 border-black rounded-3xl flex items-center justify-center mb-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <IconBook />
              </div>
              <h3 className="text-4xl font-black uppercase mb-6 italic tracking-tighter">Faculty Engine</h3>
              <p className="font-bold text-lg mb-10 text-black/80 italic">"I architect the curriculum. I require tools of mass education."</p>
              <ul className="space-y-4 font-black uppercase text-sm mb-12 w-full text-left bg-black/10 p-6 rounded-2xl">
                <li className="flex items-center gap-3"><IconChevronRight /> Curriculum Builder</li>
                <li className="flex items-center gap-3"><IconChevronRight /> Grade Matrix Automation</li>
                <li className="flex items-center gap-3"><IconChevronRight /> Batch Communications</li>
              </ul>
              <button className="mt-auto w-full py-6 bg-white text-black rounded-2xl font-black uppercase italic text-xl hover:bg-black hover:text-white transition-colors border-4 border-black">Authorize</button>
            </div>

            {/* Admin */}
            <div className="bg-white border-8 border-[#FF71CE] p-12 rounded-[4rem] flex flex-col items-center text-center group hover:rotate-2 transition-transform">
              <div className="w-24 h-24 bg-[#FF71CE] border-4 border-black rounded-3xl flex items-center justify-center mb-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-white">
                <IconShield />
              </div>
              <h3 className="text-4xl font-black uppercase mb-6 italic tracking-tighter">Admin Core</h3>
              <p className="font-bold text-lg mb-10 text-black/60 italic">"I oversee the system integrity. I am the architect."</p>
              <ul className="space-y-4 font-black uppercase text-sm mb-12 w-full text-left bg-black/5 p-6 rounded-2xl">
                <li className="flex items-center gap-3"><IconChevronRight /> Global Analytics</li>
                <li className="flex items-center gap-3"><IconChevronRight /> User Node Governance</li>
                <li className="flex items-center gap-3"><IconChevronRight /> System Overrides</li>
              </ul>
              <button className="mt-auto w-full py-6 bg-black text-white rounded-2xl font-black uppercase italic text-xl hover:bg-[#FF71CE] hover:text-black transition-colors">Elevate</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 py-32">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-center mb-20">System Query</h2>
        <AccordionItem 
          title="Is this compatible with legacy universities?" 
          content="Yes. LMS.X features a proprietary Bridge Engine that scrapes and synchronizes data from older, slower Moodle/Blackboard instances automatically." 
        />
        <AccordionItem 
          title="What is Knowledge Velocity?" 
          content="Knowledge Velocity is our internal metric for how quickly info travels from a faculty upload to a student's synthesized notes. We currently average 0.4 seconds." 
        />
        <AccordionItem 
          title="Is the data encrypted?" 
          content="Every packet is wrapped in military-grade AES-256 encryption and distributed across a decentralized network of campus servers to ensure zero downtime." 
        />
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="bg-[#FB923C] border-8 border-black p-12 md:p-32 rounded-[5rem] shadow-[30px_30px_0px_0px_rgba(1,255,255,1)] text-center relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-12">Stop Lagging. <br />Start Learning.</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-8">
              <button className="bg-black text-white border-4 border-black px-16 py-8 rounded-[2.5rem] font-black uppercase italic text-3xl shadow-[10px_10px_0px_0px_rgba(255,255,255,0.4)] hover:translate-y-2 hover:shadow-none transition-all flex items-center justify-center gap-4">
                Boot Engine <IconZap fill="currentColor" />
              </button>
            </div>
          </div>
          {/* Decorative icons */}
          <span className="absolute top-20 left-20 text-white/20 w-48 h-48 -rotate-12"><IconSparkles fill="currentColor" /></span>
          <span className="absolute bottom-10 right-20 text-black/10 w-64 h-64 rotate-12"><IconTerminal /></span>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t-8 border-black p-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
          <div className="col-span-2 space-y-8">
            <div className="flex items-center gap-4">
               <div className="bg-[#FB923C] p-3 border-4 border-black rounded-2xl">
                <IconGraduation />
              </div>
              <span className="font-black uppercase tracking-tighter text-4xl italic">LMS.X</span>
            </div>
            <p className="font-bold text-2xl max-w-sm italic tracking-tight">The world's most aggressive learning management system.</p>
            <div className="flex gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-12 h-12 bg-black rounded-xl hover:bg-[#FB923C] transition-colors cursor-pointer" />
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-black uppercase text-xl italic tracking-widest border-b-4 border-black pb-2 inline-block">Protocols</h4>
            <ul className="space-y-4 font-black uppercase text-sm italic opacity-60">
              <li><a href="#" className="hover:opacity-100">Sync Nodes</a></li>
              <li><a href="#" className="hover:opacity-100">Core API</a></li>
              <li><a href="#" className="hover:opacity-100">Security Layers</a></li>
              <li><a href="#" className="hover:opacity-100">Compliance</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-black uppercase text-xl italic tracking-widest border-b-4 border-black pb-2 inline-block">Terminal</h4>
            <ul className="space-y-4 font-black uppercase text-sm italic opacity-60">
              <li><a href="#" className="hover:opacity-100">Status</a></li>
              <li><a href="#" className="hover:opacity-100">Documentation</a></li>
              <li><a href="#" className="hover:opacity-100">Hardware</a></li>
              <li><a href="#" className="hover:opacity-100">Support</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t-4 border-black flex flex-col md:flex-row justify-between items-center gap-8">
           <p className="font-black uppercase text-sm italic opacity-40">
            Design: Brutal / Performance: Maximum / &copy; 2026
          </p>
          <div className="flex gap-12 font-black uppercase text-[10px] tracking-[0.2em]">
            <a href="#">Privacy_Policy.exe</a>
            <a href="#">Terms_Of_Service.md</a>
            <a href="#">End_User_License.txt</a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(15deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
