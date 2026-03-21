import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Globe,
  ShieldCheck,
  Bell,
  // Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const cardData = [
    {
      icon: BarChart3,
      title: "Analytics",
      color:
        "bg-gradient-to-br from-blue-400/20 to-blue-500/10 dark:from-blue-500/20",
      accent: "text-blue-600 dark:text-blue-400",
      border: "border-blue-500/20",
    },
    {
      icon: Globe,
      title: "Global",
      color:
        "bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 dark:from-primary/20",
      accent: "text-yellow-700 dark:text-primary",
      border: "border-yellow-500/20",
    },
    {
      icon: ShieldCheck,
      title: "Secure",
      color:
        "bg-gradient-to-br from-purple-400/20 to-purple-500/10 dark:from-purple-500/20",
      accent: "text-purple-600 dark:text-purple-400",
      border: "border-purple-500/20",
    },
    {
      icon: Bell,
      title: "Fast",
      color:
        "bg-gradient-to-br from-orange-400/20 to-orange-500/10 dark:from-orange-500/20",
      accent: "text-orange-600 dark:text-orange-400",
      border: "border-orange-500/20",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background dark:bg-background transition-colors duration-500">
      <div className="container relative z-10 mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* --- LEFT CONTENT (Text) --- */}
          {/* 🔹 order-1 ensures text comes first on mobile */}
          <div className="space-y-8 lg:space-y-10 max-w-2xl text-center lg:text-left order-1">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 rounded-full bg-background dark:bg-white/5 border border-black/5 dark:border-white/10 px-5 py-2 backdrop-blur-md mx-auto lg:mx-0 shadow-sm"
            >
              <Zap size={14} className="text-primary fill-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white/70">
                Next-Gen Growth Engine
              </span>
            </motion.div>

            <div className="space-y-4 md:space-y-6">
              <motion.h1
                variants={itemVariants}
                className="text-6xl md:text-8xl lg:text-9xl font-[1000] uppercase italic tracking-tighter leading-[0.85] text-slate-950 dark:text-white"
              >
                UNLEASH <br />
                <span className="text-primary drop-shadow-[0_10px_20px_rgba(234,179,8,0.2)]">
                  POWER.
                </span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-slate-600 dark:text-white/50 text-lg md:text-xl max-w-md font-medium leading-relaxed border-l-4 border-primary/30 pl-6 mx-auto lg:mx-0"
              >
                Building digital highways for ambitious brands. Precision
                engineered for the 1% who scale faster.
              </motion.p>
            </div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 pt-4"
            >
              <Button
                onClick={() => navigate("/login")}
                size="lg"
                className="rounded-full px-10 h-16 bg-slate-950 dark:bg-primary text-white dark:text-black font-black uppercase italic tracking-widest hover:scale-105 transition-all shadow-xl"
              >
                Join the Elite <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              {
                <a
                  href="/base.apk"
                  download="osylite.apk" // Download hone par ye naam dikhega
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full px-10 h-16 border-black/10 dark:border-white/10 bg-white/30 dark:bg-white/5 font-bold uppercase text-[10px] tracking-widest backdrop-blur-md cursor-pointer"
                  >
                    Download App
                  </Button>
                </a>
              }
              {/* <Button
                variant="outline"
                size="lg"
                className="rounded-full px-10 h-16 border-black/10 dark:border-white/10 bg-white/30 dark:bg-white/5 font-bold uppercase text-[10px] tracking-widest backdrop-blur-md"
              >
                Live Demo <Sparkles className="ml-2 h-4 w-4 text-primary" />
              </Button> */}
            </motion.div>
          </div>

          {/* --- RIGHT CONTENT (Cards) --- */}
          {/* 🔹 order-2 ensures cards come after text on mobile */}
          <div className="relative h-[380px] sm:h-[450px] md:h-[550px] w-full flex items-center justify-center order-2 mt-8 lg:mt-0">
            {cardData.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                custom={idx}
                whileHover={{
                  scale: 1.05,
                  zIndex: 50,
                  rotate: 0,
                  y: -20,
                  transition: { type: "spring", stiffness: 300 },
                }}
                className={cn(
                  "absolute w-[200px] sm:w-[260px] md:w-[300px] aspect-[3/4.2] p-6 md:p-10 rounded-[2.5rem] border shadow-2xl transition-all duration-700 cursor-pointer overflow-hidden",
                  "bg-white/90 dark:bg-zinc-950/60 backdrop-blur-3xl",
                  item.color,
                  item.border,
                )}
                style={{
                  rotate:
                    (idx - 1.5) *
                    (typeof window !== "undefined" && window.innerWidth < 768
                      ? 8
                      : 12),
                  x:
                    (idx - 1.5) *
                    (typeof window !== "undefined" && window.innerWidth < 768
                      ? 35
                      : 55),
                  zIndex: idx,
                }}
              >
                <div className="h-full flex flex-col justify-between relative z-10">
                  <div className="space-y-4">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-white/50 dark:bg-white/10 flex items-center justify-center border border-black/5 dark:border-white/10 shadow-sm">
                      <item.icon
                        className={cn("w-5 h-5 md:w-7 md:h-7", item.accent)}
                      />
                    </div>
                    <h3 className="text-xl md:text-3xl font-[1000] uppercase italic tracking-tighter leading-[0.8] text-slate-900 dark:text-white">
                      {item.title} <br />
                      <span className="text-primary">Engine.</span>
                    </h3>
                  </div>

                  <div className="space-y-4 md:space-y-5">
                    <div className="space-y-2">
                      <div className="flex justify-between text-[8px] md:text-[10px] font-black uppercase opacity-60 text-slate-600 dark:text-white">
                        <span>Status</span>
                        <span className="text-primary font-black">
                          Optimized
                        </span>
                      </div>
                      <div className="h-1.5 md:h-2 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden border border-black/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "90%" }}
                          transition={{ duration: 2, delay: 0.8 }}
                          className="h-full bg-primary shadow-[0_0_15px_rgba(234,179,8,0.8)]"
                        />
                      </div>
                    </div>
                    <p className="text-[8px] md:text-[10px] font-black uppercase opacity-40 tracking-[0.2em] text-slate-500 dark:text-white">
                      Syncing 0.001ms
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
