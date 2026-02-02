import { useIsMobile } from "@/hooks/use-mobile";
import BottomNavbar from "./BottomNavbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useIsTablet } from "@/hooks/use-tablet";

const HEADER_HEIGHT = "pt-16";
const SIDEBAR_DESKTOP = "lg:ml-80";
const SIDEBAR_TABLET = "md:ml-64";

const MainLayout = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Sidebar />

      <Header />

      <main
        className={`
          ${HEADER_HEIGHT}
          ${SIDEBAR_TABLET}
          ${SIDEBAR_DESKTOP}
          pb-16 md:pb-0
          min-h-screen
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
