// MobileBottomNav.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { sidebarConfig } from "@/types/sidebar";
import { Grid } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"; // shadcn/ui या तुम्हारा Sheet component

const BOTTOM_NAV_LIMIT = 5;

const mainNavItems = sidebarConfig
  .filter((item) => !item.action)
  .slice(0, BOTTOM_NAV_LIMIT - 1);

const moreItems = sidebarConfig.slice(BOTTOM_NAV_LIMIT - 1);

export default function MobileBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const isActive = (path?: string) => location.pathname === path;

  const handleNavigate = (path?: string, action?: string) => {
    if (action === "logout") {
      // logout logic
      console.log("Logging out...");
      // await logout();
      // navigate("/login");
      return;
    }
    if (path) navigate(path);
    setOpen(false);
  };

  return (
    <>
      <nav
        className="
          fixed bottom-0 left-0 right-0 z-50
          bg-background border-t border-border
          md:hidden
          shadow-[0_-4px_16px_rgba(0,0,0,0.08)]
        "
      >
        <div className="flex items-center justify-around">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.path)}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 py-2.5 transition-all duration-200",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground active:scale-95"
                )}
              >
                <Icon
                  className={cn(
                    "transition-all duration-200",
                    active ? "h-7 w-7 scale-110" : "h-6 w-6"
                  )}
                  strokeWidth={active ? 2.3 : 2}
                />
                <span
                  className={cn(
                    "text-[10px] font-medium mt-0.5 transition-all",
                    active ? "opacity-100 font-semibold" : "opacity-70"
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* More Trigger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className={cn(
                  "flex flex-col items-center justify-center flex-1 py-2.5",
                  "text-muted-foreground hover:text-foreground active:scale-95 transition-all"
                )}
              >
                <Grid className="h-6 w-6" strokeWidth={2} />
                <span className="text-[10px] font-medium mt-0.5 opacity-70">
                  More
                </span>
              </button>
            </SheetTrigger>

            <SheetContent
              side="bottom"
              className="max-h-[70vh] overflow-y-auto"
            >
              <SheetHeader className="mb-4">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <div className="grid grid-cols-4 gap-4 py-2 sm:grid-cols-5">
                {moreItems.map((item) => {
                  const Icon = item.icon;
                  const isDanger = item.danger;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.path, item.action)}
                      className={cn(
                        "flex flex-col items-center gap-1.5 py-3 rounded-lg transition-all",
                        isDanger
                          ? "text-red-600 hover:bg-red-50 active:bg-red-100"
                          : "hover:bg-accent active:bg-accent/70"
                      )}
                    >
                      <Icon
                        className={cn("h-6 w-6", isDanger && "text-red-600")}
                      />
                      <span className="text-xs font-medium text-center">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  );
}
