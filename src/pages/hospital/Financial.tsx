import ModulePage from "@/components/ModulePage";
import { Landmark, IndianRupee, FileText, BarChart3, CreditCard, ClipboardList } from "lucide-react";

const subModules = [
  { icon: IndianRupee, label: "Accounts Ledger", iconColor: "#6366f1", iconBg: "#e0e7ff" },
  { icon: CreditCard, label: "Payment Voucher", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Landmark, label: "Bank Reconciliation", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: BarChart3, label: "P&L Statement", iconColor: "#d97706", iconBg: "#fef3c7" },
  { icon: ClipboardList, label: "Balance Sheet", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: FileText, label: "Financial Reports", iconColor: "#1e293b", iconBg: "#e2e8f0" },
];

const Financial = () => <ModulePage title="Financial" subModules={subModules} />;
export default Financial;
