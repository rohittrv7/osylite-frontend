import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sun,
  Moon,
  User,
  Menu,
  LogIn,
  UserPlus,
  ShoppingBag,
} from "lucide-react";
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
import { Input } from "@/components/ui/input";

import { useTheme } from "next-themes";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Services",
      href: "/services",
      // children: [
      //   { name: "Web Development", href: "/services/web-development" },
      //   { name: "Design", href: "/services/design" },
      //   { name: "SEO", href: "/services/seo" },
      // ],
    },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-10 py-1">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <ShoppingBag />
          <span className="text-lg font-semibold text-foreground">
            ANG Growth
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            // item.children ? (
            //   <DropdownMenu key={item.name}>
            //     <DropdownMenuTrigger className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
            //       {item.name}
            //       <ChevronDown className="h-4 w-4" />
            //     </DropdownMenuTrigger>
            //     <DropdownMenuContent className="bg-card border-border">
            //       {item.children.map((child) => (
            //         <DropdownMenuItem key={child.name} asChild>
            //           <Link to={child.href} className="cursor-pointer">
            //             {child.name}
            //           </Link>
            //         </DropdownMenuItem>
            //       ))}
            //     </DropdownMenuContent>
            //   </DropdownMenu>
            // ) : (
            <Link
              key={item.name}
              to={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* <Button
            variant="outline"
            size="icon"
            className="rounded-full border-border"
          >
            <Search className="h-4 w-4" />
          </Button> */}
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-border cursor-pointer"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-border cursor-pointer"
              >
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card border-border">
              <DropdownMenuItem asChild>
                <Link
                  to="/login"
                  className="cursor-pointer flex items-center gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/register"
                  className="cursor-pointer flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Register
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-border"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-border"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-card border-border">
              <SheetHeader>
                <SheetTitle className="text-foreground">Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <Input
                  placeholder="Search..."
                  className="bg-background border-border"
                />
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    // item.children ? (
                    //   <Collapsible
                    //     key={item.name}
                    //     open={servicesOpen}
                    //     onOpenChange={setServicesOpen}
                    //   >
                    //     <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-foreground hover:text-primary transition-colors">
                    //       {item.name}
                    //       <ChevronDown
                    //         className={`h-4 w-4 transition-transform ${
                    //           servicesOpen ? "rotate-180" : ""
                    //         }`}
                    //       />
                    //     </CollapsibleTrigger>
                    //     <CollapsibleContent className="pl-4 space-y-2">
                    //       {item.children.map((child) => (
                    //         <Link
                    //           key={child.name}
                    //           to={child.href}
                    //           className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                    //           onClick={() => setMobileMenuOpen(false)}
                    //         >
                    //           {child.name}
                    //         </Link>
                    //       ))}
                    //     </CollapsibleContent>
                    //   </Collapsible>
                    // ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="py-2 text-foreground hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <Button
                  variant="outline"
                  className="w-full border-border"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
