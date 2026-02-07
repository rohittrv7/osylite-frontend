import { useState } from "react";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { Building2, TrendingUp, Users, Loader2 } from "lucide-react";
import type { PropertyFilters as Filters } from "@/types/property";
import { PropertyFilters } from "@/components/property/PropertyFilters";
import { useGetPropertiesQuery } from "@/store/api/propertiesApi";

const Index = () => {
  const [filters, setFilters] = useState<Filters>({});

  const {
    data: filteredProperties = [],
    isLoading,
    isError,
  } = useGetPropertiesQuery(filters);

  return (
    <>
      {/* Hero Section (Unchanged) */}
      <section className="hero-gradient text-foreground py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
              Find Your Dream Property
            </h1>
            <p
              className="text-lg md:text-xl opacity-90 mb-8 animate-fade-in"
              style={{ animationDelay: "100ms" }}
            >
              Discover thousands of properties for rent, sale, and PG across
              India
            </p>
            {/* Stats (Unchanged) */}
            <div
              className="grid grid-cols-3 gap-4 md:gap-8 max-w-lg mx-auto animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-background rounded-full">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="text-2xl md:text-3xl font-bold">10K+</div>
                <div className="text-sm opacity-80">Properties</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-background rounded-full">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-2xl md:text-3xl font-bold">50K+</div>
                <div className="text-sm opacity-80">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-background rounded-full">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="text-2xl md:text-3xl font-bold">100+</div>
                <div className="text-sm opacity-80">Cities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="sticky top-24">
                <PropertyFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                />
              </div>
            </aside>

            {/* Property Listings */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  {filteredProperties.length} Properties Found
                </h2>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="w-10 h-10 animate-spin text-primary" />
                </div>
              ) : isError ? (
                <div className="text-center py-20 text-destructive">
                  Failed to load properties.
                </div>
              ) : (
                <PropertyGrid properties={filteredProperties} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
