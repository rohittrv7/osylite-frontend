import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type CreateJobProfileDto } from "@/store/api/jobsApi";
import { QUALIFICATIONS } from "@/types/job";

interface Props {
  data: Partial<CreateJobProfileDto>;
  onChange: (data: Partial<CreateJobProfileDto>) => void;
}

const CandidateBasicStep = ({ data, onChange }: Props) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Current Role / Title *</label>
        <Input
          placeholder="e.g., Accountant, Software Developer"
          value={data.currentJobTitle || ""}
          onChange={(e) =>
            onChange({ ...data, currentJobTitle: e.target.value })
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Total Experience *</label>
          <Input
            type="number"
            placeholder="Years (e.g. 2.5)"
            value={data.totalExperienceYears || ""}
            onChange={(e) =>
              onChange({
                ...data,
                totalExperienceYears: parseFloat(e.target.value),
              })
            }
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Expected Salary (₹)</label>
          <Input
            placeholder="e.g. 25000"
            value={data.expectedSalary || ""}
            onChange={(e) =>
              onChange({ ...data, expectedSalary: e.target.value })
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Highest Qualification *</label>
        <Select
          value={data.highestQualification}
          onValueChange={(val) =>
            onChange({ ...data, highestQualification: val })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {QUALIFICATIONS.map((q) => (
              <SelectItem key={q} value={q}>
                {q}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">About Me *</label>
        <Textarea
          placeholder="Briefly describe your professional background..."
          value={data.aboutMe || ""}
          onChange={(e) => onChange({ ...data, aboutMe: e.target.value })}
        />
      </div>
    </div>
  );
};
export default CandidateBasicStep;
