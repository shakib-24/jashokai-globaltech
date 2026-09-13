import type {
  EducationEntry,
  PersonalInfo,
  QualificationEntry,
  SSWApplication,
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
    if (entry.startYear) {
      rows.push({
        kind: "entry",
        year: entry.startYear,
        month: entry.startMonth,
        text: `${entry.companyName}　入社`,
      });
    }
    if (entry.currentlyWorking) {
      rows.push({ kind: "entry", year: "", month: "", text: "現在に至る" });
    } else if (entry.endYear) {
      rows.push({
        kind: "entry",
        year: entry.endYear,
        month: entry.endMonth,
        text: `${entry.companyName}　退社`,
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

export type SSWSummaryRow = { label: string; value: string };

function dashIfEmpty(value?: string): string {
  return value && value.trim() ? value : "—";
}

export function buildSSWSummaryRows(ssw: SSWInfo): SSWSummaryRow[] {
  const rows: SSWSummaryRow[] = [
    { label: "Desired SSW Field", value: dashIfEmpty(ssw.desiredField) },
    { label: "Desired Monthly Salary", value: dashIfEmpty(ssw.desiredSalary) },
    { label: "Preferred Work Location", value: dashIfEmpty(ssw.preferredLocation) },
    { label: "Housing Preference", value: dashIfEmpty(ssw.housingPreference) },
    { label: "Available Start Date", value: dashIfEmpty(ssw.availableStartDate) },
    { label: "Currently in Japan?", value: dashIfEmpty(ssw.currentlyInJapan) },
  ];
  if (ssw.currentlyInJapan === "Yes") {
    rows.push({ label: "Current Visa / Residence Status", value: dashIfEmpty(ssw.currentVisaStatus) });
  }
  rows.push({ label: "Passport Number", value: dashIfEmpty(ssw.passportNumber) });
  return rows;
}
