import {
  Code,
  Palette,
  FastForward,
  Lock,
  Headphones,
  TrendingUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      icon: Code,
      title: "Modern Development",
      description: "Clean, scalable and future-proof technology stack.",
    },
    {
      icon: Palette,
      title: "Premium Design",
      description: "Beautiful UI/UX with dark mode support.",
    },
    {
      icon: FastForward,
      title: "High Performance",
      description: "Optimized for speed and conversions.",
    },
    {
      icon: Lock,
      title: "Secure Platform",
      description: "Best practices for data & user security.",
    },
    {
      icon: Headphones,
      title: "Support",
      description: "Reliable support when you need it.",
    },
    {
      icon: TrendingUp,
      title: "Business Growth",
      description: "Tools that actually move numbers.",
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-foreground">Why Choose </span>
            <span className="text-primary">ANG Growth</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to grow, in one powerful platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="p-8 bg-card border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <feature.icon className="h-10 w-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
