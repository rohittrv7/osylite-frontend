import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Property, PROPERTY_CITIES } from "@/types/property";

interface PropertyLocationStepProps {
  data: Partial<Property>;
  onChange: (data: Partial<Property>) => void;
}

const PropertyLocationStep = ({
  data,
  onChange,
}: PropertyLocationStepProps) => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Property Title <span className="text-destructive">*</span>
        </label>
        <Input
          placeholder="e.g., 3 BHK Luxury Flat in Kankarbagh"
          value={data.title || ""}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
          className="h-12"
        />
        <p className="text-xs text-muted-foreground">
          A catchy title helps attract buyers/tenants
        </p>
      </div>

      {/* City */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          City <span className="text-destructive">*</span>
        </label>
        <Select
          value={data.city}
          onValueChange={(value) => onChange({ ...data, city: value })}
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent>
            {PROPERTY_CITIES.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Locality */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Locality / Area <span className="text-destructive">*</span>
        </label>
        <Input
          placeholder="e.g., Boring Road, Kankarbagh, Ashiana Nagar"
          value={data.locality || ""}
          onChange={(e) => onChange({ ...data, locality: e.target.value })}
          className="h-12"
        />
      </div>

      {/* Price */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Price (₹) <span className="text-destructive">*</span>
        </label>
        <Input
          type="number"
          placeholder={
            data.listingType === "Rent" ? "Monthly rent" : "Total price"
          }
          value={data.price || ""}
          onChange={(e) => onChange({ ...data, price: Number(e.target.value) })}
          className="h-12"
        />
        <p className="text-xs text-muted-foreground">
          {data.listingType === "Rent"
            ? "Enter monthly rent amount"
            : "Enter total selling price"}
        </p>
      </div>
    </div>
  );
};

export default PropertyLocationStep;
