import MasonryFeed from "@/components/MasonryFeed";
import SponsorAdsCarousel from "@/components/SponsorAdsCarousel";
import { Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import type { ExploreFilters, PostCategory } from "@/types/post";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetExploreVideosQuery } from "@/store/api/associateApi";

export default function EntertainMentPage() {
  const location = useLocation();
  const state = location.state as { category?: PostCategory } | null;

  const filters: ExploreFilters | typeof skipToken = state?.category
    ? { category: state.category }
    : skipToken;

  const {
    data: posts = [],
    isLoading,
    isError,
  } = useGetExploreVideosQuery(filters);

  // const handleFilterChange = (key: keyof ExploreFilters, value?: string) => {
  //   setFilters((prev) => ({
  //     ...prev,
  //     [key]: value || undefined,
  //   }));
  // };

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container mx-auto px-4 py-3">
        <h1 className="text-2xl font-bold mb-4">Ang Mart</h1>

        {/* <div className="mb-2">
          <AngMartFilters filters={filters} onChange={handleFilterChange} />
        </div> */}

        <div className="mb-8">
          <SponsorAdsCarousel />
        </div>

        {isLoading && (
          <div className="flex flex-col items-center py-20 gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p>Curating your feed...</p>
          </div>
        )}

        {isError && (
          <div className="py-20 text-center text-red-500">
            Failed to load feed
          </div>
        )}

        {!isLoading && posts.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            No posts found
          </div>
        )}

        {!isLoading && posts.length > 0 && <MasonryFeed posts={posts} />}
      </div>
    </div>
  );
}
