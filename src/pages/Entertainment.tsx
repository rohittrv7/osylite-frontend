import ReelViewer from "@/components/ReelViewer";
import { useGetEntertainmentReelsQuery } from "@/store/api/postsApi";
import { Loader2 } from "lucide-react";

function Entertainment() {
  const {
    data: reels = [],
    isLoading,
    isError,
  } = useGetEntertainmentReelsQuery();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        Failed to load reels
      </div>
    );
  }
  if (reels.length === 0) {
    return (
      <div className="flex items-center justify-center text-muted-foreground">
        No reels available
      </div>
    );
  }

  return (
    <div>
      <ReelViewer reels={reels} />
    </div>
  );
}

export default Entertainment;
