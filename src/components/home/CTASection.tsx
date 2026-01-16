import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-muted-foreground text-lg">
            Start your journey with ANG Growth today.
          </p>
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-lg"
          >
            <Link to="/register">
              Create Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
