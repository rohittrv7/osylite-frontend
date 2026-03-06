export type KycDocuments = {
  aadharNumber: string;
  panNumber: string;
  gstNumber?: string;
};

export type AssociateApplyPayload = {
  // Required
  category: AssociateCategory;
  address: string;
  city: string;
  state: string;
  pincode: string;
  businessMobile: string;

  // Optional common
  subCategory?: string;
  businessName?: string;
  latitude?: number;
  longitude?: number;

  // Trade / Manufacturing
  unitNo?: string;
  brand?: string;
  typeOfProduct?: string;

  // Medical
  registrationNumber?: string;
  specialization?: string;

  // Education
  board?: string;
  universityAffiliation?: string;

  // Banking
  branchCode?: string;
  govtOrPvt?: "govt" | "pvt";

  // Food
  fssaiLicense?: string;

  // Creator
  channelName?: string;

  // Delivery
  vehicleType?: string;
  deliveryLocation?: string;

  // Business Info
  website?: string;
  openingTime?: string;
  closingTime?: string;
  offDays?: string[];
  gstNumber?: string;

  // KYC
  kycDocuments?: KycDocuments;
};

export type ApiErrorResponse = {
  statusCode: number;
  message: string | string[];
  error: string;
};

export const AssociateCategory = {
  // --- Individual / Freelancer ---
  VIDEO_CREATOR: "video_creator",
  DELIVERY_BOY: "delivery_boy",
  COMPANY_EMPLOYEE: "company_employee",
  COMMISSION_AGENT: "commission_agent",
  REPORTER: "reporter",

  // --- Professional Services ---
  CA: "chartered_accountant",
  ADVOCATE: "advocate",
  INTERIOR_DESIGNER: "interior_designer",
  LEGAL_SERVICE: "legal_service",
  TAX_FILING: "tax_filing",

  // --- Medical ---
  DOCTOR: "doctor",
  HOSPITAL_DIRECTOR_DOCTOR: "hospital_director",
  CLINIC_OWNER: "clinic_owner",
  MEDICAL_SHOP_OWNER: "medical_shop_owner",
  PATHOLOGY_LAB: "pathology_lab",
  NURSE_MEDICAL_SERVICE: "nurse_medical_service",
  HEALTH_CARE: "health_care",

  // --- Partners & Supply Chain ---
  ANG_STORE_PARTNER: "ang_store_partner",
  PRODUCT_SUPPLIES_PARTNER: "product_supplies_partner",
  SERVICE_PROVIDER: "service_provider",
  AGENCY: "agency",
  DISTRIBUTOR: "distributor",
  CNF: "cnf",
  TRADING: "trading",
  PACKING_SOLUTIONS: "packing_solutions",

  // --- Manufacturing & Industrial ---
  FACTORY_OWNER: "factory_owner",
  INDUSTRIAL_MATERIALS: "industrial_materials",
  MACHINERY_TOOLS: "machinery_tools",

  // --- Food & Hospitality ---
  RESTAURANT_OWNER: "restaurant_owner",
  CLOUD_KITCHEN_OWNER: "cloud_kitchen_owner",
  TEA_SHOP_OWNER: "tea_shop_owner",
  CATERING_COOKING: "catering_cooking",
  ORDER_FOOD: "order_food",

  // --- Retail & Shops ---
  PETROL_PUMP_OWNER: "petrol_pump_owner",
  GROCERY_SHOP_OWNER: "grocery_shop_owner",
  FASHION_STORE_OWNER: "fashion_store_owner",
  HARDWARE_STORE_OWNER: "hardware_store_owner",
  CEMENT_OWNER: "cement_owner",
  CREATE_STORE_PRODUCT: "create_store_product",
  CREATE_STORE_SERVICE: "create_store_service",
  CREATE_STORE_BOTH: "create_store_both",
  B2B_PRODUCTS: "b2b_products",
  ELECTRONICS_STORE: "electronics_store",
  FURNITURE_STORE: "furniture_store",
  TOYS_BABY_STORE: "toys_baby_store",
  STATIONARY_STORE: "stationary_store",
  REFURBISHED_ITEMS: "refurbished_items",
  SPORTS_GOODS: "sports_goods",
  OLD_CARS_BIKES: "old_cars_bikes",
  STONE_PRODUCTS: "stone_products",
  TILES_MARBLES: "tiles_marbles",
  HAND_MADE_ITEMS: "hand_made_items",
  UPVC_DOORS: "upvc_doors",

  // --- Tech & Construction ---
  WEBSITE_DEVELOPMENT: "website_development",
  SOFTWARE_SERVICE: "software_service",
  CONSTRUCTION_SERVICE: "construction_service",
  CONSTRUCTION_PRODUCT: "construction_product",
  LABORATORY: "laboratory",

  // --- Education ---
  PRE_SCHOOL_OWNER: "pre_school_owner",
  MIDDLE_SCHOOL_OWNER: "middle_school_owner",
  HIGH_SCHOOL_OWNER: "high_school_owner",
  COLLEGE_DIRECTOR: "college_director",
  UNIVERSITY_DIRECTOR: "university_director",
  COACHING_CENTRE_OWNER: "coaching_centre_owner",
  TRAINING_INSTITUTE_OWNER: "training_institute_owner",

  // --- Entertainment & Leisure ---
  GYM_OWNER: "gym_owner",
  PARK_DIRECTOR: "park_director",
  CINEMA_HALL_OWNER: "cinema_hall_owner",
  GARDEN: "garden",

  // --- Financial & Others ---
  BANK_BM_OTHERS: "bank_bm_others",
  COURIER_BOOK: "Book Courier",
  SHOP_REGISTRATION: "shop_registration",
  OTHERS: "others",
} as const;

export type AssociateCategory =
  (typeof AssociateCategory)[keyof typeof AssociateCategory];

export const CATEGORY_LABELS: Record<AssociateCategory, string> = {
  [AssociateCategory.VIDEO_CREATOR]: "Video Creator",
  [AssociateCategory.DELIVERY_BOY]: "Delivery Boy",
  [AssociateCategory.COMPANY_EMPLOYEE]: "Company Employee",
  [AssociateCategory.COMMISSION_AGENT]: "Commission Agent",
  [AssociateCategory.REPORTER]: "Reporter",
  [AssociateCategory.CA]: "Chartered Accountant",
  [AssociateCategory.ADVOCATE]: "Advocate",
  [AssociateCategory.INTERIOR_DESIGNER]: "Interior Designer",
  [AssociateCategory.LEGAL_SERVICE]: "Legal Service",
  [AssociateCategory.TAX_FILING]: "Tax Filing",
  [AssociateCategory.DOCTOR]: "Doctor",
  [AssociateCategory.HOSPITAL_DIRECTOR_DOCTOR]: "Hospital Director",
  [AssociateCategory.CLINIC_OWNER]: "Clinic Owner",
  [AssociateCategory.MEDICAL_SHOP_OWNER]: "Medical Shop Owner",
  [AssociateCategory.PATHOLOGY_LAB]: "Pathology Lab",
  [AssociateCategory.NURSE_MEDICAL_SERVICE]: "Nurse & Medical Service",
  [AssociateCategory.HEALTH_CARE]: "Health Care",
  [AssociateCategory.ANG_STORE_PARTNER]: "ANG Store Partner",
  [AssociateCategory.PRODUCT_SUPPLIES_PARTNER]: "Product Supplies Partner",
  [AssociateCategory.SERVICE_PROVIDER]: "Service Provider",
  [AssociateCategory.AGENCY]: "Agency",
  [AssociateCategory.DISTRIBUTOR]: "Distributor",
  [AssociateCategory.CNF]: "C&F",
  [AssociateCategory.TRADING]: "Trading",
  [AssociateCategory.PACKING_SOLUTIONS]: "Packing Solutions",
  [AssociateCategory.FACTORY_OWNER]: "Factory Owner",
  [AssociateCategory.INDUSTRIAL_MATERIALS]: "Industrial Materials",
  [AssociateCategory.MACHINERY_TOOLS]: "Machinery & Tools",
  [AssociateCategory.RESTAURANT_OWNER]: "Restaurant Owner",
  [AssociateCategory.CLOUD_KITCHEN_OWNER]: "Cloud Kitchen Owner",
  [AssociateCategory.TEA_SHOP_OWNER]: "Tea Shop Owner",
  [AssociateCategory.CATERING_COOKING]: "Catering / Cooking",
  [AssociateCategory.ORDER_FOOD]: "Order Food",
  [AssociateCategory.PETROL_PUMP_OWNER]: "Petrol Pump Owner",
  [AssociateCategory.GROCERY_SHOP_OWNER]: "Grocery Shop Owner",
  [AssociateCategory.FASHION_STORE_OWNER]: "Fashion Store Owner",
  [AssociateCategory.HARDWARE_STORE_OWNER]: "Hardware Store Owner",
  [AssociateCategory.CEMENT_OWNER]: "Cement Owner",
  [AssociateCategory.CREATE_STORE_PRODUCT]: "Create Store (Product)",
  [AssociateCategory.CREATE_STORE_SERVICE]: "Create Store (Service)",
  [AssociateCategory.CREATE_STORE_BOTH]: "Create Store (Both)",
  [AssociateCategory.B2B_PRODUCTS]: "B2B Products",
  [AssociateCategory.ELECTRONICS_STORE]: "Electronics Store",
  [AssociateCategory.FURNITURE_STORE]: "Furniture Store",
  [AssociateCategory.TOYS_BABY_STORE]: "Toys & Baby Store",
  [AssociateCategory.STATIONARY_STORE]: "Stationary Store",
  [AssociateCategory.REFURBISHED_ITEMS]: "Refurbished Items",
  [AssociateCategory.SPORTS_GOODS]: "Sports Goods",
  [AssociateCategory.OLD_CARS_BIKES]: "Old Cars & Bikes",
  [AssociateCategory.STONE_PRODUCTS]: "Stone Products",
  [AssociateCategory.TILES_MARBLES]: "Tiles & Marbles",
  [AssociateCategory.HAND_MADE_ITEMS]: "Hand Made Items",
  [AssociateCategory.UPVC_DOORS]: "Upvc Doors",
  [AssociateCategory.WEBSITE_DEVELOPMENT]: "Website Development",
  [AssociateCategory.SOFTWARE_SERVICE]: "Software Service",
  [AssociateCategory.CONSTRUCTION_SERVICE]: "Construction Service",
  [AssociateCategory.CONSTRUCTION_PRODUCT]: "Construction Product",
  [AssociateCategory.LABORATORY]: "Laboratory",
  [AssociateCategory.PRE_SCHOOL_OWNER]: "Pre-School Owner",
  [AssociateCategory.MIDDLE_SCHOOL_OWNER]: "Middle School Owner",
  [AssociateCategory.HIGH_SCHOOL_OWNER]: "High School Owner",
  [AssociateCategory.COLLEGE_DIRECTOR]: "College Director",
  [AssociateCategory.UNIVERSITY_DIRECTOR]: "University Director",
  [AssociateCategory.COACHING_CENTRE_OWNER]: "Coaching Centre Owner",
  [AssociateCategory.TRAINING_INSTITUTE_OWNER]: "Training Institute Owner",
  [AssociateCategory.GYM_OWNER]: "Gym Owner",
  [AssociateCategory.COURIER_BOOK]: "Book Courier",
  [AssociateCategory.PARK_DIRECTOR]: "Park Director",
  [AssociateCategory.CINEMA_HALL_OWNER]: "Cinema Hall Owner",
  [AssociateCategory.GARDEN]: "Garden",
  [AssociateCategory.BANK_BM_OTHERS]: "Bank (BM & Others)",
  [AssociateCategory.SHOP_REGISTRATION]: "Shop Registration",
  [AssociateCategory.OTHERS]: "Others",
};

// Category Groups for conditional validation
export const MEDICAL_CATEGORIES: AssociateCategory[] = [
  AssociateCategory.DOCTOR,
  AssociateCategory.CLINIC_OWNER,
  AssociateCategory.HOSPITAL_DIRECTOR_DOCTOR,
  AssociateCategory.MEDICAL_SHOP_OWNER,
  AssociateCategory.PATHOLOGY_LAB,
];

export const EDUCATION_CATEGORIES: AssociateCategory[] = [
  AssociateCategory.PRE_SCHOOL_OWNER,
  AssociateCategory.MIDDLE_SCHOOL_OWNER,
  AssociateCategory.HIGH_SCHOOL_OWNER,
  AssociateCategory.COLLEGE_DIRECTOR,
  AssociateCategory.UNIVERSITY_DIRECTOR,
  AssociateCategory.COACHING_CENTRE_OWNER,
  AssociateCategory.TRAINING_INSTITUTE_OWNER,
];

export const TRADE_CATEGORIES: AssociateCategory[] = [
  AssociateCategory.FACTORY_OWNER,
  AssociateCategory.AGENCY,
  AssociateCategory.DISTRIBUTOR,
  AssociateCategory.CNF,
  AssociateCategory.TRADING,
  AssociateCategory.GROCERY_SHOP_OWNER,
  AssociateCategory.FASHION_STORE_OWNER,
  AssociateCategory.HARDWARE_STORE_OWNER,
  AssociateCategory.CEMENT_OWNER,
  AssociateCategory.PETROL_PUMP_OWNER,
];

export const FOOD_CATEGORIES: AssociateCategory[] = [
  AssociateCategory.RESTAURANT_OWNER,
  AssociateCategory.CLOUD_KITCHEN_OWNER,
  AssociateCategory.TEA_SHOP_OWNER,
  AssociateCategory.CATERING_COOKING,
];

export const BANK_CATEGORIES: AssociateCategory[] = [
  AssociateCategory.BANK_BM_OTHERS,
];

export const CREATOR_CATEGORIES: AssociateCategory[] = [
  AssociateCategory.VIDEO_CREATOR,
];

export const DELIVERY_CATEGORIES: AssociateCategory[] = [
  AssociateCategory.DELIVERY_BOY,
];

export const HIGHER_EDUCATION_CATEGORIES: AssociateCategory[] = [
  AssociateCategory.COLLEGE_DIRECTOR,
  AssociateCategory.UNIVERSITY_DIRECTOR,
];

export const DOCTOR_CATEGORIES: AssociateCategory[] = [
  AssociateCategory.DOCTOR,
  AssociateCategory.HOSPITAL_DIRECTOR_DOCTOR,
];

// Grouped categories for UI display
export const CATEGORY_GROUPS = {
  "Individual / Freelancer": [
    AssociateCategory.VIDEO_CREATOR,
    AssociateCategory.DELIVERY_BOY,
    AssociateCategory.COMPANY_EMPLOYEE,
    AssociateCategory.COMMISSION_AGENT,
    AssociateCategory.REPORTER,
  ],
  "Professional Services": [
    AssociateCategory.CA,
    AssociateCategory.ADVOCATE,
    AssociateCategory.INTERIOR_DESIGNER,
    AssociateCategory.LEGAL_SERVICE,
    AssociateCategory.TAX_FILING,
    AssociateCategory.SHOP_REGISTRATION,
  ],
  Medical: [
    AssociateCategory.DOCTOR,
    AssociateCategory.HOSPITAL_DIRECTOR_DOCTOR,
    AssociateCategory.CLINIC_OWNER,
    AssociateCategory.MEDICAL_SHOP_OWNER,
    AssociateCategory.PATHOLOGY_LAB,
    AssociateCategory.NURSE_MEDICAL_SERVICE,
    AssociateCategory.HEALTH_CARE,
    AssociateCategory.LABORATORY,
  ],
  "Partners & Supply Chain": [
    AssociateCategory.ANG_STORE_PARTNER,
    AssociateCategory.PRODUCT_SUPPLIES_PARTNER,
    AssociateCategory.SERVICE_PROVIDER,
    AssociateCategory.AGENCY,
    AssociateCategory.DISTRIBUTOR,
    AssociateCategory.CNF,
    AssociateCategory.TRADING,
    AssociateCategory.COURIER_BOOK,
    AssociateCategory.PACKING_SOLUTIONS,
  ],
  "Manufacturing & Industrial": [
    AssociateCategory.FACTORY_OWNER,
    AssociateCategory.INDUSTRIAL_MATERIALS,
    AssociateCategory.MACHINERY_TOOLS,
  ],
  "Food & Hospitality": [
    AssociateCategory.RESTAURANT_OWNER,
    AssociateCategory.CLOUD_KITCHEN_OWNER,
    AssociateCategory.TEA_SHOP_OWNER,
    AssociateCategory.CATERING_COOKING,
    AssociateCategory.ORDER_FOOD,
  ],
  "Retail & Shops": [
    AssociateCategory.PETROL_PUMP_OWNER,
    AssociateCategory.GROCERY_SHOP_OWNER,
    AssociateCategory.FASHION_STORE_OWNER,
    AssociateCategory.HARDWARE_STORE_OWNER,
    AssociateCategory.CEMENT_OWNER,
    AssociateCategory.CREATE_STORE_PRODUCT,
    AssociateCategory.CREATE_STORE_SERVICE,
    AssociateCategory.CREATE_STORE_BOTH,
    AssociateCategory.B2B_PRODUCTS,
    AssociateCategory.ELECTRONICS_STORE,
    AssociateCategory.FURNITURE_STORE,
    AssociateCategory.TOYS_BABY_STORE,
    AssociateCategory.STATIONARY_STORE,
    AssociateCategory.REFURBISHED_ITEMS,
    AssociateCategory.SPORTS_GOODS,
    AssociateCategory.OLD_CARS_BIKES,
    AssociateCategory.STONE_PRODUCTS,
    AssociateCategory.TILES_MARBLES,
    AssociateCategory.HAND_MADE_ITEMS,
    AssociateCategory.UPVC_DOORS,
  ],
  "Tech & Construction": [
    AssociateCategory.WEBSITE_DEVELOPMENT,
    AssociateCategory.SOFTWARE_SERVICE,
    AssociateCategory.CONSTRUCTION_SERVICE,
    AssociateCategory.CONSTRUCTION_PRODUCT,
  ],
  Education: [
    AssociateCategory.PRE_SCHOOL_OWNER,
    AssociateCategory.MIDDLE_SCHOOL_OWNER,
    AssociateCategory.HIGH_SCHOOL_OWNER,
    AssociateCategory.COLLEGE_DIRECTOR,
    AssociateCategory.UNIVERSITY_DIRECTOR,
    AssociateCategory.COACHING_CENTRE_OWNER,
    AssociateCategory.TRAINING_INSTITUTE_OWNER,
  ],
  "Entertainment & Leisure": [
    AssociateCategory.GYM_OWNER,
    AssociateCategory.PARK_DIRECTOR,
    AssociateCategory.CINEMA_HALL_OWNER,
    AssociateCategory.GARDEN,
  ],
  Financial: [AssociateCategory.BANK_BM_OTHERS],
  Others: [AssociateCategory.OTHERS],
};

export interface AssociateFormData {
  category: AssociateCategory;
  subCategory?: string;
  businessName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  businessMobile: string;
  website?: string;
  openingTime?: string;
  closingTime?: string;
  offDays?: string[];
  gstNumber?: string;
  latitude?: number;
  longitude?: number;

  // Medical fields
  registrationNumber?: string;
  specialization?: string;

  // Education fields
  board?: string;
  universityAffiliation?: string;

  // Trade fields
  unitNo?: string;
  brand?: string;
  typeOfProduct?: string;

  // Food fields
  fssaiLicense?: string;

  // Bank fields
  branchCode?: string;
  govtOrPvt?: "govt" | "pvt";

  // Creator fields
  channelName?: string;

  // Delivery fields
  vehicleType?: string;
  deliveryLocation?: string;
}

export interface ProductExploreFilters {
  category?: string;
  search?: string;
  page?: number;
}

export interface ServiceExploreFilters {
  category?: string;
  search?: string;
  page?: number;
}

export interface VideoExploreFilters {
  category?: string;
  search?: string;
  page?: number;
}
