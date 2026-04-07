import ModulePage from "@/components/ModulePage";
import { FolderOpen, Search, FileText, Upload, Download, ClipboardList } from "lucide-react";

const subModules = [
  { icon: Search, label: "File Search", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: FolderOpen, label: "File Tracking", iconColor: "#92400e", iconBg: "#fef3c7" },
  { icon: Upload, label: "Upload Documents", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: Download, label: "Download Records", iconColor: "#2563eb", iconBg: "#dbeafe" },
  { icon: ClipboardList, label: "ICD Coding", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: FileText, label: "MRD Reports", iconColor: "#6366f1", iconBg: "#e0e7ff" },
];

const MRD = () => <ModulePage title="MRD" subModules={subModules} />;
export default MRD;
