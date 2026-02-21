import * as z from "zod";
import {
  AssociateCategory,
  MEDICAL_CATEGORIES,
  TRADE_CATEGORIES,
  EDUCATION_CATEGORIES,
  FOOD_CATEGORIES,
  BANK_CATEGORIES,
  CREATOR_CATEGORIES,
  DELIVERY_CATEGORIES,
} from "@/types/associate";

// Helper for conditional validation
const emptyStringToUndefined = z.literal("").transform(() => undefined);

// FIX: Cast values to the specific Enum Type
const associateCategoryValues = Object.values(AssociateCategory) as [
  AssociateCategory,
  ...AssociateCategory[],
];

// Helper array for Courier check
const COURIER_CATS: AssociateCategory[] = [AssociateCategory.COURIER_BOOK];

export const associateFormSchema = z
  .object({
    // --- Personal Information ---
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),

    // --- Business / Category Information ---
    category: z.enum(associateCategoryValues),

    businessName: z.string().optional(),
    businessMobile: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Invalid 10-digit mobile number"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().regex(/^[0-9]{6}$/, "Pincode must be exactly 6 digits"),
    website: z.string().url().optional().or(emptyStringToUndefined),

    // --- Conditional Fields (Optional by default, validated in superRefine) ---

    // Trade Fields
    unitNo: z.string().optional(),
    brand: z.string().optional(),
    typeOfProduct: z.string().optional(),
    gstNumber: z.string().optional(),

    // Medical Fields
    registrationNumber: z.string().optional(),
    specialization: z.string().optional(),

    // Education Fields
    board: z.string().optional(),
    universityAffiliation: z.string().optional(),

    // Bank Fields
    branchCode: z.string().optional(),
    govtOrPvt: z.enum(["govt", "pvt"]).optional(),

    // Food Fields
    fssaiLicense: z.string().optional(),
    openingTime: z.string().optional(),
    closingTime: z.string().optional(),

    // Creator Fields
    channelName: z.string().optional(),

    // Delivery Fields
    vehicleType: z.string().optional(),
    deliveryLocation: z.string().optional(),

    // 🔹 NEW: Courier / Post Office Fields
    officeEmail: z
      .string()
      .email("Invalid office email")
      .optional()
      .or(emptyStringToUndefined),
    workingDays: z.string().optional(),
    validFrom: z.string().optional(),
    taluk: z.string().optional(),
    region: z.string().optional(),
    division: z.string().optional(),
    hoName: z.string().optional(),
    subDivision: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .superRefine((data, ctx) => {
    // Helper function to add issue
    const addRequiredIssue = (path: string, message: string) => {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message,
        path: [path],
      });
    };

    // --- Courier Logic ---
    if (COURIER_CATS.includes(data.category)) {
      if (!data.officeEmail)
        addRequiredIssue("officeEmail", "Office Email is required");
      if (!data.workingDays)
        addRequiredIssue("workingDays", "Working Days are required");
      if (!data.validFrom)
        addRequiredIssue("validFrom", "Valid From date is required");
      if (!data.taluk) addRequiredIssue("taluk", "Taluk is required");
      if (!data.region) addRequiredIssue("region", "Region is required");
      if (!data.division) addRequiredIssue("division", "Division is required");
      if (!data.hoName) addRequiredIssue("hoName", "HO Name is required");
      if (!data.subDivision)
        addRequiredIssue("subDivision", "Sub Division is required");
    }

    // --- Trade Logic ---
    if (
      (TRADE_CATEGORIES as readonly AssociateCategory[]).includes(data.category)
    ) {
      if (!data.unitNo) addRequiredIssue("unitNo", "Unit Number is required");
      if (!data.brand) addRequiredIssue("brand", "Brand name is required");
      if (!data.typeOfProduct)
        addRequiredIssue("typeOfProduct", "Type of Product is required");
    }

    // --- Medical Logic ---
    if (
      (MEDICAL_CATEGORIES as readonly AssociateCategory[]).includes(
        data.category,
      )
    ) {
      if (!data.registrationNumber)
        addRequiredIssue("registrationNumber", "License Number is required");
    }

    const doctorCats: AssociateCategory[] = [
      AssociateCategory.DOCTOR,
      AssociateCategory.HOSPITAL_DIRECTOR_DOCTOR,
    ];
    if (doctorCats.includes(data.category)) {
      if (!data.specialization)
        addRequiredIssue("specialization", "Specialization is required");
    }

    // --- Education Logic ---
    if (
      (EDUCATION_CATEGORIES as readonly AssociateCategory[]).includes(
        data.category,
      )
    ) {
      if (!data.board)
        addRequiredIssue("board", "Board affiliation is required");
    }

    const higherEduCats: AssociateCategory[] = [
      AssociateCategory.COLLEGE_DIRECTOR,
      AssociateCategory.UNIVERSITY_DIRECTOR,
    ];
    if (higherEduCats.includes(data.category)) {
      if (!data.universityAffiliation)
        addRequiredIssue(
          "universityAffiliation",
          "University affiliation is required",
        );
    }

    // --- Bank Logic ---
    if (
      (BANK_CATEGORIES as readonly AssociateCategory[]).includes(data.category)
    ) {
      if (!data.branchCode)
        addRequiredIssue("branchCode", "Branch Code is required");
      if (!data.govtOrPvt)
        addRequiredIssue("govtOrPvt", "Bank type is required");
    }

    // --- Food Logic ---
    if (
      (FOOD_CATEGORIES as readonly AssociateCategory[]).includes(data.category)
    ) {
      if (!data.fssaiLicense)
        addRequiredIssue("fssaiLicense", "FSSAI License is required");
    }

    // --- Creator Logic ---
    if (
      (CREATOR_CATEGORIES as readonly AssociateCategory[]).includes(
        data.category,
      )
    ) {
      if (!data.channelName)
        addRequiredIssue("channelName", "Channel Name is required");
    }

    // --- Delivery Logic ---
    if (
      (DELIVERY_CATEGORIES as readonly AssociateCategory[]).includes(
        data.category,
      )
    ) {
      if (!data.vehicleType)
        addRequiredIssue("vehicleType", "Vehicle Type is required");
      if (!data.deliveryLocation)
        addRequiredIssue("deliveryLocation", "Delivery Location is required");
    }
  });

export type AssociateFormSchema = z.infer<typeof associateFormSchema>;
