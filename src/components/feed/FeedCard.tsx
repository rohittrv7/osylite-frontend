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
import { PreviewModal } from "../PreviewModal";
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
  // 1. Changed: Store refs in a map for multiple videos
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  // Track which video was last played to resume it
  const lastPlayedVideoUrl = useRef<string | null>(null);

  /** ---------------- Local Optimistic State ---------------- */
  const [liked, setLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [viewsCount, setViewsCount] = useState(post.viewsCount);

  /** ---------------- RTK Mutations ---------------- */
  const [toggleLike, { isLoading: liking }] = useToggleLikeMutation();
  const [incrementView] = useIncrementViewMutation();
  const [incrementShare] = useIncrementShareMutation();

  /** ---------------- Comment State ---------------- */
  const [commentText, setCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  /** ---------------- Preview ---------------- */
  const [preview, setPreview] = useState<{
    open: boolean;
    url: string;
    type: "image" | "video";
  }>({
    open: false,
    url: "",
    type: "image",
  });

  /** ---------------- Data Normalization ---------------- */
  // Ensure fileUrls is always an array
  const mediaUrls = Array.isArray(post.fileUrl) ? post.fileUrl : [post.fileUrl];

  /** ---------------- Helpers ---------------- */
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

  /** ---------------- Handlers ---------------- */
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

  const openPreview = (url: string, type: "image" | "video") => {
    // Pause all videos
    Object.values(videoRefs.current).forEach((video) => video?.pause());

    // Remember which video was clicked so we can maybe resume it (optional logic)
    if (type === "video") {
      lastPlayedVideoUrl.current = url;
    }

    incrementViewOnce();
    setPreview({ open: true, url, type });
  };

  const closePreview = () => {
    setPreview((p) => ({ ...p, open: false }));

    // 2. Fixed: Resume logic added back
    if (
      lastPlayedVideoUrl.current &&
      videoRefs.current[lastPlayedVideoUrl.current]
    ) {
      videoRefs.current[lastPlayedVideoUrl.current]?.play().catch(() => {});
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    setIsCommenting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 500));
    setCommentText("");
    setIsCommenting(false);
  };

  /** ---------------- Render Media Item ---------------- */
  const renderMediaItem = (url: string, index: number) => {
    const isVid = isVideo(url);

    if (isVid) {
      return (
        <div
          className="relative cursor-pointer w-full aspect-square bg-black"
          onClick={() => openPreview(url, "video")}
        >
          <video
            ref={(el) => {
              videoRefs.current[url] = el;
            }}
            src={url}
            // Fix 2: Convert 'null' to 'undefined' using the || operator
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
        className="cursor-pointer w-full aspect-square overflow-hidden bg-muted"
        onClick={() => openPreview(url, "image")}
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
      <Card className="mb-4 overflow-hidden border-border/50">
        {/* HEADER */}
        <CardHeader
          className="p-3 cursor-pointer"
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

        {/* MEDIA CAROUSEL OR SINGLE ITEM */}
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
              {/* Navigation Arrows */}
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />

              {/* Dots Indicator */}
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
            // Single Item Render
            mediaUrls.map((url, index) => (
              <div key={`${post.id}-single-${index}`}>
                {renderMediaItem(url, index)}
              </div>
            ))
          )}
        </div>

        {/* CONTENT & ACTIONS */}
        <CardContent className="p-3 space-y-3">
          {/* Title / Caption */}
          {(post.title || post.caption) && (
            <div className="space-y-1">
              {post.title && (
                <h3 className="font-semibold text-sm">{post.title}</h3>
              )}
              {post.caption && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.caption}
                </p>
              )}
            </div>
          )}

          {/* ACTION BUTTONS & STATS */}
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

          {/* COMMENT INPUT */}
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

      <PreviewModal
        open={preview.open}
        onClose={closePreview}
        url={preview.url}
        type={preview.type}
      />
    </>
  );
};

export default FeedCard;
