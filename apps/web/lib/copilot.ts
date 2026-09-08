import { attendanceSummary, employees, kpis, leaveBalances, monthlyFinance, payslips } from "./mock-data";
import type { CopilotMessage, Role, SessionUser } from "./types";

function id() {
  return crypto.randomUUID();
}

export function answerCopilot(query: string, user: SessionUser): CopilotMessage {
  const q = query.toLowerCase();
  const role: Role = user.role;
  const finance = role === "finance" || role === "cfo" || role === "admin";
  const people = role === "hr" || role === "manager" || role === "admin";

  if (q.includes("attendance")) {
    const summary = attendanceSummary(people && !q.includes("my") ? undefined : user.id);
    return {
      id: id(),
      role: "assistant",
      content: people && !q.includes("my")
        ? "Here is the latest attendance snapshot across recorded days."
        : `Here is your attendance for the current sample period (${summary.total} working days).`,
      results: [
        {
          kind: "kpis",
          items: [
            { label: "Present", value: String(summary.present) },
            { label: "Absent", value: String(summary.absent) },
            { label: "Leave", value: String(summary.leave) },
            { label: "Late", value: String(summary.late) },
            { label: "Attendance", value: `${summary.percentage.toFixed(1)}%` },
          ],
        },
        { kind: "actions", items: [{ label: "View detailed attendance", href: "/attendance" }] },
      ],
      sources: [{ title: "Attendance register", detail: "HRIS · last 30 days" }],
    };
  }

  if (q.includes("leave")) {
    return {
      id: id(),
      role: "assistant",
      content: "Your remaining leave balances and the latest request status.",
      results: [
        {
          kind: "kpis",
          items: [
            { label: "Casual", value: `${leaveBalances.casual.remaining}/${leaveBalances.casual.total}` },
            { label: "Sick", value: `${leaveBalances.sick.remaining}/${leaveBalances.sick.total}` },
            { label: "Earned", value: `${leaveBalances.earned.remaining}/${leaveBalances.earned.total}` },
          ],
        },
        { kind: "actions", items: [{ label: "Open leave requests", href: "/leaves" }] },
      ],
      sources: [{ title: "Leave Policy", detail: "Company Knowledge · People" }],
    };
  }

  if (q.includes("payslip") || q.includes("salary") || q.includes("payroll")) {
    if (q.includes("salary") && people && !q.includes("my")) {
      return {
        id: id(),
        role: "assistant",
        content: "Salary and payslip details for other employees are restricted by role-based access.",
        sources: [{ title: "Access control", detail: "Payroll is visible only to the employee, Finance, CFO, and Admin." }],
      };
    }
    const latest = payslips.filter((p) => p.employeeId === user.id).at(-1);
    return {
      id: id(),
      role: "assistant",
      content: latest ? `Your latest payslip is for ${latest.period}.` : "No payslip is on file for this demo user.",
      results: latest
        ? [
            {
              kind: "kpis",
              items: [
                { label: "Gross", value: `₹${latest.gross.toLocaleString("en-IN")}` },
                { label: "Deductions", value: `₹${latest.deductions.toLocaleString("en-IN")}` },
                { label: "Net pay", value: `₹${latest.net.toLocaleString("en-IN")}` },
              ],
            },
            { kind: "actions", items: [{ label: "Open payroll", href: "/payroll" }] },
          ]
        : undefined,
      sources: [{ title: "Payroll ledger", detail: "Finance · employee self-service" }],
    };
  }

  if (q.includes("engineering") && (q.includes("employee") || q.includes("how many"))) {
    if (!people) {
      return {
        id: id(),
        role: "assistant",
        content: "Department headcount is available to HR, managers, and admins.",
      };
    }
    const eng = employees.filter((e) => e.department === "Engineering");
    return {
      id: id(),
      role: "assistant",
      content: `Engineering currently has ${eng.length} employees in the directory.`,
      results: [
        {
          kind: "table",
          title: "Engineering directory",
          table: {
            columns: ["Name", "Designation", "Location", "Status"],
            rows: eng.map((e) => ({
              Name: e.name,
              Designation: e.designation,
              Location: e.location,
              Status: e.status,
            })),
          },
        },
        { kind: "actions", items: [{ label: "Open employees", href: "/employees" }] },
      ],
      sources: [{ title: "Employee master", detail: "HRIS directory" }],
    };
  }

  if ((q.includes("loss") || q.includes("q2") || q.includes("why")) && finance) {
    return {
      id: id(),
      role: "assistant",
      content: "Q2 slipped into a loss primarily in May–June as revenue softened while payroll and cloud costs stayed high.",
      results: [
        {
          kind: "insight",
          insight: {
            title: "Q2 loss drivers",
            body: "Revenue declined from ₹54Cr in March to ₹44Cr in June while expenses rose to ₹49Cr. The company returned to profit in July.",
            factors: [
              { label: "Enterprise deal slippage", impact: "−₹8.4Cr revenue" },
              { label: "Payroll run-rate", impact: "+₹2.1Cr expense" },
              { label: "Cloud overage", impact: "+₹0.9Cr expense" },
            ],
          },
        },
        {
          kind: "chart",
          title: "Profit by month (₹ Cr)",
          data: monthlyFinance.map((m) => ({ name: m.month, value: m.profit })),
        },
        { kind: "actions", items: [{ label: "Open P&L", href: "/finance/pnl" }] },
      ],
      sources: [
        { title: "P&L actuals", detail: "Finance system · FY26" },
        { title: "Q2 Board Pack", detail: "Company Knowledge" },
      ],
    };
  }

  if (q.includes("forecast") && finance) {
    return {
      id: id(),
      role: "assistant",
      content: "The model projects revenue recovering through Q4, reaching about ₹72Cr in December if current pipeline conversion holds.",
      results: [
        {
          kind: "kpis",
          items: [
            { label: "Sep forecast", value: "₹61Cr" },
            { label: "Q4 exit", value: "₹72Cr" },
            { label: "YTD actual", value: `₹${kpis.revenueYtd}Cr` },
          ],
        },
        { kind: "actions", items: [{ label: "Open forecasting", href: "/finance/forecasting" }] },
      ],
      sources: [{ title: "Forecasting pipeline", detail: "Historical actuals + seasonal model" }],
    };
  }

  if (q.includes("revenue") || q.includes("profit") || q.includes("expense")) {
    if (!finance) {
      return {
        id: id(),
        role: "assistant",
        content: "Company financials are limited to Finance, CFO, and Admin roles.",
      };
    }
    return {
      id: id(),
      role: "assistant",
      content: "Year-to-date financial snapshot from the general ledger.",
      results: [
        {
          kind: "kpis",
          items: [
            { label: "Revenue", value: `₹${kpis.revenueYtd}Cr` },
            { label: "Expenses", value: `₹${kpis.expensesYtd}Cr` },
            { label: "Net profit", value: `₹${kpis.netProfitYtd}Cr` },
            { label: "Margin", value: `${kpis.margin}%` },
          ],
        },
        { kind: "actions", items: [{ label: "Open finance dashboard", href: "/finance" }] },
      ],
      sources: [{ title: "General ledger", detail: "Finance system · YTD" }],
    };
  }

  if (q.includes("handbook") || q.includes("policy") || q.includes("knowledge")) {
    return {
      id: id(),
      role: "assistant",
      content: "Casual leave is 12 days per year. Unused casual leave does not carry forward; earned leave does, up to 30 days.",
      sources: [{ title: "Leave Policy", detail: "Company Knowledge · retrieved via RAG" }],
    };
  }

  return {
    id: id(),
    role: "assistant",
    content:
      "I can help with attendance, leaves, payslips, employee directory, finance, forecasts, and company policy. Try one of the suggested prompts.",
  };
}
