import type { UseFormReturn } from "react-hook-form";
import { FormField } from "../FormField";
import { FormSection } from "../FormSection";
import { Building2, UserCircle2, MapPin } from "lucide-react";
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
    <div className="space-y-6">
      {/* --- Section 1: Personal Credentials --- */}
      <FormSection
        title="Personal Information"
        icon={UserCircle2}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            type="text"
            label="First Name"
            className="py-1"
            placeholder="Enter first name"
            value={watch("firstName") || ""}
            onChange={(v) => setValue("firstName", v, { shouldValidate: true })}
            error={errors.firstName}
            required
          />
          <FormField
            type="text"
            label="Last Name"
            className="py-1"
            placeholder="Enter last name"
            value={watch("lastName") || ""}
            onChange={(v) => setValue("lastName", v, { shouldValidate: true })}
            error={errors.lastName}
            required
          />
        </div>

        <FormField
          type="email"
          label="Email Address"
          className="py-1"
          placeholder="email@example.com"
          value={watch("email") || ""}
          onChange={(v) => setValue("email", v, { shouldValidate: true })}
          error={errors.email}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            type="password"
            label="Password"
            className="py-1"
            placeholder="Min 6 characters"
            value={watch("password") || ""}
            onChange={(v) => setValue("password", v, { shouldValidate: true })}
            error={errors.password}
            required
          />
          <FormField
            type="password"
            label="Confirm Password"
            className="py-1"
            placeholder="Re-enter password"
            value={watch("confirmPassword") || ""}
            onChange={(v) =>
              setValue("confirmPassword", v, { shouldValidate: true })
            }
            error={errors.confirmPassword}
            required
          />
        </div>
      </FormSection>

      {/* --- Section 2: Business Information --- */}
      <FormSection
        title="Business Details"
        icon={Building2}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            type="text"
            label="Business Name"
            className="py-1"
            placeholder="Business/Shop Name (Optional)"
            value={watch("businessName") || ""}
            onChange={(v) =>
              setValue("businessName", v, { shouldValidate: true })
            }
            error={errors.businessName}
          />
          <FormField
            type="tel"
            label="Business Mobile"
            className="py-1"
            placeholder="10-digit mobile number"
            value={watch("businessMobile") || ""}
            onChange={(v) =>
              setValue("businessMobile", v, { shouldValidate: true })
            }
            error={errors.businessMobile}
            required
          />
        </div>

        <FormField
          type="url"
          label="Website"
          className="py-1"
          placeholder="https://example.com"
          value={watch("website") || ""}
          onChange={(v) => setValue("website", v, { shouldValidate: true })}
          error={errors.website}
        />
      </FormSection>

      {/* --- Section 3: Address --- */}
      <FormSection title="Location" icon={MapPin} className="space-y-4">
        <FormField
          type="textarea"
          label="Address"
          className="py-1"
          placeholder="Enter complete street address"
          value={watch("address") || ""}
          onChange={(v) => setValue("address", v, { shouldValidate: true })}
          error={errors.address}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormField
            type="select"
            label="State"
            className="py-1"
            placeholder="Select state"
            value={watch("state") || ""}
            onChange={(v) => setValue("state", v, { shouldValidate: true })}
            error={errors.state}
            required
            options={INDIAN_STATES.map((state) => ({
              value: state,
              label: state,
            }))}
          />
          <FormField
            type="text"
            label="City"
            className="py-1"
            placeholder="Enter city"
            value={watch("city") || ""}
            onChange={(v) => setValue("city", v, { shouldValidate: true })}
            error={errors.city}
            required
          />

          <FormField
            type="text"
            label="Pincode"
            className="py-1"
            placeholder="6-digit pincode"
            value={watch("pincode") || ""}
            onChange={(v) => setValue("pincode", v, { shouldValidate: true })}
            error={errors.pincode}
            required
          />
        </div>
      </FormSection>
    </div>
  );
}
