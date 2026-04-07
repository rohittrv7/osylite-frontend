import AppHeader from "@/components/AppHeader";
import ModuleCard from "@/components/ModuleCard";
import {
  Receipt, AlertTriangle, BedDouble, CreditCard, Microscope,
  Pill, Package, FolderOpen, FileText, Monitor,
  BarChart3, CalendarDays, UtensilsCrossed, Database, UserCog,
  IndianRupee, MessageSquare, Users, ClipboardList, Landmark,
  Contact, Building2, Clock, GraduationCap, Stethoscope,
  HelpCircle, Layout, Droplets, Ambulance, CheckCircle,
  ShieldCheck, Wrench, BedSingle, FileBadge
} from "lucide-react";

const modules = [
  { icon: Receipt, label: "OPD Billing", to: "/opd-billing", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: AlertTriangle, label: "Emergency", to: "/emergency", iconColor: "#dc2626", iconBg: "#fee2e2" },
  { icon: BedDouble, label: "IPD Registration/Nursing", to: "/ipd-registration", iconColor: "#d97706", iconBg: "#fef3c7" },
  { icon: CreditCard, label: "IPD Billing", to: "/ipd-billing", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: Microscope, label: "Lab", to: "/lab", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: Pill, label: "Pharmacy", to: "/pharmacy", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Package, label: "Inventory", to: "/inventory", iconColor: "#2563eb", iconBg: "#dbeafe" },
  { icon: FolderOpen, label: "MRD", to: "/mrd", iconColor: "#92400e", iconBg: "#fef3c7" },
  { icon: FileText, label: "E-Prescription", to: "/e-prescription", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Monitor, label: "IPD Clinical Management", to: "/ipd-clinical", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: BarChart3, label: "MIS", to: "/mis", iconColor: "#6366f1", iconBg: "#e0e7ff" },
  { icon: CalendarDays, label: "Appointment", to: "/appointment", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: UtensilsCrossed, label: "Patient Diet", to: "/patient-diet", iconColor: "#16a34a", iconBg: "#dcfce7" },
  { icon: Database, label: "Masters", to: "/masters", iconColor: "#1e40af", iconBg: "#dbeafe" },
  { icon: UserCog, label: "Admin", to: "/admin", iconColor: "#dc2626", iconBg: "#fee2e2" },
  { icon: IndianRupee, label: "Assets Management", to: "/assets-management", iconColor: "#1e293b", iconBg: "#e2e8f0" },
  { icon: MessageSquare, label: "Feed Back", to: "/feedback", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Users, label: "Human Resource", to: "/human-resource", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: ClipboardList, label: "Reports", to: "/reports", iconColor: "#ea580c", iconBg: "#ffedd5" },
  { icon: Landmark, label: "Financial", to: "/financial", iconColor: "#6366f1", iconBg: "#e0e7ff" },
  { icon: Contact, label: "Contact Management", to: "/contact-management", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Building2, label: "Ward Detail", to: "/ward-detail", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: Clock, label: "OT Scheduling", to: "/ot-scheduling", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: GraduationCap, label: "Training", to: "/training", iconColor: "#d97706", iconBg: "#fef3c7" },
  { icon: Stethoscope, label: "Dialysis", to: "/dialysis", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: HelpCircle, label: "Enquiry", to: "/enquiry", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: Layout, label: "CMS", to: "/cms", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Droplets, label: "Blood Bank", to: "/blood-bank", iconColor: "#dc2626", iconBg: "#fee2e2" },
  { icon: Ambulance, label: "Ambulance", to: "/ambulance", iconColor: "#ea580c", iconBg: "#ffedd5" },
  { icon: CheckCircle, label: "Approvals", to: "/approvals", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: ShieldCheck, label: "TPA Desk", to: "/tpa-desk", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Wrench, label: "CSSD", to: "/cssd", iconColor: "#dc2626", iconBg: "#fee2e2" },
  { icon: BedSingle, label: "ADT", to: "/adt", iconColor: "#6366f1", iconBg: "#e0e7ff" },
  { icon: FileBadge, label: "Medical Certificate", to: "/medical-certificate", iconColor: "#059669", iconBg: "#d1fae5" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {modules.map((mod) => (
            <ModuleCard key={mod.label} {...mod} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
