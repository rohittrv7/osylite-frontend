import type { Service } from "@/config/service";
import { Check } from "lucide-react";

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  return (
    <div
      className="service-card flex items-center gap-3 animate-fade-up"
      style={{ animationDelay: `${index * 0.02}s` }}
    >
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/60 flex items-center justify-center">
        <Check className="w-3.5 h-3.5" />
      </div>
      <span className="text-sm font-medium text-foreground">{service.name}</span>
    </div>
  );
};

export default ServiceCard;
