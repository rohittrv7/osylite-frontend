import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();
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
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-lg justify-center items-center gap-3 py-1 px-2"
            onClick={() => navigate("/register")}
          >
            Create Account
            <ArrowRight className="h-8 w-8" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
