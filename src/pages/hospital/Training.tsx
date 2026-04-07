import ModulePage from "@/components/ModulePage";
import { GraduationCap, CalendarDays, Users, FileText, ClipboardList } from "lucide-react";

const subModules = [
  { icon: CalendarDays, label: "Training Schedule", iconColor: "#d97706", iconBg: "#fef3c7" },
  { icon: GraduationCap, label: "Training Programs", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Users, label: "Attendees", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: ClipboardList, label: "Assessment", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: FileText, label: "Training Reports", iconColor: "#6366f1", iconBg: "#e0e7ff" },
];

const Training = () => <ModulePage title="Training" subModules={subModules} />;
export default Training;
