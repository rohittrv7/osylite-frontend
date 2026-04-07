import ModulePage from "@/components/ModulePage";
import { Clock, CalendarDays, Users, ClipboardList, FileText } from "lucide-react";

const subModules = [
  { icon: CalendarDays, label: "OT Calendar", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Clock, label: "Schedule Surgery", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: Users, label: "OT Team", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: ClipboardList, label: "Pre-Op Checklist", iconColor: "#d97706", iconBg: "#fef3c7" },
  { icon: FileText, label: "OT Reports", iconColor: "#6366f1", iconBg: "#e0e7ff" },
];

const OTScheduling = () => <ModulePage title="OT Scheduling" subModules={subModules} />;
export default OTScheduling;
