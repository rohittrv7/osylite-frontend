import { Play, Layers } from "lucide-react"; // Layers icon for multi-image indicator
import { cn } from "@/lib/utils";

interface MediaGridProps {
  mediaUrls: string[];
  type: "image" | "video" | "reel" | "post";
  onMediaClick: (url: string, index: number) => void;
  // compact?: boolean;
}

export const MediaGrid = ({
  mediaUrls,
  type,
  onMediaClick,

}: MediaGridProps) => {
  const count = mediaUrls.length;

  if (count === 0) return null;

  const renderMedia = (url: string, index: number, className?: string) => {
    // Robust extension check + prop type fallback
    const isVideo =
      url?.match(/\.(mp4|webm|mov)$/i) || type === "video" || type === "reel";

    return (
      <div
        key={index}
        className={cn(
          "relative w-full h-full cursor-pointer overflow-hidden bg-muted group",
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
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              muted
              playsInline
              // Optionally loop in feed or just show thumbnail
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              </div>
            </div>
          </div>
        ) : (
          <img
            src={url}
            alt={`Media ${index}`}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
        )}
      </div>
    );
  };

  // --- Layout Logic ---

  // 1. Single Media
  if (count === 1) {
    return (
      <div className="aspect-[4/3] w-full border-b border-border/20">
        {renderMedia(mediaUrls[0], 0)}
      </div>
    );
  }

  // 2. Two Media (Split Vertically)
  if (count === 2) {
    return (
      <div className="grid grid-cols-2 gap-0.5 aspect-[4/3] w-full border-b border-border/20">
        {renderMedia(mediaUrls[0], 0)}
        {renderMedia(mediaUrls[1], 1)}
        {/* Multi-photo indicator icon */}
        <div className="absolute top-3 right-3 bg-black/50 p-1.5 rounded-full backdrop-blur-sm pointer-events-none">
          <Layers className="w-4 h-4 text-white" />
        </div>
      </div>
    );
  }

  // 3. Three Media
  if (count === 3) {
    return (
      <div className="grid grid-cols-2 gap-0.5 aspect-[4/3] w-full border-b border-border/20 relative">
        <div className="row-span-2 h-full">
          {renderMedia(mediaUrls[0], 0, "h-full")}
        </div>
        <div className="grid grid-rows-2 gap-0.5 h-full">
          {renderMedia(mediaUrls[1], 1, "h-full")}
          {renderMedia(mediaUrls[2], 2, "h-full")}
        </div>
        <div className="absolute top-3 right-3 bg-black/50 p-1.5 rounded-full backdrop-blur-sm pointer-events-none">
          <Layers className="w-4 h-4 text-white" />
        </div>
      </div>
    );
  }

  // 4. Four or More Media
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-0.5 aspect-square w-full border-b border-border/20 relative">
      {renderMedia(mediaUrls[0], 0)}
      {renderMedia(mediaUrls[1], 1)}
      {renderMedia(mediaUrls[2], 2)}

      <div className="relative h-full">
        {renderMedia(mediaUrls[3], 3, "h-full")}
        {count > 4 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer pointer-events-none backdrop-blur-[2px]">
            <span className="text-white text-xl font-bold tracking-widest">
              +{count - 4}
            </span>
          </div>
        )}
      </div>
      <div className="absolute top-3 right-3 bg-black/50 p-1.5 rounded-full backdrop-blur-sm pointer-events-none">
        <Layers className="w-4 h-4 text-white" />
      </div>
    </div>
  );
};
