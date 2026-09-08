import type {
  AttendanceRow,
  Employee,
  KnowledgeDoc,
  LeaveRequest,
  Payslip,
  SessionUser,
} from "./types";

export const demoUsers: SessionUser[] = [
  {
    id: "e1",
    name: "Aisha Rahman",
    email: "aisha.rahman@acme.com",
    role: "employee",
    title: "Software Engineer",
    department: "Engineering",
  },
  {
    id: "h1",
    name: "Priya Mehta",
    email: "priya.mehta@acme.com",
    role: "hr",
    title: "HR Business Partner",
    department: "People",
  },
  {
    id: "m1",
    name: "Rahul Iyer",
    email: "rahul.iyer@acme.com",
    role: "manager",
    title: "Engineering Manager",
    department: "Engineering",
  },
  {
    id: "f1",
    name: "Neha Kapoor",
    email: "neha.kapoor@acme.com",
    role: "finance",
    title: "Finance Analyst",
    department: "Finance",
  },
  {
    id: "c1",
    name: "Vikram Shah",
    email: "vikram.shah@acme.com",
    role: "cfo",
    title: "Chief Financial Officer",
    department: "Finance",
  },
  {
    id: "a1",
    name: "Anita Bose",
    email: "anita.bose@acme.com",
    role: "admin",
    title: "Platform Admin",
    department: "IT",
  },
];

export const employees: Employee[] = [
  {
    id: "e1",
    name: "Aisha Rahman",
    email: "aisha.rahman@acme.com",
    department: "Engineering",
    designation: "Software Engineer",
    manager: "Rahul Iyer",
    status: "Active",
    joined: "2023-04-12",
    location: "Bengaluru",
  },
  {
    id: "e2",
    name: "Rohan Das",
    email: "rohan.das@acme.com",
    department: "Engineering",
    designation: "Senior Engineer",
    manager: "Rahul Iyer",
    status: "Active",
    joined: "2021-09-01",
    location: "Hyderabad",
  },
  {
    id: "e3",
    name: "Meera Nair",
    email: "meera.nair@acme.com",
    department: "Sales",
    designation: "Account Executive",
    manager: "Karan Malhotra",
    status: "On Leave",
    joined: "2022-01-18",
    location: "Mumbai",
  },
  {
    id: "e4",
    name: "Sanjay Patel",
    email: "sanjay.patel@acme.com",
    department: "Finance",
    designation: "Controller",
    manager: "Vikram Shah",
    status: "Active",
    joined: "2019-11-04",
    location: "Pune",
  },
  {
    id: "e5",
    name: "Lina Chen",
    email: "lina.chen@acme.com",
    department: "People",
    designation: "HR Specialist",
    manager: "Priya Mehta",
    status: "Probation",
    joined: "2026-06-02",
    location: "Bengaluru",
  },
  {
    id: "e6",
    name: "Arjun Sethi",
    email: "arjun.sethi@acme.com",
    department: "Engineering",
    designation: "QA Engineer",
    manager: "Rahul Iyer",
    status: "Active",
    joined: "2024-02-20",
    location: "Chennai",
  },
  {
    id: "e7",
    name: "Fatima Ali",
    email: "fatima.ali@acme.com",
    department: "Operations",
    designation: "Ops Lead",
    manager: "Anita Bose",
    status: "Active",
    joined: "2020-07-15",
    location: "Delhi",
  },
  {
    id: "e8",
    name: "Dev Khanna",
    email: "dev.khanna@acme.com",
    department: "Marketing",
    designation: "Growth Manager",
    manager: "Karan Malhotra",
    status: "Active",
    joined: "2023-10-09",
    location: "Bengaluru",
  },
];

export const attendance: AttendanceRow[] = [
  { id: "a1", employeeId: "e1", employeeName: "Aisha Rahman", date: "2026-08-03", checkIn: "09:12", checkOut: "18:05", status: "Present" },
  { id: "a2", employeeId: "e1", employeeName: "Aisha Rahman", date: "2026-08-04", checkIn: "09:48", checkOut: "18:22", status: "Late" },
  { id: "a3", employeeId: "e1", employeeName: "Aisha Rahman", date: "2026-08-05", checkIn: "—", checkOut: "—", status: "Leave" },
  { id: "a4", employeeId: "e1", employeeName: "Aisha Rahman", date: "2026-08-06", checkIn: "09:04", checkOut: "18:11", status: "Present" },
  { id: "a5", employeeId: "e2", employeeName: "Rohan Das", date: "2026-08-04", checkIn: "09:01", checkOut: "18:40", status: "Present" },
  { id: "a6", employeeId: "e3", employeeName: "Meera Nair", date: "2026-08-04", checkIn: "—", checkOut: "—", status: "Leave" },
  { id: "a7", employeeId: "e6", employeeName: "Arjun Sethi", date: "2026-08-04", checkIn: "—", checkOut: "—", status: "Absent" },
  { id: "a8", employeeId: "e1", employeeName: "Aisha Rahman", date: "2026-08-07", checkIn: "09:08", checkOut: "18:00", status: "Present" },
];

export const leaves: LeaveRequest[] = [
  { id: "l1", employeeId: "e1", employeeName: "Aisha Rahman", type: "Casual", from: "2026-08-05", to: "2026-08-05", days: 1, status: "Approved" },
  { id: "l2", employeeId: "e1", employeeName: "Aisha Rahman", type: "Earned", from: "2026-09-18", to: "2026-09-19", days: 2, status: "Pending" },
  { id: "l3", employeeId: "e3", employeeName: "Meera Nair", type: "Sick", from: "2026-08-04", to: "2026-08-08", days: 5, status: "Approved" },
  { id: "l4", employeeId: "e6", employeeName: "Arjun Sethi", type: "WFH", from: "2026-09-03", to: "2026-09-03", days: 1, status: "Pending" },
];

export const leaveBalances = {
  casual: { remaining: 6, total: 12 },
  sick: { remaining: 8, total: 10 },
  earned: { remaining: 14, total: 18 },
};

export const payslips: Payslip[] = [
  { id: "p1", employeeId: "e1", period: "Jul 2026", gross: 185000, deductions: 22100, net: 162900, paidOn: "2026-07-31" },
  { id: "p2", employeeId: "e1", period: "Aug 2026", gross: 185000, deductions: 21840, net: 163160, paidOn: "2026-08-31" },
];

export const salary = { monthly: 185000, ytd: 1480000, nextPayDate: "2026-09-30" };

export const knowledgeDocs: KnowledgeDoc[] = [
  { id: "d1", title: "Employee Handbook 2026", category: "HR", updated: "2026-04-02", owner: "People", size: "2.4 MB" },
  { id: "d2", title: "Leave Policy", category: "HR", updated: "2026-01-15", owner: "People", size: "420 KB" },
  { id: "d3", title: "Travel & Expense Policy", category: "Finance", updated: "2026-03-11", owner: "Finance", size: "610 KB" },
  { id: "d4", title: "Q2 Board Pack", category: "Finance", updated: "2026-07-20", owner: "CFO Office", size: "3.1 MB" },
  { id: "d5", title: "Information Security Guidelines", category: "IT", updated: "2026-02-08", owner: "IT", size: "890 KB" },
];

export const monthlyFinance = [
  { month: "Jan", revenue: 48, expenses: 39, profit: 9 },
  { month: "Feb", revenue: 51, expenses: 40, profit: 11 },
  { month: "Mar", revenue: 54, expenses: 42, profit: 12 },
  { month: "Apr", revenue: 49, expenses: 44, profit: 5 },
  { month: "May", revenue: 46, expenses: 47, profit: -1 },
  { month: "Jun", revenue: 44, expenses: 49, profit: -5 },
  { month: "Jul", revenue: 53, expenses: 45, profit: 8 },
  { month: "Aug", revenue: 58, expenses: 46, profit: 12 },
];

export const expenseCategories = [
  { name: "Payroll", value: 214 },
  { name: "Cloud & Tools", value: 38 },
  { name: "Marketing", value: 29 },
  { name: "Facilities", value: 22 },
  { name: "Travel", value: 11 },
];

export const departmentExpenses = [
  { name: "Engineering", value: 128 },
  { name: "Sales", value: 54 },
  { name: "Operations", value: 41 },
  { name: "People", value: 18 },
  { name: "Finance", value: 12 },
];

export const forecastSeries = [
  { month: "Jun", historical: 44, predicted: 44 },
  { month: "Jul", historical: 53, predicted: 53 },
  { month: "Aug", historical: 58, predicted: 58 },
  { month: "Sep", historical: undefined, predicted: 61 },
  { month: "Oct", historical: undefined, predicted: 64 },
  { month: "Nov", historical: undefined, predicted: 66 },
  { month: "Dec", historical: undefined, predicted: 72 },
];

export const kpis = {
  revenueYtd: 403,
  expensesYtd: 352,
  netProfitYtd: 51,
  margin: 12.7,
};

export function attendanceSummary(employeeId?: string) {
  const rows = employeeId ? attendance.filter((r) => r.employeeId === employeeId) : attendance;
  const present = rows.filter((r) => r.status === "Present").length;
  const absent = rows.filter((r) => r.status === "Absent").length;
  const leave = rows.filter((r) => r.status === "Leave").length;
  const late = rows.filter((r) => r.status === "Late").length;
  const worked = present + late;
  const percentage = rows.length ? (worked / rows.length) * 100 : 0;
  return { present, absent, leave, late, percentage, total: rows.length };
}
