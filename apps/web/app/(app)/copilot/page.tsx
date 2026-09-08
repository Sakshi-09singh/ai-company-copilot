"use client";

import { useSession } from "@/lib/session";

export default function CopilotPage() {
  const { user } = useSession();
  const isEmployeeView = user?.role === "employee";

  const suggestedQuestions = isEmployeeView
    ? [
        "What was my attendance last month?",
        "How many leaves do I have left?",
        "Show my latest payslip",
        "What is my salary this month?",
        "What is my current leave balance?",
      ]
    : [
        "How many employees are in Engineering?",
        "Who is currently on leave?",
        "Which department has the highest absenteeism?",
        "Show employees with low attendance",
        "How many employees joined this month?",
      ];

  const messages = isEmployeeView
    ? [
        { role: "user", text: "What was my attendance last month?" },
        { role: "assistant", text: "Your average attendance for the last month was 92.5%, with 18 working days logged." },
        { role: "assistant", text: "You were present on 17 days, had 1 late mark, and 0 unpaid absences." },
      ]
    : [
        { role: "user", text: "How many employees are in Engineering?" },
        { role: "assistant", text: "Engineering has 18 active employees across product, platform, and QA teams." },
        { role: "assistant", text: "Current attendance is 91.4%, with 2 pending leave requests and 1 late trend alert." },
      ];

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-[#e7ddd1] bg-[#fdfaf7] p-6 shadow-[0_18px_40px_rgba(31,41,55,0.05)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-[#7a5447]">{isEmployeeView ? "Employee Copilot" : "HR Copilot"}</div>
            <h1 className="mt-2 text-3xl font-semibold text-[#1f2937]">
              {isEmployeeView ? "Ask about your work and pay" : "Ask about the workforce and performance"}
            </h1>
          </div>
          <button
            type="button"
            className="rounded-xl bg-[#7a5447] px-4 py-2.5 font-medium text-white shadow-sm hover:bg-[#684837]"
          >
            New conversation
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[28px] border border-[#e7ddd1] bg-white p-5 shadow-[0_10px_30px_rgba(31,41,55,0.03)]">
          <h2 className="mb-4 text-lg font-semibold text-[#1f2937]">Suggested questions</h2>
          <div className="space-y-3">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                type="button"
                className="w-full rounded-2xl border border-[#e7ddd1] bg-[#f8f4f1] p-3 text-left text-sm text-[#374151] transition hover:border-[#7a5447] hover:bg-white hover:text-[#1f2937]"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-[#e7ddd1] bg-white p-5 shadow-[0_10px_30px_rgba(31,41,55,0.03)]">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={message.role === "user" ? "ml-auto max-w-xl" : "max-w-xl"}
              >
                <div
                  className={[
                    "rounded-2xl p-4 text-sm leading-6 shadow-sm",
                    message.role === "user"
                      ? "bg-[#f3e4dc] text-[#2f2f2f]"
                      : "border border-[#e7ddd1] bg-[#f8f4f1] text-[#374151]",
                  ].join(" ")}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {(isEmployeeView
              ? [
                  { title: "Attendance", value: "92.5%" },
                  { title: "Leave", value: "6/12 days" },
                  { title: "Payslip", value: "₹1,63,160" },
                ]
              : [
                  { title: "Employees", value: "184" },
                  { title: "Present", value: "157" },
                  { title: "Absence", value: "12.4%" },
                ]
            ).map((result) => (
              <div key={result.title} className="rounded-2xl border border-[#e7ddd1] bg-[#f8f4f1] p-4 shadow-[0_8px_20px_rgba(31,41,55,0.02)]">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#6b7280]">{result.title}</div>
                <div className="mt-3 text-xl font-semibold text-[#1f2937]">{result.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3 rounded-2xl border border-[#e7ddd1] bg-[#f8f4f1] p-3 shadow-inner shadow-slate-100">
            <input
              type="text"
              value={isEmployeeView ? "What is my salary this month?" : "How many employees are in Engineering?"}
              readOnly
              className="flex-1 bg-transparent text-sm text-[#374151] outline-none placeholder:text-[#6b7280]"
            />
            <button type="button" className="rounded-xl bg-[#7a5447] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#684837]">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
