import type { UseFormReturn } from "react-hook-form";
import { FormField } from "../FormField";
import { FormSection } from "../FormSection";
import { Video } from "lucide-react";
import type { AssociateFormSchema } from "@/lib/validationSchema";

interface CreatorFieldsProps {
  form: UseFormReturn<AssociateFormSchema>;
}

export function CreatorFields({ form }: CreatorFieldsProps) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  return (
    <FormSection title="Content Creator Details" icon={Video}>
      <FormField
        type="text"
        label="Channel Name"
        placeholder="Enter your channel/page name"
        value={watch("channelName") || ""}
        className="py-2"
        onChange={(v) => setValue("channelName", v, { shouldValidate: true })}
        error={errors.channelName}
        required
      />
      <FormField
        type="url"
        label="Channel URL"
        className="py-2"
        placeholder="https://youtube.com/@channel"
        value={watch("website") || ""}
        onChange={(v) => setValue("website", v, { shouldValidate: true })}
        error={errors.website}
      />
    </FormSection>
  );
}
