// import Header from "@/layout/Headers";
import { useIsMobile } from "@/hooks/use-mobile";
import BottomNavbar from "./BottomNavbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const HEADER_HEIGHT = "pt-16"; 
const SIDEBAR_DESKTOP = "lg:ml-64"; 
const SIDEBAR_TABLET = "md:ml-20";

const MainLayout = () => {
  const isMobile = useIsMobile();

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
        {/* <div className="p-4 md:p-6"> */}
          <Outlet />
        {/* </div> */}
      </main>

      {/* Mobile Bottom Nav */}
      {isMobile && <BottomNavbar />}
    </div>
  );
};

export default MainLayout;
