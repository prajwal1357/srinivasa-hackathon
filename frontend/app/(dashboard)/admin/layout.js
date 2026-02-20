"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Bell,
  Upload,
  LogOut,
  LineChart,
  CheckCircle,
  UserCheck,
  Zap,
  Moon,
  Sun,
  Plus
} from "lucide-react";
import { useState } from "react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Notify Student", path: "/admin/notifi", icon: Bell },
    { name: "Notice Control", path: "/admin/users", icon: Upload },
    { name: "Analytics", path: "/admin/analytics", icon: LineChart },
    { name: "Verify Faculty", path: "/admin/approvedfac", icon: CheckCircle },
    { name: "Assign Faculty", path: "/admin/assign-faculty", icon: UserCheck },
  ];

  const handleLogout = async () => {
    try {
      const res = await fetch("/auth/logout", { method: "POST" });
      if (res.ok) router.replace("/login");
      else alert("Logout failed");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      {/* Background: Cream/Yellow with dot pattern like the reference */}
      <div className="flex min-h-screen bg-[#FDF6E3] transition-all duration-300 font-mono" 
           style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '24px 24px', backgroundAlpha: '0.1' }}>

        {/* Sidebar: Neo-Memphis Style */}
        <aside className="w-72 bg-white   border-r-4 border-black flex flex-col sticky top-0 h-screen shadow-[4px_0px_0px_0px_rgba(0,0,0,1)]">

          {/* Brand/Header */}
          <div className="p-6 border-b-4 border-black bg-[#FFD600] text-black">
            <div className="flex items-center gap-3">
              <div className="p-2 border-2 border-black bg-white rounded-full">
                <Zap size={20} fill="currentColor" />
              </div>
              <h1 className="text-xl font-black uppercase tracking-tighter">
                Admin Panel
              </h1>
            </div>
            <p className="text-[10px] mt-2 font-bold uppercase opacity-80">
              Srinivasa University
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
                  className={`flex items-center gap-3 px-4 py-3 border-2 border-black rounded-xl transition-all font-bold text-sm
                    ${
                      isActive
                        ? "bg-[#FFD600] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1"
                        : "bg-white dark:bg-gray-800 text-black dark:text-white hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5"
                    }`}
                >
                  <Icon size={18} strokeWidth={2.5} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t-4 border-black space-y-3 bg-white dark:bg-gray-900">
            

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 border-2 border-black rounded-full bg-[#FF5C5C] text-black font-bold hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 transition-all"
            >
              <LogOut size={16} strokeWidth={3} />
              LOGOUT
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto relative">
          
         

          <div className="max-w-6xl mx-auto">
            <div className="min-h-[85vh] bg-white dark:bg-gray-900 border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-10">
              {children}
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}