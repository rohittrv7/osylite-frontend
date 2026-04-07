import ModulePage from "@/components/ModulePage";
import { UtensilsCrossed, ClipboardList, FileText, Users, Calendar } from "lucide-react";

const subModules = [
  { icon: UtensilsCrossed, label: "Diet Plan", iconColor: "#16a34a", iconBg: "#dcfce7" },
  { icon: ClipboardList, label: "Diet Order", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Calendar, label: "Diet Schedule", iconColor: "#d97706", iconBg: "#fef3c7" },
  { icon: Users, label: "Patient Diet List", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: FileText, label: "Diet Reports", iconColor: "#6366f1", iconBg: "#e0e7ff" },
];

const PatientDiet = () => <ModulePage title="Patient Diet" subModules={subModules} />;
export default PatientDiet;
