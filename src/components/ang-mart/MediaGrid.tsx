import { Play, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaGridProps {
  mediaUrls: string[];
  type: "video" | "reel" | "post";
  onMediaClick: (url: string, index: number) => void;
}

export const MediaGrid = ({
  mediaUrls,
  type,
  onMediaClick,
}: MediaGridProps) => {
  const count = mediaUrls.length;

  if (count === 0) return null;

  const renderMedia = (url: string, index: number, className?: string) => {
    const isVideo =
      url?.match(/\.(mp4|webm|mov)$/i) || type === "video" || type === "reel";

    return (
      <div
        key={index}
        className={cn(
          "relative w-full cursor-pointer overflow-hidden bg-muted group",
          className,
        )}
        onClick={(e) => {
          e.stopPropagation();
          onMediaClick(url, index);
        }}
      >
        {isVideo ? (
          <div className="relative w-full h-full bg-black flex items-center justify-center">
            <video
              src={url}
              className="w-full h-auto max-h-[70vh] object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              muted
              playsInline
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              </div>
            </div>
          </div>
        ) : (
          <img
            src={url}
            alt={`Media ${index}`}
            // h-auto ensures the image takes its natural height
            // max-h restricts extremely long images from breaking the UI
            className="w-full h-auto max-h-[75vh] object-contain transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
        )}
      </div>
    );
  };

  // --- Flexible Layout Logic ---

  // 1. Single Media (Purely Natural Height)
  if (count === 1) {
    return (
      <div className="w-full border-b border-border/20">
        {renderMedia(mediaUrls[0], 0)}
      </div>
    );
  }

  // 2. Multi-image (Keeping them consistent but slightly more flexible)
  // Grid layouts for multiple images usually work better with a base aspect ratio
  // to avoid a "messy" look, but we'll use a taller default.
  return (
    <div className="relative w-full border-b border-border/20">
      <div
        className={cn(
          "grid gap-0.5 w-full",
          count === 2 ? "grid-cols-2" : "grid-cols-2 grid-rows-2",
        )}
      >
        {/* Render only up to 4 images in grid */}
        {mediaUrls.slice(0, 4).map((url, idx) => (
          <div key={idx} className="relative overflow-hidden aspect-[3/4]">
            {/* Note: In grid mode, we use aspect ratio so they align perfectly 
                 but we use 3/4 (Portrait) which covers most phone photos nicely */}
            {renderMedia(url, idx, "h-full w-full object-cover")}

            {/* Overlay for +Count */}
            {idx === 3 && count > 4 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center pointer-events-none backdrop-blur-[2px]">
                <span className="text-white text-xl font-bold">
                  +{count - 4}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Multi-photo indicator icon */}
      <div className="absolute top-3 right-3 bg-black/50 p-1.5 rounded-full backdrop-blur-sm pointer-events-none">
        <Layers className="w-4 h-4 text-white" />
      </div>
    </div>
  );
};
