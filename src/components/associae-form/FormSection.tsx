import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
}

export function FormSection({
  title,
  icon: Icon,
  children,
  className = "",
}: FormSectionProps) {
  return (
    <div className={`form-section animate-fade-in ${className}`}>
      <div className="form-section-title">
        <Icon className="form-section-icon" />
        <span>{title}</span>
      </div>
      <div className="form-grid">{children}</div>
    </div>
  );
}
