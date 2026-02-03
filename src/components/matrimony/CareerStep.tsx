import { GraduationCap, Briefcase, IndianRupee } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EDUCATION_LEVELS,
  INCOME_RANGES,
  type MatrimonyProfile,
} from "@/types/matrimony";

interface CareerStepProps {
  formData: Partial<MatrimonyProfile>;
  updateFormData: (data: Partial<MatrimonyProfile>) => void;
}

const CareerStep = ({ formData, updateFormData }: CareerStepProps) => {
  return (
    <div className="space-y-8">
      {/* Education */}
      <div className="space-y-3">
        <Label className="text-lg font-display text-foreground flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary" />
          Education
        </Label>
        <Select
          value={formData.education}
          onValueChange={(value) => updateFormData({ education: value })}
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select your education level" />
          </SelectTrigger>
          <SelectContent>
            {EDUCATION_LEVELS.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Occupation */}
      <div className="space-y-3">
        <Label
          htmlFor="occupation"
          className="text-lg font-display text-foreground flex items-center gap-2"
        >
          <Briefcase className="w-5 h-5 text-primary" />
          Occupation
        </Label>
        <Input
          id="occupation"
          type="text"
          placeholder="e.g., Software Engineer, Doctor, Teacher"
          value={formData.occupation || ""}
          onChange={(e) => updateFormData({ occupation: e.target.value })}
          className="h-12"
        />
      </div>

      {/* Annual Income */}
      <div className="space-y-3">
        <Label className="text-lg font-display text-foreground flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-primary" />
          Annual Income{" "}
          <span className="text-muted-foreground text-sm font-normal">
            (Optional)
          </span>
        </Label>
        <Select
          value={formData.annualIncome?.toString()}
          onValueChange={(value) =>
            updateFormData({ annualIncome: parseInt(value) })
          }
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select your income range" />
          </SelectTrigger>
          <SelectContent>
            {INCOME_RANGES.map((range, index) => (
              <SelectItem key={range} value={(index + 1).toString()}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Info card */}
      <div className="p-4 rounded-lg bg-rose border border-rose-dark">
        <p className="text-sm text-foreground">
          💡 <strong>Tip:</strong> Accurate career information helps find more
          compatible matches. Your income details are kept confidential.
        </p>
      </div>
    </div>
  );
};

export default CareerStep;
