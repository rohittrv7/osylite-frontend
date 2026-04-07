import ModulePage from "@/components/ModulePage";
import { Microscope, TestTube, FileText, ClipboardList, Download, Printer, FlaskConical } from "lucide-react";

const subModules = [
  { icon: TestTube, label: "Sample Collection", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: Microscope, label: "Test Entry", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: FlaskConical, label: "Test Results", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: FileText, label: "Lab Reports", iconColor: "#2563eb", iconBg: "#dbeafe" },
  { icon: ClipboardList, label: "Pending Tests", iconColor: "#ea580c", iconBg: "#ffedd5" },
  { icon: Download, label: "Download Reports", iconColor: "#6366f1", iconBg: "#e0e7ff" },
  { icon: Printer, label: "Print Reports", iconColor: "#1e293b", iconBg: "#e2e8f0" },
];

const Lab = () => <ModulePage title="Lab" subModules={subModules} />;
export default Lab;
