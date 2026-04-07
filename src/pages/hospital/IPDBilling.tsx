import ModulePage from "@/components/ModulePage";
import { CreditCard, Receipt, FileText, IndianRupee, ClipboardList, Printer, RefreshCw } from "lucide-react";

const subModules = [
  { icon: Receipt, label: "Generate Bill", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: CreditCard, label: "Payment Collection", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: IndianRupee, label: "Advance Payment", iconColor: "#1e293b", iconBg: "#e2e8f0" },
  { icon: RefreshCw, label: "Refund Processing", iconColor: "#dc2626", iconBg: "#fee2e2" },
  { icon: FileText, label: "Final Bill", iconColor: "#2563eb", iconBg: "#dbeafe" },
  { icon: ClipboardList, label: "Bill Summary", iconColor: "#6366f1", iconBg: "#e0e7ff" },
  { icon: Printer, label: "Print Bill", iconColor: "#7c3aed", iconBg: "#ede9fe" },
];

const IPDBilling = () => <ModulePage title="IPD Billing" subModules={subModules} />;
export default IPDBilling;
