import { formatCurrency } from "@/lib/utils";
import { payslips, salary } from "@/lib/mock-data";

const latest = payslips.at(-1);

export default function PayrollPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-[#e7ddd1] bg-[#fdfaf7] p-6 shadow-[0_18px_40px_rgba(31,41,55,0.05)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-[#7a5447]">Payroll</div>
            <h1 className="mt-2 text-3xl font-semibold text-[#1f2937]">Salary and payslips</h1>
          </div>
          <button type="button" className="rounded-xl bg-[#7a5447] px-4 py-2.5 font-medium text-white shadow-sm hover:bg-[#684837]">
            View payslip
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[24px] border border-[#e7ddd1] bg-white p-5 shadow-[0_10px_30px_rgba(31,41,55,0.03)]">
          <div className="text-sm text-[#6b7280]">Current salary</div>
          <div className="mt-3 text-3xl font-semibold text-[#1f2937]">{formatCurrency(salary.monthly)}</div>
        </div>
        <div className="rounded-[24px] border border-[#e7ddd1] bg-white p-5 shadow-[0_10px_30px_rgba(31,41,55,0.03)]">
          <div className="text-sm text-[#6b7280]">YTD earnings</div>
          <div className="mt-3 text-3xl font-semibold text-[#1f2937]">{formatCurrency(salary.ytd)}</div>
        </div>
        <div className="rounded-[24px] border border-[#e7ddd1] bg-white p-5 shadow-[0_10px_30px_rgba(31,41,55,0.03)]">
          <div className="text-sm text-[#6b7280]">Next pay date</div>
          <div className="mt-3 text-3xl font-semibold text-[#1f2937]">{salary.nextPayDate}</div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[28px] border border-[#e7ddd1] bg-white p-6 shadow-[0_10px_30px_rgba(31,41,55,0.03)]">
          <h2 className="text-xl font-semibold text-[#1f2937]">Latest payslip</h2>
          {latest ? (
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between rounded-2xl bg-[#f8f4f1] p-4 text-sm text-[#4b5563]">
                <span>Period</span>
                <span className="font-medium text-[#1f2937]">{latest.period}</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Gross", value: formatCurrency(latest.gross) },
                  { label: "Deductions", value: formatCurrency(latest.deductions) },
                  { label: "Net pay", value: formatCurrency(latest.net) },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-[#f8f4f1] p-4">
                    <div className="text-sm text-[#6b7280]">{item.label}</div>
                    <div className="mt-2 text-xl font-semibold text-[#1f2937]">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-5 text-[#6b7280]">No payslip on file.</div>
          )}
        </div>

        <div className="rounded-[28px] border border-[#e7ddd1] bg-white p-6 shadow-[0_10px_30px_rgba(31,41,55,0.03)]">
          <h2 className="text-xl font-semibold text-[#1f2937]">Previous payslips</h2>
          <div className="mt-5 space-y-3">
            {payslips.map((slip) => (
              <div key={slip.id} className="flex items-center justify-between rounded-2xl bg-[#f8f4f1] p-4 text-sm text-[#4b5563]">
                <div>
                  <div className="font-medium text-[#1f2937]">{slip.period}</div>
                  <div className="text-[#6b7280]">Paid on {slip.paidOn}</div>
                </div>
                <div className="font-medium text-[#7a5447]">{formatCurrency(slip.net)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
