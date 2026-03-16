import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sun,
  Moon,
  User,
  Menu,
  LogIn,
  UserPlus,
  ShoppingBag,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Scroll logic for glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-[100] w-full transition-all duration-500 px-6 py-2",
        scrolled
          ? "bg-background/80 dark:bg-background/80 backdrop-blur-2xl border-b border-slate-200 dark:border-white/5 py-3"
          : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto flex h-14 items-center justify-between">
        {/* --- LOGO AREA --- */}
        <Link to="/" className="group flex items-center gap-3 relative">
          <div className="relative h-10 w-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary rounded-xl rotate-6 group-hover:rotate-0 transition-transform duration-300 shadow-[0_0_20px_rgba(234,179,8,0.3)]" />
            <ShoppingBag className="relative text-black w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-[900] uppercase italic tracking-tighter leading-none text-slate-900 dark:text-white">
              ANG <span className="text-primary">Growth</span>
            </span>
            <span className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40 leading-none mt-1">
              Ecosystem
            </span>
          </div>
        </Link>

        {/* --- DESKTOP NAVIGATION --- */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "relative px-5 py-2 text-[11px] font-black uppercase italic tracking-[0.1em] transition-all",
                location.pathname === item.href
                  ? "text-primary"
                  : "text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white",
              )}
            >
              {item.name}
              {location.pathname === item.href && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-5 right-5 h-[2px] bg-primary rounded-full shadow-[0_0_10px_rgba(234,179,8,1)]"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* --- ACTION BUTTONS --- */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 hover:border-primary/50 hover:text-primary transition-all duration-300"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* User Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="hidden md:flex">
              <Button
                variant="outline"
                className="h-10 px-5 rounded-xl border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/5 font-black uppercase italic text-[10px] tracking-widest hover:border-primary/50 transition-all gap-2"
              >
                <User className="h-4 w-4 text-primary" />
                Account
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-white dark:bg-[#050505] border-slate-200 dark:border-white/10 rounded-2xl p-2 shadow-2xl"
            >
              <DropdownMenuItem
                asChild
                className="rounded-xl focus:bg-primary/10 focus:text-primary p-3"
              >
                <Link
                  to="/login"
                  className="flex items-center gap-3 font-bold text-xs uppercase italic cursor-pointer"
                >
                  <LogIn className="h-4 w-4" /> Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="rounded-xl focus:bg-primary/10 focus:text-primary p-3 mt-1"
              >
                <Link
                  to="/register"
                  className="flex items-center gap-3 font-bold text-xs uppercase italic cursor-pointer"
                >
                  <UserPlus className="h-4 w-4" /> Register
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* --- MOBILE MENU --- */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl bg-primary shadow-lg shadow-primary/20"
              >
                <Menu className="h-5 w-5 text-black" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-[400px] bg-white dark:bg-[#020202] border-none p-8 flex flex-col justify-between"
            >
              <div className="space-y-12 mt-8">
                <SheetHeader className="text-left">
                  <SheetTitle className="text-3xl font-[900] uppercase italic tracking-tighter dark:text-white">
                    ANG <span className="text-primary">Menu</span>
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-6">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link
                        to={item.href}
                        className="text-4xl font-black uppercase italic tracking-tighter hover:text-primary transition-colors flex items-baseline gap-4 group"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="text-xs font-black text-primary opacity-40 group-hover:opacity-100 transition-opacity">
                          0{i + 1}
                        </span>
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              <div className="space-y-4">
                <Button
                  className="w-full h-16 rounded-[2rem] bg-primary text-black font-black uppercase italic text-lg tracking-tighter"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In Now <LogIn className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] opacity-30">
                  © 2026 ANG GROWTH
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
