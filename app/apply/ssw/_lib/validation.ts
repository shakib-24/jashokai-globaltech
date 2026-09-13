import type {
  EducationEntry,
  FieldErrors,
  PersonalInfo,
  QualificationEntry,
  SSWApplication,
  SSWInfo,
  WorkEntry,
} from "./types";

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const KATAKANA_PATTERN = /^[゠-ヿー・\s]+$/u;

export type ListErrors = {
  listError?: string;
  entries: Record<string, FieldErrors>;
};

export function validatePersonal(p: PersonalInfo): FieldErrors {
  const errors: FieldErrors = {};
  if (!p.fullName.trim()) errors.fullName = "Full name is required.";
  if (!p.nameKatakana.trim()) {
    errors.nameKatakana = "Name in Katakana is required.";
  } else if (!KATAKANA_PATTERN.test(p.nameKatakana.trim())) {
    errors.nameKatakana = "Please enter the name using Katakana characters only.";
  }
  if (!p.dateOfBirth) errors.dateOfBirth = "Date of birth is required.";
  if (!p.gender) errors.gender = "Please select an option.";
  if (!p.nationality.trim()) errors.nationality = "Nationality is required.";
  if (!p.currentAddress.trim())
    errors.currentAddress = "Current address is required.";
  if (!p.phone.trim()) errors.phone = "Phone number is required.";
  if (!p.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_PATTERN.test(p.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  return errors;
}

export function validateEducationEntry(e: EducationEntry): FieldErrors {
  const errors: FieldErrors = {};
  if (!e.schoolName.trim()) errors.schoolName = "School / institution name is required.";
  if (!e.startYear) errors.startYear = "Start year is required.";
  if (!e.startMonth) errors.startMonth = "Start month is required.";
  if (!e.status) errors.status = "Please select a status.";
  if (e.status && e.status !== "Currently Enrolled") {
    if (!e.endYear) errors.endYear = "End year is required.";
    if (!e.endMonth) errors.endMonth = "End month is required.";
  }
  return errors;
}

export function validateEducation(list: EducationEntry[]): ListErrors {
  const entries: Record<string, FieldErrors> = {};
  list.forEach((entry) => {
    const entryErrors = validateEducationEntry(entry);
    if (Object.keys(entryErrors).length > 0) entries[entry.id] = entryErrors;
  });
  return {
    listError: list.length === 0 ? "Please add at least one education record." : undefined,
    entries,
  };
}

export function validateWorkEntry(w: WorkEntry): FieldErrors {
  const errors: FieldErrors = {};
  if (!w.companyName.trim()) errors.companyName = "Company / organization name is required.";
  if (!w.country.trim()) errors.country = "Country is required.";
  if (!w.jobTitle.trim()) errors.jobTitle = "Job title / position is required.";
  if (!w.employmentType) errors.employmentType = "Please select an employment type.";
  if (!w.startYear) errors.startYear = "Start year is required.";
  if (!w.startMonth) errors.startMonth = "Start month is required.";
  if (!w.currentlyWorking) {
    if (!w.endYear) errors.endYear = "End year is required.";
    if (!w.endMonth) errors.endMonth = "End month is required.";
  }
  return errors;
}

export function validateWork(list: WorkEntry[]): ListErrors {
  const entries: Record<string, FieldErrors> = {};
  list.forEach((entry) => {
    const entryErrors = validateWorkEntry(entry);
    if (Object.keys(entryErrors).length > 0) entries[entry.id] = entryErrors;
  });
  return { entries };
}

export function validateQualificationEntry(q: QualificationEntry): FieldErrors {
  const errors: FieldErrors = {};
  if (!q.type) errors.type = "Please select a qualification type.";
  if (!q.name.trim()) errors.name = "Qualification / certificate name is required.";
  if (!q.datePassed) errors.datePassed = "Date passed / obtained is required.";
  return errors;
}

export function validateQualifications(list: QualificationEntry[]): ListErrors {
  const entries: Record<string, FieldErrors> = {};
  list.forEach((entry) => {
    const entryErrors = validateQualificationEntry(entry);
    if (Object.keys(entryErrors).length > 0) entries[entry.id] = entryErrors;
  });
  return { entries };
}

export function validateSSWInfo(s: SSWInfo): FieldErrors {
  const errors: FieldErrors = {};
  if (!s.desiredField) errors.desiredField = "Please select a desired SSW field.";
  return errors;
}

export function validateMotivation(app: SSWApplication): FieldErrors {
  const errors: FieldErrors = {};
  if (!app.motivation.trim()) errors.motivation = "Please share your motivation.";
  if (!app.selfPR.trim()) errors.selfPR = "Please share your self PR.";
  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function hasListErrors(errors: ListErrors): boolean {
  return Boolean(errors.listError) || Object.keys(errors.entries).length > 0;
}
