import { motion, type Variants } from "framer-motion";
import {
  Code, Palette, FastForward, Lock, Headphones, TrendingUp, ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "MODERN DEVELOPMENT",
    description: "CLEAN, SCALABLE AND FUTURE-PROOF TECHNOLOGY STACK.",
    icon: Code,
    className: "md:col-span-2 md:row-span-2",
    // 🔹 RGB Colors for 100% Accuracy
    lightBg: "rgba(59, 130, 246, 0.08)", 
    accentColor: "#3b82f6", 
    isDark: false,
  },
  {
    title: "PREMIUM DESIGN",
    description: "BEAUTIFUL UI/UX WITH DARK MODE SUPPORT.",
    icon: Palette,
    className: "md:col-span-1 md:row-span-1",
    lightBg: "#121212", 
    accentColor: "#EAB308", 
    isDark: true,
  },
  {
    title: "SECURE PLATFORM",
    description: "BEST PRACTICES FOR DATA & USER SECURITY.",
    icon: Lock,
    className: "md:col-span-1 md:row-span-1",
    lightBg: "rgba(168, 85, 247, 0.08)",
    accentColor: "#a855f7",
    isDark: false,
  },
  {
    title: "HIGH PERFORMANCE",
    description: "OPTIMIZED FOR SPEED AND CONVERSIONS.",
    icon: FastForward,
    className: "md:col-span-1 md:row-span-2",
    lightBg: "#18181b",
    accentColor: "#EAB308",
    isDark: true,
  },
  {
    title: "SUPPORT",
    description: "RELIABLE SUPPORT WHEN YOU NEED IT.",
    icon: Headphones,
    className: "md:col-span-1 md:row-span-1",
    lightBg: "rgba(34, 197, 94, 0.08)",
    accentColor: "#22c55e",
    isDark: false,
  },
  {
    title: "BUSINESS GROWTH",
    description: "TOOLS THAT ACTUALLY MOVE NUMBERS.",
    icon: TrendingUp,
    className: "md:col-span-1 md:row-span-1",
    lightBg: "transparent",
    accentColor: "#EAB308",
    isDark: false,
    isDashed: true,
  },
];

const FeaturesSection = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <section className="py-32 px-6 bg-background dark:bg-background transition-colors duration-500">
      <div className="container mx-auto max-w-7xl">
        
        {/* --- Header --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-10">
          <div className="space-y-6">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-[900] uppercase italic tracking-tighter leading-[0.85] text-slate-950 dark:text-white"
            >
              ENGINEERED <br /> <span className="text-primary">PERFECTION.</span>
            </motion.h2>
          </div>
          <p className="max-w-[300px] text-[11px] font-black uppercase opacity-40 leading-relaxed border-l-2 border-primary/30 pl-6 dark:text-white">
            Everything you need to grow, in one powerful platform. We craft unfair competitive advantages.
          </p>
        </div>

        {/* --- The Bento Grid --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[220px]"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={cn(
                "group relative rounded-[2.5rem] p-10 overflow-hidden flex flex-col justify-between transition-all duration-500 border border-slate-200 dark:border-white/5",
                f.className,
                f.isDashed && "border-2 border-dashed border-primary/30",
                f.isDark ? "text-white" : "text-slate-900 dark:text-white"
              )}
              style={{ backgroundColor: f.lightBg }}
            >
              <div className="relative z-10 flex justify-between items-start">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500"
                  style={{ 
                    backgroundColor: f.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                    borderColor: f.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"
                  }}
                >
                  <f.icon style={{ color: f.accentColor }} className="w-6 h-6" />
                </div>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>

              <div className="relative z-10 space-y-2">
                <h3 className={cn(
                  "font-[900] uppercase italic tracking-tighter leading-none",
                  f.className.includes("md:col-span-2") ? "text-4xl md:text-5xl" : "text-2xl"
                )}>
                  {f.title}
                </h3>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 leading-relaxed max-w-[200px]">
                  {f.description}
                </p>
              </div>

              {/* Watermark Icon - Fixed Opacity */}
              <div className="absolute -bottom-10 -right-10 opacity-[0.04] pointer-events-none group-hover:scale-110 transition-all duration-700">
                 <f.icon size={220} style={{ color: f.accentColor }} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;