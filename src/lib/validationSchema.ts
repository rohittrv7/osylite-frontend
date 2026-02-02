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

// 🔹 FIX: Cast values to the specific Enum Type to satisfy Zod and TypeScript
const associateCategoryValues = Object.values(AssociateCategory) as [
  AssociateCategory,
  ...AssociateCategory[],
];

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

    // --- Conditional Fields ---

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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .superRefine((data, ctx) => {
    // 🔹 FIX: Type safe inclusion checks

    // Trade Logic
    if (
      (TRADE_CATEGORIES as readonly AssociateCategory[]).includes(data.category)
    ) {
      if (!data.unitNo)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Unit Number is required",
          path: ["unitNo"],
        });
      if (!data.brand)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Brand name is required",
          path: ["brand"],
        });
      if (!data.typeOfProduct)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Type of Product is required",
          path: ["typeOfProduct"],
        });
    }

    // Medical Logic
    if (
      (MEDICAL_CATEGORIES as readonly AssociateCategory[]).includes(
        data.category,
      )
    ) {
      if (!data.registrationNumber)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "License Number is required",
          path: ["registrationNumber"],
        });
    }

    const doctorCats: AssociateCategory[] = [
      AssociateCategory.DOCTOR,
      AssociateCategory.HOSPITAL_DIRECTOR_DOCTOR,
    ];
    if (doctorCats.includes(data.category)) {
      if (!data.specialization)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Specialization is required",
          path: ["specialization"],
        });
    }

    // Education Logic
    if (
      (EDUCATION_CATEGORIES as readonly AssociateCategory[]).includes(
        data.category,
      )
    ) {
      if (!data.board)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Board affiliation is required",
          path: ["board"],
        });
    }

    const higherEduCats: AssociateCategory[] = [
      AssociateCategory.COLLEGE_DIRECTOR,
      AssociateCategory.UNIVERSITY_DIRECTOR,
    ];
    if (higherEduCats.includes(data.category)) {
      if (!data.universityAffiliation)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "University affiliation is required",
          path: ["universityAffiliation"],
        });
    }

    // Bank Logic
    if (
      (BANK_CATEGORIES as readonly AssociateCategory[]).includes(data.category)
    ) {
      if (!data.branchCode)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Branch Code is required",
          path: ["branchCode"],
        });
      if (!data.govtOrPvt)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Bank type is required",
          path: ["govtOrPvt"],
        });
    }

    // Food Logic
    if (
      (FOOD_CATEGORIES as readonly AssociateCategory[]).includes(data.category)
    ) {
      if (!data.fssaiLicense)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "FSSAI License is required",
          path: ["fssaiLicense"],
        });
    }

    // Creator Logic
    if (
      (CREATOR_CATEGORIES as readonly AssociateCategory[]).includes(
        data.category,
      )
    ) {
      if (!data.channelName)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Channel Name is required",
          path: ["channelName"],
        });
    }

    // Delivery Logic
    if (
      (DELIVERY_CATEGORIES as readonly AssociateCategory[]).includes(
        data.category,
      )
    ) {
      if (!data.vehicleType)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Vehicle Type is required",
          path: ["vehicleType"],
        });
      if (!data.deliveryLocation)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Delivery Location is required",
          path: ["deliveryLocation"],
        });
    }
  });

export type AssociateFormSchema = z.infer<typeof associateFormSchema>;
