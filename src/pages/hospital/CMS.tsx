import ModulePage from "@/components/ModulePage";
import { Layout, FileText, Image, Globe, Settings } from "lucide-react";

const subModules = [
  { icon: Globe, label: "Website Pages", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: FileText, label: "Content Editor", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: Image, label: "Media Gallery", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: Layout, label: "Page Templates", iconColor: "#d97706", iconBg: "#fef3c7" },
  { icon: Settings, label: "CMS Settings", iconColor: "#1e293b", iconBg: "#e2e8f0" },
];

const CMS = () => <ModulePage title="CMS" subModules={subModules} />;
export default CMS;
