import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type PreviewModalProps = {
  open: boolean;
  onClose: () => void;
  urls: string[];
  type: "post" | "video" | "reel" | "image";
};

export function PreviewModal({ open, onClose, urls, type }: PreviewModalProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Jab slide change hogi toh current index update hoga
  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (!open || !urls.length) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
      {/* CLOSE BUTTON */}
      <button
        onClick={onClose}
        className="absolute z-[110] top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
      >
        <X size={28} />
      </button>

      {/* COUNTER (e.g., 1 / 4) */}
      {urls.length > 1 && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-white/80 font-medium z-[110]">
          {current} / {urls.length}
        </div>
      )}

      <div className="max-w-4xl w-full px-4">
        {type === "post" ? (
          <Carousel setApi={setApi} className="w-full relative">
            <CarouselContent>
              {urls.map((src, index) => (
                <CarouselItem
                  key={index}
                  className="flex justify-center items-center"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={src}
                      alt={`Preview ${index + 1}`}
                      className="max-w-full max-h-[80vh] object-contain rounded-md select-none"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* NAVIGATION BUTTONS (Visible on Desktop) */}
            {urls.length > 1 && (
              <div className="hidden md:block">
                <CarouselPrevious className="-left-12 bg-white/10 border-none text-white hover:bg-white/20" />
                <CarouselNext className="-right-12 bg-white/10 border-none text-white hover:bg-white/20" />
              </div>
            )}

            {/* DOT INDICATORS (Visible on Mobile/Small Screens) */}
            {urls.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {urls.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      current === i + 1 ? "bg-white w-4" : "bg-white/30",
                    )}
                  />
                ))}
              </div>
            )}
          </Carousel>
        ) : (
          <div className="flex justify-center">
            <video
              src={urls[0]}
              controls
              autoPlay
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
            />
          </div>
        )}
      </div>
    </div>
  );
}
