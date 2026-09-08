import Link from "next/link";
import { employees } from "@/lib/mock-data";

export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-[#e7ddd1] bg-[#fdfaf7] p-6 shadow-[0_18px_40px_rgba(31,41,55,0.05)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-[#7a5447]">Employees</div>
            <h1 className="mt-2 text-3xl font-semibold text-[#1f2937]">Team directory</h1>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Search employee"
              className="rounded-xl border border-[#d8cab6] bg-white px-3 py-2.5 text-sm text-[#1f2937] placeholder:text-[#6b7280] focus:border-[#7a5447] focus:outline-none"
            />
            <select className="rounded-xl border border-[#d8cab6] bg-white px-3 py-2.5 text-sm text-[#1f2937] focus:border-[#7a5447] focus:outline-none">
              <option>All departments</option>
              <option>Engineering</option>
              <option>Sales</option>
              <option>Finance</option>
              <option>People</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {employees.map((employee) => (
          <Link
            key={employee.id}
            href={`/employees/${employee.id}`}
            className="rounded-[28px] border border-[#e7ddd1] bg-white p-5 shadow-[0_10px_30px_rgba(31,41,55,0.03)] transition hover:-translate-y-0.5 hover:border-[#7a5447] hover:shadow-[0_14px_35px_rgba(122,84,71,0.08)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f3e4dc] text-sm font-semibold text-[#7a5447]">
                  {employee.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div className="mt-4 text-xl font-semibold text-[#1f2937]">{employee.name}</div>
                <div className="text-sm text-[#6b7280]">{employee.designation}</div>
              </div>
              <span className="rounded-full border border-[#cfe1d7] bg-[#e4efe8] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#466c5d]">
                {employee.status}
              </span>
            </div>

            <div className="mt-6 grid gap-3 text-sm text-[#4b5563] sm:grid-cols-2">
              <div className="rounded-2xl bg-[#f8f4f1] p-3">
                <div className="text-[#6b7280]">Department</div>
                <div className="mt-1 font-medium text-[#1f2937]">{employee.department}</div>
              </div>
              <div className="rounded-2xl bg-[#f8f4f1] p-3">
                <div className="text-[#6b7280]">Manager</div>
                <div className="mt-1 font-medium text-[#1f2937]">{employee.manager}</div>
              </div>
              <div className="rounded-2xl bg-[#f8f4f1] p-3">
                <div className="text-[#6b7280]">Location</div>
                <div className="mt-1 font-medium text-[#1f2937]">{employee.location}</div>
              </div>
              <div className="rounded-2xl bg-[#f8f4f1] p-3">
                <div className="text-[#6b7280]">Joined</div>
                <div className="mt-1 font-medium text-[#1f2937]">{employee.joined}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
