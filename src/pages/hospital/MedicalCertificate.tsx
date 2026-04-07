import ModulePage from "@/components/ModulePage";
import { FileBadge, FileText, Printer, Search, ClipboardList } from "lucide-react";

const subModules = [
  { icon: FileBadge, label: "Issue Certificate", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: Search, label: "Search Certificate", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: ClipboardList, label: "Certificate Types", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: Printer, label: "Print Certificate", iconColor: "#1e293b", iconBg: "#e2e8f0" },
  { icon: FileText, label: "Certificate Reports", iconColor: "#6366f1", iconBg: "#e0e7ff" },
];

const MedicalCertificate = () => <ModulePage title="Medical Certificate" subModules={subModules} />;
export default MedicalCertificate;
