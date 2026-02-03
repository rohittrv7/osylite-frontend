import ProfileForm from "@/components/matrimony/ProfileForm";

const Matrimony = () => {
  return (
    <div className="bg-gradient-hero">
      {/* Hero Section */}
      <section className="pt-8 pb-4 px-4 sm:px-6 text-center">
        <div className="mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Find Your Perfect
            <span className="text-gradient-maroon"> Life Partner</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Create your profile in just a few minutes and connect with lakhs of
            verified profiles
          </p>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-6 px-4 sm:px-6">
        <div className="mx-auto flex flex-wrap justify-center gap-4">
          {[
            { label: "Verified Profiles", value: "50 Lakh+" },
            { label: "Success Stories", value: "10 Lakh+" },
            { label: "Years of Trust", value: "25+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center px-6 py-3 rounded-xl bg-card shadow-sm"
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
        <ProfileForm />
      </section>
    </div>
  );
};

export default Matrimony;
