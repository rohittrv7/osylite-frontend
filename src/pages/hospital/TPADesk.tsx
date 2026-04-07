import ModulePage from "@/components/ModulePage";
import { ShieldCheck, FileText, CreditCard, ClipboardList, Users, Search } from "lucide-react";

const subModules = [
  { icon: Search, label: "TPA Search", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: CreditCard, label: "Claim Submission", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: ShieldCheck, label: "Pre-Authorization", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: Users, label: "TPA Patients", iconColor: "#d97706", iconBg: "#fef3c7" },
  { icon: ClipboardList, label: "Claim Status", iconColor: "#dc2626", iconBg: "#fee2e2" },
  { icon: FileText, label: "TPA Reports", iconColor: "#6366f1", iconBg: "#e0e7ff" },
];

const TPADesk = () => <ModulePage title="TPA Desk" subModules={subModules} />;
export default TPADesk;
