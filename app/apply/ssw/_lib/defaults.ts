import type {
  EducationEntry,
  QualificationEntry,
  SSWApplication,
  WorkEntry,
} from "./types";

let idCounter = 0;

export function createId(): string {
  idCounter += 1;
  return `${Date.now()}-${idCounter}`;
}

export function createEmptyEducationEntry(): EducationEntry {
  return {
    id: createId(),
    schoolName: "",
    country: "",
    department: "",
    startYear: "",
    startMonth: "",
    endYear: "",
    endMonth: "",
    status: "",
  };
}

export function createEmptyWorkEntry(): WorkEntry {
  return {
    id: createId(),
    companyName: "",
    country: "",
    jobTitle: "",
    employmentType: "",
    startYear: "",
    startMonth: "",
    endYear: "",
    endMonth: "",
    currentlyWorking: false,
    description: "",
  };
}

export function createEmptyQualificationEntry(): QualificationEntry {
  return {
    id: createId(),
    type: "",
    name: "",
    level: "",
    datePassed: "",
    certificateNumber: "",
    certificate: null,
  };
}

export function createEmptyApplication(): SSWApplication {
  return {
    personal: {
      fullName: "",
      nameKatakana: "",
      dateOfBirth: "",
      gender: "",
      nationality: "",
      currentAddress: "",
      postalCode: "",
      phone: "",
      email: "",
      photo: null,
    },
    education: [],
    workExperience: [],
    qualifications: [],
    ssw: {
      desiredField: "",
      desiredSalary: "",
      preferredLocation: "",
      housingPreference: "",
      availableStartDate: "",
      currentlyInJapan: "",
      currentVisaStatus: "",
      passportNumber: "",
    },
    motivation: "",
    selfPR: "",
    personalRequests: "",
  };
}
