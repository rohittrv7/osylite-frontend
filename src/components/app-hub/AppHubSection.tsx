import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ExternalLink,
  Loader2,
  Zap,
  LayoutGrid,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetActiveAppsQuery } from "@/store/api/appHubApi";

const CATEGORIES = ["All", "Security", "Data", "Operations", "Infrastructure", "Others"];

export default function AppHubSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: apps = [], isLoading } = useGetActiveAppsQuery();

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchesSearch =
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || app.category.toLowerCase() === activeCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [apps, searchQuery, activeCategory]);

  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
      </div>
    );
  }

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
            filteredApps.map((app, index) => {
              // Dynamically map icon name from Lucide
              const IconComponent = (LucideIcons as any)[app.icon] || LucideIcons.LayoutGrid;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  key={app.id}
                  className="group relative bg-background dark:bg-background rounded-2xl p-6 flex flex-col h-full border border-border hover:border-primary/50 transition-all shadow-sm hover:shadow-xl overflow-hidden"
                >
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                    <IconComponent
                      size={22}
                      className="text-slate-600 dark:text-white group-hover:text-primary transition-colors"
                    />
                  </div>

                  <h3 className="text-lg font-bold mb-2">{app.name}</h3>
                  <p className="text-[11px] text-muted-foreground font-medium leading-relaxed flex-grow">
                    {app.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      {app.category} • {app.version}
                    </span>

                    {/* Launch Action */}
                    <Button
                      size="sm"
                      className="opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity rounded-lg h-8 px-3 text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary hover:bg-primary hover:text-background animate-in duration-300"
                      onClick={() => window.open(app.link, "_blank", "noopener,noreferrer")}
                    >
                      Launch <ExternalLink size={12} className="ml-1" />
                    </Button>
                  </div>
                </motion.div>
              );
            })
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
