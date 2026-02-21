"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const inputCls = "h-11 rounded-lg border-gray-200 focus:ring-2 focus:ring-primary/20";

export default function LoginPage() {
  const [activeRole, setActiveRole] = useState("student");

  const roleStyles: any = {
    student: { color: "bg-amber-600", label: "Student" },
    faculty: { color: "bg-teal-600", label: "Faculty" },
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Sign in to your departmental account</p>
        </div>

        <Card className="shadow-xl border-none ring-1 ring-slate-200 bg-white">
          {/* Role Tabs */}
          <div className="flex p-1 bg-slate-100/50 border-b">
            {Object.keys(roleStyles).map((role) => (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-all ${
                  activeRole === role
                    ? "bg-white shadow-sm text-slate-900"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {roleStyles[role].label}
              </button>
            ))}
          </div>

          <CardHeader>
            <CardTitle className="text-xl">
              {roleStyles[activeRole].label} Login
            </CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@college.edu" 
                  className={inputCls} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="pass">Password</Label>
                  <button type="button" className="text-xs text-slate-500 hover:text-slate-900 hover:underline">
                    Forgot password?
                  </button>
                </div>
                <Input 
                  id="pass" 
                  type="password" 
                  placeholder="••••••••" 
                  className={inputCls} 
                  required 
                />
              </div>

              <div className="pt-2">
                <Button 
                  type="submit"
                  className={`w-full h-12 text-lg font-semibold text-white transition-all ${roleStyles[activeRole].color}`}
                >
                  Sign In
                </Button>
              </div>
            </form>

            <div className="text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="font-semibold text-slate-900 hover:underline">
                Create account
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Optional: Footer helper text */}
        <p className="text-center text-xs text-slate-400 mt-8">
          Authorized Access Only • Department of Engineering
        </p>
      </div>
    </div>
  );
}