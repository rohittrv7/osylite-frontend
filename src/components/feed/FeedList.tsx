import { useEffect, useRef, useCallback, useState } from 'react';
import MasonryFeed from './MasonryFeed';
import { FeedSkeleton } from './FeedSkeleton';
import { Loader2 } from 'lucide-react';
import { useGetFeedQuery } from '@/store/api/postsApi';
import type { ContentType } from '@/types/feed';

interface FeedListProps {
  type: ContentType;
}

export const FeedList = ({ type }: FeedListProps) => {
  const [page, setPage] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, isFetching, isError } = useGetFeedQuery({
    type,
    page,
    limit: 10,
  });

  // Reset page when type changes
  useEffect(() => {
    setPage(1);
  }, [type]);

  const handleLoadMore = useCallback(() => {
    if (data?.meta.hasMore && !isFetching) {
      setPage((prev) => prev + 1);
    }
  }, [data?.meta.hasMore, isFetching]);

  // Infinite scroll observer
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleLoadMore]);

  if (isLoading && page === 1) {
    return <FeedSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-destructive mb-2">Failed to load feed</p>
        <button
          onClick={() => setPage(1)}
          className="text-primary hover:underline text-sm"
        >
          Try again
        </button>
      </div>
    );
  }

  const posts = data?.data || [];

  return (
    <div>
      <MasonryFeed posts={posts} />

      {/* Load more trigger */}
      <div ref={loadMoreRef} className="py-8">
        {isFetching && page > 1 && (
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Loading more...</span>
          </div>
        )}

        {!data?.meta.hasMore && posts.length > 0 && (
          <p className="text-center text-muted-foreground text-sm py-4">
            You've reached the end! 🎉
          </p>
        )}
      </div>
    </div>
  );
};
