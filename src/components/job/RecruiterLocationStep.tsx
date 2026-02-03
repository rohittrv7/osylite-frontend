import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type CreateJobProfileDto } from "@/store/api/jobsApi";

interface Props {
  data: Partial<CreateJobProfileDto>;
  onChange: (data: Partial<CreateJobProfileDto>) => void;
}

const RecruiterLocationStep = ({ data, onChange }: Props) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Official HR Email *</label>
        <Input
          type="email"
          placeholder="hr@company.com"
          value={data.officialEmail || ""}
          onChange={(e) => onChange({ ...data, officialEmail: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Operating City *</label>
        <Input
          placeholder="e.g., Patna"
          value={data.operatingCity || ""}
          onChange={(e) => onChange({ ...data, operatingCity: e.target.value })}
        />
        <p className="text-xs text-muted-foreground">
          This helps local candidates find you.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Office Address *</label>
        <Textarea
          placeholder="Full address of your office..."
          value={data.companyAddress || ""}
          onChange={(e) =>
            onChange({ ...data, companyAddress: e.target.value })
          }
        />
      </div>
    </div>
  );
};
export default RecruiterLocationStep;
