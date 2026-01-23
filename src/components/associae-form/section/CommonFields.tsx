import type { UseFormReturn } from "react-hook-form";
import { FormField } from "../FormField";
import { FormSection } from "../FormSection";
import { Building2 } from "lucide-react";
import type { AssociateFormSchema } from "@/lib/validationSchema";

interface CommonFieldsProps {
  form: UseFormReturn<AssociateFormSchema>;
}

const INDIAN_STATES = [
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
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export function CommonFields({ form }: CommonFieldsProps) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  return (
    <FormSection
      title="Business Information"
      className="space-y-3"
      icon={Building2}
    >
      <FormField
        type="text"
        label="Business Name"
        placeholder="Enter your business/establishment name"
        value={watch("businessName") || ""}
        onChange={(v) => setValue("businessName", v, { shouldValidate: true })}
        error={errors.businessName}
      />
      <FormField
        type="tel"
        label="Business Mobile"
        placeholder="Enter 10-digit mobile number"
        value={watch("businessMobile") || ""}
        onChange={(v) =>
          setValue("businessMobile", v, { shouldValidate: true })
        }
        error={errors.businessMobile}
        required
      />
      <FormField
        type="textarea"
        label="Address"
        placeholder="Enter complete address"
        value={watch("address") || ""}
        onChange={(v) => setValue("address", v, { shouldValidate: true })}
        error={errors.address}
        required
        className="sm:col-span-2"
      />
      <FormField
        type="text"
        label="City"
        placeholder="Enter city"
        value={watch("city") || ""}
        onChange={(v) => setValue("city", v, { shouldValidate: true })}
        error={errors.city}
        required
      />
      <FormField
        type="select"
        label="State"
        placeholder="Select state"
        value={watch("state") || ""}
        onChange={(v) => setValue("state", v, { shouldValidate: true })}
        error={errors.state}
        required
        options={INDIAN_STATES.map((state) => ({ value: state, label: state }))}
      />
      <FormField
        type="text"
        label="Pincode"
        placeholder="Enter 6-digit pincode"
        value={watch("pincode") || ""}
        onChange={(v) => setValue("pincode", v, { shouldValidate: true })}
        error={errors.pincode}
        required
      />
      <FormField
        type="url"
        label="Website"
        placeholder="https://example.com"
        value={watch("website") || ""}
        onChange={(v) => setValue("website", v, { shouldValidate: true })}
        error={errors.website}
      />
    </FormSection>
  );
}
