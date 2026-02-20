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
  ];

  const handleLogout = async () => {
    try {
      const res = await fetch("/auth/logout", {
        method: "POST",
      });

      if (res.ok) {
        router.replace("/login"); // Prevents going back
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-72 bg-black text-white flex flex-col">

        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-green-400">
            Faculty Panel
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Academic Management
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-green-500 text-black font-semibold"
                      : "text-gray-300 hover:bg-gray-800 hover:text-green-400"
                  }
                `}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-gray-800">
          <button
          onClick={handleLogout}
            className="
              flex items-center gap-3 w-full px-4 py-3
              bg-green-500 text-black font-semibold
              rounded-lg
              hover:bg-green-600
              transition
            "
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="bg-white rounded-xl shadow-md p-6 min-h-[80vh]">
          {children}
        </div>
      </main>
    </div>
  );
}