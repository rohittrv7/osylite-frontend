import ModulePage from "@/components/ModulePage";
import { BedSingle, UserPlus, ArrowRightLeft, ClipboardList, FileText } from "lucide-react";

const subModules = [
  { icon: UserPlus, label: "Admission", iconColor: "#6366f1", iconBg: "#e0e7ff" },
  { icon: ArrowRightLeft, label: "Transfer", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: BedSingle, label: "Discharge", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: ClipboardList, label: "ADT Log", iconColor: "#d97706", iconBg: "#fef3c7" },
  { icon: FileText, label: "ADT Reports", iconColor: "#7c3aed", iconBg: "#ede9fe" },
];

const ADT = () => <ModulePage title="ADT" subModules={subModules} />;
export default ADT;
