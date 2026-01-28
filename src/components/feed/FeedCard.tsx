import { useRef, useState } from "react";
import {
  Eye,
  Heart,
  Loader2,
  MessageCircle,
  Send,
  Play,
  Share2,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PreviewModal } from "../PreviewModal";

import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";
import {
  useIncrementShareMutation,
  useIncrementViewMutation,
  useToggleLikeMutation,
} from "@/store/api/postsApi";
import type { ExplorePost } from "@/types/feed";
import { useNavigate } from "react-router-dom";

interface FeedCardProps {
  post: ExplorePost;
}

const FeedCard = ({ post }: FeedCardProps) => {
  const navigate = useNavigate();
  const feedVideoRef = useRef<HTMLVideoElement>(null);

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

  /** ---------------- Helpers ---------------- */
  const formatCount = (num: number): string => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num.toString();
  };

  /** ---------------- Like Handler (Optimistic) ---------------- */
  const handleLike = async () => {
    if (liking) return;

    setLiked((prev) => !prev);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));

    try {
      await toggleLike(post.id).unwrap();
    } catch (err) {
      apiErrorToastHandler(err || "Failed to increment view count");
      setLiked((prev) => !prev);
      setLikesCount((prev) => (liked ? prev + 1 : prev - 1));
    }
  };

  /** ---------------- View Increment (once) ---------------- */
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

  /** ---------------- Share ---------------- */
  const handleShare = async () => {
    try {
      await incrementShare({ postId: post.id });
    } catch (err) {
      apiErrorToastHandler(err || "Failed to increment view count");
    }
  };

  /** ---------------- Preview ---------------- */
  const openPreview = (url: string, type: "image" | "video") => {
    if (feedVideoRef.current) {
      feedVideoRef.current.pause();
    }

    incrementViewOnce();
    setPreview({ open: true, url, type });
  };

  const closePreview = () => {
    setPreview((p) => ({ ...p, open: false }));
    if (feedVideoRef.current) {
      feedVideoRef.current.play().catch(() => {});
    }
  };

  /** ---------------- Comment Submit (UI Only) ---------------- */
  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    setIsCommenting(true);
    await new Promise((r) => setTimeout(r, 500));
    setCommentText("");
    setIsCommenting(false);
  };

  /** ---------------- UI ---------------- */
  return (
    <>
      <Card className="mb-4 overflow-hidden border-border/50">
        {/* HEADER */}
        <CardHeader
          className="p-3 pb-2"
          onClick={() => navigate(`/profile/${post.channel.user.id}`)}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
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

        {/* MEDIA */}
        <div
          className="relative cursor-pointer"
          onClick={() =>
            openPreview(
              post.fileUrl,
              post.type === "video" || post.type === "reel" ? "video" : "image",
            )
          }
        >
          {post.type === "video" || post.type === "reel" ? (
            <>
              <video
                ref={feedVideoRef}
                src={post.fileUrl}
                poster={post.thumbnailUrl ?? undefined}
                className="w-full object-cover"
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <Play className="w-10 h-10 text-white" />
              </div>
            </>
          ) : (
            <img src={post.fileUrl} className="w-full object-cover" />
          )}
        </div>

        {/* CONTENT */}
        <CardContent className="p-3 space-y-2">
          {post.title && (
            <h3 className="font-semibold text-sm">{post.title}</h3>
          )}

          {/* STATS */}
          <div className="flex gap-5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {formatCount(viewsCount)}
            </span>

            <button
              onClick={handleLike}
              className={cn(
                "flex items-center gap-1 transition",
                liked && "text-red-500",
              )}
            >
              <Heart className={cn("w-4 h-4", liked && "fill-red-500")} />
              {formatCount(likesCount)}
            </button>

            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {formatCount(post.commentsCount ?? 0)}
            </span>

            <button onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* COMMENT */}
          {/* {!post.isAd && ()} */}
          <div className="relative">
            <Input
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              disabled={isCommenting}
              className="pr-10 text-sm"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2"
              onClick={handleCommentSubmit}
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
