import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { serviceCategories } from "@/config/service";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ServicesList = () => {
  const allServices = serviceCategories.flatMap((cat) =>
    cat.services.map((service) => ({
      ...service,
      categoryTitle: cat.title,
      categoryId: cat.id,
    })),
  );
  const navigate = useNavigate();
  const displayedServices = allServices.slice(0, 20);
  const remainingCount = allServices.length - displayedServices.length;

  const scrollToServices = () => {
    navigate("/services");
  };

  return (
    <section className="py-28 px-4 bg-secondary/30">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/60 text-sm font-semibold mb-4">
            Popular Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {allServices.length}+ Services We Offer
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {displayedServices.map((service) => (
            <Badge
              key={`${service.categoryId}-${service.id}`}
              variant="secondary"
              className="px-3 py-1.5 text-sm font-medium bg-background hover:bg-primary hover:text-primary-foreground transition-colors border border-border"
            >
              {service.name}
            </Badge>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={scrollToServices}
            size="lg"
            className="bg-accent hover:bg-accent/90 cursor-pointer text-accent-foreground"
          >
            View All {remainingCount}+ More Services
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
