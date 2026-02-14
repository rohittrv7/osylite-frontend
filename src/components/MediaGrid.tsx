import { Copy, Play, Eye, Heart } from "lucide-react";
import { PreviewModal } from "./PreviewModal";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type MediaItem = {
  id: string;
  url: string;
  fileUrl: string[];
  thumbnailUrl: string | null;
  type: "post" | "video" | "reel";
  caption: string | null;
  isPaidContent: boolean;
  isEnquiryEnabled: boolean;
  ctaLabel: string | null;
  status: "pending" | "approved" | "rejected";
  channelId: string | null;
  stats: {
    likes: number;
    comments: number;
    views: number;
  };
  createdAt: string;
};

interface MediaGridProps {
  items?: MediaItem[];
  isReel?: boolean;
}

export default function MediaGrid({ items, isReel = false }: MediaGridProps) {
  const [preview, setPreview] = useState<{
    open: boolean;
    urls: string[];
    type: "post" | "video" | "reel";
  }>({
    open: false,
    urls: [],
    type: "post",
  });

  const openPreview = (urls: string[], type: "post" | "video" | "reel") => {
    // Ensuring URLs exist before opening
    if (!urls || urls.length === 0) return;
    setPreview({ open: true, urls, type });
  };

  const closePreview = () => {
    setPreview((prev) => ({ ...prev, open: false }));
  };

  if (!items?.length) {
    return (
      <div className="py-20 text-center text-muted-foreground text-sm border border-dashed rounded-lg bg-muted/20">
        No content found
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-1 md:gap-4">
        {items.map((item) => {
          const isBlocked =
            item.status === "pending" || item.status === "rejected";
          const isVideoType = item.type === "video" || item.type === "reel";

          return (
            <div
              key={item.id}
              className={`relative group overflow-hidden rounded-sm bg-muted cursor-pointer ring-offset-background transition-all hover:ring-2 hover:ring-primary/50 ${
                isReel ? "aspect-[9/16]" : "aspect-square"
              }`}
              onClick={() => openPreview(item.fileUrl, item.type)}
            >
              {/* Image / Video Thumbnail Logic */}
              <img
                src={
                  item.type === "post"
                    ? item.fileUrl[0] // Pehli image
                    : item.thumbnailUrl || item.fileUrl[0] // Video thumbnail ya video link ka fallback
                }
                alt={item.caption || "Media content"}
                className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                  isBlocked ? "opacity-60 grayscale-[50%]" : ""
                }`}
                loading="lazy"
              />

              {/* Indicator for Multiple Images (Carousel) */}
              {item.type === "post" && item.fileUrl.length > 1 && (
                <div className="absolute top-2 right-2 text-white drop-shadow-md z-10 bg-black/20 p-1 rounded-sm">
                  <Copy size={16} className="rotate-90" />
                </div>
              )}

              {/* Video/Reel Play Icon Overlay */}
              {isVideoType && (
                <div className="absolute top-2 right-2 text-white drop-shadow-md z-10 bg-black/20 p-1 rounded-sm">
                  <Play size={18} fill="currentColor" />
                </div>
              )}

              {/* Stats Hover Overlay (Optional but good for UI) */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white text-xs md:text-sm font-bold">
                <div className="flex items-center gap-1">
                  <Heart size={14} fill="white" /> {item.stats.likes}
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={14} /> {item.stats.views}
                </div>
              </div>

              {/* Status Label (If you want to show it on grid) */}
              {isBlocked && (
                <div
                  className={cn(
                    "absolute bottom-0 left-0 right-0 py-1 text-[10px] text-center font-bold text-white uppercase tracking-tighter",
                    item.status === "pending"
                      ? "bg-yellow-600/80"
                      : "bg-red-600/80",
                  )}
                >
                  {item.status}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* MODAL INTEGRATION: Make sure PreviewModal props match exactly */}
      <PreviewModal
        open={preview.open}
        urls={preview.urls}
        type={preview.type}
        onClose={closePreview}
      />
    </>
  );
}
