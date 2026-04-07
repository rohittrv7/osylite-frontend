import ModulePage from "@/components/ModulePage";
import { Users, UserPlus, CalendarDays, ClipboardList, IndianRupee, FileText, Clock } from "lucide-react";

const subModules = [
  { icon: UserPlus, label: "Employee Master", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: CalendarDays, label: "Attendance", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Clock, label: "Leave Management", iconColor: "#d97706", iconBg: "#fef3c7" },
  { icon: IndianRupee, label: "Payroll", iconColor: "#1e293b", iconBg: "#e2e8f0" },
  { icon: Users, label: "Shift Management", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: ClipboardList, label: "Duty Roster", iconColor: "#dc2626", iconBg: "#fee2e2" },
  { icon: FileText, label: "HR Reports", iconColor: "#6366f1", iconBg: "#e0e7ff" },
];

const HumanResource = () => <ModulePage title="Human Resource" subModules={subModules} />;
export default HumanResource;
