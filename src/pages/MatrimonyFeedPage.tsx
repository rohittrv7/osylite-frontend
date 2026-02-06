import { useState } from "react";
import { useGetMatrimonyFeedQuery } from "@/store/api/matrimonyApi";
import { Loader2, FilterX, ShieldAlert, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MatrimonyFilterDto } from "@/types/matrimony";
import MatrimonyCard from "@/components/matrimony/MatrimonyCard";
import { useGetProfileQuery } from "@/store/api/authApi";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const MatrimonyFeedPage = () => {
  const [filters, setFilters] = useState<MatrimonyFilterDto>({});
  const { data: userData } = useGetProfileQuery();
  const navigate = useNavigate();

  const { data: Feeds = [], isLoading } = useGetMatrimonyFeedQuery(filters);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Finding perfect matches...</p>
      </div>
    );
  }

  if (!userData?.isMatrimonyProfile) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <Card className="max-w-md w-full text-center shadow-lg">
          <CardContent className="p-8">
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 rounded-full bg-background flex items-center justify-center">
                <ShieldAlert className="h-7 w-7 text-red-500" />
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-2">Profile Not Active</h2>

            <p className="text-foreground mb-6">
              Matrimony features use karne ke liye aapko apna profile
              <span className="font-medium"> create ya activate </span>
              karna hoga.
            </p>

            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => navigate("/matrimony")}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Create Profile
              </Button>

              <Button
                className="cursor-pointer"
                onClick={() => navigate("/matrimony")}
              >
                Activate Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header / Filter Toggle (Placeholder) */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold font-display">
          New Matches{" "}
          <span className="text-muted-foreground text-lg font-normal">
            ({Feeds.length})
          </span>
        </h1>
        {/* <Button variant="outline" size="sm">Filters</Button> */}
      </div>

      {Feeds.length === 0 ? (
        <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed">
          <FilterX className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
          <h3 className="text-lg font-medium">No Feeds found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters to see more results.
          </p>
          <Button
            variant="link"
            onClick={() => setFilters({})}
            className="mt-2 text-primary"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Feeds.map((profile) => (
            <MatrimonyCard key={profile.id} profile={profile} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MatrimonyFeedPage;
