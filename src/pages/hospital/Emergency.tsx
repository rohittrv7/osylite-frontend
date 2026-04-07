import ModulePage from "@/components/ModulePage";
import { AlertTriangle, UserPlus, Stethoscope, ClipboardList, Ambulance, Activity, FileText } from "lucide-react";

const subModules = [
  { icon: UserPlus, label: "Emergency Registration", iconColor: "#dc2626", iconBg: "#fee2e2" },
  { icon: AlertTriangle, label: "Triage", iconColor: "#ea580c", iconBg: "#ffedd5" },
  { icon: Stethoscope, label: "Emergency Treatment", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Ambulance, label: "Ambulance Tracking", iconColor: "#d97706", iconBg: "#fef3c7" },
  { icon: Activity, label: "Vitals Monitoring", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: ClipboardList, label: "Emergency Reports", iconColor: "#6366f1", iconBg: "#e0e7ff" },
  { icon: FileText, label: "MLC Report", iconColor: "#7c3aed", iconBg: "#ede9fe" },
];

const Emergency = () => <ModulePage title="Emergency" subModules={subModules} />;
export default Emergency;
