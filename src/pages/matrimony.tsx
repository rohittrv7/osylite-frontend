import ProfileForm from "@/components/matrimony/ProfileForm";
import { useGetProfileQuery } from "@/store/api/authApi";
import { Loader2 } from "lucide-react";

const Matrimony = () => {
  const { data: user, isLoading } = useGetProfileQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (user?.isMatrimonyProfile) {
    return (
      <div className="min-h-screen bg-background py-10 px-4">
        <ProfileForm />
      </div>
    );
  }

  return (
    <div className="bg-gradient-hero min-h-screen pb-16">
      <section className="pt-12 pb-6 px-4 sm:px-6 text-center animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
            Find Your Perfect
            <span className="text-gradient-maroon"> Life Partner</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Create your profile in just a few minutes and connect with lakhs of
            verified profiles.
          </p>
        </div>
      </section>

      <section className="py-6 px-4 sm:px-6">
        <div className="mx-auto flex flex-wrap justify-center gap-4">
          {[
            { label: "Verified Profiles", value: "50 Lakh+" },
            { label: "Success Stories", value: "10 Lakh+" },
            { label: "Years of Trust", value: "25+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center px-8 py-4 rounded-2xl bg-card shadow-sm border border-border/50 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-2xl font-bold text-primary font-display">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6">
        <ProfileForm />
      </section>
    </div>
  );
};

export default Matrimony;
