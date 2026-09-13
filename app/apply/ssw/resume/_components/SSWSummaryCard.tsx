import type { SSWApplication } from "../../_lib/types";
import { buildSSWSummaryRows } from "../_lib/resumeData";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
      <span className="w-48 shrink-0 text-sm font-medium text-muted">{label}</span>
      <span className="text-sm text-navy">{value}</span>
    </div>
  );
}

export default function SSWSummaryCard({ ssw }: { ssw: SSWApplication["ssw"] }) {
  const rows = buildSSWSummaryRows(ssw);

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 sm:p-6">
      <div>
        <h2 className="text-lg font-semibold text-navy">SSW Application Summary</h2>
        <p className="mt-1 text-xs text-muted">
          These SSW-specific details are for JASHOKAI GlobalTech&apos;s reference and are not part of
          the traditional 履歴書 document.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {rows.map((row) => (
          <Row key={row.label} label={row.label} value={row.value} />
        ))}
      </div>
    </section>
  );
}
