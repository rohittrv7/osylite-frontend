import { Play } from "lucide-react";
import { PreviewModal } from "./PreviewModal";
import { useState } from "react";

export type MediaItem = {
  id: string;
  url: string;
  fileUrl: string;
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

export default function MediaGrid({
  items,
  isReel = false,
}: {
  items?: MediaItem[];
  isReel?: boolean;
}) {
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
    setPreview({ ...preview, open: false });
  };
  if (!items?.length) {
    return (
      <div className="py-20 text-center text-muted-foreground text-sm">
        No content found
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-1 md:gap-4">
        {items.map((item) => {
          const isPending = item.status === "pending";
          const isRejected = item.status === "rejected";
          const isBlocked = isPending || isRejected;

          return (
            <div
              key={item.id}
              className={`relative group overflow-hidden rounded-sm bg-muted cursor-pointer ${
                isReel ? "aspect-[9/16]" : "aspect-square"
              }`}
              onClick={() =>
                openPreview(
                  item.fileUrl,
                  item.type === "video" ? "video" : "image",
                )
              }
            >
              {item.type === "post" && (
                <img
                  src={item.url}
                  alt=""
                  className={`h-full w-full object-cover ${
                    isBlocked ? "opacity-70" : ""
                  }`}
                />
              )}

              {(item.type === "video" || item.type === "reel") && (
                <div className="absolute top-2 right-2 text-white drop-shadow-lg z-10">
                  <Play size={20} fill="white" />
                </div>
              )}

              {isBlocked && (
                <div
                  className={`absolute inset-0 z-20 flex items-center justify-center text-sm font-semibold uppercase tracking-wide ${
                    isPending
                      ? "bg-yellow-500/70 text-black"
                      : "bg-red-600/70 text-white"
                  }`}
                >
                  {isPending ? "Pending Approval" : "Rejected"}
                </div>
              )}
            </div>
          );
        })}
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
