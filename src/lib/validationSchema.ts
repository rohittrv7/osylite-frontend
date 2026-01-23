import { z } from "zod";
import {
  AssociateCategory,
  MEDICAL_CATEGORIES,
  EDUCATION_CATEGORIES,
  TRADE_CATEGORIES,
  FOOD_CATEGORIES,
  BANK_CATEGORIES,
  CREATOR_CATEGORIES,
  DELIVERY_CATEGORIES,
  HIGHER_EDUCATION_CATEGORIES,
  DOCTOR_CATEGORIES,
} from "@/types/associate";

export const associateFormSchema = z
  .object({
    category: z.nativeEnum(AssociateCategory).refine(Boolean, {
      message: "Please select a category",
    }),

    subCategory: z.string().optional(),

    // Common fields
    businessName: z.string().optional(),
    address: z
      .string()
      .min(1, "Address is required")
      .max(500, "Address must be less than 500 characters"),
    city: z
      .string()
      .min(1, "City is required")
      .max(100, "City must be less than 100 characters"),
    state: z
      .string()
      .min(1, "State is required")
      .max(100, "State must be less than 100 characters"),
    pincode: z.string().regex(/^[0-9]{6}$/, "Pincode must be exactly 6 digits"),
    businessMobile: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),

    // Optional common fields
    website: z.string().url("Enter a valid URL").optional().or(z.literal("")),
    openingTime: z.string().optional(),
    closingTime: z.string().optional(),
    offDays: z.array(z.string()).optional(),
    gstNumber: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),

    // Medical fields
    registrationNumber: z.string().optional(),
    specialization: z.string().optional(),

    // Education fields
    board: z.string().optional(),
    universityAffiliation: z.string().optional(),

    // Trade fields
    unitNo: z.string().optional(),
    brand: z.string().optional(),
    typeOfProduct: z.string().optional(),

    // Food fields
    fssaiLicense: z.string().optional(),

    // Bank fields
    branchCode: z.string().optional(),
    govtOrPvt: z.enum(["govt", "pvt"]).optional(),

    // Creator fields
    channelName: z.string().optional(),

    // Delivery fields
    vehicleType: z.string().optional(),
    deliveryLocation: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const category = data.category;

    // Medical validations
    if (MEDICAL_CATEGORIES.includes(category)) {
      if (!data.registrationNumber || data.registrationNumber.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Medical Registration/License Number is required",
          path: ["registrationNumber"],
        });
      }
    }

    if (DOCTOR_CATEGORIES.includes(category)) {
      if (!data.specialization || data.specialization.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Specialization is required for Doctors",
          path: ["specialization"],
        });
      }
    }

    // Education validations
    if (EDUCATION_CATEGORIES.includes(category)) {
      if (!data.board || data.board.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Board affiliation (CBSE/ICSE/State) is required",
          path: ["board"],
        });
      }
    }

    if (HIGHER_EDUCATION_CATEGORIES.includes(category)) {
      if (
        !data.universityAffiliation ||
        data.universityAffiliation.trim() === ""
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "University Affiliation is required",
          path: ["universityAffiliation"],
        });
      }
    }

    // Trade validations
    if (TRADE_CATEGORIES.includes(category)) {
      if (!data.unitNo || data.unitNo.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Unit Number is required for this category",
          path: ["unitNo"],
        });
      }
      if (!data.brand || data.brand.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Brand name is required for this category",
          path: ["brand"],
        });
      }
      if (!data.typeOfProduct || data.typeOfProduct.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Type of Product (Physical/Soft) is required",
          path: ["typeOfProduct"],
        });
      }
    }

    // Food validations
    if (FOOD_CATEGORIES.includes(category)) {
      if (!data.fssaiLicense || data.fssaiLicense.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "FSSAI License number is required for food business",
          path: ["fssaiLicense"],
        });
      }
    }

    // Bank validations
    if (BANK_CATEGORIES.includes(category)) {
      if (!data.branchCode || data.branchCode.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Bank Branch Code is required",
          path: ["branchCode"],
        });
      }
      if (!data.govtOrPvt) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please specify if Bank is Govt or Pvt",
          path: ["govtOrPvt"],
        });
      }
    }

    // Creator validations
    if (CREATOR_CATEGORIES.includes(category)) {
      if (!data.channelName || data.channelName.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Channel Name is required",
          path: ["channelName"],
        });
      }
    }

    // Delivery validations
    if (DELIVERY_CATEGORIES.includes(category)) {
      if (!data.vehicleType || data.vehicleType.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Vehicle Type is required",
          path: ["vehicleType"],
        });
      }
      if (!data.deliveryLocation || data.deliveryLocation.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Preferred Delivery Location is required",
          path: ["deliveryLocation"],
        });
      }
    }
  });

export type AssociateFormSchema = z.infer<typeof associateFormSchema>;
