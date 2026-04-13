import { User, Users, Calendar } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Gender,
  ProfileCreatedFor,
  type MatrimonyProfile,
} from "@/types/matrimony";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface BasicInfoStepProps {
  formData: Partial<MatrimonyProfile>;
  updateFormData: (data: Partial<MatrimonyProfile>) => void;
}

const profileForOptions = [
  { value: ProfileCreatedFor.SELF, label: "Myself", icon: User },
  { value: ProfileCreatedFor.SON, label: "Son", icon: Users },
  { value: ProfileCreatedFor.DAUGHTER, label: "Daughter", icon: Users },
  { value: ProfileCreatedFor.BROTHER, label: "Brother", icon: Users },
  { value: ProfileCreatedFor.SISTER, label: "Sister", icon: Users },
  { value: ProfileCreatedFor.FRIEND, label: "Friend", icon: Users },
];

const BasicInfoStep = ({ formData, updateFormData }: BasicInfoStepProps) => {
  return (
    <div className="space-y-8">
      {/* Profile For */}
      <div className="space-y-4">
        <Label className="text-lg font-display text-foreground">
          This profile is for
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {profileForOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateFormData({ profileFor: option.value })}
              className={cn(
                "p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2",
                formData.profileFor === option.value
                  ? "border-primary bg-primary/5 shadow-matrimony"
                  : "border-border hover:border-primary/50 hover:bg-muted/50",
              )}
            >
              <option.icon
                className={cn(
                  "w-6 h-6",
                  formData.profileFor === option.value
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              />
              <span
                className={cn(
                  "text-sm font-medium",
                  formData.profileFor === option.value
                    ? "text-primary"
                    : "text-foreground",
                )}
              >
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* --- NEW CONDITIONAL NAME INPUT --- */}
      {formData.profileFor && (
        <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <Label
            htmlFor="candidateName"
            className="text-lg font-display text-foreground"
          >
            {formData.profileFor === ProfileCreatedFor.SELF
              ? "Your Full Name"
              : `Name of the Candidate`}
            {formData.profileFor === ProfileCreatedFor.SELF ? (
              <span className="text-muted-foreground text-sm font-normal ml-2">
                (Optional)
              </span>
            ) : (
              <span className="text-red-500 ml-1">*</span>
            )}
          </Label>
          <Input
            id="candidateName"
            type="text"
            placeholder={
              formData.profileFor === ProfileCreatedFor.SELF
                ? "Enter your name"
                : "Enter full name"
            }
            value={formData.candidateName || ""}
            onChange={(e) => updateFormData({ candidateName: e.target.value })}
            className="h-12"
          />
        </div>
      )}
      {/* ---------------------------------- */}

      {/* Gender */}
      <div className="space-y-4">
        <Label className="text-lg font-display text-foreground">Gender</Label>
        <RadioGroup
          value={formData.gender}
          onValueChange={(value) => updateFormData({ gender: value as Gender })}
          className="flex gap-4"
        >
          <label
            className={cn(
              "flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all flex-1",
              formData.gender === Gender.MALE
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50",
            )}
          >
            <RadioGroupItem value={Gender.MALE} />
            <span className="font-medium">Male</span>
          </label>
          <label
            className={cn(
              "flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all flex-1",
              formData.gender === Gender.FEMALE
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50",
            )}
          >
            <RadioGroupItem value={Gender.FEMALE} />
            <span className="font-medium">Female</span>
          </label>
        </RadioGroup>
      </div>

      {/* Date of Birth */}
      <div className="space-y-3">
        <Label htmlFor="dob" className="text-lg font-display text-foreground">
          Date of Birth
        </Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="dob"
            type="date"
            value={
              formData.dob
                ? new Date(formData.dob).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => {
              if (e.target.value) {
                updateFormData({ dob: new Date(e.target.value).toISOString() });
              } else {
                updateFormData({ dob: undefined });
              }
            }}
            className="pl-10 h-12"
            max={new Date().toISOString().split("T")[0]}
          />
        </div>
      </div>

      {/* Height */}
      <div className="space-y-3">
        <Label
          htmlFor="height"
          className="text-lg font-display text-foreground"
        >
          Height (in cm)
        </Label>
        <Input
          id="height"
          type="number"
          placeholder="e.g., 175"
          value={formData.height || ""}
          onChange={(e) =>
            updateFormData({ height: parseInt(e.target.value) || 0 })
          }
          className="h-12"
          min={100}
          max={250}
        />
        <p className="text-sm text-muted-foreground">
          {formData.height
            ? `${Math.floor(formData.height / 30.48)}'${Math.round((formData.height % 30.48) / 2.54)}"`
            : ""}
        </p>
      </div>
    </div>
  );
};

export default BasicInfoStep;
