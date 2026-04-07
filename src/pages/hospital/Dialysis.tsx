import ModulePage from "@/components/ModulePage";
import { Stethoscope, CalendarDays, Activity, Users, FileText, ClipboardList } from "lucide-react";

const subModules = [
  { icon: CalendarDays, label: "Dialysis Schedule", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: Stethoscope, label: "Session Entry", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Activity, label: "Patient Monitoring", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: Users, label: "Patient Register", iconColor: "#d97706", iconBg: "#fef3c7" },
  { icon: ClipboardList, label: "Machine Status", iconColor: "#dc2626", iconBg: "#fee2e2" },
  { icon: FileText, label: "Dialysis Reports", iconColor: "#6366f1", iconBg: "#e0e7ff" },
];

const Dialysis = () => <ModulePage title="Dialysis" subModules={subModules} />;
export default Dialysis;
