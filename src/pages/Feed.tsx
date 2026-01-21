import { useGetExploreQuery } from "@/store/api/postsApi";
import { Loader2 } from "lucide-react";
import MasonryFeed from "@/components/MasonryFeed";

export default function ExploreFeed() {
  const { data: posts = [], isLoading, isError } = useGetExploreQuery();

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Explore</h1>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p>Curating your feed...</p>
          </div>
        )}

        {isError && (
          <div className="flex justify-center py-20 text-red-500 bg-red-50 rounded-lg">
            Failed to load feed. Please try again later.
          </div>
        )}

        {!isLoading && !isError && posts.length === 0 && (
          <div className="flex justify-center py-20 text-muted-foreground border-dashed border-2 rounded-lg">
            No posts found to explore.
          </div>
        )}

        {!isLoading && !isError && posts.length > 0 && (
          <div className="">
            <MasonryFeed posts={posts} />
          </div>
        )}
      </div>
    </div>
  );
}
