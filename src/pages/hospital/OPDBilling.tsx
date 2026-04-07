import ModulePage from "@/components/ModulePage";
import { UserPlus, Receipt, FileText, Search, CreditCard, Users, ClipboardList, Printer, CalendarCheck } from "lucide-react";

const subModules = [
  { icon: UserPlus, label: "New Patient Registration", to: "/opd-billing/new-patient", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Receipt, label: "OPD Receipt", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: FileText, label: "Bill Generation", iconColor: "#2563eb", iconBg: "#dbeafe" },
  { icon: Search, label: "Patient Search", iconColor: "#ea580c", iconBg: "#ffedd5" },
  { icon: CreditCard, label: "Payment Collection", iconColor: "#16a34a", iconBg: "#dcfce7" },
  { icon: Users, label: "Patient Queue", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: ClipboardList, label: "Bill Summary", iconColor: "#6366f1", iconBg: "#e0e7ff" },
  { icon: Printer, label: "Print Bills", iconColor: "#1e293b", iconBg: "#e2e8f0" },
  { icon: CalendarCheck, label: "Day Close", iconColor: "#dc2626", iconBg: "#fee2e2" },
];

const OPDBilling = () => <ModulePage title="OPD Billing" subModules={subModules} />;
export default OPDBilling;
