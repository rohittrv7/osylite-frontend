import type { User } from "./user";

export interface MatrimonyFilterDto {
  gender?: string;
  state?: string;
  city?: string;
  religion?: string;
  caste?: string;
  minIncome?: string; // Changed to string to match your frontend dropdown values, or keep number if backend parses it
  minAge?: number;
  maxAge?: number;
}

export const Gender = {
  MALE: "Male",
  FEMALE: "Female",
} as const;
export type Gender = (typeof Gender)[keyof typeof Gender];

export const ProfileCreatedFor = {
  SELF: "Self",
  SON: "Son",
  DAUGHTER: "Daughter",
  BROTHER: "Brother",
  SISTER: "Ssister",
  FRIEND: "Freind",
  // RELATIVE: "RELATIVE",
} as const;
export type ProfileCreatedFor =
  (typeof ProfileCreatedFor)[keyof typeof ProfileCreatedFor];

export interface MatrimonyProfile {
  id?: string;
  user?: User;
  profileFor: ProfileCreatedFor;
  gender: Gender;
  dob: string;
  height: number;
  religion: string;
  caste?: string;
  state: string;
  city: string;
  education: string;
  occupation: string;
  annualIncome?: string;
  photos?: string[];
  bio?: string;
  isActive?: boolean;
}

export const RELIGIONS = [
  "Hindu",
  "Muslim",
  "Christian",
  "Sikh",
  "Buddhist",
  "Jain",
  "Parsi",
  "Jewish",
  "Other",
];

export const EDUCATION_LEVELS = [
  "High School",
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate/PhD",
  "Professional Degree (MD, JD, etc.)",
  "Other",
];

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
];

export const INCOME_RANGES = [
  "Below ₹2 Lakh",
  "₹2-5 Lakh",
  "₹5-10 Lakh",
  "₹10-20 Lakh",
  "₹20-50 Lakh",
  "₹50 Lakh - 1 Crore",
  "Above ₹1 Crore",
];
