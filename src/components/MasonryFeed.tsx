import type { ExplorePost } from "@/types/post";
import FeedCard from "./FeedCard";

interface MasonryFeedProps {
  posts: ExplorePost[];
}

const MasonryFeed = ({ posts }: MasonryFeedProps) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
      {posts.map((post) => (
        <FeedCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default MasonryFeed;
