import AppHeader from "@/components/AppHeader";
import ModuleCard from "@/components/ModuleCard";
import { type LucideIcon } from "lucide-react";

export interface SubModule {
  icon: LucideIcon;
  label: string;
  to?: string;
  iconColor?: string;
  iconBg?: string;
}

interface ModulePageProps {
  title: string;
  subModules: SubModule[];
}

const ModulePage = ({ title, subModules }: ModulePageProps) => (
  <div className="min-h-screen bg-background">
    <AppHeader title={title} showBack />
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

export default ModulePage;
