import { AssociateCategory } from "./associate";

export const ASSOCIATE_CATEGORY_OPTIONS = [
  { value: AssociateCategory.VIDEO_CREATOR, label: "Video creator" },
  { value: AssociateCategory.DELIVERY_BOY, label: "Delivery boy" },
  { value: AssociateCategory.COMPANY_EMPLOYEE, label: "Company employee" },
  { value: AssociateCategory.COMMISSION_AGENT, label: "Commission agent" },
  { value: AssociateCategory.REPORTER, label: "Reporter" },

  { value: AssociateCategory.CA, label: "Chartered accountant" },
  { value: AssociateCategory.ADVOCATE, label: "Advocate" },
  { value: AssociateCategory.INTERIOR_DESIGNER, label: "Interior designer" },

  { value: AssociateCategory.DOCTOR, label: "Doctor" },
  {
    value: AssociateCategory.HOSPITAL_DIRECTOR_DOCTOR,
    label: "Hospital director",
  },
  { value: AssociateCategory.CLINIC_OWNER, label: "Clinic owner" },
  { value: AssociateCategory.MEDICAL_SHOP_OWNER, label: "Medical shop owner" },
  { value: AssociateCategory.PATHOLOGY_LAB, label: "Pathology lab" },

  { value: AssociateCategory.ANG_STORE_PARTNER, label: "ANG store partner" },
  {
    value: AssociateCategory.PRODUCT_SUPPLIES_PARTNER,
    label: "Product supplies partner",
  },
  { value: AssociateCategory.SERVICE_PROVIDER, label: "Service provider" },
  { value: AssociateCategory.AGENCY, label: "Agency" },
  { value: AssociateCategory.DISTRIBUTOR, label: "Distributor" },
  { value: AssociateCategory.CNF, label: "CNF" },
  { value: AssociateCategory.TRADING, label: "Trading" },

  { value: AssociateCategory.FACTORY_OWNER, label: "Factory owner" },

  { value: AssociateCategory.RESTAURANT_OWNER, label: "Restaurant owner" },
  {
    value: AssociateCategory.CLOUD_KITCHEN_OWNER,
    label: "Cloud kitchen owner",
  },
  { value: AssociateCategory.TEA_SHOP_OWNER, label: "Tea shop owner" },
  { value: AssociateCategory.CATERING_COOKING, label: "Catering / cooking" },

  { value: AssociateCategory.PETROL_PUMP_OWNER, label: "Petrol pump owner" },
  { value: AssociateCategory.GROCERY_SHOP_OWNER, label: "Grocery shop owner" },
  {
    value: AssociateCategory.FASHION_STORE_OWNER,
    label: "Fashion store owner",
  },
  {
    value: AssociateCategory.HARDWARE_STORE_OWNER,
    label: "Hardware store owner",
  },
  { value: AssociateCategory.CEMENT_OWNER, label: "Cement owner" },

  {
    value: AssociateCategory.CREATE_STORE_PRODUCT,
    label: "Create store product",
  },
  {
    value: AssociateCategory.CREATE_STORE_SERVICE,
    label: "Create store service",
  },
  { value: AssociateCategory.CREATE_STORE_BOTH, label: "Create store both" },

  { value: AssociateCategory.PRE_SCHOOL_OWNER, label: "Pre-school owner" },
  {
    value: AssociateCategory.MIDDLE_SCHOOL_OWNER,
    label: "Middle school owner",
  },
  { value: AssociateCategory.HIGH_SCHOOL_OWNER, label: "High school owner" },
  { value: AssociateCategory.COLLEGE_DIRECTOR, label: "College director" },
  {
    value: AssociateCategory.UNIVERSITY_DIRECTOR,
    label: "University director",
  },
  {
    value: AssociateCategory.COACHING_CENTRE_OWNER,
    label: "Coaching centre owner",
  },
  {
    value: AssociateCategory.TRAINING_INSTITUTE_OWNER,
    label: "Training institute owner",
  },

  { value: AssociateCategory.GYM_OWNER, label: "Gym owner" },
  { value: AssociateCategory.PARK_DIRECTOR, label: "Park director" },
  { value: AssociateCategory.CINEMA_HALL_OWNER, label: "Cinema hall owner" },
  { value: AssociateCategory.GARDEN, label: "Garden" },

  { value: AssociateCategory.BANK_BM_OTHERS, label: "Bank BM / Others" },
  { value: AssociateCategory.OTHERS, label: "Others" },
] as const;
