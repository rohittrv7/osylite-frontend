import { Link, useLocation } from "react-router-dom";
import { Home, Info, Store, LogIn, ShoppingCart } from "lucide-react";

const MobileNav = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Info, label: "About", href: "/about" },
    { icon: Store, label: "Shop", href: "/shop" },
    { icon: LogIn, label: "Login", href: "/login" },
    { icon: ShoppingCart, label: "Cart", href: "/cart" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card border-t border-border">
      <div className="flex justify-around items-center py-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-1 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
