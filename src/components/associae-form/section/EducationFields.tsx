import { FormField } from '../FormField';
import { FormSection } from '../FormSection';
import { GraduationCap } from 'lucide-react';
import { HIGHER_EDUCATION_CATEGORIES } from '@/types/associate';
import type { UseFormReturn } from 'react-hook-form';
import type { AssociateFormSchema } from '@/lib/validationSchema';

interface EducationFieldsProps {
  form: UseFormReturn<AssociateFormSchema>;
}

const BOARDS = [
  { value: 'cbse', label: 'CBSE' },
  { value: 'icse', label: 'ICSE' },
  { value: 'state', label: 'State Board' },
  { value: 'ib', label: 'International Baccalaureate (IB)' },
  { value: 'igcse', label: 'Cambridge (IGCSE)' },
  { value: 'nios', label: 'NIOS' },
  { value: 'other', label: 'Other' },
];

export function EducationFields({ form }: EducationFieldsProps) {
  const { watch, setValue, formState: { errors } } = form;
  const category = watch('category');
  const showUniversity = HIGHER_EDUCATION_CATEGORIES.includes(category);

  return (
    <FormSection title="Education Details" icon={GraduationCap}>
      <FormField
        type="select"
        label="Board Affiliation"
        placeholder="Select board"
        value={watch('board') || ''}
        onChange={(v) => setValue('board', v, { shouldValidate: true })}
        error={errors.board}
        required
        options={BOARDS}
      />
      {showUniversity && (
        <FormField
          type="text"
          label="University Affiliation"
          placeholder="Enter affiliated university name"
          value={watch('universityAffiliation') || ''}
          onChange={(v) => setValue('universityAffiliation', v, { shouldValidate: true })}
          error={errors.universityAffiliation}
          required
        />
      )}
    </FormSection>
  );
}
