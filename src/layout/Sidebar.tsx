import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { isActionItem, isLinkItem, isParentItem, sidebarConfig } from "@/types/sidebar";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string>("");

  useEffect(() => {
    const activeParent = sidebarConfig.find(
      (item) =>
        isParentItem(item) &&
        item.children.some((child) => child.path === location.pathname)
    );

    setOpenMenu(activeParent ? activeParent.id : "");
  }, [location.pathname]);

  return (
    <aside
      className="hidden md:flex fixed top-0 left-0 w-64 h-screen
      bg-background text-foreground border-r border-border flex-col z-40"
    >
      <div className="px-6 py-4 text-2xl font-bold text-primary border-b border-border">
        ANG Growth
      </div>

      <div className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
        {sidebarConfig.map((item) => {
          const Icon = item.icon;

          if (isLinkItem(item)) {
            const isActive = location.pathname === item.path;

            return (
              <div
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer
                  ${item.danger ? "text-destructive" : ""}
                  ${
                    isActive
                      ? "bg-muted border border-border"
                      : "hover:bg-muted/50"
                  }`}
              >
                <Icon size={20} />
                {item.label}
              </div>
            );
          }

          if (isActionItem(item)) {
            return (
              <div
                key={item.id}
                onClick={() =>
                  item.action === "logout" && console.log("Logout")
                }
                className="flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer
                text-destructive hover:bg-muted/50"
              >
                <Icon size={20} />
                {item.label}
              </div>
            );
          }

          if (isParentItem(item)) {
            const isOpen = openMenu === item.id;

            return (
              <div key={item.id}>
                <div
                  onClick={() => setOpenMenu(isOpen ? "" : item.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer
                    ${
                      isOpen
                        ? "bg-muted border border-border"
                        : "hover:bg-muted/50"
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <Icon size={20} />
                    {item.label}
                  </div>
                  <ChevronDown
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {isOpen && (
                  <div className="ml-6 mt-3 space-y-2">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;
                      const isChildActive = location.pathname === child.path;

                      return (
                        <div
                          key={child.id}
                          onClick={() => navigate(child.path)}
                          className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer
                            ${
                              isChildActive
                                ? "bg-muted border border-border"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            }`}
                        >
                          <ChildIcon size={18} />
                          {child.label}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return null;
        })}
      </div>
    </aside>
  );
}
