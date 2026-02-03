export const JobType = {
  FULL_TIME: "Full Time",
  PART_TIME: "Part Time",
  WORK_FROM_HOME: "Work From Home",
  INTERNSHIP: "Internship",
} as const;
export type JobType = (typeof JobType)[keyof typeof JobType];

export interface JobPost {
  roleCategory: string;
  city: string;
  state: string;
  minSalary: number;
  maxSalary?: number;
  jobType: JobType;
  jobTitle: string;
  companyName: string;
  description: string;
  skills: string[];
  experienceRequired: string;
}

export interface JobProfile {
  currentJobTitle: string;
  highestQualification: string;
  totalExperienceYears: number;
  skills: string[];
  resumeUrl?: string;
  workHistory?: Array<{
    company: string;
    role: string;
    startDate: string;
    endDate: string;
  }>;
}

export const JOB_CATEGORIES = [
  "IT / Software",
  "Sales / Marketing",
  "Accounting / Finance",
  "Driver",
  "Delivery",
  "Teacher / Tutor",
  "Healthcare / Medical",
  "Customer Support",
  "HR / Admin",
  "Engineering",
  "Retail",
  "Hospitality",
  "Security",
  "Construction",
  "Other",
];

export const QUALIFICATIONS = [
  "10th Pass",
  "12th Pass",
  "ITI",
  "Diploma",
  "Graduate",
  "Post Graduate",
  "PhD",
  "Other",
];

export const EXPERIENCE_OPTIONS = [
  "Fresher",
  "0-1 Years",
  "1-2 Years",
  "2-3 Years",
  "3-5 Years",
  "5-7 Years",
  "7-10 Years",
  "10+ Years",
];

export const SALARY_RANGES = [
  "₹5,000 - ₹10,000",
  "₹10,000 - ₹15,000",
  "₹15,000 - ₹20,000",
  "₹20,000 - ₹30,000",
  "₹30,000 - ₹50,000",
  "₹50,000 - ₹75,000",
  "₹75,000 - ₹1 Lakh",
  "₹1 Lakh+",
];
