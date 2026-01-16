import { useState, useEffect, useRef, useCallback } from "react";
import { EventCard } from "@/components/EventCard";
import SponsorAdsCarousel from "@/components/SponsorAdsCarousel";

const generateMockEvent = (index: number) => ({
  title: index === 0 ? "Nararani Dance Show" : `Event ${index + 1}`,
  category:
    index === 0
      ? "Business"
      : ["Dance", "Sports", "Music", "Seminar", "Competition"][index % 5],
  imageUrl:
    index === 0
      ? "https://images.stockcake.com/public/7/d/5/7d5a0a0a-aa02-4a95-9d77-ba88f473b757_large/elegant-dance-performance-stockcake.jpg"
      : `https://picsum.photos/seed/event${index}/600/400`,
  description:
    index === 0
      ? "We are Organising a Dance Competition. For Participate in this Share your details in contact us section."
      : `Exciting ${
          ["dance", "chess", "football", "motivation", "workshop"][index % 5]
        } event organized by ANG Growth! Join now.`,
  views: Math.floor(Math.random() * 500) + 50,
  likes: Math.floor(Math.random() * 120),
  comments: Math.floor(Math.random() * 40),
});

const allEvents = Array.from({ length: 60 }, (_, i) => generateMockEvent(i));

const ITEMS_PER_PAGE = 9;

export default function EventsFeed() {
  const [displayedEvents, setDisplayedEvents] = useState(
    allEvents.slice(0, ITEMS_PER_PAGE)
  );
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(allEvents.length > ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);

    setTimeout(() => {
      const nextPage = page + 1;
      const start = page * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      const nextItems = allEvents.slice(start, end);

      if (nextItems.length === 0) {
        setHasMore(false);
      } else {
        setDisplayedEvents((prev) => [...prev, ...nextItems]);
        setPage(nextPage);
      }

      setIsLoading(false);
    }, 500);
  }, [page, hasMore, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loadMore, hasMore, isLoading]);

  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 md:mb-10 text-center md:text-left">
          ANG Growth Events
        </h1>
        <SponsorAdsCarousel />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
          {displayedEvents.map((event, idx) => (
            <EventCard
              key={idx}
              title={event.title}
              category={event.category}
              imageUrl={event.imageUrl}
              description={event.description}
              views={event.views}
              likes={event.likes}
              comments={event.comments}
            />
          ))}
        </div>

        {hasMore && (
          <div
            ref={loaderRef}
            className="col-span-full py-10 md:py-16 flex justify-center items-center text-muted-foreground"
          >
            {isLoading ? (
              <div className="flex items-center gap-3 text-sm md:text-base">
                <div className="h-5 w-5 md:h-6 md:w-6 animate-spin rounded-full border-2 md:border-4 border-primary border-t-transparent" />
                <span>Loading more events...</span>
              </div>
            ) : (
              <span className="text-sm opacity-70">
                Scroll down to load more
              </span>
            )}
          </div>
        )}

        {!hasMore && displayedEvents.length > 0 && (
          <div className="text-center py-12 md:py-16 text-muted-foreground text-sm md:text-base">
            You've reached the end of events ✨
          </div>
        )}
      </div>
    </div>
  );
}
