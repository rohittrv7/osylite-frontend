import { MapPin, Heart } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RELIGIONS, INDIAN_STATES, type MatrimonyProfile } from "@/types/matrimony";

interface ReligionLocationStepProps {
  formData: Partial<MatrimonyProfile>;
  updateFormData: (data: Partial<MatrimonyProfile>) => void;
}

const ReligionLocationStep = ({
  formData,
  updateFormData,
}: ReligionLocationStepProps) => {
  return (
    <div className="space-y-8">
      {/* Religion */}
      <div className="space-y-3">
        <Label className="text-lg font-display text-foreground flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" />
          Religion
        </Label>
        <Select
          value={formData.religion}
          onValueChange={(value) => updateFormData({ religion: value })}
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select your religion" />
          </SelectTrigger>
          <SelectContent>
            {RELIGIONS.map((religion) => (
              <SelectItem key={religion} value={religion}>
                {religion}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Caste */}
      <div className="space-y-3">
        <Label htmlFor="caste" className="text-lg font-display text-foreground">
          Caste{" "}
          <span className="text-muted-foreground text-sm font-normal">
            (Optional)
          </span>
        </Label>
        <Input
          id="caste"
          type="text"
          placeholder="Enter your caste"
          value={formData.caste || ""}
          onChange={(e) => updateFormData({ caste: e.target.value })}
          className="h-12"
        />
      </div>

      {/* State */}
      <div className="space-y-3">
        <Label className="text-lg font-display text-foreground flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          State
        </Label>
        <Select
          value={formData.state}
          onValueChange={(value) => updateFormData({ state: value })}
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select your state" />
          </SelectTrigger>
          <SelectContent>
            {INDIAN_STATES.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* City */}
      <div className="space-y-3">
        <Label htmlFor="city" className="text-lg font-display text-foreground">
          City
        </Label>
        <Input
          id="city"
          type="text"
          placeholder="Enter your city"
          value={formData.city || ""}
          onChange={(e) => updateFormData({ city: e.target.value })}
          className="h-12"
        />
      </div>
    </div>
  );
};

export default ReligionLocationStep;
