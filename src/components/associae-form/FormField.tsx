import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { FieldError } from "react-hook-form";

interface BaseFieldProps {
  label: string;
  error?: FieldError;
  required?: boolean;
  className?: string;
}

interface InputFieldProps extends BaseFieldProps {
  type: "text" | "tel" | "email" | "url" | "number" | "time" | "password";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

interface SelectFieldProps extends BaseFieldProps {
  type: "select";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

interface TextareaFieldProps extends BaseFieldProps {
  type: "textarea";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}

type FormFieldProps = InputFieldProps | SelectFieldProps | TextareaFieldProps;

export function FormField(props: FormFieldProps) {
  const { label, error, required, className = "" } = props;

  const renderField = () => {
    if (props.type === "select") {
      return (
        <Select value={props.value} onValueChange={props.onChange}>
          <SelectTrigger
            className={error ? "border-destructive focus:ring-destructive" : ""}
          >
            <SelectValue
              placeholder={props.placeholder || `Select ${label.toLowerCase()}`}
            />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            {props.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    if (props.type === "textarea") {
      return (
        <Textarea
          placeholder={props.placeholder || `Enter ${label.toLowerCase()}`}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          rows={props.rows || 3}
          className={error ? "border-destructive focus:ring-destructive" : ""}
        />
      );
    }

    return (
      <Input
        type={props.type}
        placeholder={props.placeholder || `Enter ${label.toLowerCase()}`}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className={error ? "border-destructive focus:ring-destructive" : ""}
      />
    );
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="flex items-center gap-1 text-sm font-medium">
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      {renderField()}
      {error && <p className="form-field-error">{error.message}</p>}
    </div>
  );
}
