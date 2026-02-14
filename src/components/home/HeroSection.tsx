import { ArrowRight, BarChart3, Globe, ShieldCheck, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const features = [
    { icon: BarChart3, title: "Analytics" },
    { icon: Globe, title: "Global Reach" },
    { icon: ShieldCheck, title: "Secure" },
    { icon: Bell, title: "Fast Growth" },
  ];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card opacity-50" />

      <div className="container relative p-4">
        {/* <div className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-orange-600 dark:to-yellow-600 text-white text-center py-3 font-medium shadow-sm">
            Our official mobile app is now live!{" "}
            <span className="underline cursor-pointer hover:opacity-90 transition-opacity">
              Download Now →
            </span>
          </div> */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5">
              <span className="text-primary text-sm">⚡</span>
              <span className="text-primary text-sm font-medium">
                Digital Growth Platform
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-foreground">Grow Your Business</span>
                <br />
                <span className="text-primary">Faster & Smarter</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-lg">
                ANG Growth helps businesses scale with modern digital solutions,
                seamless experiences and performance-driven tools.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login ( Website)
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <a
                href="/app-release.apk"
                download="Osylite.apk" // Download hone par ye naam dikhega
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="rounded-full px-6 border-border"
                >
                  Download App
                </Button>
              </a>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="p-6 bg-card border-border hover:border-primary/50 transition-colors group"
              >
                <feature.icon className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-foreground font-medium">{feature.title}</h3>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
