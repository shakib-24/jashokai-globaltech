import type { SSWApplication } from "../../_lib/types";
import {
  buildHistoryRows,
  buildPersonalRequestsText,
  buildQualificationRows,
  calculateAge,
  cleanText,
  formatCurrentJapaneseDate,
  formatJapaneseDateOfBirth,
  formatJapanesePhone,
  genderLabel,
  padHistoryRows,
  padQualificationRows,
  type HistoryRow,
} from "../_lib/resumeData";
import A4Stage from "./A4Stage";

function TopInfoBlock({
  personal,
  age,
}: {
  personal: SSWApplication["personal"];
  age: number | null;
}) {
  return (
    <div className="flex border border-black">
      <div className="flex flex-1 flex-col">
        <div className="flex border-b border-black" style={{ minHeight: 30 }}>
          <div className="flex w-[91px] shrink-0 items-center border-r border-black px-2 text-[9px] text-neutral-600">
            フリガナ
          </div>
          <div className="flex flex-1 items-center px-2 text-[11px] tracking-wide text-neutral-700">
            {personal.nameKatakana}
          </div>
        </div>
        <div className="flex border-b border-black" style={{ minHeight: 68 }}>
          <div className="flex w-[91px] shrink-0 items-center border-r border-black px-2 text-[9px] text-neutral-600">
            氏　名
          </div>
          <div className="flex flex-1 items-center px-3 text-2xl font-bold tracking-wide text-black">
            {personal.fullName}
          </div>
        </div>
        <div className="flex" style={{ minHeight: 53 }}>
          <div className="flex w-[91px] shrink-0 items-center border-r border-black px-2 text-[9px] text-neutral-600">
            生年月日
          </div>
          <div className="flex flex-1 items-center px-2 text-[11.5px] text-black">
            {personal.dateOfBirth
              ? `${formatJapaneseDateOfBirth(personal.dateOfBirth)}${
                  age !== null ? `　（満 ${age} 歳）` : ""
                }`
              : ""}
          </div>
          <div className="flex w-[50px] shrink-0 items-center justify-center border-l border-black text-[9px] text-neutral-600">
            性別
          </div>
          <div className="flex w-14 shrink-0 items-center justify-center text-[13px] font-semibold text-black">
            {genderLabel(personal.gender)}
          </div>
        </div>
      </div>
      <div className="flex w-[122px] shrink-0 flex-col items-center justify-start border-l border-black p-1">
        {personal.photo?.dataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- local data: URL preview, not an optimizable asset
          <img
            src={personal.photo.dataUrl}
            alt="Resume photo"
            className="h-[151px] w-[113px] border border-black object-cover"
          />
        ) : (
          <div className="flex h-[151px] w-[113px] flex-col items-center justify-center gap-1 border border-black text-center text-[9px] leading-snug text-neutral-400">
            <span>写真</span>
            <span>4cm×3cm</span>
          </div>
        )}
      </div>
    </div>
  );
}

function AddressBlock({ personal }: { personal: SSWApplication["personal"] }) {
  return (
    <div className="mt-3 border border-black">
      <div className="flex border-b border-black" style={{ minHeight: 24 }}>
        <div className="flex w-[91px] shrink-0 items-center border-r border-black px-2 text-[9px] text-neutral-600">
          フリガナ
        </div>
        {/* Address furigana isn't collected by the application form yet — intentionally left blank rather than derived. */}
        <div className="flex-1" />
      </div>
      <div className="flex" style={{ minHeight: 90 }}>
        <div className="flex flex-1 flex-col">
          <div className="border-b border-black px-2 pt-1 text-[9px] text-neutral-600">現住所</div>
          <div className="flex-1 whitespace-pre-line px-3 py-1.5 text-[12px] leading-relaxed text-black">
            {[personal.postalCode ? `〒${personal.postalCode}` : "", personal.currentAddress]
              .filter(Boolean)
              .join("\n")}
          </div>
        </div>
        <div className="flex w-[160px] shrink-0 flex-col border-l border-black">
          <div className="flex min-w-0 flex-1 flex-col justify-center border-b border-black px-2 py-1">
            <span className="text-[9px] text-neutral-600">電話</span>
            <span className="mt-0.5 min-w-0 text-[11px] text-black">
              {formatJapanesePhone(personal.phone)}
            </span>
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center px-2 py-1">
            <span className="text-[9px] text-neutral-600">E-mail</span>
            <span
              className="mt-0.5 min-w-0 whitespace-normal break-all text-[11px] text-black [overflow-wrap:anywhere]"
            >
              {personal.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactBlock() {
  return (
    <div className="mt-3 border border-black">
      <div className="flex flex-wrap items-baseline gap-x-2 border-b border-black bg-neutral-100 px-2 py-1">
        <span className="text-[10px] font-bold text-black">連絡先</span>
        <span className="text-[8px] text-neutral-600">（現住所以外に連絡を希望する場合のみ記入）</span>
      </div>
      <div className="flex items-center px-3 text-[11px] text-black" style={{ minHeight: 34 }}>
        同上
      </div>
    </div>
  );
}

function HistoryTable({ title, rows }: { title: string; rows: HistoryRow[] }) {
  return (
    <div className="border border-black">
      <div className="flex border-b border-black bg-neutral-100 text-[11px] font-bold text-black">
        <div className="w-16 shrink-0 border-r border-black px-2 py-1.5 text-center">年</div>
        <div className="w-12 shrink-0 border-r border-black px-2 py-1.5 text-center">月</div>
        <div className="flex-1 px-2 py-1.5 text-center">{title}</div>
      </div>
      {rows.map((row, index) => {
        if (row.kind === "heading") {
          return (
            <div key={index} className="flex border-b border-neutral-400" style={{ minHeight: 22 }}>
              <div className="w-16 shrink-0 border-r border-black" />
              <div className="w-12 shrink-0 border-r border-black" />
              <div className="flex-1 px-2 py-1 text-center text-[11px] font-bold text-black">
                {row.text}
              </div>
            </div>
          );
        }
        if (row.kind === "closing") {
          return (
            <div key={index} className="flex" style={{ minHeight: 22 }}>
              <div className="w-16 shrink-0 border-r border-black" />
              <div className="w-12 shrink-0 border-r border-black" />
              <div className="flex-1 px-3 py-1 text-right text-[11px] text-black">{row.text}</div>
            </div>
          );
        }
        return (
          <div key={index} className="flex border-b border-neutral-400" style={{ minHeight: 22 }}>
            <div className="w-16 shrink-0 border-r border-black px-1 py-1 text-center text-[11px] text-black">
              {row.year}
            </div>
            <div className="w-12 shrink-0 border-r border-black px-1 py-1 text-center text-[11px] text-black">
              {row.month}
            </div>
            <div className="flex-1 px-3 py-1 text-[11px] text-black">{row.text}</div>
          </div>
        );
      })}
    </div>
  );
}

function HeadingTextBox({ heading, note, text }: { heading: string; note?: string; text: string }) {
  return (
    <div className="border border-black">
      <div className="border-b border-black bg-neutral-100 px-3 py-1.5">
        <p className="text-[12px] font-bold text-black">{heading}</p>
        {note && <p className="mt-0.5 text-[8.5px] leading-snug text-neutral-600">{note}</p>}
      </div>
      <div className="min-h-[90px] whitespace-pre-wrap p-3 text-[11.5px] leading-relaxed text-black">
        {text}
      </div>
    </div>
  );
}

const REQUEST_GRID_ROWS = 5;

function RequestGridBox({ heading, note, text }: { heading: string; note?: string; text: string }) {
  const lines = text.split("\n").filter((line) => line.trim().length > 0);
  const rows = Array.from({ length: REQUEST_GRID_ROWS }, (_, i) => lines[i] ?? "");

  return (
    <div className="border border-black">
      <div className="border-b border-black bg-neutral-100 px-3 py-1.5">
        <p className="text-[12px] font-bold text-black">{heading}</p>
        {note && <p className="mt-0.5 text-[8.5px] leading-snug text-neutral-600">{note}</p>}
      </div>
      {rows.map((line, index) => (
        <div
          key={index}
          className={`flex items-center px-3 text-[11.5px] text-black ${
            index < rows.length - 1 ? "border-b border-neutral-400" : ""
          }`}
          style={{ minHeight: 26 }}
        >
          {line}
        </div>
      ))}
    </div>
  );
}

export default function DocumentPreview({ application }: { application: SSWApplication }) {
  const { personal } = application;
  const age = calculateAge(personal.dateOfBirth);
  const historyRows = padHistoryRows(buildHistoryRows(application));
  const qualificationRows = padQualificationRows(buildQualificationRows(application), 6);

  return (
    <div className="flex flex-col gap-6">
      {/* Page 1 */}
      <A4Stage>
        <div className="flex h-full flex-col bg-white p-[42px] font-sans">
          <div className="mb-4 flex items-start justify-between">
            <h1 className="text-4xl font-bold tracking-[0.3em] text-black">履歴書</h1>
            <p className="mt-2 text-[11px] text-neutral-700">{formatCurrentJapaneseDate()}</p>
          </div>

          <TopInfoBlock personal={personal} age={age} />
          <AddressBlock personal={personal} />
          <ContactBlock />

          <div className="mt-4 flex-1">
            <HistoryTable title="学歴・職歴" rows={historyRows} />
          </div>
        </div>
      </A4Stage>

      {/* Page 2 */}
      <A4Stage>
        <div className="flex h-full flex-col gap-4 bg-white p-[42px] font-sans">
          <HistoryTable title="資格・免許" rows={qualificationRows} />

          <HeadingTextBox heading="志望理由" text={cleanText(application.motivation)} />
          <HeadingTextBox heading="自己PR" text={cleanText(application.selfPR)} />
          <RequestGridBox
            heading="本人希望記入欄"
            note="（特に給料・職種・勤務時間・勤務地・その他についての希望などがあれば記入）"
            text={buildPersonalRequestsText(application)}
          />
        </div>
      </A4Stage>
    </div>
  );
}
