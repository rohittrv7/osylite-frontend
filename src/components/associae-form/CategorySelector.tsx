import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  AssociateCategory,
  CATEGORY_GROUPS,
  CATEGORY_LABELS,
} from "@/types/associate";
import { Briefcase } from "lucide-react";
import type { FieldError } from "react-hook-form";

interface CategorySelectorProps {
  value: string;
  onChange: (value: AssociateCategory) => void;
  error?: FieldError;
}

export function CategorySelector({
  value,
  onChange,
  error,
}: CategorySelectorProps) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-sm font-medium">
        <Briefcase className="h-4 w-4 text-primary" />
        Select Your Category
        <span className="text-destructive">*</span>
      </Label>
      <Select
        value={value}
        onValueChange={(v) => onChange(v as AssociateCategory)}
      >
        <SelectTrigger
          className={`h-12 text-base ${error ? "border-destructive focus:ring-destructive" : ""}`}
        >
          <SelectValue placeholder="Choose your business category" />
        </SelectTrigger>
        <SelectContent className="max-h-80 bg-popover z-50">
          {Object.entries(CATEGORY_GROUPS).map(([groupName, categories]) => (
            <SelectGroup key={groupName}>
              <SelectLabel className="px-2 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {groupName}
              </SelectLabel>
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="py-2.5">
                  {CATEGORY_LABELS[category]}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="form-field-error">{error.message}</p>}
    </div>
  );
}
