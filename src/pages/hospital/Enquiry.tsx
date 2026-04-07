import AppHeader from "@/components/AppHeader";
import ModuleCard from "@/components/ModuleCard";
import { CalendarCheck, Building, UserSearch, Users, Phone, Search } from "lucide-react";

const subModules = [
  { icon: CalendarCheck, label: "Quick Rate", to: "/enquiry/quick-rate", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Building, label: "Room Occupancy", iconColor: "#2563eb", iconBg: "#dbeafe" },
  { icon: UserSearch, label: "Search Consultant", to: "/enquiry/search-consultant", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: Users, label: "Search Admitted Patients", to: "/enquiry/admitted-patients", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Phone, label: "Phone Directory", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Search, label: "Patient Search", to: "/enquiry/patient-search", iconColor: "#ea580c", iconBg: "#ffedd5" },
];

const Enquiry = () => (
  <div className="min-h-screen bg-background">
    <AppHeader title="Enquiry" showBack />
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {subModules.map((mod) => (
          <div key={mod.label} className="rounded-xl bg-accent/50 p-4">
            <ModuleCard {...mod} />
          </div>
        ))}
      </div>
    </main>
  </div>
);

export default Enquiry;
