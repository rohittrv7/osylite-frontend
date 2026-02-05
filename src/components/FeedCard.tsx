import { useState } from "react";
import {
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Send,
  MessageSquare,
  IndianRupee,
  MapPin,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ExplorePost } from "@/types/feed";
import { MediaGrid } from "./ang-mart/MediaGrid";
import { PostModal } from "./ang-mart/PostModal";
import { useNavigate } from "react-router-dom";

interface FeedCardProps {
  post: ExplorePost;
  viewMode?: "grid" | "list";
}

const FeedCard = ({ post, viewMode = "grid" }: FeedCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [viewsCount, setViewsCount] = useState(post.viewsCount);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const navigate = useNavigate();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    initialIndex: number;
  }>({
    isOpen: false,
    initialIndex: 0,
  });

  const formatCount = (num: number): string => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num.toString();
  };

  const mediaList = [post.fileUrl];

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleMediaClick = (_url: string, index: number) => {
    setViewsCount((prev) => prev + 1);
    setModalState({ isOpen: true, initialIndex: index });
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    setCommentText("");
    setShowCommentInput(false);
  };

  return (
    <>
      <Card
        className={cn(
          "overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300 group bg-card",
          viewMode === "list" && "flex flex-row",
          post.isAd && "ring-1 ring-primary/20",
        )}
      >
        {/* Header */}
        <CardHeader className="px-3 py-0">
          <div className="flex items-center gap-2.5">
            <Avatar className="w-8 h-8 ring-2 ring-background">
              <AvatarImage
                src={post.channel.logoUrl || ""}
                alt={post.channel.name}
              />
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                {post.channel.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold truncate leading-tight">
                {post.channel.name}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                @{post.channel.handle}
              </p>
            </div>
          </div>
        </CardHeader>
        {/* Media Section */}
        <div
          className={cn(
            "relative overflow-hidden",
            viewMode === "list" ? "w-40 sm:w-48 shrink-0" : "w-full",
          )}
        >
          {post.isAd && (
            <Badge className="absolute top-3 left-3 z-10">Sponsored</Badge>
          )}

          <MediaGrid
            mediaUrls={mediaList}
            type={post.type}
            onMediaClick={handleMediaClick}
            // compact={viewMode === "list"}
          />
        </div>

        {/* Content Section */}
        <div
          className={cn(
            "flex flex-col flex-1",
            viewMode === "list" && "min-w-0",
          )}
        >
          <CardContent className="p-3 pt-2 flex flex-col gap-2.5">
            {/* Title & Description */}
            {post.title && (
              <div>
                <h2 className="flex gap-1 items-center">
                  <IndianRupee className="w-4 h-4" />
                  {post.price || 0}
                </h2>
                <h4 className="font-semibold text-sm leading-snug line-clamp-2">
                  {post.title ?? post.caption}
                  {post.description && (
                    <div className="space-y-0.5">
                      <p
                        className={cn(
                          "text-xs text-muted-foreground leading-relaxed transition-all",
                          !isExpanded && "line-clamp-2",
                        )}
                      >
                        {post.description}
                      </p>
                      {post.description.length > 80 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(!isExpanded);
                          }}
                          className="text-[10px] font-bold text-primary hover:underline"
                        >
                          {isExpanded ? "Show less" : "Show more"}
                        </button>
                      )}
                    </div>
                  )}
                  {/* {post.description} */}
                </h4>
                <h4 className="font-semibold flex gap-1 items-center text-accent-foreground text-sm leading-snug line-clamp-2">
                  <MapPin className="h-4 w-4" />
                  {post.location || ""}
                </h4>
              </div>
            )}

            {/* Stats Bar */}
            <div className="flex items-center gap-4 py-2 text-xs text-muted-foreground border-y">
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                {formatCount(viewsCount)}
              </span>
              <button
                onClick={handleLike}
                className={cn(
                  "flex items-center gap-1.5 transition-colors",
                  liked && "text-destructive",
                )}
              >
                <Heart className={cn("w-3.5 h-3.5", liked && "fill-current")} />
                {formatCount(likesCount)}
              </button>
              <button
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                onClick={() => setModalState({ isOpen: true, initialIndex: 0 })}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                {formatCount(post.commentsCount ?? 0)}
              </button>
              <button className="hover:text-foreground transition-colors ml-auto">
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Comment Section */}
            {showCommentInput && !post.isAd && (
              <div className="flex gap-2 animate-fade-in">
                <Input
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit()}
                  className="text-xs h-9 rounded-xl bg-muted/50 border-0 focus-visible:ring-1"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-9 w-9 rounded-xl shrink-0"
                  disabled={!commentText.trim()}
                  onClick={handleCommentSubmit}
                >
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {!post.isAd && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-1 h-9 rounded-xl text-xs gap-1.5 hover:bg-muted"
                  onClick={() => setShowCommentInput(!showCommentInput)}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Comment
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                className="flex-1 h-9 rounded-md text-xs border-primary/30 text-primary hover:bg-accent"
                onClick={() => navigate(`/mchat/${post.channel.user.id}`)}
              >
                MChat
              </Button>
              {post.isEnquiryPost && (
                <Button size="sm" className="flex-1 h-9 rounded-md text-xs">
                  {post.ctaLabel || "Enquiry"}
                </Button>
              )}
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Modal */}
      {modalState.isOpen && (
        <PostModal
          post={post}
          isOpen={modalState.isOpen}
          onClose={() => setModalState({ ...modalState, isOpen: false })}
          initialIndex={modalState.initialIndex}
        />
      )}
    </>
  );
};

export default FeedCard;
