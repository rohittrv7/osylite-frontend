import ModulePage from "@/components/ModulePage";
import { Database, Users, Building2, Stethoscope, FileText, Settings, Pill, BedDouble } from "lucide-react";

const subModules = [
  { icon: Users, label: "Doctor Master", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Building2, label: "Department Master", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: BedDouble, label: "Ward / Bed Master", iconColor: "#d97706", iconBg: "#fef3c7" },
  { icon: Stethoscope, label: "Service Master", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: Pill, label: "Drug Master", iconColor: "#dc2626", iconBg: "#fee2e2" },
  { icon: Database, label: "Panel Master", iconColor: "#1e40af", iconBg: "#dbeafe" },
  { icon: Settings, label: "System Config", iconColor: "#1e293b", iconBg: "#e2e8f0" },
  { icon: FileText, label: "ICD Master", iconColor: "#6366f1", iconBg: "#e0e7ff" },
];

const Masters = () => <ModulePage title="Masters" subModules={subModules} />;
export default Masters;
