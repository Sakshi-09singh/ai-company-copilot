export type Role = "employee" | "hr" | "manager" | "finance" | "cfo" | "admin";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  title: string;
  department: string;
};

export type Employee = {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  manager: string;
  status: "Active" | "On Leave" | "Probation";
  joined: string;
  location: string;
};

export type AttendanceRow = {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: "Present" | "Absent" | "Leave" | "Late";
};

export type LeaveRequest = {
  id: string;
  employeeId: string;
  employeeName: string;
  type: "Casual" | "Sick" | "Earned" | "WFH";
  from: string;
  to: string;
  days: number;
  status: "Pending" | "Approved" | "Rejected";
};

export type Payslip = {
  id: string;
  employeeId: string;
  period: string;
  gross: number;
  deductions: number;
  net: number;
  paidOn: string;
};

export type KnowledgeDoc = {
  id: string;
  title: string;
  category: string;
  updated: string;
  owner: string;
  size: string;
};

export type CopilotKpi = { label: string; value: string; hint?: string };

export type CopilotTable = {
  columns: string[];
  rows: Record<string, string | number>[];
};

export type CopilotChartPoint = { name: string; value: number; predicted?: number };

export type CopilotInsight = {
  title: string;
  body: string;
  factors: { label: string; impact: string }[];
};

export type ToolResult =
  | { kind: "kpis"; items: CopilotKpi[] }
  | { kind: "table"; title: string; table: CopilotTable }
  | { kind: "chart"; title: string; data: CopilotChartPoint[] }
  | { kind: "insight"; insight: CopilotInsight }
  | { kind: "actions"; items: { label: string; href: string }[] };

export type SourceCard = {
  title: string;
  detail: string;
};

export type CopilotMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  results?: ToolResult[];
  sources?: SourceCard[];
};
