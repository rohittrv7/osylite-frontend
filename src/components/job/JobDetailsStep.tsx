import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { type JobPost, EXPERIENCE_OPTIONS } from "@/types/job";

interface JobDetailsStepProps {
  data: Partial<JobPost>;
  onChange: (data: Partial<JobPost>) => void;
}

const commonSkills = [
  "MS Office",
  "Excel",
  "Tally",
  "Communication",
  "English",
  "Hindi",
  "Driving",
  "Cooking",
  "Sales",
  "Marketing",
  "Accounting",
  "Computer",
  "Data Entry",
  "Customer Service",
];

const JobDetailsStep = ({ data, onChange }: JobDetailsStepProps) => {
  const [skillInput, setSkillInput] = useState("");
  const skills = data.skills || [];

  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      onChange({ ...data, skills: [...skills, skill] });
    }
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    onChange({ ...data, skills: skills.filter((s) => s !== skill) });
  };

  return (
    <div className="space-y-6">
      {/* Salary Range */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Salary Range (₹/month) <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            placeholder="Min salary"
            value={data.minSalary || ""}
            onChange={(e) =>
              onChange({ ...data, minSalary: Number(e.target.value) })
            }
            className="h-12"
          />
          <Input
            type="number"
            placeholder="Max salary (optional)"
            value={data.maxSalary || ""}
            onChange={(e) =>
              onChange({ ...data, maxSalary: Number(e.target.value) })
            }
            className="h-12"
          />
        </div>
      </div>

      {/* Experience */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Experience Required <span className="text-destructive">*</span>
        </label>
        <Select
          value={data.experienceRequired}
          onValueChange={(value) =>
            onChange({ ...data, experienceRequired: value })
          }
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select experience" />
          </SelectTrigger>
          <SelectContent>
            {EXPERIENCE_OPTIONS.map((exp) => (
              <SelectItem key={exp} value={exp}>
                {exp}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Skills */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">
          Required Skills
        </label>

        {/* Selected Skills */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="gap-1 px-3 py-1"
              >
                {skill}
                <button type="button" onClick={() => removeSkill(skill)}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Skill Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Add a skill"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addSkill(skillInput))
            }
            className="h-10"
          />
        </div>

        {/* Quick Add Skills */}
        <div className="flex flex-wrap gap-2">
          {commonSkills
            .filter((s) => !skills.includes(s))
            .slice(0, 8)
            .map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => addSkill(skill)}
                className="text-xs px-3 py-1.5 rounded-full border border-primary/50 text-primary hover:bg-primary/10 transition-colors"
              >
                + {skill}
              </button>
            ))}
        </div>
      </div>

      {/* Job Description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Job Description <span className="text-destructive">*</span>
        </label>
        <Textarea
          placeholder="Describe the role, responsibilities, benefits, work timings..."
          value={data.description || ""}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          className="min-h-[150px] resize-none"
        />
      </div>
    </div>
  );
};

export default JobDetailsStep;
