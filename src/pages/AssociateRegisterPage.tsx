import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  AssociateCategory,
  type AssociateCategory as AssociateCategoryType,
  type BusinessDetails,
} from "@/config/associate";
import { BUSINESS_FIELDS_BY_CATEGORY } from "@/config/associateFieldConfig";
import {
  useApplyAssociateMutation,
  useGetMyAssociateProfileQuery,
} from "@/store/api/associateApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

// type KycDocuments = {
//   aadharNumber?: string;
//   panNumber?: string;
//   gstNumber?: string;
// };

// type KycFiles = {
//   aadharCardFront?: File;
//   aadharCardBack?: File;
//   panCard?: File;
//   professionalDegree?: File;
//   shopPhoto?: File;
//   gstCertificate?: File;
// };

type FormErrors = Partial<
  Record<
    keyof AssociateFormState | `businessDetails.${keyof BusinessDetails}`,
    string
  >
>;

const getErrorMessage = (error: unknown): string | null => {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as FetchBaseQueryError).data;

    if (
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof (data as { message: unknown }).message === "string"
    ) {
      return (data as { message: string }).message;
    }
  }
  return null;
};

type AssociateFormState = {
  category: AssociateCategoryType;
  subCategory?: string;
  businessName: string;
  address: string;
  city: string;
  state: string;
  latitude?: number;
  longitude?: number;
  businessDetails: BusinessDetails;

  /* 
  kycDocuments?: KycDocuments;
  files?: KycFiles;
  */
};

export default function AssociateApplyForm() {
  const [errors, setErrors] = useState<FormErrors>({});

  const [applyAssociate, { isLoading, error }] = useApplyAssociateMutation();
  const {
    data: profile,
    isLoading: profileIsLoading,
    isSuccess,
  } = useGetMyAssociateProfileQuery();

  const [form, setForm] = useState<AssociateFormState>({
    category: AssociateCategory.CONTENT_CREATOR,
    subCategory: "",
    businessName: "",
    address: "",
    city: "",
    state: "",
    businessDetails: {},

    /* 
    kycDocuments: {
      aadharNumber: "",
      panNumber: "",
      gstNumber: "",
    },
    files: {},
    */
  });

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};

    // Base required fields
    if (!form.category) errors.category = "Category is required";
    if (!form.businessName.trim())
      errors.businessName = "Business name is required";
    if (!form.address.trim()) errors.address = "Address is required";
    if (!form.city.trim()) errors.city = "City is required";
    if (!form.state.trim()) errors.state = "State is required";

    // Business details required (category-wise)
    if (form.category) {
      const requiredBusiness = BUSINESS_FIELDS_BY_CATEGORY[form.category] ?? [];

      requiredBusiness.forEach((field) => {
        if (!form.businessDetails[field]) {
          errors[`businessDetails.${field}`] = "This field is required";
        }
      });
    }

    return errors;
  };

  const allowedBusinessFields =
    (form.category && BUSINESS_FIELDS_BY_CATEGORY[form.category]) ?? [];

  const showField = (field: keyof BusinessDetails) =>
    allowedBusinessFields.includes(field);

  const handleCategoryChange = (value: AssociateCategoryType) => {
    setForm((prev) => ({
      ...prev,
      category: value,
      businessDetails: {},
    }));
  };

  const updateBusinessDetail = <K extends keyof BusinessDetails>(
    key: K,
    value: BusinessDetails[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      businessDetails: {
        ...prev.businessDetails,
        [key]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      await applyAssociate(form).unwrap();
    } catch (error: unknown) {
      const message = getErrorMessage(error);

      if (message) {
        setErrors({
          category: message,
        });
      }
    }
  };

  if (profileIsLoading) {
    return <div>Loading...</div>;
  }

  if (isSuccess && profile?.status === "pending") {
    return <div>You have already applied for associate.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold">Apply as Associate</h2>

      {/* CATEGORY */}
      <div>
        <Label className="mb-3">Category</Label>
        <Select onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={AssociateCategory.CONTENT_CREATOR}>
              Creator
            </SelectItem>
            <SelectItem value={AssociateCategory.RETAILER}>Shop</SelectItem>
            <SelectItem value={AssociateCategory.DOCTOR}>Doctor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Input
        placeholder="Sub Category (optional)"
        value={form.subCategory ?? ""}
        onChange={(e) =>
          setForm((p) => ({ ...p, subCategory: e.target.value }))
        }
      />

      <Input
        placeholder="Business Name"
        value={form.businessName}
        onChange={(e) =>
          setForm((p) => ({ ...p, businessName: e.target.value }))
        }
      />
      {errors.businessName && (
        <p className="text-sm text-red-500">{errors.businessName}</p>
      )}

      <Textarea
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="City"
          value={form.city}
          onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
        />
        <Input
          placeholder="State"
          value={form.state}
          onChange={(e) => setForm((p) => ({ ...p, state: e.target.value }))}
        />
      </div>

      {/* BUSINESS DETAILS (DYNAMIC) */}
      {allowedBusinessFields.length > 0 && (
        <>
          <h3 className="font-medium">Business Details</h3>

          {showField("consultationFee") && (
            <>
              <Input
                type="number"
                placeholder="Consultation Fee"
                onChange={(e) =>
                  updateBusinessDetail(
                    "consultationFee",
                    Number(e.target.value),
                  )
                }
              />
              {errors["businessDetails.consultationFee"] && (
                <p className="text-sm text-red-500">
                  {errors["businessDetails.consultationFee"]}
                </p>
              )}
            </>
          )}

          {showField("specialization") && (
            <Input
              placeholder="Specialization"
              onChange={(e) =>
                updateBusinessDetail("specialization", e.target.value)
              }
            />
          )}

          {showField("registrationNumber") && (
            <Input
              placeholder="Registration Number"
              onChange={(e) =>
                updateBusinessDetail("registrationNumber", e.target.value)
              }
            />
          )}

          {showField("gstNumber") && (
            <Input
              placeholder="GST Number"
              onChange={(e) =>
                updateBusinessDetail("gstNumber", e.target.value)
              }
            />
          )}

          {showField("openingTime") && (
            <Input
              type="time"
              onChange={(e) =>
                updateBusinessDetail("openingTime", e.target.value)
              }
            />
          )}

          {showField("closingTime") && (
            <Input
              type="time"
              onChange={(e) =>
                updateBusinessDetail("closingTime", e.target.value)
              }
            />
          )}

          {showField("website") && (
            <Input
              placeholder="Website"
              onChange={(e) => updateBusinessDetail("website", e.target.value)}
            />
          )}
        </>
      )}

      {/*
      <h3 className="font-medium">KYC Details</h3>

      <Input placeholder="Aadhar Number" />
      <Input placeholder="PAN Number" />
      <Input placeholder="GST Number" />

      <Input type="file" />
      <Input type="file" />
      */}
      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
          Failed to submit form. Please check details and try again.
        </div>
      )}

      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Submitting..." : "Apply"}
      </Button>
    </div>
  );
}
