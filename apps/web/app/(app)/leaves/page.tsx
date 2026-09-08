import { leaveBalances, leaves } from "@/lib/mock-data";

export default function LeavesPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-[#e7ddd1] bg-[#fdfaf7] p-6 shadow-[0_18px_40px_rgba(31,41,55,0.05)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-[#7a5447]">Leaves</div>
            <h1 className="mt-2 text-3xl font-semibold text-[#1f2937]">Leave balance and requests</h1>
          </div>
          <button type="button" className="rounded-xl bg-[#7a5447] px-4 py-2.5 font-medium text-white shadow-sm hover:bg-[#684837]">
            Apply for leave
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {Object.entries(leaveBalances).map(([key, balance]) => (
          <div key={key} className="rounded-[24px] border border-[#e7ddd1] bg-white p-5 shadow-[0_10px_30px_rgba(31,41,55,0.03)]">
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#6b7280]">{key}</div>
            <div className="mt-3 text-3xl font-semibold text-[#1f2937]">{balance.remaining}</div>
            <div className="mt-1 text-sm text-[#4b5563]">{balance.total} total days</div>
          </div>
        ))}
      </div>

      <div className="rounded-[28px] border border-[#e7ddd1] bg-white p-6 shadow-[0_10px_30px_rgba(31,41,55,0.03)]">
        <h2 className="text-xl font-semibold text-[#1f2937]">Leave history</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-left text-sm text-[#4b5563]">
            <thead>
              <tr className="border-b border-[#e7ddd1] text-[#6b7280]">
                <th className="pb-3 pr-4">Type</th>
                <th className="pb-3 pr-4">From</th>
                <th className="pb-3 pr-4">To</th>
                <th className="pb-3 pr-4">Days</th>
                <th className="pb-3 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id} className="border-b border-[#f0e8e1] last:border-b-0">
                  <td className="py-3 pr-4 font-medium text-[#1f2937]">{leave.type}</td>
                  <td className="py-3 pr-4">{leave.from}</td>
                  <td className="py-3 pr-4">{leave.to}</td>
                  <td className="py-3 pr-4">{leave.days}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={[
                        "rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em]",
                        leave.status === "Approved" ? "bg-[#e4efe8] text-[#466c5d]" : "bg-[#f8eedc] text-[#b98746]",
                      ].join(" ")}
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
