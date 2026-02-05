import MasonryFeed from "@/components/MasonryFeed";
import SponsorAdsCarousel from "@/components/SponsorAdsCarousel";
import { Grid3X3, LayoutList, Loader2, Sparkles, Store } from "lucide-react";
import { useLocation } from "react-router-dom";
import type { ExploreFilters, PostCategory } from "@/types/post";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetExploreProductsQuery } from "@/store/api/associateApi";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AngMart() {
  const location = useLocation();
  const state = location.state as { category?: PostCategory } | null;

  const filters: ExploreFilters | typeof skipToken = state?.category
    ? { category: state.category }
    : skipToken;

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: posts = [], isLoading } = useGetExploreProductsQuery(filters);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Store className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Ang Mart</h1>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Discover amazing products
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                className="rounded-xl"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                className="rounded-xl"
                onClick={() => setViewMode("list")}
              >
                <LayoutList className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-24">
        {/* Sponsor Carousel */}
        <div className="mb-8 animate-fade-in">
          <SponsorAdsCarousel />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center py-20 gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            </div>
            <p className="text-muted-foreground font-medium">
              Curating your feed...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && posts.length === 0 && (
          <div className="flex flex-col items-center py-20 gap-4 animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center">
              <Store className="w-10 h-10 text-muted-foreground" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg">No products found</h3>
              <p className="text-muted-foreground text-sm">
                Check back later for new arrivals
              </p>
            </div>
          </div>
        )}

        {/* Feed */}
        {!isLoading && posts.length > 0 && (
          <MasonryFeed posts={posts} viewMode={viewMode} />
        )}
      </main>
    </div>
  );
  // return (
  //   <div className="min-h-screen bg-background pb-16">
  //     <div className="container mx-auto px-4 py-3">
  //       <h1 className="text-2xl font-bold mb-4">Ang Mart</h1>

  //       <div className="mb-8">
  //         <SponsorAdsCarousel />
  //       </div>

  //       {isLoading && (
  //         <div className="flex flex-col items-center py-20 gap-2">
  //           <Loader2 className="h-8 w-8 animate-spin text-primary" />
  //           <p>Curating your feed...</p>
  //         </div>
  //       )}

  //       {isError && (
  //         <div className="py-20 text-center text-red-500">
  //           Failed to load feed
  //         </div>
  //       )}

  //       {!isLoading && posts.length === 0 && (
  //         <div className="py-20 text-center text-muted-foreground">
  //           No posts found
  //         </div>
  //       )}

  //       {!isLoading && posts.length > 0 && <MasonryFeed posts={posts} />}
  //     </div>
  //   </div>
  // );
}
