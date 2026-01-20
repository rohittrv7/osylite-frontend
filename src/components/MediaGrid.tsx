import { Eye, Heart, MessageCircle, Play } from "lucide-react";

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
  if (!items?.length) {
    return (
      <div className="py-20 text-center text-muted-foreground text-sm">
        No content found
      </div>
    );
  }

  return (
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
          >
            <img
              src={item.url}
              alt=""
              className={`h-full w-full object-cover ${
                isBlocked ? "opacity-70" : ""
              }`}
            />

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

            {!isBlocked && (
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-6 text-white font-semibold z-10">
                <div className="flex items-center gap-1">
                  <Heart size={16} /> {item.stats.likes}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle size={16} /> {item.stats.comments}
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={16} /> {item.stats.views}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
