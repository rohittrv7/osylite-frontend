import ModulePage from "@/components/ModulePage";
import { ClipboardList, BarChart3, FileText, PieChart, Download, Printer } from "lucide-react";

const subModules = [
  { icon: ClipboardList, label: "Daily Reports", iconColor: "#ea580c", iconBg: "#ffedd5" },
  { icon: BarChart3, label: "Department Reports", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: PieChart, label: "Revenue Reports", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: FileText, label: "Patient Reports", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: Download, label: "Export Reports", iconColor: "#2563eb", iconBg: "#dbeafe" },
  { icon: Printer, label: "Print Reports", iconColor: "#1e293b", iconBg: "#e2e8f0" },
];

const Reports = () => <ModulePage title="Reports" subModules={subModules} />;
export default Reports;
