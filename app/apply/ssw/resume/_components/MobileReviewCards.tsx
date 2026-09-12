import type { ReactNode } from "react";
import type { SSWApplication } from "../../_lib/types";
import { MONTH_OPTIONS } from "../../_lib/constants";

function monthLabel(value: string): string {
  return MONTH_OPTIONS.find((m) => m.value === value)?.label ?? value;
}

function dateRange(
  startYear: string,
  startMonth: string,
  endYear: string,
  endMonth: string,
  ongoingLabel?: string
): string {
  const start = startYear ? `${monthLabel(startMonth)} ${startYear}` : "—";
  const end = ongoingLabel ? ongoingLabel : endYear ? `${monthLabel(endMonth)} ${endYear}` : "—";
  return `${start} – ${end}`;
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">{title}</h3>
      {children}
    </section>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-medium text-muted">{label}</span>
      <span className="text-sm text-navy">{value?.trim() ? value : "—"}</span>
    </div>
  );
}

export default function MobileReviewCards({ application }: { application: SSWApplication }) {
  const { personal } = application;

  return (
    <div className="flex flex-col gap-4">
      <Card title="Personal Information">
        <div className="flex gap-4">
          {personal.photo?.dataUrl && (
            // eslint-disable-next-line @next/next/no-img-element -- local data: URL preview, not an optimizable asset
            <img
              src={personal.photo.dataUrl}
              alt="Resume photo"
              className="h-28 w-20 shrink-0 rounded-lg border border-line object-cover"
            />
          )}
          <div className="grid flex-1 grid-cols-1 gap-2">
            <Row label="Full Name" value={personal.fullName} />
            <Row label="Name (Katakana)" value={personal.nameKatakana} />
            <Row label="Date of Birth" value={personal.dateOfBirth} />
            <Row label="Gender" value={personal.gender} />
          </div>
        </div>
        <Row label="Nationality" value={personal.nationality} />
        <Row
          label="Address"
          value={[personal.postalCode && `〒${personal.postalCode}`, personal.currentAddress]
            .filter(Boolean)
            .join(" ")}
        />
        <Row label="Phone" value={personal.phone} />
        <Row label="Email" value={personal.email} />
      </Card>

      <Card title="Education">
        {application.education.length === 0 ? (
          <p className="text-sm text-muted">No education records added.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {application.education.map((e) => (
              <div key={e.id} className="border-l-2 border-gold/40 pl-3">
                <p className="text-sm font-semibold text-navy">
                  {e.schoolName || "—"}
                  {e.department ? ` — ${e.department}` : ""}
                </p>
                <p className="text-xs text-muted">
                  {dateRange(e.startYear, e.startMonth, e.endYear, e.endMonth)} · {e.status || "—"}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card title="Work Experience">
        {application.workExperience.length === 0 ? (
          <p className="text-sm text-muted">No work experience added.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {application.workExperience.map((w) => (
              <div key={w.id} className="border-l-2 border-gold/40 pl-3">
                <p className="text-sm font-semibold text-navy">
                  {w.jobTitle || "—"} at {w.companyName || "—"}
                </p>
                <p className="text-xs text-muted">
                  {dateRange(
                    w.startYear,
                    w.startMonth,
                    w.endYear,
                    w.endMonth,
                    w.currentlyWorking ? "Present" : undefined
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card title="Qualifications">
        {application.qualifications.length === 0 ? (
          <p className="text-sm text-muted">No qualifications added.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {application.qualifications.map((q) => (
              <div key={q.id} className="border-l-2 border-gold/40 pl-3">
                <p className="text-sm font-semibold text-navy">
                  {q.type || "—"}
                  {q.name ? ` — ${q.name}` : ""}
                  {q.level ? ` (${q.level})` : ""}
                </p>
                <p className="text-xs text-muted">Obtained: {q.datePassed || "—"}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card title="Motivation">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">志望動機 / Motivation</p>
          <p className="mt-1 whitespace-pre-wrap text-sm text-navy">{application.motivation || "—"}</p>
        </div>
      </Card>

      <Card title="Self PR">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">自己PR / Self PR</p>
          <p className="mt-1 whitespace-pre-wrap text-sm text-navy">{application.selfPR || "—"}</p>
        </div>
        {application.personalRequests && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              本人希望記入欄 / Personal Requests
            </p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-navy">{application.personalRequests}</p>
          </div>
        )}
      </Card>
    </div>
  );
}
