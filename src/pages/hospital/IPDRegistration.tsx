import ModulePage from "@/components/ModulePage";
import { BedDouble, UserPlus, ClipboardList, Activity, FileText, Users, ArrowRightLeft, Pill } from "lucide-react";

const subModules = [
  { icon: UserPlus, label: "New Admission", iconColor: "#d97706", iconBg: "#fef3c7" },
  { icon: BedDouble, label: "Bed Allocation", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Activity, label: "Nursing Notes", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: ClipboardList, label: "Patient History", iconColor: "#6366f1", iconBg: "#e0e7ff" },
  { icon: ArrowRightLeft, label: "Ward Transfer", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: Pill, label: "Medication Chart", iconColor: "#dc2626", iconBg: "#fee2e2" },
  { icon: Users, label: "Duty Roster", iconColor: "#2563eb", iconBg: "#dbeafe" },
  { icon: FileText, label: "Discharge Summary", iconColor: "#16a34a", iconBg: "#dcfce7" },
];

const IPDRegistration = () => <ModulePage title="IPD Registration / Nursing" subModules={subModules} />;
export default IPDRegistration;
