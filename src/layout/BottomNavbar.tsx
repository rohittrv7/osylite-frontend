import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { sidebarConfig, isLinkItem, isActionItem } from "@/types/sidebar";
import { Grid } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";
import { toast } from "sonner";
import { useLazyLogoutQuery } from "@/store/api/authApi";
import { clearAuth } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";

const BOTTOM_NAV_LIMIT = 5;

const bottomNavItems = sidebarConfig.filter(
  (item) => isLinkItem(item) || isActionItem(item),
);

const mainNavItems = bottomNavItems.slice(0, BOTTOM_NAV_LIMIT - 1);
const moreItems = bottomNavItems.slice(BOTTOM_NAV_LIMIT - 1);

export default function MobileBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const isActive = (path?: string) => location.pathname === path;
  const [logoutApi, { isLoading: isLoggingOut }] = useLazyLogoutQuery();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    if (isLoggingOut) return;
    try {
      const res = await logoutApi().unwrap();
      console.log(res, "--------------");
      dispatch(clearAuth());
      toast.success("Logged out successfully");
      navigate("/", { replace: true });
    } catch (error) {
      apiErrorToastHandler(error);
    }
  };
  const handleNavigate = (path?: string, action?: string) => {
    if (action === "logout") {
      handleLogout();
      return;
    }

    if (path) navigate(path);
    setOpen(false);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden">
      <div className="flex items-center justify-around">
        {mainNavItems.map((item) => {
          if (!isLinkItem(item)) return null;

          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.path)}
              className={cn(
                "flex flex-col items-center flex-1 py-2.5",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className={active ? "h-7 w-7" : "h-6 w-6"} />
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}

        {/* MORE */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="flex flex-col items-center flex-1 py-2.5 text-muted-foreground">
              <Grid className="h-6 w-6" />
              <span className="text-[10px]">More</span>
            </button>
          </SheetTrigger>

          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <div className="grid grid-cols-4 gap-4 py-4">
              {moreItems.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() =>
                      handleNavigate(
                        isLinkItem(item) ? item.path : undefined,
                        isActionItem(item) ? item.action : undefined,
                      )
                    }
                    className="flex flex-col items-center gap-1"
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-xs">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
