import ModulePage from "@/components/ModulePage";
import { CheckCircle, Clock, ClipboardList, FileText, AlertTriangle } from "lucide-react";

const subModules = [
  { icon: Clock, label: "Pending Approvals", iconColor: "#ea580c", iconBg: "#ffedd5" },
  { icon: CheckCircle, label: "Approved List", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: AlertTriangle, label: "Rejected List", iconColor: "#dc2626", iconBg: "#fee2e2" },
  { icon: ClipboardList, label: "Approval History", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: FileText, label: "Approval Reports", iconColor: "#6366f1", iconBg: "#e0e7ff" },
];

const Approvals = () => <ModulePage title="Approvals" subModules={subModules} />;
export default Approvals;
