import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Eye, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SponsorAdsCarousel from "@/components/SponsorAdsCarousel";
import { Skeleton } from "@/components/ui/skeleton";

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

const feedData = [
  {
    title: "Nararani Trade Convention",
    subtitle: "Live on Anggrowth & Youtube",
    datePlace: "28-31 Dec 2024 • PLACE: Gandhi Maidan Patna Bihar",
    tags: "•Fooding •Award •Meet •Trade •Celebration",
    description: "Nararani Trade Convention is organizing an event",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=compress&cs=tinysrgb&w=800", // replace with real
    isVideo: false,
    buttons: ["Post", "Enquiry"],
  },
  {
    title: "Dance Performance",
    subtitle: "Presented by a student in the school event",
    description:
      "A Dance Performance Presented by a student in the school event",
    image:
      "https://images.unsplash.com/photo-1547157283-087711e7858f?auto=compress&cs=tinysrgb&w=800", // replace
    isVideo: true,
    buttons: ["Post"],
  },
  {
    title: "Motivational Video",
    description: "Motivational Video",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=compress&cs=tinysrgb&w=800", // replace
    isVideo: true,
    statsOnly: true,
    buttons: ["Post"],
  },
  {
    title: "Dance Performance",
    subtitle: "Presented by a student in the school event",
    description:
      "A Dance Performance Presented by a student in the school event",
    image:
      "https://images.unsplash.com/photo-1547157283-087711e7858f?auto=compress&cs=tinysrgb&w=800", // replace
    isVideo: true,
    buttons: ["Post"],
  },
  {
    title: "Motivational Video",
    description: "Motivational Video",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=compress&cs=tinysrgb&w=800", // replace
    isVideo: true,
    statsOnly: true,
    buttons: ["Post"],
  },
  {
    title: "Dance Performance",
    subtitle: "Presented by a student in the school event",
    description:
      "A Dance Performance Presented by a student in the school event",
    image:
      "https://images.unsplash.com/photo-1547157283-087711e7858f?auto=compress&cs=tinysrgb&w=800", // replace
    isVideo: true,
    buttons: ["Post"],
  },
];

export default function HomeSections() {
  const navigate = useNavigate();

  return (
    <div className="w-full px-4 md:px-10 py-6 space-y-8 bg-background text-foreground">
      {/* Banner - gradient works in both modes */}
      <div className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-orange-600 dark:to-yellow-600 text-white text-center py-3 font-medium shadow-sm">
        Our official mobile app is now live!{" "}
        <span className="underline cursor-pointer hover:opacity-90 transition-opacity">
          Download Now →
        </span>
      </div>

      {/* Search */}
      <div className="max-w-3xl mx-auto">
        <Input
          placeholder="Search services, people, jobs, products..."
          className="h-12 rounded-full px-6 bg-background border-input focus-visible:ring-ring"
        />
      </div>

      {/* Sections Grid */}
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
      <div className="relative w-full aspect-[4/3]"> {/* 4:3 ya 3:4 ratio – adjust kar sakte ho */}
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
            e.currentTarget.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
            e.currentTarget.dataset.loaded = "true";
          }}
        />
      </div>
    </CardContent>
  </Card>
))}
      </div>

      {/* Horizontal scroll icons */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-muted/30">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="min-w-[64px] h-16 rounded-full bg-muted/50 dark:bg-muted/30 flex items-center justify-center border border-border/50"
          >
            <img
              src="/icons/sample.png"
              className="w-6 h-6 opacity-70 dark:opacity-60"
              alt="icon"
            />
          </div>
        ))}
      </div>

      {/* sponser ads */}
      <SponsorAdsCarousel />

      {/* Feed */}
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {feedData.map((post, idx) => (
            <Card
              key={idx}
              className="overflow-hidden flex flex-col bg-card border-border shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <CardHeader className="flex flex-row items-center gap-2.5 px-3 py-2.5">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  A
                </div>
                <div>
                  <CardTitle className="text-base">ANG Growth</CardTitle>
                  <p className="text-xs text-muted-foreground">Business</p>
                </div>
              </CardHeader>

              {/* Media */}
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title || "Post media"}
                  className="w-full h-auto aspect-video object-cover"
                />
                {post.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[10px] border-l-white border-t-6 border-t-transparent border-b-6 border-b-transparent ml-1" />
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <CardContent className="px-3 py-3 flex flex-col gap-2.5 text-sm">
                {post.title && (
                  <h4 className="font-medium text-base leading-tight">
                    {post.title}
                  </h4>
                )}
                {post.subtitle && (
                  <p className="text-xs text-muted-foreground">
                    {post.subtitle}
                  </p>
                )}
                {post.datePlace && (
                  <p className="text-xs text-muted-foreground">
                    {post.datePlace}
                  </p>
                )}
                {post.tags && (
                  <p className="text-xs text-primary">{post.tags}</p>
                )}
                <p className="text-muted-foreground leading-relaxed line-clamp-3">
                  {post.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> 100
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" /> 0
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" /> 0
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </div>
                </div>

                {/* Comment */}
                <div className="relative">
                  <Input
                    placeholder="Write Your Comment"
                    className="h-9 bg-background border-input text-sm pr-10"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-sm">
                    ✎
                  </button>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 mt-1">
                  {post.buttons.map((btn, i) => (
                    <Button
                      key={i}
                      variant={i === 0 ? "default" : "outline"}
                      size="sm"
                      className="flex-1 text-sm"
                    >
                      {btn}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* See More */}
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
