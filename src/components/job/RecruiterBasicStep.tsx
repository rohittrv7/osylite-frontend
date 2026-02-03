import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type CreateJobProfileDto } from "@/store/api/jobsApi";

interface Props {
  data: Partial<CreateJobProfileDto>;
  onChange: (data: Partial<CreateJobProfileDto>) => void;
}

const RecruiterBasicStep = ({ data, onChange }: Props) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Company Name *</label>
        <Input
          placeholder="e.g., Tech Solutions Pvt Ltd"
          value={data.companyName || ""}
          onChange={(e) => onChange({ ...data, companyName: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Designation *</label>
          <Input
            placeholder="e.g., HR Manager"
            value={data.designation || ""}
            onChange={(e) => onChange({ ...data, designation: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Industry *</label>
          <Input
            placeholder="e.g., IT, Retail, Healthcare"
            value={data.hiringIndustry || ""}
            onChange={(e) =>
              onChange({ ...data, hiringIndustry: e.target.value })
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Company Website</label>
        <Input
          placeholder="https://company.com"
          value={data.companyWebsite || ""}
          onChange={(e) =>
            onChange({ ...data, companyWebsite: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">About Company *</label>
        <Textarea
          placeholder="Describe your company and what you do..."
          value={data.aboutMe || ""}
          onChange={(e) => onChange({ ...data, aboutMe: e.target.value })}
        />
      </div>
    </div>
  );
};
export default RecruiterBasicStep;
