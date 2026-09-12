import type { SSWApplication } from "../../_lib/types";

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
      <span className="w-48 shrink-0 text-sm font-medium text-muted">{label}</span>
      <span className="text-sm text-navy">{value?.trim() ? value : "—"}</span>
    </div>
  );
}

export default function SSWSummaryCard({ ssw }: { ssw: SSWApplication["ssw"] }) {
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
        <Row label="Desired SSW Field" value={ssw.desiredField} />
        <Row label="Desired Monthly Salary" value={ssw.desiredSalary} />
        <Row label="Preferred Work Location" value={ssw.preferredLocation} />
        <Row label="Housing Preference" value={ssw.housingPreference} />
        <Row label="Available Start Date" value={ssw.availableStartDate} />
        <Row label="Currently in Japan?" value={ssw.currentlyInJapan} />
        {ssw.currentlyInJapan === "Yes" && (
          <Row label="Current Visa / Residence Status" value={ssw.currentVisaStatus} />
        )}
        <Row label="Passport Number" value={ssw.passportNumber} />
      </div>
    </section>
  );
}
