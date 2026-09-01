import type { Role } from "./types";

export type NavItem = {
  href: string;
  label: string;
  roles: Role[];
};

export const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", roles: ["employee", "hr", "manager", "finance", "cfo", "admin"] },
  { href: "/copilot", label: "AI Copilot", roles: ["employee", "hr", "manager", "finance", "cfo", "admin"] },
  { href: "/employees", label: "Employees", roles: ["hr", "manager", "admin"] },
  { href: "/attendance", label: "Attendance", roles: ["employee", "hr", "manager", "admin"] },
  { href: "/leaves", label: "Leaves", roles: ["employee", "hr", "manager", "admin"] },
  { href: "/payroll", label: "Payroll", roles: ["employee", "finance", "cfo", "admin"] },
  { href: "/finance", label: "Finance", roles: ["finance", "cfo", "admin"] },
  { href: "/finance/revenue", label: "Revenue", roles: ["finance", "cfo", "admin"] },
  { href: "/finance/expenses", label: "Expenses", roles: ["finance", "cfo", "admin"] },
  { href: "/finance/pnl", label: "Profit & Loss", roles: ["finance", "cfo", "admin"] },
  { href: "/finance/forecasting", label: "Forecasting", roles: ["finance", "cfo", "admin"] },
  { href: "/knowledge", label: "Company Knowledge", roles: ["employee", "hr", "manager", "finance", "cfo", "admin"] },
];

export function canAccess(role: Role, href: string) {
  const normalized = href.split("?")[0];
  const item = navItems.find((n) => normalized === n.href || normalized.startsWith(`${n.href}/`));
  if (!item) return false;
  return item.roles.includes(role);
}

export function visibleNav(role: Role) {
  if (role === "employee") {
    return navItems.filter((n) => ["/dashboard", "/attendance", "/leaves", "/payroll", "/copilot"].includes(n.href));
  }

  if (role === "hr" || role === "manager" || role === "admin") {
    return navItems.filter((n) => ["/dashboard", "/employees", "/attendance", "/leaves", "/copilot"].includes(n.href));
  }

  return navItems.filter((n) => n.roles.includes(role));
}

export const roleLabels: Record<Role, string> = {
  employee: "Employee",
  hr: "HR",
  manager: "Manager",
  finance: "Finance",
  cfo: "CFO",
  admin: "Admin",
};
