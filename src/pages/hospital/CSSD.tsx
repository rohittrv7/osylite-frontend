import ModulePage from "@/components/ModulePage";
import { Wrench, Package, ClipboardList, FileText, Settings } from "lucide-react";

const subModules = [
  { icon: Package, label: "Instrument Tracking", iconColor: "#dc2626", iconBg: "#fee2e2" },
  { icon: Wrench, label: "Sterilization Log", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: ClipboardList, label: "CSSD Requests", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: Settings, label: "Machine Maintenance", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: FileText, label: "CSSD Reports", iconColor: "#6366f1", iconBg: "#e0e7ff" },
];

const CSSD = () => <ModulePage title="CSSD" subModules={subModules} />;
export default CSSD;
