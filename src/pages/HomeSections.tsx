import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import CreateMenu from "@/components/CreateMenu";
import MasonryFeed from "@/components/MasonryFeed";
import FriendSuggestion from "@/components/friend/FriendSuggestion";
import ReelCarousel from "@/components/ReelCarousel";
import { useGetEntertainmentReelsQuery } from "@/store/api/postsApi";
import SponsorAdsCarousel from "@/components/SponsorAdsCarousel";

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
    path: "/ang-services",
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
  const { data: ReelVideoes, isLoading } = useGetEntertainmentReelsQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // const { data: feedData = [] } = useGetExploreQuery();
  const feedData: any[] = [];
  // const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>(
  //   {},
  // );

  // const toggleExpand = (postId: string) => {
  //   setExpandedPosts((prev) => ({
  //     ...prev,
  //     [postId]: !prev[postId],
  //   }));
  // };

  return (
    <div className="w-full px-4 md:px-10 py-6 space-y-8 bg-background text-foreground">
      {/* Banner - gradient works in both modes */}

      {/* Search */}
      <div className="max-w-3xl flex gap-5 items-center justify-center mx-auto">
        <Input
          placeholder="Search services, people, jobs, products..."
          className="h-12 rounded-full px-6 bg-background border-input focus-visible:ring-ring"
        />
        <CreateMenu />
      </div>

      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-6 
          gap-4
        "
      >
        {sections.map((item) => (
          <Card
            key={item.title}
            className="overflow-hidden cursor-pointer hover:shadow-md transition-all border-border bg-card rounded-lg m-0 p-0"
            onClick={() => navigate(item.path)}
          >
            {/* Title - tight padding, no bottom margin */}
            <div className="bg-red-600 dark:bg-red-700 text-white text-center py-2 font-semibold text-sm m-0 border-b border-red-800/30">
              {item.title}
            </div>

            {/* Image area - no extra space */}
            <CardContent className="p-0 m-0">
              <div className="relative w-full aspect-[4/3]">
                {" "}
                {/* 4:3 ya 3:4 ratio – adjust kar sakte ho */}
                {/* Skeleton - pehle se dikhega */}
                <Skeleton className="absolute inset-0 w-full h-full bg-muted animate-pulse" />
                {/* Image - load hone pe fade in, skeleton cover karega */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="
            absolute inset-0 w-full h-full
            object-cover transition-transform duration-300
            hover:scale-105
            opacity-0 data-[loaded=true]:opacity-100 transition-opacity duration-400
            m-0 p-0 block
          "
                  loading="lazy"
                  draggable={false}
                  data-loaded="false"
                  onLoad={(e) => {
                    e.currentTarget.dataset.loaded = "true";
                  }}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/400x300?text=Image+Not+Found";
                    e.currentTarget.dataset.loaded = "true";
                  }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ReelCarousel stories={ReelVideoes} />

      <FriendSuggestion />
      <SponsorAdsCarousel />

      {/* Feed */}
      <div className="mx-auto">
        <div>
          <MasonryFeed posts={feedData} />
        </div>
        <div className="text-center py-6">
          <Button
            variant="ghost"
            className="text-primary hover:text-primary/80 hover:bg-primary/5"
            onClick={() => navigate("/mlife")}
          >
            See More →
          </Button>
        </div>
      </div>
    </div>
  );
}
