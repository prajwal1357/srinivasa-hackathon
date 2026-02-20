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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const DEPARTMENTS = [
  "Computer Science & Engineering",
  "Electronics & Communication",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Information Science",
  "Artificial Intelligence & ML",
  "Data Science",
];

const SEMESTERS = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

const DESIGNATIONS = [
  "Assistant Professor",
  "Associate Professor",
  "Professor",
  "Senior Professor",
  "Visiting Faculty",
];

const inputCls = "h-11 rounded-lg border-gray-200 focus:ring-2 focus:ring-primary/20";



function StudentFields() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="stu-name">Full Name</Label>
          <Input id="stu-name" placeholder="Jane Smith" className={inputCls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stu-usn">USN / Roll Number</Label>
          <Input id="stu-usn" placeholder="1SI22CS045" className={inputCls} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="stu-dept">Department</Label>
          <Select>
            <SelectTrigger className={inputCls}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="stu-sem">Semester</Label>
          <Select>
            <SelectTrigger className={inputCls}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {SEMESTERS.map((s) => <SelectItem key={s} value={s}>{s} Sem</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

function FacultyFields() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fac-name">Full Name</Label>
          <Input id="fac-name" placeholder="Prof. Alex Kumar" className={inputCls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fac-id">Employee ID</Label>
          <Input id="fac-id" placeholder="FAC-101" className={inputCls} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fac-dept">Department</Label>
          <Select>
            <SelectTrigger className={inputCls}>
              <SelectValue placeholder="Select Dept" />
            </SelectTrigger>
            <SelectContent>
              {DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="fac-desig">Designation</Label>
          <Select>
            <SelectTrigger className={inputCls}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {DESIGNATIONS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────── Main Component ──────────────────── */

export default function Home() {
  const [activeRole, setActiveRole] = useState("student");

  const roleStyles  = {
    student: { color: "bg-amber-600", label: "Student" },
    faculty: { color: "bg-teal-600", label: "Faculty" },
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Create Account</h1>
          <p className="text-slate-500 mt-2">Departmental Resource Hub Registration</p>
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
              {roleStyles[activeRole].label} Details
            </CardTitle>
            <CardDescription>
              Fill in your official information to register.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form className="space-y-6">
              {activeRole === "student" ? <StudentFields /> : <FacultyFields />}

              {/* Shared Contact/Security Fields */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="name@college.edu" className={inputCls} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="pass">Password</Label>
                    <Input id="pass" type="password" placeholder="••••••••" className={inputCls} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpass">Confirm Password</Label>
                    <Input id="cpass" type="password" placeholder="••••••••" className={inputCls} />
                  </div>
                </div>
              </div>

              <Button 
                className={`w-full h-12 text-lg font-semibold text-white transition-all ${roleStyles[activeRole].color}`}
              >
                Complete Registration
              </Button>
            </form>

            <div className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link href="/sign-in" className="font-semibold text-slate-900 hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}