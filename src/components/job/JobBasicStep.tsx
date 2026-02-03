import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type JobPost, JobType, JOB_CATEGORIES } from '@/types/job';
import { INDIAN_STATES } from '@/types/matrimony';
import { PROPERTY_CITIES } from '@/types/property';

interface JobBasicStepProps {
  data: Partial<JobPost>;
  onChange: (data: Partial<JobPost>) => void;
}

const jobTypes = [
  { value: JobType.FULL_TIME, label: 'Full Time', emoji: '💼' },
  { value: JobType.PART_TIME, label: 'Part Time', emoji: '⏰' },
  { value: JobType.WORK_FROM_HOME, label: 'Work From Home', emoji: '🏠' },
  { value: JobType.INTERNSHIP, label: 'Internship', emoji: '🎓' },
];

const JobBasicStep = ({ data, onChange }: JobBasicStepProps) => {
  return (
    <div className="space-y-6">
      {/* Job Title */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Job Title <span className="text-destructive">*</span>
        </label>
        <Input
          placeholder="e.g., Senior Accountant, Delivery Driver"
          value={data.jobTitle || ''}
          onChange={(e) => onChange({ ...data, jobTitle: e.target.value })}
          className="h-12"
        />
      </div>

      {/* Company Name */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Company Name <span className="text-destructive">*</span>
        </label>
        <Input
          placeholder="e.g., ABC Enterprises"
          value={data.companyName || ''}
          onChange={(e) => onChange({ ...data, companyName: e.target.value })}
          className="h-12"
        />
      </div>

      {/* Job Type */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Job Type <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {jobTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => onChange({ ...data, jobType: type.value })}
              className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                data.jobType === type.value
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <span className="text-xl">{type.emoji}</span>
              <span className="font-medium">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Job Category <span className="text-destructive">*</span>
        </label>
        <Select value={data.roleCategory} onValueChange={(value) => onChange({ ...data, roleCategory: value })}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {JOB_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            State <span className="text-destructive">*</span>
          </label>
          <Select value={data.state} onValueChange={(value) => onChange({ ...data, state: value })}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {INDIAN_STATES.map((state) => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            City <span className="text-destructive">*</span>
          </label>
          <Select value={data.city} onValueChange={(value) => onChange({ ...data, city: value })}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {PROPERTY_CITIES.map((city) => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default JobBasicStep;
