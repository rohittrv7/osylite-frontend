import { Play, Eye, Heart } from "lucide-react";
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
  const [preview, setPreview] = useState<{
    open: boolean;
    url: string;
    type: "image" | "video";
  }>({
    open: false,
    url: "",
    type: "image",
  });

  const openPreview = (url: string, type: "image" | "video") => {
    setPreview({ open: true, url, type });
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
        {items.map((item) => (
          <div
            key={item.id}
            className={`relative group overflow-hidden rounded-sm bg-muted cursor-pointer ${
              isReel ? "aspect-[9/16]" : "aspect-square"
            }`}
            onClick={() =>
              openPreview(
                item.fileUrl,
                item.type === "video" || item.type === "reel"
                  ? "video"
                  : "image",
              )
            }
          >
            <img
              src={item.thumbnailUrl || item.fileUrl}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />

            {(item.type === "video" || item.type === "reel") && (
              <div className="absolute top-2 right-2 text-white drop-shadow-lg z-10">
                <Play size={20} fill="white" />
              </div>
            )}

            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-6 text-white text-sm font-medium">
              <div className="flex items-center gap-1">
                <Eye size={16} /> {item.viewsCount}
              </div>
              <div className="flex items-center gap-1">
                <Heart size={16} /> {item.likesCount}
              </div>
            </div>
          </div>
        ))}
      </div>

      <PreviewModal
        open={preview.open}
        url={preview.url}
        type={preview.type}
        onClose={closePreview}
      />
    </>
  );
}
