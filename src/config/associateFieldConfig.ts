import { AssociateCategory, type BusinessDetails } from "./associate";

export const BUSINESS_FIELDS_BY_CATEGORY: Partial<
  Record<AssociateCategory, (keyof BusinessDetails)[]>
> = {
  [AssociateCategory.DOCTOR]: [
    "consultationFee",
    "specialization",
    "registrationNumber",
    "website",
  ],
  [AssociateCategory.CLINIC]: [
    "consultationFee",
    "specialization",
    "registrationNumber",
    "website",
  ],
  [AssociateCategory.HOSPITAL]: ["website"],

  [AssociateCategory.RETAILER]: ["openingTime", "closingTime", "gstNumber"],
  [AssociateCategory.WHOLESALER]: ["openingTime", "closingTime", "gstNumber"],
  [AssociateCategory.SHOWROOM]: ["openingTime", "closingTime"],

  [AssociateCategory.SCHOOL]: ["website"],
  [AssociateCategory.COLLEGE]: ["website"],
  [AssociateCategory.COACHING_INSTITUTE]: ["website"],

  [AssociateCategory.CONSULTANT]: ["consultationFee", "website"],
  [AssociateCategory.LAWYER]: ["consultationFee", "registrationNumber"],
  [AssociateCategory.CA]: ["registrationNumber"],

  [AssociateCategory.CONTENT_CREATOR]: [],
  [AssociateCategory.INFLUENCER]: [],
  [AssociateCategory.NEWS_MEDIA]: [],
};
