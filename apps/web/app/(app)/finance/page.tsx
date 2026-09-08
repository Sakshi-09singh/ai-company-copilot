import { departmentExpenses, expenseCategories, kpis, monthlyFinance } from "@/lib/mock-data";

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-[#e7ddd1] bg-[#fdfaf7] p-6 shadow-[0_18px_40px_rgba(31,41,55,0.05)]">
        <div className="text-[10px] uppercase tracking-[0.24em] text-[#7a5447]">Finance</div>
        <h1 className="mt-2 text-3xl font-semibold text-[#1f2937]">Revenue, expenses, and profitability</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Revenue YTD", value: `₹${kpis.revenueYtd}Cr` },
          { label: "Expenses YTD", value: `₹${kpis.expensesYtd}Cr` },
          { label: "Net profit", value: `₹${kpis.netProfitYtd}Cr` },
          { label: "Margin", value: `${kpis.margin}%` },
        ].map((item) => (
          <div key={item.label} className="rounded-[24px] border border-[#e7ddd1] bg-white p-5 shadow-[0_10px_30px_rgba(31,41,55,0.03)]">
            <div className="text-sm text-[#6b7280]">{item.label}</div>
            <div className="mt-3 text-3xl font-semibold text-[#1f2937]">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[28px] border border-[#e7ddd1] bg-white p-6 shadow-[0_10px_30px_rgba(31,41,55,0.03)]">
          <h2 className="text-xl font-semibold text-[#1f2937]">Monthly revenue vs expenses</h2>
          <div className="mt-6 flex h-64 items-end gap-3">
            {monthlyFinance.map((month) => (
              <div key={month.month} className="flex flex-1 flex-col items-center gap-3">
                <div className="flex h-44 w-full items-end gap-1">
                  <div className="w-1/2 rounded-t-xl bg-[#7a5447]" style={{ height: `${month.revenue * 2.5}px` }} />
                  <div className="w-1/2 rounded-t-xl bg-[#d8cab6]" style={{ height: `${month.expenses * 2.5}px` }} />
                </div>
                <div className="text-xs text-[#6b7280]">{month.month}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-[#e7ddd1] bg-white p-6 shadow-[0_10px_30px_rgba(31,41,55,0.03)]">
          <h2 className="text-xl font-semibold text-[#1f2937]">Expense categories</h2>
          <div className="mt-6 space-y-4">
            {expenseCategories.map((item) => (
              <div key={item.name}>
                <div className="mb-1 flex items-center justify-between text-sm text-[#4b5563]">
                  <span>{item.name}</span>
                  <span>{item.value}L</span>
                </div>
                <div className="h-2 rounded-full bg-[#f0e9e4]">
                  <div className="h-2 rounded-full bg-[#7a5447]" style={{ width: `${(item.value / 214) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-[#e7ddd1] bg-white p-6 shadow-[0_10px_30px_rgba(31,41,55,0.03)]">
        <h2 className="text-xl font-semibold text-[#1f2937]">Department spend</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-5">
          {departmentExpenses.map((item) => (
            <div key={item.name} className="rounded-2xl bg-[#f8f4f1] p-4 text-center">
              <div className="text-sm text-[#6b7280]">{item.name}</div>
              <div className="mt-2 text-2xl font-semibold text-[#1f2937]">{item.value}L</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
