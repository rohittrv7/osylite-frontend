import ModulePage from "@/components/ModulePage";
import { Package, ShoppingCart, Truck, ClipboardList, RotateCcw, BarChart3, FileText } from "lucide-react";

const subModules = [
  { icon: ShoppingCart, label: "Purchase Order", iconColor: "#2563eb", iconBg: "#dbeafe" },
  { icon: Truck, label: "GRN (Goods Receipt)", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Package, label: "Stock Status", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: RotateCcw, label: "Issue / Return", iconColor: "#dc2626", iconBg: "#fee2e2" },
  { icon: ClipboardList, label: "Indent Request", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: BarChart3, label: "Inventory Reports", iconColor: "#6366f1", iconBg: "#e0e7ff" },
  { icon: FileText, label: "Vendor Management", iconColor: "#d97706", iconBg: "#fef3c7" },
];

const Inventory = () => <ModulePage title="Inventory" subModules={subModules} />;
export default Inventory;
