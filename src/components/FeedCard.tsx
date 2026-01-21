import { useRef, useState } from "react";
import { Eye, Heart, Loader2, MessageCircle, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAddCommentMutation } from "@/store/api/postsApi";
import { PreviewModal } from "./PreviewModal";
import type { ExplorePost } from "@/types/post";
import { useNavigate } from "react-router-dom";

interface FeedCardProps {
  post: ExplorePost;
}

const FeedCard = ({ post }: FeedCardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const feedVideoRef = useRef<HTMLVideoElement | null>(null);

  const navigate = useNavigate();

  const goToProfile = () => {
    navigate(`/profile/${post.channel.user.id}`);
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const description = post.description ?? "";
  const [commentText, setCommentText] = useState("");

  const [addComment, { isLoading: isCommenting }] = useAddCommentMutation();

  const [preview, setPreview] = useState<{
    open: boolean;
    url: string;
    type: "image" | "video";
  }>({
    open: false,
    url: "",
    type: "image",
  });

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
      console.error("Failed to comment:", err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  const openPreview = (url: string, type: "image" | "video") => {
    if (feedVideoRef.current) {
      feedVideoRef.current.pause();
    }
    setPreview({ open: true, url, type });
  };

  const closePreview = () => {
    setPreview((p) => ({ ...p, open: false }));
    if (feedVideoRef.current) {
      feedVideoRef.current.play().catch(() => {});
    }
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
          onClick={goToProfile}
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
            <div className="absolute top-2 left-2 z-10 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">
              Ad
            </div>
          )}

          {post.type === "video" || post.type === "reel" ? (
            <>
              <video
                src={post.fileUrl}
                ref={feedVideoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-auto object-cover bg-black"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-black/40 rounded-full p-3 text-white">▶</div>
              </div>
            </>
          ) : (
            <img
              src={post.fileUrl}
              alt={post.title || "Post"}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          )}
        </div>

        <CardContent className="px-3 py-3 space-y-2 text-sm">
          {post.title && (
            <h4 className="font-semibold leading-snug">{post.title}</h4>
          )}

          {post.caption && (
            <p className="text-muted-foreground text-xs">{post.caption}</p>
          )}

          {description && (
            <>
              <p
                className={cn(
                  "text-muted-foreground leading-relaxed transition-all duration-200",
                  !isExpanded && "line-clamp-3",
                )}
              >
                {description}
              </p>

              {description.length > 120 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  {isExpanded ? "See less" : "See more"}
                </button>
              )}
            </>
          )}

          <div className="flex items-center gap-5 pt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {post.viewsCount}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5" />
              {post.likesCount}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" />
              {post.commentsCount ?? 0}
            </span>
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
                className="pr-12 py-6"
              />

              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                disabled={!commentText.trim() || isCommenting}
                onClick={handleCommentSubmit}
              >
                {isCommenting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          )}

          {post.isEnquiryPost && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="border-green-500/90 text-green-600"
                onClick={() => console.log("Open Enquiry Form for:", post.id)}
              >
                MChat
              </Button>
              <Button
                variant="outline"
                className="border-green-600/70 text-green-600"
                onClick={() => console.log("Open Enquiry Form for:", post.id)}
              >
                {post.ctaLabel || "Enquiry Form"}
              </Button>
            </div>
          )}
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
