import { notFound } from "next/navigation";
import { employees, attendanceSummary } from "@/lib/mock-data";

export default function EmployeeDetailsPage({ params }: { params: { id: string } }) {
  const employee = employees.find((item) => item.id === params.id);

  if (!employee) {
    notFound();
  }

  const summary = attendanceSummary(employee.id);

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-[#e7ddd1] bg-[#fdfaf7] p-6 shadow-[0_18px_40px_rgba(31,41,55,0.05)]">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-[#7a5447]">Employee details</div>
            <h1 className="mt-2 text-3xl font-semibold text-[#1f2937]">{employee.name}</h1>
            <div className="mt-2 text-[#4b5563]">{employee.designation} • {employee.department}</div>
          </div>
          <span className="rounded-full border border-[#cfe1d7] bg-[#e4efe8] px-3 py-1 text-sm font-medium text-[#466c5d]">
            {employee.status}
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Email", value: employee.email },
          { label: "Manager", value: employee.manager },
          { label: "Location", value: employee.location },
          { label: "Joined", value: employee.joined },
        ].map((item) => (
          <div key={item.label} className="rounded-[24px] border border-[#e7ddd1] bg-white p-5 shadow-[0_10px_30px_rgba(31,41,55,0.03)]">
            <div className="text-sm text-[#6b7280]">{item.label}</div>
            <div className="mt-3 text-lg font-semibold text-[#1f2937]">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-[#e7ddd1] bg-white p-6 shadow-[0_10px_30px_rgba(31,41,55,0.03)]">
          <h2 className="text-xl font-semibold text-[#1f2937]">Attendance summary</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Present", value: summary.present },
              { label: "Late", value: summary.late },
              { label: "Leave", value: summary.leave },
              { label: "Attendance", value: `${summary.percentage.toFixed(1)}%` },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-[#f8f4f1] p-4">
                <div className="text-sm text-[#6b7280]">{item.label}</div>
                <div className="mt-2 text-2xl font-semibold text-[#1f2937]">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-[#e7ddd1] bg-white p-6 shadow-[0_10px_30px_rgba(31,41,55,0.03)]">
          <h2 className="text-xl font-semibold text-[#1f2937]">Quick overview</h2>
          <div className="mt-5 space-y-3 text-sm text-[#4b5563]">
            <div className="flex items-center justify-between rounded-2xl bg-[#f8f4f1] p-3">
              <span>Role</span>
              <span className="font-medium text-[#1f2937]">{employee.designation}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-[#f8f4f1] p-3">
              <span>Department</span>
              <span className="font-medium text-[#1f2937]">{employee.department}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-[#f8f4f1] p-3">
              <span>Status</span>
              <span className="font-medium text-[#466c5d]">{employee.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
