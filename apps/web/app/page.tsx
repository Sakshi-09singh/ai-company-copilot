"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { demoUsers } from "@/lib/mock-data";
import { useSession } from "@/lib/session";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useSession();

  const handleDemoLogin = (email: string) => {
    const success = login(email);
    if (success) router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f1ea] px-6 py-10 text-[#1f2937]">
      <div className="w-full max-w-6xl overflow-hidden rounded-[28px] border border-[#e7ddd1] bg-[#fffdfb] shadow-[0_24px_80px_rgba(31,41,55,0.08)]">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border-b border-[#e7ddd1] bg-[#f9f5f1] p-8 lg:border-b-0 lg:border-r lg:p-12">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#d8cab6] bg-[#f3e4dc] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-[#7a5447]">
              AI Company Copilot
            </div>

            <h1 className="max-w-md text-4xl font-semibold tracking-tight text-[#1f2937] sm:text-5xl">
              Smarter operations for your people, payroll, and finance teams.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#4b5563]">
              A frontend-only employee workspace for attendance, leaves, payroll, and business insights with AI-assisted summaries.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["98.2%", "Attendance accuracy"],
                ["16k+", "Employee insights"],
                ["24/7", "AI support"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-[#e7ddd1] bg-white p-4 shadow-[0_8px_20px_rgba(31,41,55,0.03)]">
                  <div className="text-2xl font-bold text-[#1f2937]">{value}</div>
                  <div className="mt-1 text-sm text-[#4b5563]">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 lg:p-12">
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#6b7280]">Login</p>
              <h2 className="mt-2 text-3xl font-semibold text-[#1f2937]">Welcome back</h2>
            </div>

            <div className="space-y-3">
              {demoUsers.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleDemoLogin(user.email)}
                  className="flex w-full items-center justify-between rounded-2xl border border-[#e7ddd1] bg-[#fffaf6] p-4 text-left shadow-[0_8px_16px_rgba(31,41,55,0.02)] hover:border-[#7a5447] hover:bg-white"
                >
                  <div>
                    <div className="font-medium text-[#1f2937]">{user.name}</div>
                    <div className="text-sm text-[#6b7280]">{user.title}</div>
                  </div>
                  <div className="rounded-full border border-[#d8cab6] bg-[#f8eedc] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[#7a5447]">
                    {user.role}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 text-center text-sm text-[#6b7280]">
              Demo account access is enabled for all role profiles. Use any listed user to continue.
            </div>

            <div className="mt-8 border-t border-[#e7ddd1] pt-6 text-sm text-[#4b5563]">
              <Link href="/dashboard" className="font-medium text-[#7a5447] hover:text-[#684837]">
                Continue to dashboard without login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
