import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { serviceCategories } from "@/config/service";
import CategorySection from "./CategorySectionProps";
import { Layers, Zap, Sparkles } from "lucide-react";

const ServicesSection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCategories = activeCategory
    ? serviceCategories.filter((cat) => cat.id === activeCategory)
    : serviceCategories;

  const totalServices = serviceCategories.reduce(
    (acc, cat) => acc + cat.services.length,
    0,
  );

  return (
    <section
      id="services"
      className="relative py-32 px-6 bg-background dark:bg-background overflow-hidden transition-colors duration-500"
    >
      {/* 🔹 Background Elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto relative z-10">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
            >
              <Layers size={14} className="text-primary" />
              <span className="text-[10px] font-[900] uppercase tracking-[0.3em] text-primary">
                Service Ecosystem
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-[900] uppercase italic tracking-tighter leading-[0.85] text-slate-950 dark:text-white"
            >
              ELITE{" "}
              <span className="text-primary drop-shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                SOLUTIONS.
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-500 dark:text-white/40 text-sm font-bold uppercase tracking-widest leading-relaxed max-w-[280px] border-l-2 border-primary/30 pl-6"
          >
            Empowering your vision with{" "}
            <span className="text-primary">{totalServices}+</span> specialized
            business nodes.
          </motion.p>
        </div>

        {/* --- Interactive Category Filter --- */}
        <div className="mb-16 sticky top-24 z-30">
          <div className="flex flex-wrap justify-center md:justify-start gap-3 p-2 rounded-[2.5rem] bg-slate-100/50 dark:bg-background/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                "whitespace-nowrap px-8 py-4 rounded-full text-[11px] font-[900] uppercase italic tracking-widest transition-all duration-300",
                activeCategory === null
                  ? "bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(234,179,8,0.3)] scale-105"
                  : "text-slate-500 hover:text-primary dark:text-white/40",
              )}
            >
              All Categories
            </button>
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "whitespace-nowrap px-8 py-4 rounded-full text-[11px] font-[900] uppercase italic tracking-widest transition-all duration-300",
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(234,179,8,0.3)] scale-105"
                    : "text-slate-500 hover:text-primary dark:text-white/40",
                )}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* --- Animated Categories Grid --- */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory || "all"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-20"
            >
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <div key={category.id} className="relative group">
                    <div className="absolute -left-12 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 to-transparent hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CategorySection category={category} />
                  </div>
                ))
              ) : (
                <div className="py-20 text-center">
                  <Zap
                    size={40}
                    className="mx-auto text-primary opacity-20 animate-pulse"
                  />
                  <p className="mt-4 text-xs font-black uppercase tracking-widest opacity-40">
                    No services found in this sector.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- Footer Stats (Optional Luxury Touch) --- */}
        <div className="mt-24 pt-10 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-12">
            <StatItem label="Active Nodes" value="24/7" />
            <StatItem label="Satisfaction" value="99.9%" />
            <StatItem label="Global Reach" value="Verified" />
          </div>
          <Sparkles size={24} className="text-primary opacity-20" />
        </div>
      </div>
    </section>
  );
};

// Helper Stat Component
const StatItem = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <p className="text-[9px] font-black uppercase tracking-widest opacity-40">
      {label}
    </p>
    <p className="text-sm font-[900] uppercase italic text-slate-900 dark:text-white tracking-tighter">
      {value}
    </p>
  </div>
);

export default ServicesSection;
