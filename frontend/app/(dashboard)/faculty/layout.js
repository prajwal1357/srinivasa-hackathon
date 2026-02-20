"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Bell,
  Upload,
  CheckCircle,
  LogOut,
  MessageCircleCode,
  NotebookPen,
  Zap,
  ZapIcon,

} from "lucide-react";

export default function FacultyLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", path: "/faculty/dashboard", icon: LayoutDashboard },
    { name: "Notify Student", path: "/faculty/notifyStu", icon: Bell },
    { name: "Upload Notes", path: "/faculty/uploadNotes", icon: Upload },
    { name: "Verify", path: "/faculty/verify", icon: CheckCircle },
    { name: "Send Message", path: "/faculty/sendmsg", icon: MessageCircleCode },
    { name: "Approve Notes", path: "/faculty/pending-notes", icon: NotebookPen },
    { name: "Create Event", path: "/faculty/createEvent", icon: ZapIcon },
  ];

  const handleLogout = async () => {
    try {
      const res = await fetch("/auth/logout", {
        method: "POST",
      });

      if (res.ok) {
        router.replace("/login");
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FDF6E3] font-mono selection:bg-[#B967FF] selection:text-white"
         style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
      
      {/* Sidebar: Neo-Memphis Style */}
      <aside className="w-72 bg-white border-r-4 border-black flex flex-col sticky top-0 h-screen shadow-[4px_0px_0px_0px_rgba(0,0,0,1)] z-50">
        
        {/* Brand/Header - Using your yellow accent */}
        <div className="p-6 border-b-4 border-black bg-[#01FFFF] text-black">
          <div className="flex items-center gap-3">
            <div className="p-2 border-2 border-black bg-white rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Zap size={20} fill="black" />
            </div>
            <h1 className="text-xl font-black uppercase tracking-tighter leading-none">
              Faculty<br/>Panel
            </h1>
          </div>
          <p className="text-[10px] mt-3 font-bold uppercase opacity-80 tracking-widest bg-white border border-black inline-block px-1">
            Academic Management
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-4 mt-4 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 border-2 border-black rounded-xl transition-all font-black text-sm uppercase
                  ${
                    isActive
                      ? "bg-[#01FFFF] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1 translate-x-[-2px]"
                      : "bg-white text-black hover:bg-[#FF71CE] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
                  }`}
              >
                <Icon size={20} strokeWidth={2.5} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t-4 border-black bg-white">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-black rounded-full bg-[#FF5C5C] text-black font-black uppercase text-xs hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <LogOut size={18} strokeWidth={3} />
            Logout Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto relative">
        <div className="max-w-6xl mx-auto">
          {/* Content Card with Heavy Offset Shadow */}
          <div className="min-h-[85vh] bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-10 relative overflow-hidden">
            
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <svg width="120" height="120" viewBox="0 0 100 100">
                <rect x="10" y="10" width="30" height="30" fill="black" />
                <circle cx="70" cy="30" r="15" fill="black" />
                <polygon points="50,90 20,60 80,60" fill="black" />
              </svg>
            </div>

            {/* Content Injection */}
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}