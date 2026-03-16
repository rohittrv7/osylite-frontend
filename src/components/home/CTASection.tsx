import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-40 overflow-hidden bg-background dark:bg-background transition-colors duration-500">
      {/* 🔹 Background Text Marquee (Luxury Feel) */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none overflow-hidden opacity-[0.03] dark:opacity-[0.05] select-none">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap text-[15rem] font-[900] uppercase italic tracking-tighter"
        >
          <span>ANG GROWTH • BEYOND LIMITS •&nbsp;</span>
          <span>ANG GROWTH • BEYOND LIMITS •&nbsp;</span>
        </motion.div>
      </div>

      {/* 🔹 Background Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md"
          >
            <Sparkles size={16} className="text-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
              The Next Chapter Starts Here
            </span>
          </motion.div>

          {/* Headline */}
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-9xl font-[900] uppercase italic tracking-tighter leading-[0.85] text-slate-900 dark:text-white"
            >
              READY TO BUILD <br />
              <span className="text-primary">SOMETHING</span> <br />
              <span className="text-stroke-primary text-fill-transparent dark:text-stroke-white italic">
                AMAZING?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-slate-500 dark:text-white/40 text-lg md:text-xl font-medium max-w-lg mx-auto leading-relaxed"
            >
              Join the elite circle of businesses scaling with ANG Growth
              technology and precision.
            </motion.p>
          </div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-center items-center gap-6"
          >
            <Button
              onClick={() => navigate("/register")}
              size="lg"
              className="group relative h-24 px-12 rounded-[2rem] bg-primary text-primary-foreground text-2xl font-[900] uppercase italic tracking-tighter overflow-hidden transition-all hover:scale-105 hover:shadow-[0_20px_50px_rgba(234,179,8,0.4)]"
            >
              <span className="relative z-10 flex items-center gap-4">
                Create Account{" "}
                <ArrowRight className="h-8 w-8 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              {/* Button Shine Effect */}
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            </Button>

            <button
              onClick={() => navigate("/login")}
              className="text-xs font-black uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity hover:text-primary"
            >
              Already a Member? Log in
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
