import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobType, WorkMode, type JobSearchDto } from "@/store/api/jobsApi";
import { Search } from "lucide-react";
import { useState } from "react";

interface JobFiltersProps {
  filters: JobSearchDto;
  onFilterChange: (filters: JobSearchDto) => void;
}

const JobFilters = ({ filters, onFilterChange }: JobFiltersProps) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (key: keyof JobSearchDto, value: any) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
  };

  const clearFilters = () => {
    const empty = { keyword: "", location: "", minSalary: 0 };
    setLocalFilters(empty);
    onFilterChange(empty);
  };

  return (
    <div className="space-y-6 bg-card p-4 rounded-xl border h-fit sticky top-20">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-muted-foreground h-8 px-2"
        >
          Clear
        </Button>
      </div>

      <div className="space-y-4">
        {/* Keyword Search */}
        <div className="space-y-2">
          <Label>Keyword</Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Role, Company..."
              className="pl-9"
              value={localFilters.keyword || ""}
              onChange={(e) => handleChange("keyword", e.target.value)}
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label>Location</Label>
          <Input
            placeholder="e.g. Patna, Delhi"
            value={localFilters.location || ""}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>

        {/* Job Type */}
        <div className="space-y-2">
          <Label>Job Type</Label>
          <Select
            value={localFilters.jobType}
            onValueChange={(val) => handleChange("jobType", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(JobType).map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Work Mode */}
        <div className="space-y-2">
          <Label>Work Mode</Label>
          <Select
            value={localFilters.workMode}
            onValueChange={(val) => handleChange("workMode", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Modes" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(WorkMode).map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Min Salary */}
        <div className="space-y-2">
          <Label>Min Salary (₹)</Label>
          <Input
            type="number"
            placeholder="e.g. 20000"
            value={localFilters.minSalary || ""}
            onChange={(e) => handleChange("minSalary", Number(e.target.value))}
          />
        </div>

        <Button className="w-full cursor-pointer" onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default JobFilters;
