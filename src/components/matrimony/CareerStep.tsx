import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { INCOME_RANGES, type MatrimonyProfile } from "@/types/matrimony";

interface StepProps {
  formData: Partial<MatrimonyProfile>;
  updateFormData: (data: Partial<MatrimonyProfile>) => void;
}

const CareerStep = ({ formData, updateFormData }: StepProps) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">
          Career & Education
        </h3>
        <p className="text-sm text-muted-foreground">
          Tell us about your professional life.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="education">Highest Education</Label>
          <Input
            id="education"
            placeholder="e.g. B.Tech, MBA, MBBS"
            value={formData.education || ""}
            onChange={(e) => updateFormData({ education: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="occupation">Occupation</Label>
          <Input
            id="occupation"
            placeholder="e.g. Software Engineer, Doctor, Business"
            value={formData.occupation || ""}
            onChange={(e) => updateFormData({ occupation: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="income">Annual Income</Label>
          <Select
            value={formData.annualIncome}
            onValueChange={(value) => updateFormData({ annualIncome: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Annual Income" />
            </SelectTrigger>
            <SelectContent>
              {INCOME_RANGES.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CareerStep;
