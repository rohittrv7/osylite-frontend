import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import CreateMenu from "@/components/CreateMenu";
import FriendSuggestion from "@/components/friend/FriendSuggestion";
import ReelCarousel from "@/components/ReelCarousel";
import SponsorAdsCarousel from "@/components/SponsorAdsCarousel";
import { FeedSkeleton } from "@/components/feed/FeedSkeleton";

import {
  useGetEntertainmentReelsQuery,
  useGetMixFeedQuery,
} from "@/store/api/postsApi";
import MasonryFeed from "@/components/homeSection/MasonryFeed";

const sections = [
  {
    title: "MCHAT",
    image:
      "https://images.pexels.com/photos/1015568/pexels-photo-1015568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    path: "/mchat",
  },
  {
    title: "MLIFE",
    image:
      "https://images.pexels.com/photos/1615766/pexels-photo-1615766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    path: "/mlife",
  },
  {
    title: "ANG Mart",
    image:
      "https://images.pexels.com/photos/3800101/pexels-photo-3800101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    path: "/ang-mart",
  },
  {
    title: "Ang Services",
    image:
      "https://images.pexels.com/photos/845451/pexels-photo-845451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    path: "/ang-service",
  },
  {
    title: "Venue Explore",
    image:
      "https://images.pexels.com/photos/1908655/pexels-photo-1908655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    path: "/venue-explore",
  },
  {
    title: "Entertainment",
    image:
      "https://images.pexels.com/photos/65128/pexels-photo-65128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    path: "/entertainment",
  },
];

export default function HomeSections() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [seed, setSeed] = useState<string | undefined>(undefined);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data: ReelVideoes } = useGetEntertainmentReelsQuery();

  const {
    data: feedData,
    isLoading,
    isFetching,
  } = useGetMixFeedQuery({
    page,
    limit: 10,
    seed,
  });

  // Jab pehla page load ho, seed ko save karein
  useEffect(() => {
    if (page === 1 && feedData?.meta?.seed) {
      setSeed(feedData.meta.seed);
    }
  }, [feedData, page]);

  // Infinite Scroll Trigger function
  const handleLoadMore = useCallback(() => {
    const hasMore = feedData?.meta ? page < feedData.meta.lastPage : false;
    if (hasMore && !isFetching) {
      setPage((prev) => prev + 1);
    }
  }, [feedData, isFetching, page]);

  // Observer Logic
  useEffect(() => {
    if (isFetching) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );

    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);

    return () => observerRef.current?.disconnect();
  }, [handleLoadMore, isFetching]);

  if (isLoading && page === 1) return <FeedSkeleton />;

  return (
    <div className="w-full px-4 md:px-10 py-6 space-y-8 bg-background text-foreground">
      {/* Search & Create */}
      <div className="max-w-3xl flex gap-5 items-center justify-center mx-auto">
        <Input
          placeholder="Search services, people, jobs, products..."
          className="h-12 rounded-full px-6 bg-background border-input"
        />
        <CreateMenu />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {sections.map((item) => (
          <Card
            key={item.title}
            className="overflow-hidden cursor-pointer gap-0 p-0 hover:shadow-md border-border transition-all rounded-lg group"
            onClick={() => navigate(item.path)}
          >
            <div className="bg-red-600 dark:bg-red-700 text-white text-center py-2 font-semibold text-xs border-b border-red-800/30">
              {item.title}
            </div>
            <CardContent className="p-0 relative aspect-[4/3]">
              <Skeleton className="absolute inset-0 w-full h-full bg-muted" />
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-0 data-[loaded=true]:opacity-100"
                onLoad={(e) => (e.currentTarget.dataset.loaded = "true")}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <ReelCarousel stories={ReelVideoes} />
      <FriendSuggestion />
      <SponsorAdsCarousel />

      {/* Mixed Feed Section */}
      <div className="mx-auto">
        <h2 className="text-xl font-bold mb-6 px-2">Discover Feed</h2>

        {/* Masonry Layout */}
        <MasonryFeed posts={feedData?.data || []} />

        {/* Infinite Scroll Loader */}
        <div ref={loadMoreRef} className="py-10 flex flex-col items-center">
          {isFetching && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span>Fetching more posts...</span>
            </div>
          )}

          {feedData?.meta && page >= feedData.meta.lastPage && (
            <div className="text-center space-y-2">
              <p className="text-muted-foreground text-sm font-medium italic">
                You've reached the end of the feed! 🎉
              </p>
              <Button
                variant="link"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setPage(1);
                }}
              >
                Back to Top
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
