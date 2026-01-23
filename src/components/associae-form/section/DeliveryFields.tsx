import type { UseFormReturn } from 'react-hook-form';
import { FormField } from '../FormField';
import { FormSection } from '../FormSection';
import { Truck } from 'lucide-react';
import type { AssociateFormSchema } from '@/lib/validationSchema';

interface DeliveryFieldsProps {
  form: UseFormReturn<AssociateFormSchema>;
}

const VEHICLE_TYPES = [
  { value: 'bicycle', label: 'Bicycle' },
  { value: 'motorcycle', label: 'Motorcycle/Scooter' },
  { value: 'auto', label: 'Auto Rickshaw' },
  { value: 'car', label: 'Car' },
  { value: 'van', label: 'Van' },
  { value: 'mini_truck', label: 'Mini Truck' },
  { value: 'truck', label: 'Truck' },
];

export function DeliveryFields({ form }: DeliveryFieldsProps) {
  const { watch, setValue, formState: { errors } } = form;

  return (
    <FormSection title="Delivery Details" icon={Truck}>
      <FormField
        type="select"
        label="Vehicle Type"
        placeholder="Select your vehicle"
        value={watch('vehicleType') || ''}
        onChange={(v) => setValue('vehicleType', v, { shouldValidate: true })}
        error={errors.vehicleType}
        required
        options={VEHICLE_TYPES}
      />
      <FormField
        type="text"
        label="Preferred Delivery Location"
        placeholder="Enter preferred area/locality"
        value={watch('deliveryLocation') || ''}
        onChange={(v) => setValue('deliveryLocation', v, { shouldValidate: true })}
        error={errors.deliveryLocation}
        required
      />
    </FormSection>
  );
}
