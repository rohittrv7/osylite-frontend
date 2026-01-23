import type { UseFormReturn } from 'react-hook-form';
import { FormField } from '../FormField';
import { FormSection } from '../FormSection';
import { Landmark } from 'lucide-react';
import type { AssociateFormSchema } from '@/lib/validationSchema';

interface BankFieldsProps {
  form: UseFormReturn<AssociateFormSchema>;
}

const BANK_TYPES = [
  { value: 'govt', label: 'Government Bank' },
  { value: 'pvt', label: 'Private Bank' },
];

export function BankFields({ form }: BankFieldsProps) {
  const { watch, setValue, formState: { errors } } = form;

  return (
    <FormSection title="Banking Details" icon={Landmark}>
      <FormField
        type="text"
        label="Branch Code"
        placeholder="Enter bank branch code"
        value={watch('branchCode') || ''}
        onChange={(v) => setValue('branchCode', v, { shouldValidate: true })}
        error={errors.branchCode}
        required
      />
      <FormField
        type="select"
        label="Bank Type"
        placeholder="Select bank type"
        value={watch('govtOrPvt') || ''}
        onChange={(v) => setValue('govtOrPvt', v as 'govt' | 'pvt', { shouldValidate: true })}
        error={errors.govtOrPvt}
        required
        options={BANK_TYPES}
      />
    </FormSection>
  );
}
