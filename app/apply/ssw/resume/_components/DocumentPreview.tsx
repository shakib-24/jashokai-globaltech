import type { SSWApplication } from "../../_lib/types";
import {
  buildHistoryRows,
  buildQualificationRows,
  calculateAge,
  formatCurrentJapaneseDate,
  formatJapaneseDateOfBirth,
  genderLabel,
  padHistoryRows,
  padQualificationRows,
  type HistoryRow,
} from "../_lib/resumeData";
import A4Stage from "./A4Stage";

function InfoRow({
  label,
  value,
  valueClassName = "",
  noBorder,
}: {
  label: string;
  value: string;
  valueClassName?: string;
  noBorder?: boolean;
}) {
  return (
    <div className={`flex ${noBorder ? "" : "border-b border-neutral-800"}`}>
      <div className="w-24 shrink-0 border-r border-neutral-800 bg-neutral-50 px-2 py-1.5 text-[10px] text-neutral-600">
        {label}
      </div>
      <div className={`flex-1 whitespace-pre-line px-2 py-1.5 text-[12px] text-neutral-900 ${valueClassName}`}>
        {value}
      </div>
    </div>
  );
}

function HistoryTable({ title, rows }: { title: string; rows: HistoryRow[] }) {
  return (
    <div className="border border-neutral-800">
      <div className="flex border-b border-neutral-800 bg-neutral-100 text-[11px] font-bold text-neutral-900">
        <div className="w-16 shrink-0 border-r border-neutral-800 px-2 py-1.5 text-center">年</div>
        <div className="w-12 shrink-0 border-r border-neutral-800 px-2 py-1.5 text-center">月</div>
        <div className="flex-1 px-2 py-1.5 text-center">{title}</div>
      </div>
      {rows.map((row, index) => {
        if (row.kind === "heading") {
          return (
            <div key={index} className="flex border-b border-neutral-300" style={{ minHeight: 22 }}>
              <div className="w-16 shrink-0 border-r border-neutral-800" />
              <div className="w-12 shrink-0 border-r border-neutral-800" />
              <div className="flex-1 px-2 py-1 text-center text-[11px] font-bold text-neutral-900">
                {row.text}
              </div>
            </div>
          );
        }
        if (row.kind === "closing") {
          return (
            <div key={index} className="flex" style={{ minHeight: 22 }}>
              <div className="w-16 shrink-0 border-r border-neutral-800" />
              <div className="w-12 shrink-0 border-r border-neutral-800" />
              <div className="flex-1 px-3 py-1 text-right text-[11px] text-neutral-900">{row.text}</div>
            </div>
          );
        }
        return (
          <div key={index} className="flex border-b border-neutral-300" style={{ minHeight: 22 }}>
            <div className="w-16 shrink-0 border-r border-neutral-800 px-1 py-1 text-center text-[11px] text-neutral-900">
              {row.year}
            </div>
            <div className="w-12 shrink-0 border-r border-neutral-800 px-1 py-1 text-center text-[11px] text-neutral-900">
              {row.month}
            </div>
            <div className="flex-1 px-3 py-1 text-[11px] text-neutral-900">{row.text}</div>
          </div>
        );
      })}
    </div>
  );
}

function TextBox({ text }: { text: string }) {
  return (
    <div className="min-h-[110px] whitespace-pre-wrap border border-neutral-800 p-3 text-[11.5px] leading-relaxed text-neutral-900">
      {text}
    </div>
  );
}

export default function DocumentPreview({ application }: { application: SSWApplication }) {
  const { personal } = application;
  const age = calculateAge(personal.dateOfBirth);
  const historyRows = padHistoryRows(buildHistoryRows(application));
  const qualificationRows = padQualificationRows(buildQualificationRows(application));

  return (
    <div className="flex flex-col gap-6">
      {/* Page 1 */}
      <A4Stage>
        <div className="flex h-full flex-col bg-white p-[45px] font-sans">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-[0.2em] text-neutral-900">履歴書</h1>
              <p className="mt-3 text-[11px] text-neutral-600">{formatCurrentJapaneseDate()}</p>
            </div>
          </div>

          <div className="flex border border-neutral-800">
            <div className="flex-1">
              <InfoRow label="フリガナ" value={personal.nameKatakana} valueClassName="text-[10px] text-neutral-600" />
              <InfoRow label="氏名" value={personal.fullName} valueClassName="text-lg font-bold" />
              <InfoRow
                label="生年月日"
                value={
                  personal.dateOfBirth
                    ? `${formatJapaneseDateOfBirth(personal.dateOfBirth)}${age !== null ? `　（満 ${age} 歳）` : ""}`
                    : ""
                }
              />
              <InfoRow label="性別" value={genderLabel(personal.gender)} noBorder />
            </div>
            <div className="flex w-[128px] shrink-0 items-start justify-center border-l border-neutral-800 p-1">
              {personal.photo?.dataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- local data: URL preview, not an optimizable asset
                <img
                  src={personal.photo.dataUrl}
                  alt="Resume photo"
                  className="h-[152px] w-[114px] border border-neutral-800 object-cover"
                />
              ) : (
                <div className="flex h-[152px] w-[114px] items-center justify-center border border-neutral-800 text-[10px] text-neutral-400">
                  写真
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 border border-neutral-800">
            <InfoRow
              label="現住所"
              value={[personal.postalCode ? `〒${personal.postalCode}` : "", personal.currentAddress]
                .filter(Boolean)
                .join("\n")}
            />
            <InfoRow label="電話" value={personal.phone} />
            <InfoRow label="E-mail" value={personal.email} noBorder />
          </div>

          <div className="mt-4 flex-1">
            <HistoryTable title="学歴・職歴" rows={historyRows} />
          </div>
        </div>
      </A4Stage>

      {/* Page 2 */}
      <A4Stage>
        <div className="flex h-full flex-col gap-4 bg-white p-[45px] font-sans">
          <HistoryTable title="資格・免許" rows={qualificationRows} />

          <div>
            <h2 className="mb-1.5 text-[13px] font-bold text-neutral-900">志望理由</h2>
            <TextBox text={application.motivation} />
          </div>

          <div>
            <h2 className="mb-1.5 text-[13px] font-bold text-neutral-900">自己PR</h2>
            <TextBox text={application.selfPR} />
          </div>

          <div>
            <h2 className="mb-1.5 text-[13px] font-bold text-neutral-900">本人希望記入欄</h2>
            <TextBox text={application.personalRequests} />
          </div>
        </div>
      </A4Stage>
    </div>
  );
}
