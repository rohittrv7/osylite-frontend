import type { ServiceCategory } from "@/config/service";
import ServiceCard from "./ServiceCard";

interface CategorySectionProps {
  category: ServiceCategory;
}

const CategorySection = ({ category }: CategorySectionProps) => {
  const Icon = category.icon;

  return (
    <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50 animate-fade-up">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl gradient-accent flex items-center justify-center shadow-soft">
          <Icon className="w-6 h-6 text-accent-foreground" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1">
            {category.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {category.description}
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {category.services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>

      {/* Service Count Badge */}
      <div className="mt-6 pt-4 border-t border-border/50">
        <span className="text-xs font-medium text-muted-foreground">
          {category.services.length} services available
        </span>
      </div>
    </div>
  );
};

export default CategorySection;
