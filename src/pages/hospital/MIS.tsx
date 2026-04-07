import ModulePage from "@/components/ModulePage";
import { BarChart3, PieChart, TrendingUp, FileText, Users, IndianRupee } from "lucide-react";

const subModules = [
  { icon: BarChart3, label: "Dashboard", iconColor: "#6366f1", iconBg: "#e0e7ff" },
  { icon: PieChart, label: "Department Wise", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: TrendingUp, label: "Revenue Analysis", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: Users, label: "Patient Statistics", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: IndianRupee, label: "Collection Report", iconColor: "#1e293b", iconBg: "#e2e8f0" },
  { icon: FileText, label: "MIS Reports", iconColor: "#ea580c", iconBg: "#ffedd5" },
];

const MIS = () => <ModulePage title="MIS" subModules={subModules} />;
export default MIS;
