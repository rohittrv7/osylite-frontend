import ModulePage from "@/components/ModulePage";
import { IndianRupee, Package, Wrench, ClipboardList, FileText, BarChart3 } from "lucide-react";

const subModules = [
  { icon: Package, label: "Asset Register", iconColor: "#1e293b", iconBg: "#e2e8f0" },
  { icon: IndianRupee, label: "Asset Valuation", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: Wrench, label: "Maintenance Schedule", iconColor: "#dc2626", iconBg: "#fee2e2" },
  { icon: ClipboardList, label: "AMC Tracking", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: BarChart3, label: "Depreciation", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: FileText, label: "Asset Reports", iconColor: "#6366f1", iconBg: "#e0e7ff" },
];

const AssetsManagement = () => <ModulePage title="Assets Management" subModules={subModules} />;
export default AssetsManagement;
