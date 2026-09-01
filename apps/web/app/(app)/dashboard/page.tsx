"use client";

import Link from "next/link";
import { attendance, attendanceSummary, employees, leaveBalances, leaves, payslips, salary } from "@/lib/mock-data";
import { useSession } from "@/lib/session";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  const { user } = useSession();
  const isEmployeeView = user?.role === "employee";
  const activeEmployee = employees.find((person) => person.id === user?.id) ?? employees[0];
  const summary = attendanceSummary(activeEmployee.id);
  const latestPayslip = payslips.filter((p) => p.employeeId === activeEmployee.id).at(-1);
  const todayAttendance = attendance.find((entry) => entry.employeeId === activeEmployee.id) ?? attendance[0];
  const recentActivity = attendance.filter((entry) => entry.employeeId === activeEmployee.id).slice(0, 3);
  const pendingLeaves = leaves.filter((entry) => entry.employeeId === activeEmployee.id).length;

  const hrSummary = {
    totalEmployees: employees.length,
    present: attendance.filter((entry) => entry.status === "Present").length,
    onLeave: attendance.filter((entry) => entry.status === "Leave").length + leaves.filter((entry) => entry.status === "Pending").length,
    absenteeism: 12.4,
    attendanceRate: 89.6,
    newJoiners: employees.filter((person) => person.joined.startsWith("2026")).length,
    pendingLeaveRequests: leaves.filter((entry) => entry.status === "Pending").length,
  };

  const cards = isEmployeeView
    ? [
        { label: "Attendance", value: `${summary.percentage.toFixed(1)}%`, detail: `${summary.present} present / ${summary.total} days` },
        { label: "Leave balance", value: `${leaveBalances.casual.remaining} days`, detail: `${leaveBalances.casual.total} total this year` },
        { label: "Working days", value: `${summary.total}`, detail: "This month" },
        { label: "Salary", value: formatCurrency(salary.monthly), detail: "Monthly gross pay" },
      ]
    : [
        { label: "Total employees", value: String(hrSummary.totalEmployees), detail: "Across the company" },
        { label: "Present", value: String(hrSummary.present), detail: "Currently marked present" },
        { label: "On leave", value: String(hrSummary.onLeave), detail: "Active leave requests" },
        { label: "Attendance rate", value: `${hrSummary.attendanceRate}%`, detail: "Team-wide workload" },
      ];

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-[#e7ddd1] bg-[#fdfaf7] p-6 shadow-[0_18px_40px_rgba(31,41,55,0.05)] sm:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-[#7a5447]">{isEmployeeView ? "My Information" : "Workforce Dashboard"}</div>
            <h1 className="mt-3 text-3xl font-semibold text-[#1f2937] sm:text-4xl">
              {isEmployeeView ? `Welcome back, ${activeEmployee.name}` : "Workforce overview"}
            </h1>
            <p className="mt-2 text-sm text-[#4b5563]">
              {isEmployeeView
                ? "Here’s a quick snapshot of your work, pay, and leave status."
                : "Track staffing, time off, and attendance health across the organization."}
            </p>
          </div>
          <div className="rounded-2xl border border-[#d8cab6] bg-[#f8eedc] px-4 py-3 text-sm text-[#4b5563]">
            <div className="font-medium text-[#1f2937]">{isEmployeeView ? "Next pay date" : "Pending leave requests"}</div>
            <div className="mt-1 text-[#7a5447]">
              {isEmployeeView ? salary.nextPayDate : `${hrSummary.pendingLeaveRequests} awaiting review`}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((item) => (
          <div key={item.label} className="rounded-3xl border border-[#e7ddd1] bg-white p-5 shadow-[0_10px_30px_rgba(31,41,55,0.03)]">
            <div className="text-sm text-[#6b7280]">{item.label}</div>
            <div className="mt-3 text-3xl font-semibold text-[#1f2937]">{item.value}</div>
            <div className="mt-2 text-sm text-[#4b5563]">{item.detail}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[28px] border border-[#e7ddd1] bg-white p-6 shadow-[0_10px_30px_rgba(31,41,55,0.03)]">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-[#1f2937]">{isEmployeeView ? "Quick actions" : "Workforce actions"}</h2>
            <Link href="/copilot" className="text-sm font-medium text-[#7a5447] hover:text-[#684837]">
              {isEmployeeView ? "Open AI Copilot" : "Open HR Copilot"}
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {isEmployeeView
              ? [
                  ["/attendance", "Check attendance"],
                  ["/leaves", "Manage leave balance"],
                  ["/payroll", "View payslip"],
                  ["/copilot", "Ask my AI assistant"],
                ]
              : [
                  ["/employees", "Employee directory"],
                  ["/attendance", "Attendance overview"],
                  ["/leaves", "Leave management"],
                  ["/copilot", "Ask workforce copilot"],
                ]
            .map(([href, label]) => (
              <Link
                key={label}
                href={href}
                className="rounded-2xl border border-[#e7ddd1] bg-[#faf7f5] p-4 text-[#374151] transition hover:border-[#7a5447] hover:bg-white hover:text-[#1f2937]"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-[#e7ddd1] bg-white p-6 shadow-[0_10px_30px_rgba(31,41,55,0.03)]">
          <h2 className="text-xl font-semibold text-[#1f2937]">
            {isEmployeeView ? "Today’s status" : "Workforce pulse"}
          </h2>

          {isEmployeeView ? (
            <div className="mt-5 space-y-3 text-sm text-[#4b5563]">
              <div className="flex items-center justify-between rounded-2xl bg-[#f8f4f1] p-3">
                <span>Attendance</span>
                <span className="font-medium text-[#1f2937]">{todayAttendance?.status ?? "Present"}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-[#f8f4f1] p-3">
                <span>Latest payslip</span>
                <span className="font-medium text-[#7a5447]">{latestPayslip ? latestPayslip.period : "N/A"}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-[#f8f4f1] p-3">
                <span>Leave left</span>
                <span className="font-medium text-[#1f2937]">{leaveBalances.casual.remaining} days</span>
              </div>
            </div>
          ) : (
            <div className="mt-5 space-y-3 text-sm text-[#4b5563]">
              <div className="flex items-center justify-between rounded-2xl bg-[#f8f4f1] p-3">
                <span>Absenteeism</span>
                <span className="font-medium text-[#1f2937]">{hrSummary.absenteeism}%</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-[#f8f4f1] p-3">
                <span>New joiners</span>
                <span className="font-medium text-[#1f2937]">{hrSummary.newJoiners}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-[#f8f4f1] p-3">
                <span>Pending requests</span>
                <span className="font-medium text-[#7a5447]">{hrSummary.pendingLeaveRequests}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {isEmployeeView ? (
        <div className="rounded-[28px] border border-[#e7ddd1] bg-white p-6 shadow-[0_10px_30px_rgba(31,41,55,0.03)]">
          <h2 className="text-xl font-semibold text-[#1f2937]">Recent activity</h2>
          <div className="mt-5 space-y-3">
            {recentActivity.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between rounded-2xl bg-[#f8f4f1] p-3 text-sm text-[#4b5563]">
                <div>
                  <div className="font-medium text-[#1f2937]">{entry.date}</div>
                  <div className="text-[#6b7280]">Check-in {entry.checkIn} • Check-out {entry.checkOut}</div>
                </div>
                <span className="rounded-full bg-[#e4efe8] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#466c5d]">
                  {entry.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-[28px] border border-[#e7ddd1] bg-white p-6 shadow-[0_10px_30px_rgba(31,41,55,0.03)]">
          <h2 className="text-xl font-semibold text-[#1f2937]">Workforce notes</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              { label: "High attendance", value: "Engineering" },
              { label: "Lowest coverage", value: "Operations" },
              { label: "Flagged", value: "3 employees" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-[#f8f4f1] p-4">
                <div className="text-sm text-[#6b7280]">{item.label}</div>
                <div className="mt-2 text-xl font-semibold text-[#1f2937]">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
