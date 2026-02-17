import { useRef, useState } from "react";
import {
  Eye,
  Heart,
  Loader2,
  MessageCircle,
  Play,
  Send,
  Share2,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";
import {
  useIncrementShareMutation,
  useIncrementViewMutation,
  useToggleLikeMutation,
} from "@/store/api/postsApi";
import type { ExplorePost } from "@/types/feed";

interface FeedCardProps {
  post: ExplorePost;
}

const FeedCard = ({ post }: FeedCardProps) => {
  const navigate = useNavigate();
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const lastPlayedVideoUrl = useRef<string | null>(null);

  const [liked, setLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [viewsCount, setViewsCount] = useState(post.viewsCount);

  const [toggleLike, { isLoading: liking }] = useToggleLikeMutation();
  const [incrementView] = useIncrementViewMutation();
  const [incrementShare] = useIncrementShareMutation();

  const [commentText, setCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);
  /** ---------------- Preview State (Fixed) ---------------- */
  // const [preview, setPreview] = useState<{
  //   open: boolean;
  //   urls: string[]; // Changed from url to urls
  //   type: "image" | "video";
  // }>({
  //   open: false,
  //   urls: [],
  //   type: "image",
  // });

  const mediaUrls = Array.isArray(post.fileUrl) ? post.fileUrl : [post.fileUrl];

  const formatCount = (num: number): string => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num.toString();
  };

  const isVideo = (url: string) => {
    return (
      post.type === "video" ||
      post.type === "reel" ||
      url.endsWith(".mp4") ||
      url.endsWith(".webm")
    );
  };

  const handleLike = async () => {
    if (liking) return;
    setLiked((prev) => !prev);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
    try {
      await toggleLike(post.id).unwrap();
    } catch (err) {
      apiErrorToastHandler(err || "Failed to like post");
      setLiked((prev) => !prev);
      setLikesCount((prev) => (liked ? prev + 1 : prev - 1));
    }
  };

  const hasViewedRef = useRef(false);
  const incrementViewOnce = async () => {
    if (hasViewedRef.current) return;
    hasViewedRef.current = true;
    setViewsCount((v) => v + 1);
    try {
      await incrementView({ postId: post.id });
    } catch (err) {
      apiErrorToastHandler(err || "Failed to increment view count");
    }
  };

  const handleShare = async () => {
    try {
      await incrementShare({ postId: post.id });
    } catch (err) {
      apiErrorToastHandler(err || "Failed to share");
    }
  };

  /** ---------------- Open Preview (Fixed) ---------------- */
  const openPreview = (currentUrl: string, type: "post" | "video") => {
    Object.values(videoRefs.current).forEach((video) => video?.pause());

    if (type === "video") {
      lastPlayedVideoUrl.current = currentUrl;
    }

    incrementViewOnce();
    // setPreview({ open: true, urls: allUrls, type });
  };

  // const closePreview = () => {
  //   setPreview((p) => ({ ...p, open: false }));
  //   if (
  //     lastPlayedVideoUrl.current &&
  //     videoRefs.current[lastPlayedVideoUrl.current]
  //   ) {
  //     videoRefs.current[lastPlayedVideoUrl.current]?.play().catch(() => {});
  //   }
  // };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    setIsCommenting(true);
    await new Promise((r) => setTimeout(r, 500));
    setCommentText("");
    setIsCommenting(false);
  };

  const renderMediaItem = (url: string, index: number) => {
    const isVid = isVideo(url);

    if (isVid) {
      return (
        <div
          className="relative w-full aspect-square bg-black"
          onClick={() => openPreview(url, "video")}
        >
          <video
            ref={(el) => {
              videoRefs.current[url] = el;
            }}
            src={url}
            poster={index === 0 ? post.thumbnailUrl || undefined : undefined}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all">
            <Play className="w-10 h-10 text-white opacity-80" />
          </div>
        </div>
      );
    }

    return (
      <div
        className="w-full aspect-square overflow-hidden bg-muted"
        onClick={() => openPreview(url, "post")}
      >
        <img
          src={url}
          alt={`Post content ${index + 1}`}
          className="w-full h-full object-cover"
        />
      </div>
    );
  };

  return (
    <>
      <Card className="mb-4 p-0 gap-0 overflow-hidden border-border/50">
        <CardHeader
          className="p-3 m-0 cursor-pointer"
          onClick={() => navigate(`/profile/${post.channel.user.id}`)}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
              {post.channel.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{post.channel.name}</p>
              <p className="text-xs text-muted-foreground">
                @{post.channel.handle}
              </p>
            </div>
          </div>
        </CardHeader>

        <div className="w-full">
          {mediaUrls.length > 1 ? (
            <Carousel className="w-full">
              <CarouselContent>
                {mediaUrls.map((url, index) => (
                  <CarouselItem key={`${post.id}-media-${index}`}>
                    {renderMediaItem(url, index)}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
                {mediaUrls.map((_, idx) => (
                  <div
                    key={idx}
                    className="w-1.5 h-1.5 rounded-full bg-white/50 shadow-sm"
                  />
                ))}
              </div>
            </Carousel>
          ) : (
            mediaUrls.map((url, index) => (
              <div key={`${post.id}-single-${index}`}>
                {renderMediaItem(url, index)}
              </div>
            ))
          )}
        </div>

        <CardContent className="p-3 space-y-3">
          {(post.title || post.caption) && (
            <div className="space-y-1">
              {post.title && (
                <h3 className="font-semibold text-sm">{post.title}</h3>
              )}

              {post.caption && (
                <div className="relative">
                  <p
                    className={cn(
                      "text-sm text-muted-foreground transition-all duration-300",
                      !isExpanded && "line-clamp-2",
                    )}
                  >
                    {post.caption}
                  </p>

                  {/* Button tabhi dikhayenge jab caption ki length kaafi ho (e.g. 100 chars) */}
                  {post.caption.length > 100 && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-xs font-bold text-primary hover:underline mt-1 block transition-colors"
                    >
                      {isExpanded ? "See Less" : "See More"}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4 text-muted-foreground">
              <button
                onClick={handleLike}
                className={cn(
                  "flex items-center gap-1.5 text-sm transition-colors hover:text-red-500",
                  liked && "text-red-500",
                )}
              >
                <Heart className={cn("w-5 h-5", liked && "fill-current")} />
                <span>{formatCount(likesCount)}</span>
              </button>
              <button className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>{formatCount(post.commentsCount ?? 0)}</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Eye className="w-3.5 h-3.5" />
              <span>{formatCount(viewsCount)} views</span>
            </div>
          </div>

          <div className="relative flex items-center gap-2 pt-1">
            <Input
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              disabled={isCommenting}
              className="h-9 text-sm pr-9"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-0 h-9 w-9 text-muted-foreground hover:text-primary"
              onClick={handleCommentSubmit}
              disabled={!commentText.trim() || isCommenting}
            >
              {isCommenting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default FeedCard;
