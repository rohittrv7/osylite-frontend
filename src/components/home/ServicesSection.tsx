import { useState } from "react";
import { cn } from "@/lib/utils";
import { serviceCategories } from "@/config/service";
import CategorySection from "./CategorySectionProps";

const ServicesSection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCategories = activeCategory
    ? serviceCategories.filter((cat) => cat.id === activeCategory)
    : serviceCategories;

  const totalServices = serviceCategories.reduce(
    (acc, cat) => acc + cat.services.length,
    0,
  );

  return (
    <section id="services" className="py-20 px-4 bg-background">
      <div className="container max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-6 py-1.5 rounded-full bg-accent/50 text-accen text-sm font-semibold mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            Comprehensive Business Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From legal compliance to digital marketing, we offer{" "}
            <span className="font-semibold text-foreground">
              {totalServices}+ services
            </span>{" "}
            to help your business grow and succeed.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeCategory === null
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-secondary text-foreground hover:bg-secondary/80",
              )}
            >
              All Services
            </button>
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-secondary text-foreground hover:bg-secondary/80",
                )}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="space-y-8">
          {filteredCategories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
