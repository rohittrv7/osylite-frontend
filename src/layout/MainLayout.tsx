import { useIsMobile } from "@/hooks/use-mobile";
import BottomNavbar from "./BottomNavbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useIsTablet } from "@/hooks/use-tablet";
import { useState } from "react";

const MainLayout = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Sidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />
2
      <Header isExpanded={isSidebarExpanded} />

      <main
        className={`
           pt-16 
          min-h-screen
          transition-all duration-300 ease-in-out
          ${isMobile ? "ml-0 pb-16" : isSidebarExpanded ? "md:ml-64" : "md:ml-20"}
        `}
      >
        <Outlet />
      </main>
      {isTablet && !isMobile && <BottomNavbar />}
      {isMobile && <BottomNavbar />}
    </div>
  );
};

export default MainLayout;
