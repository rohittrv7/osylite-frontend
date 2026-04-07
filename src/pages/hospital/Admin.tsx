import ModulePage from "@/components/ModulePage";
import { UserCog, Shield, Users, Settings, Key, FileText } from "lucide-react";

const subModules = [
  { icon: Users, label: "User Management", iconColor: "#dc2626", iconBg: "#fee2e2" },
  { icon: Shield, label: "Role & Permissions", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: Key, label: "Access Control", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Settings, label: "System Settings", iconColor: "#1e293b", iconBg: "#e2e8f0" },
  { icon: UserCog, label: "Module Configuration", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: FileText, label: "Audit Logs", iconColor: "#6366f1", iconBg: "#e0e7ff" },
];

const Admin = () => <ModulePage title="Admin" subModules={subModules} />;
export default Admin;
