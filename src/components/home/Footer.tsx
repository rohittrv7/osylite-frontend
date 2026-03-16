import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  ArrowUp,
  ShieldCheck,
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Shop", href: "/shop" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "X" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-white dark:bg-[#050505] pt-24 border-t border-slate-200 dark:border-white/5 overflow-hidden transition-colors duration-500">
      
      {/* 🔹 Optimized Background Branding (Size Reduced & Fixed) */}
      <div className="absolute bottom-16 left-0 w-full pointer-events-none select-none opacity-[0.02] dark:opacity-[0.04] text-center">
        <h1 className="text-[12vw] font-[900] uppercase italic tracking-[0.05em] leading-none">
          ANG GROWTH
        </h1>
      </div>

      <div className="container relative z-10 mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* --- BRAND INFO (5 Columns) --- */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <ShieldCheck className="text-black" size={22} />
                </div>
                <span className="text-2xl font-[900] uppercase italic tracking-tighter text-slate-900 dark:text-white">
                  ANG <span className="text-primary">Growth</span>
                </span>
              </div>
              
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                  GSTIN: 10CDQPP4007H1ZQ
                </p>
                <p className="text-slate-500 dark:text-white/40 text-sm font-medium leading-relaxed max-w-sm">
                  Empowering the 1% with digital precision. We engineer scalability through 
                  modern ecosystems and high-performance tools.
                </p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -5, backgroundColor: "var(--primary)", color: "#000" }}
                  className="h-10 w-10 rounded-lg border border-slate-200 dark:border-white/10 flex items-center justify-center bg-slate-50 dark:bg-white/5 transition-all shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* --- QUICK LINKS (3 Columns) --- */}
          <div className="lg:col-span-3 space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">
              Explore
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-slate-600 dark:text-white/40 hover:text-primary font-bold uppercase italic text-[11px] tracking-widest transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-0 h-[1.5px] bg-primary group-hover:w-3 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- CONTACT INFO (4 Columns) --- */}
          <div className="lg:col-span-4 space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">
              Get in Touch
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="text-primary shrink-0 mt-1" size={16} />
                <span className="text-[11px] font-bold text-slate-500 dark:text-white/40 leading-relaxed uppercase tracking-wider">
                  Ramkrishan Nagar bypass Rd <br /> Patna 800027, Bihar
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-primary shrink-0" size={16} />
                <span className="text-[11px] font-bold text-slate-500 dark:text-white/40 border-b border-primary/20 pb-0.5">
                  support@anggrowth.com
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-primary shrink-0" size={16} />
                <span className="text-[11px] font-black italic text-slate-800 dark:text-white/80 tracking-widest">
                  +91 84060 99340
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Back to Top --- */}
        <div className="mt-20 flex justify-center">
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="h-12 w-12 rounded-full border border-primary/30 flex items-center justify-center group-hover:border-primary transition-colors">
              <ArrowUp size={20} className="text-primary group-hover:-translate-y-1 transition-transform" />
            </div>
            <span className="text-[8px] font-black uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">Scroll Up</span>
          </motion.button>
        </div>
      </div>

      {/* --- BOTTOM BAR --- */}
      <div className="border-t border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-white/20">
            © 2026 ANG GROWTH. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <Link to="/privacy" className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-white/20 hover:text-primary transition-colors">Legal</Link>
            <Link to="/terms" className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-white/20 hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;