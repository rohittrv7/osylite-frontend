import type { UseFormReturn } from "react-hook-form";
import { FormField } from "../FormField";
import { FormSection } from "../FormSection";
import { Factory } from "lucide-react";
import type { AssociateFormSchema } from "@/lib/validationSchema";

interface TradeFieldsProps {
  form: UseFormReturn<AssociateFormSchema>;
}

const PRODUCT_TYPES = [
  { value: "physical", label: "Physical Products" },
  { value: "soft", label: "Soft/Digital Products" },
  { value: "both", label: "Both" },
];

export function TradeFields({ form }: TradeFieldsProps) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  return (
    <FormSection title="Trade & Manufacturing Details" icon={Factory}>
      <FormField
        type="text"
        label="Unit Number"
        placeholder="Enter unit/shop number"
        value={watch("unitNo") || ""}
        className="py-2"
        onChange={(v) => setValue("unitNo", v, { shouldValidate: true })}
        error={errors.unitNo}
        required
      />
      <FormField
        type="text"
        label="Brand Name"
        placeholder="Enter brand name"
        value={watch("brand") || ""}
        className="py-2"
        onChange={(v) => setValue("brand", v, { shouldValidate: true })}
        error={errors.brand}
        required
      />
      <FormField
        type="select"
        label="Type of Product"
        placeholder="Select product type"
        className="py-2"
        value={watch("typeOfProduct") || ""}
        onChange={(v) => setValue("typeOfProduct", v, { shouldValidate: true })}
        error={errors.typeOfProduct}
        required
        options={PRODUCT_TYPES}
      />
      <FormField
        type="text"
        label="GST Number"
        className="py-2"
        placeholder="Enter GST number (optional)"
        value={watch("gstNumber") || ""}
        onChange={(v) => setValue("gstNumber", v, { shouldValidate: true })}
        error={errors.gstNumber}
      />
    </FormSection>
  );
}
