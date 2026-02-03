import PropertyForm from "@/components/property/PropertyForm";

const PropertyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="pt-8 pb-4 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Post Your Property
            <span className="text-gradient-maroon"> For Free</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Reach lakhs of buyers and tenants. List your property in minutes.
          </p>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-6 px-4 sm:px-6">
        <div className="mx-auto flex flex-wrap justify-center gap-4">
          {[
            { label: "Properties Listed", value: "1 Lakh+" },
            { label: "Cities Covered", value: "50+" },
            { label: "Happy Customers", value: "10 Lakh+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center px-6 py-3 rounded-xl bg-card border border-border shadow-sm"
            >
              <span className="text-2xl font-bold text-primary font-display">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Form Section */}
      <section className="py-8 px-4 sm:px-6">
        <PropertyForm />
      </section>
    </div>
  );
};

export default PropertyPage;
