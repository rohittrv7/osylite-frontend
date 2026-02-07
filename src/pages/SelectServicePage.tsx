import { SERVICE_CATEGORY_OPTIONS } from "@/types/content";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const SelectServicePage = () => {
  const navigate = useNavigate();

  const handleSelect = (category: string) => {
    navigate(`/ang-service/${category}`, {
      state: {
        category,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-20">
      {/* --- Header Section --- */}
      <div className="relative bg-primary/5 py-12 px-6 mb-10 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground font-display mb-4">
            Explore <span className="text-primary">Services</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From daily needs to professional help, find all the services you
            need in one place.
          </p>
        </div>
      </div>

      {/* --- Grid Section --- */}
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {SERVICE_CATEGORY_OPTIONS.map((item) => (
            <Card
              key={item.value}
              onClick={() => handleSelect(item.value)}
              className="group relative cursor-pointer p-0 overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30"
            >
              {/* Image Area */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-muted relative">
                <img
                  src={item.image}
                  alt={item.label}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Subtle Overlay on Hover */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
              </div>

              {/* Text Area */}
              <div className=" pb-4 flex items-center justify-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                <span className="text-sm sm:text-base font-semibold text-center text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {item.label}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectServicePage;
