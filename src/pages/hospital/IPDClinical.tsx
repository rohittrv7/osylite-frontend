import ModulePage from "@/components/ModulePage";
import { Monitor, Activity, FileText, Pill, ClipboardList, Stethoscope, FlaskConical } from "lucide-react";

const subModules = [
  { icon: Activity, label: "Vitals Chart", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: Stethoscope, label: "Doctor Orders", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Pill, label: "Medication Sheet", iconColor: "#dc2626", iconBg: "#fee2e2" },
  { icon: FlaskConical, label: "Investigation", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: Monitor, label: "Clinical Notes", iconColor: "#2563eb", iconBg: "#dbeafe" },
  { icon: ClipboardList, label: "Treatment Plan", iconColor: "#6366f1", iconBg: "#e0e7ff" },
  { icon: FileText, label: "Progress Notes", iconColor: "#d97706", iconBg: "#fef3c7" },
];

const IPDClinical = () => <ModulePage title="IPD Clinical Management" subModules={subModules} />;
export default IPDClinical;
