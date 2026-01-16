import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const sponsorAds = [
  {
    image: "https://images.unsplash.com/photo-1556155099-490a1ba16284?w=800",
    alt: "M.COM - Mangalayatan University",
  },
  {
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800",
    alt: "BBA with Actor - Mangalayatan",
  },
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
    alt: "BA - Bachelor of Arts",
  },
  {
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
    alt: "BCA - Bachelor of Computer Application",
  },
  {
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    alt: "Mangalayatan Online Programs",
  },
  {
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800",
    alt: "University Ad - Girl with Book",
  },
];

export default function SponsorAdsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollPositionRef = useRef(0); 

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrame: number;

    const animate = () => {
      if (!container || isPaused) return;

      scrollPositionRef.current += 0.8;

      const halfWidth = container.scrollWidth / 2;
      if (scrollPositionRef.current >= halfWidth) {
        scrollPositionRef.current -= halfWidth;
        container.scrollLeft = scrollPositionRef.current;
      } else {
        container.scrollLeft = scrollPositionRef.current;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused]);

  return (
    <div className="w-full py-5 bg-muted/20 rounded-md">
      <div className="container mx-auto px-3 md:px-4">
        <h2 className="text-xl md:text-2xl font-semibold text-center mb-3 text-foreground">
          Sponsor AD
        </h2>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div
            ref={scrollRef}
            className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-hidden whitespace-nowrap"
          >
            {/* Duplicate for infinite seamless scroll */}
            {[...sponsorAds, ...sponsorAds].map((ad, index) => (
              <Card
                key={index}
                className={cn(
                  "flex-shrink-0 overflow-hidden rounded-lg border border-border/30",
                  "w-[260px] xs:w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px]",
                  "h-[160px] xs:h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px]",
                  "shadow-sm hover:shadow transition-shadow duration-200",
                  "m-0 p-0"
                )}
              >
                <div className="w-full h-full m-0 p-0">
                  <img
                    src={ad.image}
                    alt={ad.alt}
                    className="w-full h-full object-cover block m-0 p-0"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
