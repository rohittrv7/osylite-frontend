import { useGetExploreQuery } from "@/store/api/postsApi";
import { ExploreCard } from "@/components/ExploreCard";
import SponsorAdsCarousel from "@/components/SponsorAdsCarousel"; // Assuming you have this
import { Loader2 } from "lucide-react";

export default function ExploreFeed() {
  const { data: posts = [], isLoading, isError } = useGetExploreQuery(); // No argument needed

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-2xl font-bold mb-6">Explore</h1>

        {/* Carousel Section */}
        <div className="mb-8">
          <SponsorAdsCarousel />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p>Curating your feed...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="flex justify-center py-20 text-red-500 bg-red-50 rounded-lg">
            Failed to load feed. Please try again later.
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && posts.length === 0 && (
          <div className="flex justify-center py-20 text-muted-foreground border-dashed border-2 rounded-lg">
            No posts found to explore.
          </div>
        )}

        {/* Post Grid */}
        {!isLoading && !isError && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-center">
            {posts.map((post) => (
              <ExploreCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
