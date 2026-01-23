import type { UseFormReturn } from 'react-hook-form';
import { FormField } from '../FormField';
import { FormSection } from '../FormSection';
import { UtensilsCrossed } from 'lucide-react';
import type { AssociateFormSchema } from '@/lib/validationSchema';

interface FoodFieldsProps {
  form: UseFormReturn<AssociateFormSchema>;
}

export function FoodFields({ form }: FoodFieldsProps) {
  const { watch, setValue, formState: { errors } } = form;

  return (
    <FormSection title="Food & Hospitality Details" icon={UtensilsCrossed}>
      <FormField
        type="text"
        label="FSSAI License Number"
        placeholder="Enter 14-digit FSSAI license number"
        value={watch('fssaiLicense') || ''}
        onChange={(v) => setValue('fssaiLicense', v, { shouldValidate: true })}
        error={errors.fssaiLicense}
        required
      />
      <FormField
        type="time"
        label="Opening Time"
        placeholder="Select opening time"
        value={watch('openingTime') || ''}
        onChange={(v) => setValue('openingTime', v, { shouldValidate: true })}
        error={errors.openingTime}
      />
      <FormField
        type="time"
        label="Closing Time"
        placeholder="Select closing time"
        value={watch('closingTime') || ''}
        onChange={(v) => setValue('closingTime', v, { shouldValidate: true })}
        error={errors.closingTime}
      />
    </FormSection>
  );
}
