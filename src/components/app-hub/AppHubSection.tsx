import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ExternalLink,
  BarChart3,
  ShieldCheck,
  Workflow,
  Database,
  Cloud,
  Zap,
  Fingerprint,
  Users,
  LayoutGrid,
  Activity,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const APP_CATALOG = [
  {
    id: "market-analytics",
    name: "Market Analytics",
    category: "Data",
    icon: BarChart3,
    status: "Active",
    version: "v2.4",
    desc: "Real-time market insights and visualization.",
  },
  {
    id: "secure-vault",
    name: "Secure Vault",
    category: "Security",
    icon: ShieldCheck,
    status: "Active",
    version: "v1.9",
    desc: "Encrypted storage for sensitive organizational assets.",
  },
  {
    id: "workflow-engine",
    name: "Workflow Engine",
    category: "Operations",
    icon: Workflow,
    status: "Beta",
    version: "v0.9",
    desc: "Automate and orchestrate internal business processes.",
  },
  {
    id: "cloud-gateway",
    name: "Cloud Gateway",
    category: "Infrastructure",
    icon: Cloud,
    status: "Active",
    version: "v3.1",
    desc: "Manage multi-cloud deployments and API routing.",
  },
  {
    id: "identity-access",
    name: "IAM Portal",
    category: "Security",
    icon: Fingerprint,
    status: "Active",
    version: "v2.0",
    desc: "Identity and access management for the ecosystem.",
  },
  {
    id: "hr-hub",
    name: "Team Hub",
    category: "Operations",
    icon: Users,
    status: "Update",
    version: "v1.2",
    desc: "Workforce management and associate directory.",
  },
  {
    id: "data-lake",
    name: "Data Lake",
    category: "Data",
    icon: Database,
    status: "Active",
    version: "v4.0",
    desc: "Centralized repository for structured and unstructured data.",
  },
  {
    id: "server-monitor",
    name: "Pulse Monitor",
    category: "Infrastructure",
    icon: Activity,
    status: "Active",
    version: "v1.5",
    desc: "Real-time server health and latency tracking.",
  },
];

const CATEGORIES = ["All", "Security", "Data", "Operations", "Infrastructure"];

export default function AppHubSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredApps = useMemo(() => {
    return APP_CATALOG.filter((app) => {
      const matchesSearch =
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || app.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="w-full p-6 h-full flex flex-col space-y-8 animate-in fade-in duration-700">
      {/* --- HEADER & CONTROLS --- */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 bg-background dark:bg-background p-8 rounded-3xl border border-border shadow-sm">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <LayoutGrid size={18} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              Workspace Launchpad
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">App Hub</h2>
        </div>

        <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-72">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={16}
            />
            <Input
              placeholder="Search applications..."
              className="h-12 pl-10 rounded-xl bg-background border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* --- CATEGORY FILTERS --- */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border",
              activeCategory === cat
                ? "bg-slate-900 dark:bg-primary text-white dark:text-black border-transparent shadow-md"
                : "bg-background dark:bg-zinc-900 border-border text-muted-foreground hover:border-primary/50",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- APP GRID --- */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredApps.length > 0 ? (
            filteredApps.map((app, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                key={app.id}
                className="group relative bg-background dark:bg-background rounded-2xl p-6 flex flex-col h-full border border-border hover:border-primary/50 transition-all shadow-sm hover:shadow-xl overflow-hidden"
              >
                {/* Status Indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  {app.status === "Beta" && (
                    <Badge
                      variant="secondary"
                      className="bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400 border-none text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm"
                    >
                      Beta
                    </Badge>
                  )}
                  {app.status === "Update" && (
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-none text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm"
                    >
                      Update
                    </Badge>
                  )}
                  {app.status === "Active" && (
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                  )}
                </div>

                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                  <app.icon
                    size={22}
                    className="text-slate-600 dark:text-white group-hover:text-primary transition-colors"
                  />
                </div>

                <h3 className="text-lg font-bold mb-2">{app.name}</h3>
                <p className="text-[11px] text-muted-foreground font-medium leading-relaxed flex-grow">
                  {app.desc}
                </p>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    {app.category} • {app.version}
                  </span>

                  {/* Launch Action (Hidden until hover on desktop) */}
                  <Button
                    size="sm"
                    className="opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity rounded-lg h-8 px-3 text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary hover:bg-primary hover:text-background"
                  >
                    Launch <ExternalLink size={12} className="ml-1" />
                  </Button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 flex flex-col items-center justify-center text-muted-foreground space-y-4 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-border"
            >
              <Zap size={40} className="opacity-20" />
              <p className="font-bold uppercase tracking-widest text-sm">
                No applications found
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
