import { type LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ModuleCardProps {
  icon: LucideIcon;
  label: string;
  to?: string;
  iconColor?: string;
  iconBg?: string;
}

const ModuleCard = ({ icon: Icon, label, to, iconColor = "hsl(var(--primary))", iconBg = "hsl(var(--accent))" }: ModuleCardProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => to && navigate(to)}
      className="group flex flex-col items-center gap-3 rounded-xl p-5 transition-all hover:shadow-lg hover:scale-105 hover:bg-card active:scale-95"
    >
      <div
        className="flex items-center justify-center rounded-full p-4 transition-shadow group-hover:shadow-md"
        style={{ backgroundColor: iconBg, width: "var(--module-icon-size)", height: "var(--module-icon-size)" }}
      >
        <Icon className="h-8 w-8" style={{ color: iconColor }} />
      </div>
      <span className="text-sm font-medium text-foreground text-center leading-tight">{label}</span>
    </button>
  );
};

export default ModuleCard;
