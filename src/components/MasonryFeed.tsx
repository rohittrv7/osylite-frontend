import type { ExplorePost } from "@/types/feed";
import FeedCard from "./FeedCard";

interface MasonryFeedProps {
  posts: ExplorePost[];
  viewMode?: "grid" | "list";
}

const MasonryFeed = ({ posts, viewMode = "grid" }: MasonryFeedProps) => {
  if (viewMode === "list") {
    return (
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <FeedCard post={post} viewMode="list" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
      {posts.map((post, index) => (
        <div
          key={post.id}
          className="break-inside-avoid animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <FeedCard post={post} viewMode="grid" />
        </div>
      ))}
    </div>
  );
};

export default MasonryFeed;
