import ModulePage from "@/components/ModulePage";
import { CalendarDays, UserPlus, Clock, Search, ClipboardList, Bell } from "lucide-react";

const subModules = [
  { icon: CalendarDays, label: "Book Appointment", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Clock, label: "Today's Schedule", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: Search, label: "Search Appointment", iconColor: "#ea580c", iconBg: "#ffedd5" },
  { icon: UserPlus, label: "Walk-in Patient", iconColor: "#d97706", iconBg: "#fef3c7" },
  { icon: Bell, label: "Reminders", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: ClipboardList, label: "Appointment Reports", iconColor: "#6366f1", iconBg: "#e0e7ff" },
];

const Appointment = () => <ModulePage title="Appointment" subModules={subModules} />;
export default Appointment;
