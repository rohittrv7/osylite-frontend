import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SkeletonBox = ({ className }: { className?: string }) => (
  <div className={`bg-muted animate-pulse rounded ${className}`} />
);

const SkeletonCard = () => (
  <Card className="mb-4 break-inside-avoid overflow-hidden">
    <CardHeader className="p-3 pb-2">
      <div className="flex items-center gap-3">
        <SkeletonBox className="w-10 h-10 rounded-full" />
        <div className="flex-1">
          <SkeletonBox className="h-4 w-24 mb-1" />
          <SkeletonBox className="h-3 w-16" />
        </div>
      </div>
    </CardHeader>
    <SkeletonBox className="w-full aspect-square" />
    <CardContent className="p-3 pt-2 space-y-2">
      <SkeletonBox className="h-4 w-3/4" />
      <SkeletonBox className="h-3 w-full" />
      <SkeletonBox className="h-3 w-2/3" />
      <div className="flex gap-4 pt-1">
        <SkeletonBox className="h-4 w-12" />
        <SkeletonBox className="h-4 w-12" />
        <SkeletonBox className="h-4 w-12" />
      </div>
    </CardContent>
  </Card>
);

export const FeedSkeleton = () => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};
