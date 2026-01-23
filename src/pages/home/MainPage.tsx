import CTASection from "@/components/home/CTASection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import ServicesList from "@/components/home/ServicesList";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <ServicesList />
      <FeaturesSection />
      <CTASection />
      {/* <MobileNav /> */}
    </div>
  );
};

export default HomePage;
