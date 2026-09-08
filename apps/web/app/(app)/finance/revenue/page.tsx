export default function RevenuePage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-[#e7ddd1] bg-[#fdfaf7] p-8 shadow-[0_18px_40px_rgba(31,41,55,0.05)]">
        <div className="text-[10px] uppercase tracking-[0.24em] text-[#7a5447]">Finance / Revenue</div>
        <h1 className="mt-2 text-3xl font-semibold text-[#1f2937]">Revenue overview</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["₹403Cr", "YTD revenue"],
          ["₹58Cr", "August revenue"],
          ["12.7%", "Current margin"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-[24px] border border-[#e7ddd1] bg-white p-5 shadow-[0_10px_30px_rgba(31,41,55,0.03)]">
            <div className="text-3xl font-semibold text-[#1f2937]">{value}</div>
            <div className="mt-2 text-sm text-[#6b7280]">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
