import { FormField } from "../FormField";
import { FormSection } from "../FormSection";
import { Stethoscope } from "lucide-react";
import { DOCTOR_CATEGORIES } from "@/types/associate";
import type { UseFormReturn } from "react-hook-form";
import type { AssociateFormSchema } from "@/lib/validationSchema";

interface MedicalFieldsProps {
  form: UseFormReturn<AssociateFormSchema>;
}

const SPECIALIZATIONS = [
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Endocrinologist",
  "Gastroenterologist",
  "Neurologist",
  "Oncologist",
  "Ophthalmologist",
  "Orthopedic Surgeon",
  "Pediatrician",
  "Psychiatrist",
  "Pulmonologist",
  "Radiologist",
  "Urologist",
  "Gynecologist",
  "ENT Specialist",
  "Dentist",
  "Ayurveda",
  "Homeopathy",
  "Other",
];

export function MedicalFields({ form }: MedicalFieldsProps) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;
  const category = watch("category");
  const showSpecialization = DOCTOR_CATEGORIES.includes(category);

  return (
    <FormSection title="Medical Details" icon={Stethoscope}>
      <FormField
        type="text"
        label="Registration/License Number"
        placeholder="Enter medical registration number"
        value={watch("registrationNumber") || ""}
        onChange={(v) =>
          setValue("registrationNumber", v, { shouldValidate: true })
        }
        error={errors.registrationNumber}
        required
      />
      {showSpecialization && (
        <FormField
          type="select"
          label="Specialization"
          placeholder="Select specialization"
          value={watch("specialization") || ""}
          onChange={(v) =>
            setValue("specialization", v, { shouldValidate: true })
          }
          error={errors.specialization}
          required
          options={SPECIALIZATIONS.map((s) => ({ value: s, label: s }))}
        />
      )}
    </FormSection>
  );
}
