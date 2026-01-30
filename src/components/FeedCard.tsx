import { useRef, useState } from "react";
import {
  Eye,
  Heart,
  Loader2,
  MessageCircle,
  Send,
  Share2,
  Play,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  useAddCommentMutation,
  useToggleLikeMutation,
  useIncrementViewMutation,
  useIncrementShareMutation,
} from "@/store/api/postsApi";
import { PreviewModal } from "./PreviewModal";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";
import type { ExplorePost } from "@/types/post";
import { useNavigate } from "react-router-dom";

interface FeedCardProps {
  post: ExplorePost;
}

const FeedCard = ({ post }: FeedCardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const feedVideoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();

  /** ---------------- States ---------------- */
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentText, setCommentText] = useState("");

  // Optimistic UI States
  const [liked, setLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [viewsCount, setViewsCount] = useState(post.viewsCount);

  /** ---------------- RTK Mutations ---------------- */
  const [addComment, { isLoading: isCommenting }] = useAddCommentMutation();
  const [toggleLike, { isLoading: isLiking }] = useToggleLikeMutation();
  const [incrementView] = useIncrementViewMutation();
  const [incrementShare] = useIncrementShareMutation();

  const [preview, setPreview] = useState<{
    open: boolean;
    url: string;
    type: "image" | "video";
  }>({
    open: false,
    url: "",
    type: "image",
  });

  /** ---------------- Helpers ---------------- */
  const formatCount = (num: number): string => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num.toString();
  };

  /** ---------------- Handlers ---------------- */
  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiking) return;

    // Optimistic Update
    const previousLiked = liked;
    setLiked(!liked);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));

    try {
      await toggleLike(post.id).unwrap();
    } catch (err) {
      // Rollback on failure
      setLiked(previousLiked);
      setLikesCount((prev) => (previousLiked ? prev : prev - 1));
      apiErrorToastHandler(err);
    }
  };

  const hasViewedRef = useRef(false);
  const incrementViewOnce = async () => {
    if (hasViewedRef.current || post.isAd) return;
    hasViewedRef.current = true;

    setViewsCount((prev) => prev + 1);
    try {
      await incrementView({ postId: post.id }).unwrap();
    } catch (err) {
      console.error("View count failed", err);
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await incrementShare({ postId: post.id }).unwrap();
      // Yahan aap window.navigator.share bhi call kar sakte hain
    } catch (err) {
      apiErrorToastHandler(err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    try {
      await addComment({
        postId: post.id,
        text: commentText,
      }).unwrap();
      setCommentText("");
      inputRef.current?.blur();
    } catch (err) {
      apiErrorToastHandler(err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  const openPreview = (url: string, type: "image" | "video") => {
    if (feedVideoRef.current) feedVideoRef.current.pause();
    incrementViewOnce();
    setPreview({ open: true, url, type });
  };

  const closePreview = () => {
    setPreview((p) => ({ ...p, open: false }));
    if (feedVideoRef.current) feedVideoRef.current.play().catch(() => {});
  };

  return (
    <>
      <Card
        className={cn(
          "overflow-hidden flex flex-col mb-4 break-inside-avoid",
          post.isAd &&
            "border-yellow-500/40 bg-yellow-50/40 dark:bg-yellow-950/20",
        )}
      >
        <CardHeader
          className="flex flex-row items-center gap-3 px-3 cursor-pointer"
          onClick={() => navigate(`/profile/${post.channel.user.id}`)}
        >
          <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center font-semibold text-sm shrink-0">
            {post.channel.logoUrl ? (
              <img
                src={post.channel.logoUrl}
                alt={post.channel.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              post.channel.name.charAt(0).toUpperCase()
            )}
          </div>
          <div className="leading-tight min-w-0 flex items-center gap-2">
            <div className="min-w-0">
              <CardTitle className="text-sm font-semibold truncate">
                {post.channel.name}
              </CardTitle>
              <p className="text-xs text-muted-foreground truncate">
                @{post.channel.handle}
              </p>
            </div>
            {post.isAd && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 font-medium">
                Sponsored
              </span>
            )}
          </div>
        </CardHeader>

        <div
          className="relative w-full cursor-pointer"
          onClick={() =>
            openPreview(
              post.fileUrl,
              post.type === "video" || post.type === "reel" ? "video" : "image",
            )
          }
        >
          {post.isAd && (
            <div className="absolute top-2 left-2 z-10 bg-black/70 text-background text-[10px] px-2 py-0.5 rounded">
              Ad
            </div>
          )}

          {post.type === "video" || post.type === "reel" ? (
            <div className="relative aspect-video bg-black flex items-center">
              <video
                src={post.fileUrl}
                ref={feedVideoRef}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/10">
                <Play className="w-10 h-10 text-white/80" />
              </div>
            </div>
          ) : (
            <img
              src={post.fileUrl}
              alt={post.title || "Post"}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          )}
        </div>

        <CardContent className="px-3 py-3 space-y-3 text-sm">
          {post.title && (
            <h4 className="font-semibold leading-snug">{post.title}</h4>
          )}
          {post.caption && (
            <p className="text-muted-foreground text-xs italic">
              {post.caption}
            </p>
          )}

          {post.description && (
            <div className="space-y-1">
              <p
                className={cn(
                  "text-muted-foreground leading-relaxed transition-all duration-200",
                  !isExpanded && "line-clamp-2 text-xs",
                )}
              >
                {post.description}
              </p>
              {post.description.length > 100 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                  }}
                  className="text-[10px] font-bold text-primary hover:underline"
                >
                  {isExpanded ? "SHOW LESS" : "SHOW MORE"}
                </button>
              )}
            </div>
          )}

          {/* Interaction Bar */}
          <div className="flex items-center gap-6 py-1 text-xs text-muted-foreground border-y border-border/40 my-2">
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              {formatCount(viewsCount)}
            </span>

            <button
              onClick={handleLike}
              className={cn(
                "flex items-center gap-1.5 transition-colors",
                liked && "text-red-500",
              )}
            >
              <Heart className={cn("w-4 h-4", liked && "fill-current")} />
              {formatCount(likesCount)}
            </button>

            <span className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4" />
              {formatCount(post.commentsCount ?? 0)}
            </span>

            <button
              onClick={handleShare}
              className="hover:text-primary transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {!post.isAd && (
            <div className="relative w-full">
              <Input
                ref={inputRef}
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isCommenting}
                className="pr-12 h-10 text-xs focus-visible:ring-primary"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                disabled={!commentText.trim() || isCommenting}
                onClick={handleCommentSubmit}
              >
                {isCommenting ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Send className="h-3 w-3" />
                )}
              </Button>
            </div>
          )}

          <div className="flex items-center w-full justify-between gap-2">
            <Button
              size="sm"
              variant="outline"
              className="px-5 py-2 cursor-pointer text-xs border-green-500/50 text-green-600 hover:bg-green-50"
              onClick={() => navigate(`/mchat?userId=${post.channel.user.id}`)}
            >
              MChat
            </Button>
            {post.isEnquiryPost && (
              <Button
                size="sm"
                variant="default"
                className="px-5 py-2 text-xs bg-green-600 hover:bg-green-700 cursor-pointer"
                onClick={() => console.log("Enquiry Post:", post.id)}
              >
                {post.ctaLabel || "Enquiry"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <PreviewModal
        open={preview.open}
        url={preview.url}
        type={preview.type}
        onClose={closePreview}
      />
    </>
  );
};

export default FeedCard;
