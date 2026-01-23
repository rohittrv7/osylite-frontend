import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import MobileNav from "@/components/home/MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <Header />

      <main
        className="
          flex-1
          px-4 py-4
          sm:px-6 sm:py-6
          md:px-10 md:py-8
          lg:px-12
        "
      >
        <Outlet />
      </main>

      <Footer />

      {/* Mobile bottom navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 w-full z-50">
          <MobileNav />
        </div>
      )}
    </div>
  );
};

export default Layout;
