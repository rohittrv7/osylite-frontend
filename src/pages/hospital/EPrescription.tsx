import ModulePage from "@/components/ModulePage";
import { FileText, Pill, Search, Printer, ClipboardList, History } from "lucide-react";

const subModules = [
  { icon: FileText, label: "New Prescription", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Pill, label: "Drug Database", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: Search, label: "Patient Lookup", iconColor: "#ea580c", iconBg: "#ffedd5" },
  { icon: History, label: "Prescription History", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: ClipboardList, label: "Templates", iconColor: "#6366f1", iconBg: "#e0e7ff" },
  { icon: Printer, label: "Print Prescription", iconColor: "#1e293b", iconBg: "#e2e8f0" },
];

const EPrescription = () => <ModulePage title="E-Prescription" subModules={subModules} />;
export default EPrescription;
