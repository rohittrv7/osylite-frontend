import ModulePage from "@/components/ModulePage";
import { Ambulance, MapPin, Phone, Users, ClipboardList, FileText } from "lucide-react";

const subModules = [
  { icon: Ambulance, label: "Ambulance Request", iconColor: "#ea580c", iconBg: "#ffedd5" },
  { icon: MapPin, label: "Live Tracking", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Users, label: "Driver Assignment", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: Phone, label: "Emergency Calls", iconColor: "#dc2626", iconBg: "#fee2e2" },
  { icon: ClipboardList, label: "Trip Log", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: FileText, label: "Ambulance Reports", iconColor: "#6366f1", iconBg: "#e0e7ff" },
];

const AmbulancePage = () => <ModulePage title="Ambulance" subModules={subModules} />;
export default AmbulancePage;
