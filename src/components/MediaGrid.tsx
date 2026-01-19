import { Eye, Heart, MessageCircle, Play } from "lucide-react";

type MediaItem = {
  id: string;
  url: string;
  type: "post" | "video" | "reel";
  stats: {
    likes: number;
    comments: number;
    views: number;
  };
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
      {items.map((item) => (
        <div
          key={item.id}
          className={`relative group overflow-hidden rounded-sm bg-muted cursor-pointer ${
            isReel ? "aspect-[9/16]" : "aspect-square"
          }`}
        >
          <img src={item.url} alt="" className="h-full w-full object-cover" />

          {(item.type === "video" || item.type === "reel") && (
            <div className="absolute top-2 right-2 text-white drop-shadow-lg">
              <Play size={20} fill="white" />
            </div>
          )}

          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-6 text-white font-semibold">
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
        </div>
      ))}
    </div>
  );
}
