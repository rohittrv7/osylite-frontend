import { motion, type Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { serviceCategories } from "@/config/service";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const ServicesList = () => {
  const navigate = useNavigate();

  const allServices = serviceCategories.flatMap((cat) =>
    cat.services.map((service) => ({
      ...service,
      categoryTitle: cat.title,
      categoryId: cat.id,
    })),
  );

  const displayedServices = allServices.slice(0, 24);
  const remainingCount = allServices.length - displayedServices.length;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  };

  return (
    <section className="relative py-32 overflow-hidden bg-background dark:bg-background transition-colors duration-500">
      {/* 🔹 Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 dark:bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6">
        {/* --- Section Header --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4 max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
            >
              <Zap size={14} className="text-primary fill-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                Explore Ecosystem
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white leading-[0.85]"
            >
              Our <span className="text-primary">Versatile</span> <br />{" "}
              Capabilities.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-500 dark:text-white/40 font-medium max-w-xs text-left md:text-right border-l-2 md:border-l-0 md:border-r-2 border-primary/30 px-4"
          >
            From creative studio to medical staff, we power every node of the
            modern economy.
          </motion.p>
        </div>

        {/* --- Interactive Services Cloud --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16"
        >
          {displayedServices.map((service, i) => (
            <motion.div
              key={`${service.categoryId}-${service.id}`}
              variants={itemVariants}
              whileHover={{
                scale: 1.1,
                rotate: i % 2 === 0 ? 2 : -2,
                transition: { duration: 0.2 },
              }}
              className="group"
            >
              <Badge
                variant="secondary"
                className={cn(
                  "px-6 py-3 text-sm font-black uppercase italic tracking-widest transition-all duration-300 cursor-default",
                  "bg-slate-100 dark:bg-white/5 border-2 border-transparent hover:border-primary/50 hover:bg-primary hover:text-primary-foreground shadow-sm hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]",
                  "text-slate-700 dark:text-white/70",
                )}
              >
                {service.name}
              </Badge>
            </motion.div>
          ))}

          {/* Extra "Magic" Card for remaining count */}
          <motion.div variants={itemVariants}>
            <div
              onClick={() => navigate("/services")}
              className="px-6 py-3 rounded-full border-2 border-dashed border-primary/40 bg-primary/5 text-primary text-sm font-black uppercase italic flex items-center gap-2 cursor-pointer hover:bg-primary/10 transition-all"
            >
              <Sparkles size={16} />+{remainingCount} More
            </div>
          </motion.div>
        </motion.div>

        {/* --- CTA Footer --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center space-y-6"
        >
          <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <Button
            onClick={() => navigate("/services")}
            size="lg"
            className="group relative overflow-hidden rounded-full px-12 h-16 bg-slate-900 dark:bg-white text-white dark:text-black font-black uppercase italic tracking-widest transition-all"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Full Catalog{" "}
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesList;
