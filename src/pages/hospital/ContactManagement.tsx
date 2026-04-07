import ModulePage from "@/components/ModulePage";
import { Contact, UserPlus, Search, Phone, FileText, Mail } from "lucide-react";

const subModules = [
  { icon: UserPlus, label: "Add Contact", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Search, label: "Search Contact", iconColor: "#ea580c", iconBg: "#ffedd5" },
  { icon: Phone, label: "Phone Directory", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: Mail, label: "Email Directory", iconColor: "#2563eb", iconBg: "#dbeafe" },
  { icon: Contact, label: "Contact Groups", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: FileText, label: "Contact Reports", iconColor: "#6366f1", iconBg: "#e0e7ff" },
];

const ContactManagement = () => <ModulePage title="Contact Management" subModules={subModules} />;
export default ContactManagement;
