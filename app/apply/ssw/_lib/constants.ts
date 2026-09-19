import type {
  EducationCourseType,
  EducationStatus,
  EmploymentType,
  HousingPreference,
  PreferredLocation,
  QualificationType,
  SSWField,
} from "./types";

export const STEP_LABELS = [
  "Personal",
  "Education",
  "Work",
  "Qualifications",
  "SSW Info",
  "Motivation",
  "Review",
] as const;

export const GENDER_OPTIONS = ["Male", "Female"] as const;

export const EDUCATION_STATUS_OPTIONS: EducationStatus[] = [
  "Graduated",
  "Currently Enrolled",
  "Withdrawn",
  "Other",
];

export const EDUCATION_COURSE_TYPE_OPTIONS: EducationCourseType[] = [
  "SSC",
  "HSC",
  "Diploma",
  "Honours",
  "Bachelor",
  "Master",
  "Other",
];

export const SUBJECT_MAJOR_COURSE_TYPES: EducationCourseType[] = [
  "Honours",
  "Bachelor",
  "Master",
];

export const EMPLOYMENT_TYPE_OPTIONS: EmploymentType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Other",
];

export const QUALIFICATION_TYPE_OPTIONS: QualificationType[] = [
  "JLPT",
  "JFT-Basic",
  "NAT-TEST",
  "SSW Skill Test",
  "Nursing Care Skills Evaluation Test",
  "Nursing Care Japanese Language Evaluation Test",
  "Agriculture Skill Test",
  "Driving License",
  "Other",
];

export const SSW_FIELD_OPTIONS: SSWField[] = [
  "Nursing Care",
  "Agriculture",
  "Food Service",
  "Food Manufacturing",
  "Building Cleaning",
  "Construction",
  "Accommodation",
  "Other",
];

export const HOUSING_PREFERENCE_OPTIONS: HousingPreference[] = [
  "Company Housing Preferred",
  "Partial Housing Support Preferred",
  "Self-arranged Housing Possible",
  "No Preference",
];

export const PREFERRED_LOCATION_OPTIONS: PreferredLocation[] = [
  "Tokyo",
  "Chiba",
  "Saitama",
  "Kanagawa",
  "Osaka",
  "Aichi",
  "Fukuoka",
  "Hokkaido",
  "Anywhere in Japan",
  "Other",
];

const QUALIFICATION_LEVEL_OPTIONS_BY_TYPE: Partial<Record<QualificationType, string[]>> = {
  JLPT: ["N5", "N4", "N3", "N2", "N1"],
  "JFT-Basic": ["JFT-Basic", "Passed"],
  "NAT-TEST": ["5Q", "4Q", "3Q", "2Q", "1Q"],
};

export const DEFAULT_QUALIFICATION_LEVEL_OPTIONS = ["Passed", "Other"];

export function getQualificationLevelOptions(type: QualificationType | ""): string[] {
  if (!type) return [];
  return QUALIFICATION_LEVEL_OPTIONS_BY_TYPE[type] ?? DEFAULT_QUALIFICATION_LEVEL_OPTIONS;
}

export const MONTH_OPTIONS = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
] as const;

const CURRENT_YEAR = new Date().getFullYear();

export function getYearOptions(startOffset = 60, endOffset = 1): string[] {
  const years: string[] = [];
  for (let y = CURRENT_YEAR + endOffset; y >= CURRENT_YEAR - startOffset; y--) {
    years.push(String(y));
  }
  return years;
}

export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
export const MAX_CERTIFICATE_SIZE_BYTES = 8 * 1024 * 1024;

export const STORAGE_KEY = "jashokai_ssw_application_v1";
