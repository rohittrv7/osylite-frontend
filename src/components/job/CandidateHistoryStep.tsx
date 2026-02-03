import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Briefcase } from "lucide-react";
import {
  type CreateJobProfileDto,
  type WorkHistoryDto,
} from "@/store/api/jobsApi";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  data: Partial<CreateJobProfileDto>;
  onChange: (data: Partial<CreateJobProfileDto>) => void;
}

const CandidateHistoryStep = ({ data, onChange }: Props) => {
  const history = data.workHistory || [];

  // Local state for the new entry being added
  const [newJob, setNewJob] = useState<WorkHistoryDto>({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const addJob = () => {
    // Only require Role and Company to add an entry
    if (newJob.role && newJob.company) {
      onChange({ ...data, workHistory: [...history, newJob] });
      // Reset form
      setNewJob({
        role: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    }
  };

  const removeJob = (index: number) => {
    onChange({ ...data, workHistory: history.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg">Work Experience</h3>
        <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
          Optional
        </span>
      </div>

      {/* List of Added Jobs */}
      <div className="space-y-3">
        {history.length === 0 && (
          <div className="text-center py-6 bg-muted/10 rounded-lg border border-dashed">
            <p className="text-sm text-muted-foreground">
              No experience added yet.
            </p>
            <p className="text-xs text-muted-foreground">
              If you are a fresher, you can skip this step.
            </p>
          </div>
        )}

        {history.map((job, idx) => (
          <div
            key={idx}
            className="p-4 border rounded-lg flex gap-3 items-start bg-card shadow-sm"
          >
            <div className="mt-1 bg-primary/10 p-2 rounded-full">
              <Briefcase className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{job.role}</p>
              <p className="text-sm text-muted-foreground">{job.company}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {job.startDate} — {job.endDate || "Present"}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive"
              onClick={() => removeJob(idx)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Add New Job Form */}
      <div className="p-4 border rounded-lg space-y-4 bg-muted/5 mt-4">
        <h4 className="text-sm font-medium">Add New Experience</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-medium">Role *</label>
            <Input
              placeholder="e.g. Software Engineer"
              value={newJob.role}
              onChange={(e) => setNewJob({ ...newJob, role: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium">Company *</label>
            <Input
              placeholder="e.g. Google"
              value={newJob.company}
              onChange={(e) =>
                setNewJob({ ...newJob, company: e.target.value })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-medium">Start Date</label>
            <Input
              type="date"
              value={newJob.startDate}
              onChange={(e) =>
                setNewJob({ ...newJob, startDate: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium">
              End Date (Leave empty if current)
            </label>
            <Input
              type="date"
              value={newJob.endDate}
              onChange={(e) =>
                setNewJob({ ...newJob, endDate: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium">Description</label>
          <Textarea
            placeholder="Short description of your responsibilities..."
            value={newJob.description || ""}
            onChange={(e) =>
              setNewJob({ ...newJob, description: e.target.value })
            }
            className="h-20"
          />
        </div>

        <Button
          variant="secondary"
          className="w-full border"
          onClick={addJob}
          disabled={!newJob.role || !newJob.company} // Only enable add button if fields are filled
        >
          <Plus className="w-4 h-4 mr-2" /> Add to List
        </Button>
      </div>
    </div>
  );
};
export default CandidateHistoryStep;
