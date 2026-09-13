"use client";

import type { ReactNode } from "react";
import { useApplication } from "../../_context/ApplicationContext";
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

function ReviewSection({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-navy">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-sm font-semibold text-gold hover:text-gold-light hover:underline"
        >
          Edit
        </button>
      </div>
      {children}
    </section>
  );
}

function ReviewRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
      <span className="w-44 shrink-0 text-sm font-medium text-muted">{label}</span>
      <span className="text-sm text-navy">{value?.trim() ? value : "—"}</span>
    </div>
  );
}

export default function StepReview({ onEdit }: { onEdit: (step: number) => void }) {
  const { data } = useApplication();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-navy">Review Your Application</h2>
        <p className="mt-1 text-sm text-muted">
          Double-check everything below before continuing.
        </p>
      </div>

      <ReviewSection title="Personal Information" onEdit={() => onEdit(0)}>
        <div className="flex flex-col gap-6 sm:flex-row">
          {data.personal.photo?.dataUrl && (
            // eslint-disable-next-line @next/next/no-img-element -- local data: URL preview, not an optimizable asset
            <img
              src={data.personal.photo.dataUrl}
              alt="Resume photo preview"
              className="h-32 w-24 shrink-0 rounded-lg border border-line object-cover"
            />
          )}
          <div className="flex flex-1 flex-col gap-1.5">
            <ReviewRow label="Full Name" value={data.personal.fullName} />
            <ReviewRow label="Name (Katakana)" value={data.personal.nameKatakana} />
            <ReviewRow label="Date of Birth" value={data.personal.dateOfBirth} />
            <ReviewRow label="Gender" value={data.personal.gender} />
            <ReviewRow label="Nationality" value={data.personal.nationality} />
            <ReviewRow label="Address" value={data.personal.currentAddress} />
            <ReviewRow label="Postal Code" value={data.personal.postalCode} />
            <ReviewRow label="Phone" value={data.personal.phone} />
            <ReviewRow label="Email" value={data.personal.email} />
          </div>
        </div>
      </ReviewSection>

      <ReviewSection title="Education" onEdit={() => onEdit(1)}>
        {data.education.length === 0 ? (
          <p className="text-sm text-muted">No education records added.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {data.education.map((e) => (
              <div key={e.id} className="border-l-2 border-gold/40 pl-4">
                <p className="text-sm font-semibold text-navy">
                  {e.schoolName || "—"}
                  {e.courseType ? ` — ${e.courseType}` : ""}
                  {e.subjectMajor ? ` (${e.subjectMajor})` : ""}
                </p>
                <p className="text-xs text-muted">
                  {e.country || "—"} ·{" "}
                  {dateRange(e.startYear, e.startMonth, e.endYear, e.endMonth)} · {e.status || "—"}
                </p>
              </div>
            ))}
          </div>
        )}
      </ReviewSection>

      <ReviewSection title="Work Experience" onEdit={() => onEdit(2)}>
        {data.workExperience.length === 0 ? (
          <p className="text-sm text-muted">No work experience added.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {data.workExperience.map((w) => (
              <div key={w.id} className="border-l-2 border-gold/40 pl-4">
                <p className="text-sm font-semibold text-navy">
                  {w.jobTitle || "—"} at {w.companyName || "—"}
                </p>
                <p className="text-xs text-muted">
                  {w.country || "—"} · {w.employmentType || "—"} ·{" "}
                  {dateRange(
                    w.startYear,
                    w.startMonth,
                    w.endYear,
                    w.endMonth,
                    w.currentlyWorking ? "Present" : undefined
                  )}
                </p>
                {w.description && <p className="mt-1 text-sm text-navy/80">{w.description}</p>}
              </div>
            ))}
          </div>
        )}
      </ReviewSection>

      <ReviewSection title="Qualifications" onEdit={() => onEdit(3)}>
        {data.qualifications.length === 0 ? (
          <p className="text-sm text-muted">No qualifications added.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {data.qualifications.map((q) => (
              <div key={q.id} className="border-l-2 border-gold/40 pl-4">
                <p className="text-sm font-semibold text-navy">
                  {q.type || "—"}
                  {q.name ? ` — ${q.name}` : ""}
                  {q.level ? ` (${q.level})` : ""}
                </p>
                <p className="text-xs text-muted">
                  Obtained: {q.datePassed || "—"}
                  {q.certificateNumber ? ` · No. ${q.certificateNumber}` : ""}
                  {q.certificate ? ` · Certificate attached` : ""}
                </p>
              </div>
            ))}
          </div>
        )}
      </ReviewSection>

      <ReviewSection title="SSW Information" onEdit={() => onEdit(4)}>
        <div className="flex flex-col gap-1.5">
          <ReviewRow label="Desired Field" value={data.ssw.desiredField} />
          <ReviewRow label="Desired Salary" value={data.ssw.desiredSalary} />
          <ReviewRow label="Preferred Location" value={data.ssw.preferredLocation} />
          <ReviewRow label="Housing Preference" value={data.ssw.housingPreference} />
          <ReviewRow label="Available Start Date" value={data.ssw.availableStartDate} />
          <ReviewRow label="Currently in Japan?" value={data.ssw.currentlyInJapan} />
          {data.ssw.currentlyInJapan === "Yes" && (
            <ReviewRow label="Current Visa Status" value={data.ssw.currentVisaStatus} />
          )}
          <ReviewRow label="Passport Number" value={data.ssw.passportNumber} />
        </div>
      </ReviewSection>

      <ReviewSection title="Motivation" onEdit={() => onEdit(5)}>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              志望動機 / Motivation
            </p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-navy">
              {data.motivation || "—"}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">自己PR / Self PR</p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-navy">{data.selfPR || "—"}</p>
          </div>
          {data.personalRequests && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                本人希望記入欄 / Personal Requests
              </p>
              <p className="mt-1 whitespace-pre-wrap text-sm text-navy">
                {data.personalRequests}
              </p>
            </div>
          )}
        </div>
      </ReviewSection>

      <p className="rounded-lg border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-navy">
        Your information will be used to create a Japanese 履歴書 in the next step.
      </p>
    </div>
  );
}
