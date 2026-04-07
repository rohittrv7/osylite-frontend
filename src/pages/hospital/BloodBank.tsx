import ModulePage from "@/components/ModulePage";
import { Droplets, Users, Package, ClipboardList, FileText, AlertTriangle } from "lucide-react";

const subModules = [
  { icon: Droplets, label: "Blood Stock", iconColor: "#dc2626", iconBg: "#fee2e2" },
  { icon: Users, label: "Donor Register", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Package, label: "Issue Blood", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: ClipboardList, label: "Cross Match", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: AlertTriangle, label: "Expiry Alert", iconColor: "#ea580c", iconBg: "#ffedd5" },
  { icon: FileText, label: "Blood Bank Reports", iconColor: "#6366f1", iconBg: "#e0e7ff" },
];

const BloodBank = () => <ModulePage title="Blood Bank" subModules={subModules} />;
export default BloodBank;
