import { useIsMobile } from "@/hooks/use-mobile";
import { useIsTablet } from "@/hooks/use-tablet";
import BottomNavbar from "./BottomNavbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";
import { cn } from "@/lib/utils";

const HEADER_HEIGHT = "60px"; // ← centralize this value

const MainLayout = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const showBottomNav = isMobile || isTablet;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Fixed Header */}
      <Header isExpanded={isSidebarExpanded} />

      <div className="relative flex flex-1 overflow-hidden">
        {/* Sidebar - fixed on md+, overlay on mobile */}
        <Sidebar
          isExpanded={isSidebarExpanded}
          setIsExpanded={setIsSidebarExpanded}
        />

        {/* Main content area */}
        <main
          className={cn(
            "flex-1 overflow-y-auto transition-all duration-300 ease-in-out",
            // Left margin only on md+ when sidebar is present
            !isMobile && (isSidebarExpanded ? "md:ml-64" : "md:ml-20"),
            // Bottom padding only when bottom nav is visible
            showBottomNav && "pb-16 md:pb-0",
          )}
        >
          {/* Inner wrapper with proper top padding to clear header */}
          <div className="min-h-full" style={{ paddingTop: HEADER_HEIGHT }}>
            <Outlet />
          </div>
        </main>
      </div>

      {/* Bottom nav - only on mobile & tablet */}
      {showBottomNav && <BottomNavbar />}
    </div>
  );
};

export default MainLayout;
