import type { ExplorePost } from "@/types/feed";
import FeedCard from "./FeedCard";

interface MasonryFeedProps {
  posts: ExplorePost[];
}

const MasonryFeed = ({ posts }: MasonryFeedProps) => {
  if (posts.length === 0)
    return (
      <div className="flex justify-center py-20 text-muted-foreground border-dashed border-2 rounded-lg">
        No posts found to explore.
      </div>
    );
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
      {posts.map((post) => (
        <FeedCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default MasonryFeed;
