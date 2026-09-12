export type UploadedFile = {
  name: string;
  size: number;
  type: string;
  dataUrl: string;
};

export type Gender = "Male" | "Female" | "Prefer not to say";

export type PersonalInfo = {
  fullName: string;
  nameKatakana: string;
  dateOfBirth: string;
  gender: Gender | "";
  nationality: string;
  currentAddress: string;
  postalCode: string;
  phone: string;
  email: string;
  photo: UploadedFile | null;
};

export type EducationStatus =
  | "Graduated"
  | "Currently Enrolled"
  | "Withdrawn"
  | "Other";

export type EducationEntry = {
  id: string;
  schoolName: string;
  country: string;
  department: string;
  startYear: string;
  startMonth: string;
  endYear: string;
  endMonth: string;
  status: EducationStatus | "";
};

export type EmploymentType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Internship"
  | "Other";

export type WorkEntry = {
  id: string;
  companyName: string;
  country: string;
  jobTitle: string;
  employmentType: EmploymentType | "";
  startYear: string;
  startMonth: string;
  endYear: string;
  endMonth: string;
  currentlyWorking: boolean;
  description: string;
};

export type QualificationType =
  | "JLPT"
  | "JFT-Basic"
  | "NAT-TEST"
  | "SSW Skill Test"
  | "Nursing Care Skills Evaluation Test"
  | "Nursing Care Japanese Language Evaluation Test"
  | "Agriculture Skill Test"
  | "Driving License"
  | "Other";

export type QualificationEntry = {
  id: string;
  type: QualificationType | "";
  name: string;
  level: string;
  datePassed: string;
  certificateNumber: string;
  certificate: UploadedFile | null;
};

export type SSWField =
  | "Nursing Care"
  | "Agriculture"
  | "Food Service"
  | "Food Manufacturing"
  | "Building Cleaning"
  | "Construction"
  | "Accommodation"
  | "Other";

export type HousingPreference =
  | "Company Housing Preferred"
  | "Partial Housing Support Preferred"
  | "Self-arranged Housing Possible"
  | "No Preference";

export type VisaStatus =
  | "Student"
  | "Engineer / Specialist in Humanities / International Services"
  | "Technical Intern Training"
  | "Specified Skilled Worker"
  | "Dependent"
  | "Other";

export type SSWInfo = {
  desiredField: SSWField | "";
  desiredSalary: string;
  preferredLocation: string;
  housingPreference: HousingPreference | "";
  availableStartDate: string;
  currentlyInJapan: "Yes" | "No" | "";
  currentVisaStatus: VisaStatus | "";
  passportNumber: string;
};

export type SSWApplication = {
  personal: PersonalInfo;
  education: EducationEntry[];
  workExperience: WorkEntry[];
  qualifications: QualificationEntry[];
  ssw: SSWInfo;
  motivation: string;
  selfPR: string;
  personalRequests: string;
};

export const STEP_KEYS = [
  "personal",
  "education",
  "work",
  "qualifications",
  "ssw",
  "motivation",
  "review",
] as const;

export type StepKey = (typeof STEP_KEYS)[number];

export type FieldErrors = Record<string, string>;
