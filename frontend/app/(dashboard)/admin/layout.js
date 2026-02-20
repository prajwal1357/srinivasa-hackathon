"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bell,
  Upload,
  LogOut,
  ChartLine,
  CheckCircleIcon,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Notify Student", path: "/admin/notifi", icon: Bell },
    { name: "Notice Control", path: "/admin/users", icon: Upload },
    { name: "Analytics", path: "/admin/analytics", icon: ChartLine },
    { name: "Verify Faculty", path: "/admin/approvedfac", icon: CheckCircleIcon },
    { name: "Assign fuckers", path: "/admin/assign-faculty", icon: CheckCircleIcon },
  ];

  return (
    <div className="flex min-h-screen bg-gray-200">

      {/* Sidebar */}
      <aside className="w-72 bg-black text-white flex flex-col shadow-xl">

        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-blue-500">
            Admin Panel
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
                      ? "bg-blue-600 text-white font-semibold shadow-md"
                      : "text-gray-400 hover:bg-gray-800 hover:text-blue-400"
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
            className="
              flex items-center gap-3 w-full px-4 py-3
              bg-blue-600 text-white font-semibold
              rounded-lg
              hover:bg-blue-700
              transition duration-200
            "
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-white">
        <div className="text-black rounded-xl shadow-lg p-6 min-h-[80vh]">
          {children}
        </div>
      </main>
    </div>
  );
}