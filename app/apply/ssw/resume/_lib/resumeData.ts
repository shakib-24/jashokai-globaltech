import type {
  EducationEntry,
  EmploymentType,
  HousingPreference,
  PersonalInfo,
  PreferredLocation,
  QualificationEntry,
  SSWApplication,
  SSWField,
  SSWInfo,
} from "../../_lib/types";

export type HistoryRow =
  | { kind: "heading"; text: string }
  | { kind: "entry"; year: string; month: string; text: string }
  | { kind: "closing"; text: string };

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

export function formatJapaneseDateOfBirth(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return "";
  return `${y}年 ${pad2(m)}月 ${pad2(d)}日`;
}

export function formatCurrentJapaneseDate(at: Date = new Date()): string {
  return `${at.getFullYear()}年 ${pad2(at.getMonth() + 1)}月 ${pad2(at.getDate())}日 現在`;
}

export function calculateAge(iso: string, at: Date = new Date()): number | null {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return null;
  let age = at.getFullYear() - y;
  const hadBirthdayThisYear =
    at.getMonth() + 1 > m || (at.getMonth() + 1 === m && at.getDate() >= d);
  if (!hadBirthdayThisYear) age -= 1;
  return age >= 0 ? age : null;
}

export function genderLabel(gender: PersonalInfo["gender"]): string {
  if (gender === "Male") return "男";
  if (gender === "Female") return "女";
  return "";
}

export function formatJapanesePhone(raw: string): string {
  const trimmed = (raw ?? "").trim();
  if (!trimmed) return "";
  if (!/^[0-9]+$/.test(trimmed)) return trimmed;

  if (trimmed.length === 11 && trimmed.startsWith("0")) {
    // Mobile: 090-1234-5678 / 080-... / 070-... / 050-...
    return `${trimmed.slice(0, 3)}-${trimmed.slice(3, 7)}-${trimmed.slice(7)}`;
  }
  if (trimmed.length === 10 && (trimmed.startsWith("03") || trimmed.startsWith("06"))) {
    // Tokyo / Osaka landline: 03-1234-5678
    return `${trimmed.slice(0, 2)}-${trimmed.slice(2, 6)}-${trimmed.slice(6)}`;
  }
  if (trimmed.length === 10) {
    // Other landlines: 045-123-4567 style
    return `${trimmed.slice(0, 3)}-${trimmed.slice(3, 6)}-${trimmed.slice(6)}`;
  }
  return trimmed;
}

const INVALID_TEXT_VALUES = new Set(["undefined", "null", "n/a"]);

export function cleanText(value: string | null | undefined): string {
  const trimmed = (value ?? "").trim();
  return INVALID_TEXT_VALUES.has(trimmed.toLowerCase()) ? "" : trimmed;
}

// react-pdf only wraps at word boundaries, so a long unbroken token (e.g. an email) can overflow its box — invisible zero-width spaces add break points every chunkSize characters.
export function withPdfLineBreaks(value: string, chunkSize = 8): string {
  if (!value) return value;
  const chars = Array.from(value);
  const chunks: string[] = [];
  for (let i = 0; i < chars.length; i += chunkSize) {
    chunks.push(chars.slice(i, i + chunkSize).join(""));
  }
  return chunks.join("​");
}

function sortByStart<T extends { startYear: string; startMonth: string }>(list: T[]): T[] {
  return [...list].sort((a, b) => {
    const aKey = `${a.startYear || "9999"}${(a.startMonth || "12").padStart(2, "0")}`;
    const bKey = `${b.startYear || "9999"}${(b.startMonth || "12").padStart(2, "0")}`;
    return aKey.localeCompare(bKey);
  });
}

const EDUCATION_STATUS_WORD: Record<string, string> = {
  Graduated: "卒業",
  "Currently Enrolled": "在学中",
  Withdrawn: "中退",
  Other: "その他",
};

function educationCourseLabel(entry: EducationEntry): string {
  if (!entry.courseType) return "";
  return entry.subjectMajor.trim()
    ? `${entry.courseType}（${entry.subjectMajor.trim()}）`
    : entry.courseType;
}

function educationEntryName(entry: EducationEntry): string {
  return [entry.schoolName, educationCourseLabel(entry)]
    .filter((part) => part.trim())
    .join("　");
}

const EMPLOYMENT_TYPE_LABEL: Partial<Record<EmploymentType, string>> = {
  "Full-time": "正社員",
  "Part-time": "アルバイト",
  Contract: "契約社員",
  Internship: "インターン",
};

function employmentVerbs(type: EmploymentType | ""): { start: string; end: string } {
  return type === "Part-time" ? { start: "入職", end: "退職" } : { start: "入社", end: "退社" };
}

function employmentTypeSuffix(type: EmploymentType | ""): string {
  const label = type ? EMPLOYMENT_TYPE_LABEL[type] : undefined;
  return label ? `（${label}）` : "";
}

export function buildHistoryRows(app: SSWApplication): HistoryRow[] {
  const rows: HistoryRow[] = [{ kind: "heading", text: "学歴" }];

  for (const entry of sortByStart(app.education)) {
    const name = educationEntryName(entry);
    if (entry.startYear) {
      rows.push({ kind: "entry", year: entry.startYear, month: entry.startMonth, text: `${name}　入学` });
    }
    if (entry.status && entry.status !== "Currently Enrolled" && entry.endYear) {
      const word = EDUCATION_STATUS_WORD[entry.status] ?? "卒業";
      rows.push({ kind: "entry", year: entry.endYear, month: entry.endMonth, text: `${name}　${word}` });
    }
  }

  rows.push({ kind: "heading", text: "職歴" });

  for (const entry of sortByStart(app.workExperience)) {
    const { start, end } = employmentVerbs(entry.employmentType);
    if (entry.startYear) {
      rows.push({
        kind: "entry",
        year: entry.startYear,
        month: entry.startMonth,
        text: `${entry.companyName}　${start}${employmentTypeSuffix(entry.employmentType)}`,
      });
    }
    if (entry.currentlyWorking) {
      rows.push({ kind: "entry", year: "", month: "", text: "現在に至る" });
    } else if (entry.endYear) {
      rows.push({
        kind: "entry",
        year: entry.endYear,
        month: entry.endMonth,
        text: `${entry.companyName}　${end}`,
      });
    }
  }

  rows.push({ kind: "closing", text: "以上" });
  return rows;
}

export function padHistoryRows(rows: HistoryRow[], minRows = 12): HistoryRow[] {
  const closingIndex = rows.findIndex((row) => row.kind === "closing");
  const body = closingIndex === -1 ? rows : rows.slice(0, closingIndex);
  const closing = closingIndex === -1 ? [] : rows.slice(closingIndex);
  const padded = [...body];
  while (padded.length < minRows) {
    padded.push({ kind: "entry", year: "", month: "", text: "" });
  }
  return [...padded, ...closing];
}

const NON_TEST_QUALIFICATION_TYPES = new Set<QualificationEntry["type"]>([
  "Driving License",
  "Other",
]);

export function buildQualificationRows(app: SSWApplication): HistoryRow[] {
  const sorted = [...app.qualifications]
    .filter((q) => q.datePassed)
    .sort((a, b) => a.datePassed.localeCompare(b.datePassed));

  return sorted.map((q) => {
    const [year, month] = q.datePassed.split("-");
    const verb = NON_TEST_QUALIFICATION_TYPES.has(q.type) ? "取得" : "合格";
    const namePart = [q.type, q.name].filter((part) => part.trim()).join("　");
    const levelPart = q.level ? `　${q.level}` : "";
    return { kind: "entry" as const, year, month, text: `${namePart}${levelPart}　${verb}` };
  });
}

export function padQualificationRows(rows: HistoryRow[], minRows = 4): HistoryRow[] {
  const padded = [...rows];
  while (padded.length < minRows) {
    padded.push({ kind: "entry", year: "", month: "", text: "" });
  }
  return padded;
}

const SSW_FIELD_LABEL: Partial<Record<SSWField, string>> = {
  "Nursing Care": "介護",
  Agriculture: "農業",
  "Food Service": "外食業",
  "Food Manufacturing": "飲食料品製造業",
  "Building Cleaning": "ビルクリーニング",
  Construction: "建設",
  Accommodation: "宿泊",
  Other: "その他",
};

const HOUSING_PREFERENCE_LABEL: Partial<Record<HousingPreference, string>> = {
  "Company Housing Preferred": "会社寮希望",
  "Partial Housing Support Preferred": "住宅補助希望",
  "Self-arranged Housing Possible": "自己手配可",
  "No Preference": "特になし",
};

const PREFERRED_LOCATION_LABEL: Partial<Record<PreferredLocation, string>> = {
  Tokyo: "東京都",
  Chiba: "千葉県",
  Saitama: "埼玉県",
  Kanagawa: "神奈川県",
  Osaka: "大阪府",
  Aichi: "愛知県",
  Fukuoka: "福岡県",
  Hokkaido: "北海道",
  "Anywhere in Japan": "全国可",
};

function preferredLocationText(ssw: SSWInfo): string {
  if (ssw.preferredLocation === "Other") return ssw.preferredLocationOther.trim();
  if (!ssw.preferredLocation) return "";
  return PREFERRED_LOCATION_LABEL[ssw.preferredLocation] ?? "";
}

function toManYen(amount: number): string {
  const man = amount / 10000;
  const formatted = Number.isInteger(man) ? String(man) : man.toFixed(1).replace(/\.0$/, "");
  return `${formatted}万円`;
}

export function formatManYen(value: string): string {
  const [first, second] = (value ?? "").split("-");
  const firstAmount = Number(first);
  if (!first || !Number.isFinite(firstAmount) || firstAmount <= 0) return "";

  const secondAmount = Number(second);
  if (!second || !Number.isFinite(secondAmount) || secondAmount <= 0) {
    return `月給${toManYen(firstAmount)}`;
  }
  return `月給${toManYen(firstAmount)}～${toManYen(secondAmount)}`;
}

export function buildPersonalRequestsText(app: SSWApplication): string {
  const { ssw } = app;
  const lines: string[] = [];

  const fieldLabel = ssw.desiredField ? SSW_FIELD_LABEL[ssw.desiredField] : undefined;
  if (fieldLabel) lines.push(`希望職種：${fieldLabel}`);

  const salary = formatManYen(ssw.desiredSalary);
  if (salary) lines.push(`希望給与：${salary}`);

  const locationText = preferredLocationText(ssw);
  if (locationText) lines.push(`希望勤務地：${locationText}`);

  const housingLabel = ssw.housingPreference ? HOUSING_PREFERENCE_LABEL[ssw.housingPreference] : undefined;
  if (housingLabel) lines.push(`住宅希望：${housingLabel}`);

  return lines.length > 0 ? lines.join("\n") : "特になし";
}
