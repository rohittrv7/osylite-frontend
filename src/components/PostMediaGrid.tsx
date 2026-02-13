import { Play, Eye, Heart, Copy } from "lucide-react";
import { useState } from "react";
import { PreviewModal } from "./PreviewModal";
import type { PostMedia } from "@/types/post";

interface PostMediaGridProps {
  items?: PostMedia[];
  isReel?: boolean;
}

export default function PostMediaGrid({
  items,
  isReel = false,
}: PostMediaGridProps) {
  // 1. Fix: State ko urls: string[] (array) mein badla
  const [preview, setPreview] = useState<{
    open: boolean;
    urls: string[];
    type: "image" | "video";
  }>({
    open: false,
    urls: [],
    type: "image",
  });

  // 2. Fix: openPreview ab string[] accept karega
  const openPreview = (urls: string[], type: "image" | "video") => {
    setPreview({ open: true, urls, type });
  };

  const closePreview = () => {
    setPreview((p) => ({ ...p, open: false }));
  };

  if (!items?.length) {
    return (
      <div className="py-20 text-center text-muted-foreground text-sm">
        No media found
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-1 md:gap-4">
        {items.map((item) => {
          // Check if fileUrl is already an array or needs to be wrapped
          const mediaArray = Array.isArray(item.fileUrl)
            ? item.fileUrl
            : [item.fileUrl];
          const isVideo = item.type === "video" || item.type === "reel";

          return (
            <div
              key={item.id}
              className={`relative group overflow-hidden rounded-sm bg-muted cursor-pointer ${
                isReel ? "aspect-[9/16]" : "aspect-square"
              }`}
              onClick={() =>
                openPreview(mediaArray, isVideo ? "video" : "image")
              }
            >
              <img
                src={
                  item.thumbnailUrl ||
                  (Array.isArray(item.fileUrl) ? item.fileUrl[0] : item.fileUrl)
                }
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />

              {/* Video Indicator */}
              {isVideo && (
                <div className="absolute top-2 right-2 text-white drop-shadow-lg z-10">
                  <Play size={20} fill="white" />
                </div>
              )}

              {/* Multiple Images Indicator */}
              {!isVideo && mediaArray.length > 1 && (
                <div className="absolute top-2 right-2 text-white drop-shadow-lg z-10">
                  <Copy size={16} className="rotate-90" />
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-6 text-white text-sm font-medium">
                <div className="flex items-center gap-1">
                  <Eye size={16} /> {item.viewsCount}
                </div>
                <div className="flex items-center gap-1">
                  <Heart size={16} /> {item.likesCount}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Fix: url={preview.url} ko badal kar urls={preview.urls} kiya */}
      <PreviewModal
        open={preview.open}
        urls={preview.urls}
        type={preview.type}
        onClose={closePreview}
      />
    </>
  );
}
