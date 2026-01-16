import CTASection from "@/components/home/CTASection";
import FeaturesSection from "@/components/home/FeaturesSection";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import HeroSection from "@/components/home/HeroSection";
import MobileNav from "@/components/home/MobileNav";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background px-4 md:px-8 lg:px-16">
      <Header />
      <main className="pb-20 md:pb-0">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

export default HomePage;
