import { attendance, attendanceSummary } from "@/lib/mock-data";

const summary = attendanceSummary();

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-[#e7ddd1] bg-[#fdfaf7] p-6 shadow-[0_18px_40px_rgba(31,41,55,0.05)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-[#7a5447]">Attendance</div>
            <h1 className="mt-2 text-3xl font-semibold text-[#1f2937]">Monthly attendance overview</h1>
          </div>
          <div className="rounded-2xl border border-[#d8cab6] bg-[#f8eedc] px-3 py-2 text-sm font-medium text-[#7a5447]">
            Attendance rate: {summary.percentage.toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Present", value: summary.present, tone: "emerald" },
          { label: "Absent", value: summary.absent, tone: "rose" },
          { label: "Leave", value: summary.leave, tone: "amber" },
          { label: "Late", value: summary.late, tone: "cyan" },
        ].map((item) => (
          <div key={item.label} className="rounded-[24px] border border-[#e7ddd1] bg-white p-5 shadow-[0_10px_30px_rgba(31,41,55,0.03)]">
            <div className="text-sm text-[#6b7280]">{item.label}</div>
            <div className="mt-3 text-3xl font-semibold text-[#1f2937]">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-[#e7ddd1] bg-white p-6 shadow-[0_10px_30px_rgba(31,41,55,0.03)]">
          <h2 className="text-xl font-semibold text-[#1f2937]">Attendance calendar</h2>
          <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs text-[#6b7280]">
            {Array.from({ length: 14 }).map((_, index) => {
              const status = ["Present", "Present", "Late", "Leave", "Present", "Absent", "Present", "Present", "Late", "Present", "Leave", "Present", "Present", "Present"][index];
              const tone = {
                Present: "bg-[#e4efe8] text-[#466c5d] border border-[#cfe1d7]",
                Late: "bg-[#f3e4dc] text-[#7a5447] border border-[#d8cab6]",
                Leave: "bg-[#f8eedc] text-[#b98746] border border-[#ead5a8]",
                Absent: "bg-[#f9e7e7] text-[#9a4d4d] border border-[#e7b9b9]",
              }[status];

              return (
                <div key={index} className={`rounded-xl p-3 ${tone}`}>
                  {index + 1}
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[28px] border border-[#e7ddd1] bg-white p-6 shadow-[0_10px_30px_rgba(31,41,55,0.03)]">
          <h2 className="text-xl font-semibold text-[#1f2937]">Recent entries</h2>
          <div className="mt-5 space-y-3">
            {attendance.slice(0, 5).map((entry) => (
              <div key={entry.id} className="rounded-2xl bg-[#f8f4f1] p-3 text-sm text-[#4b5563]">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium text-[#1f2937]">{entry.employeeName}</span>
                  <span className="text-[#7a5447]">{entry.status}</span>
                </div>
                <div className="mt-2">{entry.date}</div>
                <div className="mt-1">Check-in: {entry.checkIn} • Check-out: {entry.checkOut}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
