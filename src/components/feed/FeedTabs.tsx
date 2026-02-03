import { Image, Film, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ContentType } from "@/types/feed";

interface FeedTabsProps {
  activeTab: ContentType;
  onTabChange: (tab: ContentType) => void;
}

const tabs: { id: ContentType; label: string; icon: React.ReactNode }[] = [
  { id: "post", label: "Posts", icon: <Image className="w-5 h-5" /> },
  { id: "reel", label: "Reels", icon: <Film className="w-5 h-5" /> },
  { id: "video", label: "Videos", icon: <Video className="w-5 h-5" /> },
];

export const FeedTabs = ({ activeTab, onTabChange }: FeedTabsProps) => {
  return (
    <div className="sticky top-[57px] z-10 bg-background/95 backdrop-blur-lg border-b border-border">
      <div className="container max-w-7xl mx-auto">
        <nav className="flex" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-all duration-300 relative",
                activeTab === tab.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>

              {/* Active indicator */}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gradient-primary rounded-full cursor-pointer" />
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};
