"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { canAccess, roleLabels, visibleNav } from "@/lib/access";
import { useSession } from "@/lib/session";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useSession();
  const role = user?.role ?? "employee";
  const navItems = visibleNav(role);
  const isEmployeeView = role === "employee";

  useEffect(() => {
    if (!user) return;
    const allowed = canAccess(role, pathname);
    if (!allowed) {
      router.replace("/dashboard");
    }
  }, [pathname, role, router, user]);

  if (!user) return null;

  if (!canAccess(role, pathname)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f1ea] p-6">
        <div className="rounded-[28px] border border-[#e7ddd1] bg-white p-8 text-center shadow-[0_18px_40px_rgba(31,41,55,0.05)]">
          <div className="text-sm uppercase tracking-[0.2em] text-[#7a5447]">Access denied</div>
          <h1 className="mt-3 text-2xl font-semibold text-[#1f2937]">This section is not available for your role.</h1>
          <Link href="/dashboard" className="mt-5 inline-flex rounded-xl bg-[#7a5447] px-4 py-2 text-sm font-medium text-white hover:bg-[#684837]">
            Return to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f1ea] text-[#1f2937]">
      <div className="mx-auto flex max-w-[1600px]">
        <aside className="hidden min-h-screen w-72 border-r border-[#e7ddd1] bg-[#f9f5f1] p-6 lg:block">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7a5447] text-lg font-bold text-white shadow-sm">
              {isEmployeeView ? "ME" : "HR"}
            </div>
            <div>
              <div className="text-sm font-semibold text-[#1f2937]">{isEmployeeView ? "My Information" : "Workforce Management"}</div>
              <div className="text-xs text-[#6b7280]">{isEmployeeView ? "Personal workspace" : "Organization overview"}</div>
            </div>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition",
                    active
                      ? "bg-[#7a5447] text-white shadow-sm"
                      : "text-[#4b5563] hover:bg-[#f0e9e4] hover:text-[#1f2937]",
                  ].join(" ")}
                >
                  <span>{item.label}</span>
                  {active ? <span className="h-2 w-2 rounded-full bg-[#f8eedc]" /> : null}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 rounded-2xl border border-[#e7ddd1] bg-white p-4 shadow-[0_10px_25px_rgba(31,41,55,0.04)]">
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#6b7280]">Role</div>
            <div className="mt-2 text-lg font-semibold text-[#1f2937]">{user?.title ?? "Employee"}</div>
            <div className="text-sm text-[#4b5563]">{roleLabels[role] ?? "Employee"}</div>
            <div className="mt-1 text-sm text-[#6b7280]">{user?.department ?? "Engineering"}</div>
          </div>
        </aside>

        <main className="flex-1">
          <header className="sticky top-0 z-20 border-b border-[#e7ddd1] bg-[#f9f5f1]/90 backdrop-blur-sm">
            <div className="flex items-center justify-between px-5 py-4 sm:px-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-[#6b7280]">{isEmployeeView ? "My Information" : "Workforce Management"}</div>
                <div className="text-lg font-semibold text-[#1f2937]">{user?.name ?? "Demo Employee"}</div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="rounded-xl border border-[#d8cab6] bg-white px-3 py-2 text-sm font-medium text-[#374151] hover:border-[#7a5447] hover:text-[#1f2937]"
                >
                  Switch user
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-xl bg-[#7a5447] px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#684837]"
                >
                  Logout
                </button>
              </div>
            </div>
          </header>

          <div className="p-5 sm:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
