import { ChevronDown, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  baseSidebarConfig,
  isActionItem,
  isLinkItem,
  isParentItem,
} from "@/types/sidebar";
import { useLazyLogoutQuery } from "@/store/api/authApi";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { clearAuth } from "@/store/slices/authSlice";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (val: boolean) => void;
}

export default function Sidebar({ isExpanded, setIsExpanded }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Accordion state for parent items
  const [manualOpen, setManualOpen] = useState<string>("");

  const sidebarItems = [...baseSidebarConfig];
  const [logoutApi, { isLoading: isLoggingOut }] = useLazyLogoutQuery();

  // Logic to determine which parent menu should be open based on current path
  const autoOpenMenu = useMemo(() => {
    const parent = sidebarItems.find(
      (item) =>
        isParentItem(item) &&
        item.children.some((c) => c.path === location.pathname),
    );
    return parent?.id ?? "";
  }, [sidebarItems, location.pathname]);

  const openMenu = manualOpen || autoOpenMenu;

  const handleLogout = async () => {
    if (isLoggingOut) return;
    try {
      await logoutApi().unwrap();
      dispatch(clearAuth());
      dispatch({ type: "api/resetApiState" });
      toast.success("Logged out successfully");
      navigate("/", { replace: true });
    } catch (error) {
      apiErrorToastHandler(error);
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={`hidden md:flex fixed top-0 left-0 h-screen bg-background text-foreground border-r border-border flex-col z-40 transition-all duration-300 ease-in-out ${
          isExpanded ? "w-64" : "w-20"
        }`}
      >
        {/* Header Section */}
        <div
          className={`relative px-4 py-6 flex flex-col ${!isExpanded ? "items-center" : ""}`}
        >
          <div className="flex items-center gap-1 overflow-hidden">
            <img
              src="./logo.png"
              className="w-[40px] min-w-[40px] h-[40px] object-contain"
              alt="logo"
            />
            {isExpanded && (
              <div className="flex flex-col truncate animate-in fade-in duration-500">
                <div className="text-2xl font-bold text-primary">
                  ANG Growth
                </div>
              </div>
            )}
          </div>

          {/* Toggle Button */}
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute -right-0 top-8 h-6 w-6 rounded-full cursor-pointer z-50 transition-transform active:scale-95"
          >
            {isExpanded ? (
              <ChevronLeft size={28} />
            ) : (
              <ChevronRight size={28} />
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <div
          className={`flex-1 px-3 py-4 space-y-2 overflow-y-auto overflow-x-hidden 
          [&-::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
        >
          {sidebarItems.map((item) => {
            const Icon = item.icon;

            /* ───────── LINK ITEM ───────── */
            if (isLinkItem(item)) {
              const isActive = location.pathname === item.path;
              const itemContent = (
                <div
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer transition-all duration-200 group
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 font-semibold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    } ${!isExpanded ? "justify-center" : ""}`}
                >
                  <Icon
                    size={20}
                    className={`${isActive ? "text-inherit" : "shrink-0 group-hover:scale-110 transition-transform"}`}
                  />
                  {isExpanded && (
                    <span className="text-sm truncate">{item.label}</span>
                  )}
                </div>
              );

              return !isExpanded ? (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>{itemContent}</TooltipTrigger>
                  <TooltipContent side="right" className="font-bold">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <div key={item.id}>{itemContent}</div>
              );
            }

            /* ───────── PARENT ITEM (Accordion) ───────── */
            if (isParentItem(item)) {
              const isOpen = openMenu === item.id;

              const parentContent = (
                <div key={item.id} className="space-y-1">
                  <div
                    onClick={() => {
                      if (!isExpanded) setIsExpanded(true); // Auto expand if collapsed
                      setManualOpen(isOpen ? "" : item.id);
                    }}
                    className={`flex items-center justify-between px-3 py-3 rounded-xl cursor-pointer transition-all duration-200
                      ${isOpen && isExpanded ? "bg-muted" : "text-muted-foreground hover:bg-muted hover:text-foreground"}
                      ${!isExpanded ? "justify-center" : ""}`}
                  >
                    <div className="flex items-center gap-4">
                      <Icon size={20} className="shrink-0" />
                      {isExpanded && (
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      )}
                    </div>
                    {isExpanded && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    )}
                  </div>

                  {isOpen && isExpanded && (
                    <div className="ml-9 space-y-1 animate-in slide-in-from-top-1 duration-200">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon;
                        const isChildActive = location.pathname === child.path;
                        return (
                          <div
                            key={child.id}
                            onClick={() => navigate(child.path)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors
                              ${
                                isChildActive
                                  ? "text-primary font-bold"
                                  : "text-muted-foreground hover:text-foreground"
                              }`}
                          >
                            <ChildIcon size={16} />
                            {child.label}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );

              return !isExpanded ? (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>{parentContent}</TooltipTrigger>
                  <TooltipContent side="right" className="font-bold">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              ) : (
                parentContent
              );
            }

            /* ───────── ACTION ITEM (Logout) ───────── */
            if (isActionItem(item)) {
              const logoutContent = (
                <div
                  onClick={handleLogout}
                  className={`flex items-center gap-4 px-3 py-3 rounded-xl mt-4
                    text-destructive transition-all duration-200 group
                    ${isLoggingOut ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-destructive/10"}
                    ${!isExpanded ? "justify-center" : ""}`}
                >
                  {isLoggingOut ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Icon
                      size={20}
                      className="shrink-0 group-hover:rotate-12 transition-transform"
                    />
                  )}
                  {isExpanded && (
                    <span className="text-sm font-medium">
                      {isLoggingOut ? "Logging out..." : item.label}
                    </span>
                  )}
                </div>
              );

              return !isExpanded ? (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>{logoutContent}</TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="text-destructive font-bold"
                  >
                    Logout
                  </TooltipContent>
                </Tooltip>
              ) : (
                <div key={item.id}>{logoutContent}</div>
              );
            }
            return null;
          })}
        </div>

        {/* Footer */}
        <div
          className={`p-4 border-t border-border bg-muted/20 ${!isExpanded ? "flex justify-center" : ""}`}
        >
          <div className="text-[9px] text-center text-muted-foreground font-bold tracking-widest uppercase truncate">
            {isExpanded ? "v1.0.2 • Osylite Cloud" : "v1.0"}
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}
