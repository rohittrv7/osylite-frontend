export const AssociateCategory = {
  CONTENT_CREATOR: "content_creator",
  INFLUENCER: "influencer",
  NEWS_MEDIA: "news_media",

  DOCTOR: "doctor",
  CLINIC: "clinic",
  HOSPITAL: "hospital",

  RETAILER: "retailer",
  WHOLESALER: "wholesaler",
  SHOWROOM: "showroom",

  SCHOOL: "school",
  COLLEGE: "college",
  COACHING_INSTITUTE: "coaching_institute",

  CONSULTANT: "consultant",
  LAWYER: "lawyer",
  CA: "chartered_accountant",
} as const;

export type AssociateCategory =
  (typeof AssociateCategory)[keyof typeof AssociateCategory];

export type BusinessDetails = {
  website?: string;
  openingTime?: string;
  closingTime?: string;
  gstNumber?: string;
  consultationFee?: number;
  specialization?: string;
  registrationNumber?: string;
};
