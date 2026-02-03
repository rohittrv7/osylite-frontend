import { Building2, Home, Map, Store, KeyRound, Banknote, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ListingType, PropertyCategory, type Property } from '@/types/property';

interface PropertyTypeStepProps {
  data: Partial<Property>;
  onChange: (data: Partial<Property>) => void;
}

const listingTypes = [
  { value: ListingType.RENT, label: 'Rent', icon: KeyRound, desc: 'Monthly rent' },
  { value: ListingType.SELL, label: 'Sell', icon: Banknote, desc: 'One-time sale' },
  { value: ListingType.PG, label: 'PG/Hostel', icon: Users, desc: 'Paying guest' },
];

const categories = [
  { value: PropertyCategory.FLAT, label: 'Flat/Apartment', icon: Building2 },
  { value: PropertyCategory.HOUSE, label: 'House/Villa', icon: Home },
  { value: PropertyCategory.PLOT, label: 'Plot/Land', icon: Map },
  { value: PropertyCategory.COMMERCIAL, label: 'Commercial', icon: Store },
];

const PropertyTypeStep = ({ data, onChange }: PropertyTypeStepProps) => {
  return (
    <div className="space-y-8">
      {/* Listing Type */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-foreground">
          What do you want to do? <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {listingTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = data.listingType === type.value;
            return (
              <button
                key={type.value}
                type="button"
                onClick={() => onChange({ ...data, listingType: type.value })}
                className={cn(
                  'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200',
                  isSelected
                    ? 'border-primary bg-primary/10 shadow-md'
                    : 'border-border hover:border-primary/50 bg-card'
                )}
              >
                <Icon className={cn('w-6 h-6', isSelected ? 'text-primary' : 'text-muted-foreground')} />
                <span className={cn('font-medium', isSelected ? 'text-primary' : 'text-foreground')}>
                  {type.label}
                </span>
                <span className="text-xs text-muted-foreground">{type.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Property Category */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-foreground">
          Property Type <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = data.category === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => onChange({ ...data, category: cat.value })}
                className={cn(
                  'flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200',
                  isSelected
                    ? 'border-primary bg-primary/10 shadow-md'
                    : 'border-border hover:border-primary/50 bg-card'
                )}
              >
                <Icon className={cn('w-6 h-6', isSelected ? 'text-primary' : 'text-muted-foreground')} />
                <span className={cn('font-medium', isSelected ? 'text-primary' : 'text-foreground')}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PropertyTypeStep;
