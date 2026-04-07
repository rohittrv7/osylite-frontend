import ModulePage from "@/components/ModulePage";
import { Building2, BedDouble, Users, ClipboardList, BarChart3 } from "lucide-react";

const subModules = [
  { icon: Building2, label: "Ward List", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: BedDouble, label: "Bed Occupancy", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Users, label: "Patient Ward Map", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: ClipboardList, label: "Ward Transfer Log", iconColor: "#d97706", iconBg: "#fef3c7" },
  { icon: BarChart3, label: "Occupancy Report", iconColor: "#6366f1", iconBg: "#e0e7ff" },
];

const WardDetail = () => <ModulePage title="Ward Detail" subModules={subModules} />;
export default WardDetail;
