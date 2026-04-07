import ModulePage from "@/components/ModulePage";
import { Pill, ShoppingCart, Package, ClipboardList, RotateCcw, FileText, AlertTriangle } from "lucide-react";

const subModules = [
  { icon: ShoppingCart, label: "Sale / Billing", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Pill, label: "Drug Search", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: Package, label: "Stock Management", iconColor: "#2563eb", iconBg: "#dbeafe" },
  { icon: RotateCcw, label: "Return / Refund", iconColor: "#dc2626", iconBg: "#fee2e2" },
  { icon: AlertTriangle, label: "Expiry Alert", iconColor: "#ea580c", iconBg: "#ffedd5" },
  { icon: ClipboardList, label: "Purchase Order", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: FileText, label: "Pharmacy Reports", iconColor: "#6366f1", iconBg: "#e0e7ff" },
];

const Pharmacy = () => <ModulePage title="Pharmacy" subModules={subModules} />;
export default Pharmacy;
