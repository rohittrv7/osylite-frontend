import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Globe,
  ShieldCheck,
  Bell,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HeroSection = () => {
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

  // 🔹 FIX: Dynamic classes ke liye poori string pass karna best practice hai
  const cardData = [
    {
      icon: BarChart3,
      title: "Analytics",
      color:
        "bg-gradient-to-br from-blue-500/20 to-transparent dark:from-blue-500/10",
    },
    {
      icon: Globe,
      title: "Global",
      color:
        "bg-gradient-to-br from-yellow-500/20 to-transparent dark:from-primary/10",
    },
    {
      icon: ShieldCheck,
      title: "Secure",
      color:
        "bg-gradient-to-br from-purple-500/20 to-transparent dark:from-purple-500/10",
    },
    {
      icon: Bell,
      title: "Fast",
      color:
        "bg-gradient-to-br from-orange-500/20 to-transparent dark:from-orange-500/10",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background dark:bg-background text-foreground transition-colors duration-500 py-20 px-4">
      {/* 🔹 Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 dark:from-primary/5 via-transparent to-transparent opacity-60 pointer-events-none" />

      {/* Orbs */}
      {/* <div className="absolute -top-[10%] -left-[10%] w-[400px] h-[400px] bg-primary/10 dark:bg-yellow-600/5 rounded-full blur-[120px] pointer-events-none" /> */}

      <div className="container relative z-10 mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* --- Left Content --- */}
          <div className="space-y-10 max-w-2xl">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 dark:bg-white/5 border border-primary/20 dark:border-white/10 px-4 py-2 backdrop-blur-md"
            >
              <Sparkles size={14} className="text-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary dark:text-white/70">
                Future of Digital Scalability
              </span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                variants={itemVariants}
                className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tighter text-slate-900 dark:text-white"
              >
                UNLEASH <br />
                <span className="text-primary drop-shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                  POWER.
                </span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-slate-600 dark:text-white/50 text-lg max-w-md font-medium leading-relaxed border-l-4 border-primary/30 pl-6"
              >
                We build the digital infrastructure that turns ambitious
                startups into global market leaders. Precision engineered for
                the 1%.
              </motion.p>
            </div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-6 pt-4"
            >
              <Button
                size="lg"
                className="rounded-full px-10 h-16 bg-primary text-primary-foreground font-black uppercase italic tracking-widest hover:scale-105 hover:shadow-[0_0_40px_rgba(234,179,8,0.4)] transition-all duration-500"
              >
                Join the Elite <ArrowRight className="ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-10 h-16 border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 font-bold uppercase text-xs tracking-widest backdrop-blur-md hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
              >
                View Ecosystem
              </Button>
            </motion.div>
          </div>

          {/* --- Right Content: Dynamic Stack Cards --- */}
          <div className="relative h-[450px] md:h-[550px] w-full flex items-center justify-center mt-12 lg:mt-0 pr-10">
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
                  "absolute w-[240px] md:w-[280px] aspect-[3/4] p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/10 backdrop-blur-3xl shadow-2xl transition-all duration-500 cursor-pointer",
                  "bg-white/90 dark:bg-zinc-900/40",
                  item.color, // 🔹 Now correctly applying the gradient
                )}
                style={{
                  rotate: (idx - 1.5) * 12,
                  x: (idx - 1.5) * 45,
                  zIndex: idx,
                }}
              >
                <div className="h-full flex flex-col justify-between relative z-10">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 dark:bg-white/10 flex items-center justify-center border border-primary/20 dark:border-white/10">
                      <item.icon className="text-primary w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none text-slate-900 dark:text-white">
                      {item.title} <br /> Solutions
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="h-1.5 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "85%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-primary shadow-[0_0_10px_rgba(234,179,8,1)]"
                      />
                    </div>
                    <p className="text-[10px] font-black uppercase opacity-60 tracking-[0.2em] text-slate-500 dark:text-white">
                      Performance 99.9%
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
