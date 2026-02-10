import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Heart,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Share2,
  IndianRupee,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ExplorePost } from "@/types/feed";
import {
  useAddCommentMutation,
  useGetCommentsQuery,
  useToggleLikeMutation,
} from "@/store/api/postsApi";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PostModalProps {
  post: ExplorePost | null;
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

const formatTimeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return `${Math.floor(seconds / 604800)}w ago`;
};

export const PostModal = ({
  post,
  isOpen,
  onClose,
  initialIndex = 0,
}: PostModalProps) => {
  const navigate = useNavigate();
  // --- STATES ---
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [commentText, setCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile();

  // --- API HOOKS ---
  const { data: comments = [] } = useGetCommentsQuery(post?.id ?? "", {
    skip: !post || !isOpen,
  });

  const [addComment, { isLoading: isPosting }] = useAddCommentMutation();
  const [toggleLike] = useToggleLikeMutation();

  // --- EFFECTS ---
  useEffect(() => {
    if (isOpen && post) {
      setCurrentIndex(initialIndex);
      setIsLiked(post.isLiked ?? false);
      setLikesCount(post.likesCount);
    }
  }, [isOpen, post, initialIndex]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = isMuted;
      if (isPlaying) videoRef.current.play().catch(() => {});
    }
  }, [currentIndex, isPlaying, isMuted]);

  if (!post) return null;

  // --- DATA PREP ---
  const mediaList = [post.fileUrl];
  const currentUrl = mediaList[currentIndex] ?? "";

  const isVideo =
    /\.(mp4|webm|mov|m4v)$/i.test(currentUrl) ||
    post.type === "video" ||
    post.type === "reel";

  // --- HANDLERS ---
  const handleNext = () =>
    currentIndex < mediaList.length - 1 && setCurrentIndex((i) => i + 1);
  const handlePrev = () => currentIndex > 0 && setCurrentIndex((i) => i - 1);

  const handleLike = async () => {
    const previousState = isLiked;
    setIsLiked(!isLiked);
    setLikesCount((c) => (!isLiked ? c + 1 : c - 1));

    if (!isLiked) {
      setShowLikeAnimation(true);
      setTimeout(() => setShowLikeAnimation(false), 600);
    }

    try {
      await toggleLike(post.id).unwrap();
    } catch (error) {
      setIsLiked(previousState);
      setLikesCount((c) => (previousState ? c + 1 : c - 1));
      apiErrorToastHandler(error);
    }
  };

  const handleDoubleClick = () => {
    if (!isLiked) {
      handleLike();
    }
    setShowLikeAnimation(true);
    setTimeout(() => setShowLikeAnimation(false), 600);
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;

    try {
      await addComment({ postId: post.id, text: commentText }).unwrap();
      setCommentText("");
    } catch (error) {
      apiErrorToastHandler(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleComment();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] lg:max-w-6xl w-full h-[95vh] sm:h-[90vh] p-0 border-0 rounded-2xl overflow-hidden bg-modal shadow-2xl shadow-black/50 flex flex-col md:flex-row animate-scale-in">
        <DialogTitle className="sr-only">Post View</DialogTitle>

        {/* --- LEFT: Media Section (Takes remaining space) --- */}
        <div
          className="relative flex-1 bg-black flex items-center justify-center overflow-hidden group min-h-[40vh] md:min-h-full"
          onDoubleClick={handleDoubleClick}
        >
          {/* Mobile close button */}
          {isMobile && (
            <button
              onClick={onClose}
              className="md:hidden absolute top-4 left-4 z-30 glass-surface rounded-full p-2.5 text-white hover:bg-black/90 transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          )}

          {/* Navigation arrows */}
          {mediaList.length > 1 && (
            <>
              {currentIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 glass-surface hover:bg-modal-surface p-2.5 rounded-full text-modal-text opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
              )}
              {currentIndex < mediaList.length - 1 && (
                <button
                  onClick={handleNext}
                  className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 glass-surface hover:bg-modal-surface p-2.5 rounded-full text-modal-text opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              )}
              {/* Dots indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                {mediaList.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      i === currentIndex
                        ? "bg-white w-6"
                        : "bg-white/30 w-2 hover:bg-white/50",
                    )}
                  />
                ))}
              </div>
            </>
          )}

          {/* Media container */}
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            {isVideo ? (
              <video
                ref={videoRef}
                src={currentUrl}
                className="max-w-full max-h-full object-contain"
                loop
                playsInline
                muted={isMuted}
                autoPlay
              />
            ) : (
              <img
                src={currentUrl}
                alt="Post"
                className="max-w-full max-h-full object-contain select-none transition-transform duration-300"
                draggable={false}
              />
            )}

            {/* Double-tap like animation */}
            {showLikeAnimation && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Heart
                  className="h-24 w-24 fill-white text-white animate-heart drop-shadow-2xl"
                  strokeWidth={1}
                />
              </div>
            )}

            {/* Video controls */}
            {isVideo && (
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying((p) => !p);
                    if (videoRef.current)
                      isPlaying
                        ? videoRef.current.pause()
                        : videoRef.current.play();
                  }}
                  className="glass-surface text-white p-3 rounded-full hover:bg-black/90 transition-all hover:scale-110"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5 ml-0.5" />
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted((m) => !m);
                  }}
                  className="glass-surface text-white p-3 rounded-full hover:bg-black/90 transition-all hover:scale-110"
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* --- RIGHT: Info & Comments Panel (Fixed Width on Desktop) --- */}
        <div className="w-full md:w-[380px] lg:w-[420px] bg-white dark:bg-zinc-950 flex flex-col h-[50vh] md:h-full border-l border-modal-border">
          {/* 1. Header (Fixed) */}
          <div className="flex shrink-0 items-center justify-between px-4 pr-16 py-3.5 border-b border-modal-border">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate(`/profile/${post.channel.user.id}`)}
            >
              <Avatar className="h-10 w-10 ring-2 ring-modal-border ring-offset-2 ring-offset-modal-surface">
                <AvatarImage
                  src={post.channel?.logoUrl || ""}
                  alt={post.channel?.name}
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold text-sm">
                  {post.channel?.name?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="leading-tight">
                <p className="font-semibold text-modal-text text-sm">
                  {post.channel?.name || "Unknown"}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {post.location || "Location"}
                </p>
              </div>
            </div>

            {/* Price Badge in Header for visibility */}
            {post.price && (
              <div className="flex items-center text-primary font-bold bg-primary/10 px-2 py-1 rounded">
                <IndianRupee className="w-3.5 h-3.5" />
                <span>{post.price}</span>
              </div>
            )}
          </div>

          {/* 2. Scrollable Area (Description + Comments) */}
          <ScrollArea className="flex-1 px-4 overflow-y-auto">
            <div className="py-4 space-y-5">
              {/* --- Post Description Section (Moved Inside ScrollArea) --- */}
              <div className="space-y-2 border-b pb-4">
                {post.title && (
                  <h3 className="font-bold text-lg leading-tight">
                    {post.title}
                  </h3>
                )}

                {post.description && (
                  <div className="text-sm text-modal-text/90 whitespace-pre-wrap leading-relaxed">
                    <span className={cn(!isExpanded && "line-clamp-4")}>
                      {post.description}
                    </span>
                    {post.description.length > 150 && (
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-xs font-semibold text-primary hover:underline ml-1"
                      >
                        {isExpanded ? "Show less" : "Read more"}
                      </button>
                    )}
                  </div>
                )}
                <div className="text-xs text-muted-foreground pt-1">
                  Posted {formatTimeAgo(post.createdAt)}
                </div>
              </div>

              {/* --- Comments Section --- */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-muted-foreground">
                  Comments
                </h4>
                {comments.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                    <MessageCircle
                      className="h-10 w-10 mb-2 opacity-30"
                      strokeWidth={1}
                    />
                    <p className="text-sm">No comments yet</p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 group">
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarImage src={comment.user.avatarUrl} />
                        <AvatarFallback className="bg-gray-100 dark:bg-zinc-800 text-xs font-medium">
                          {comment.user.firstName?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-relaxed">
                          <span className="font-semibold text-modal-text mr-2">
                            {comment.user.firstName} {comment.user.lastName}
                          </span>
                          <span className="text-modal-text/90">
                            {comment.text}
                          </span>
                        </p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span>{formatTimeAgo(comment.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </ScrollArea>

          {/* 3. Footer (Actions + Input) - Fixed at bottom */}
          <div className="border-t border-modal-border bg-white dark:bg-zinc-950 shrink-0 z-10">
            {/* Social Actions */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={cn(
                    "transition-all duration-200 flex gap-1.5 items-center hover:scale-110 active:scale-95",
                    isLiked && "animate-heart",
                  )}
                >
                  <Heart
                    className={cn(
                      "h-6 w-6 transition-colors",
                      isLiked
                        ? "fill-red-500 text-red-500 stroke-red-500"
                        : "stroke-current hover:text-gray-500",
                    )}
                    strokeWidth={1.5}
                  />
                  {likesCount > 0 && (
                    <span className="text-sm font-medium">{likesCount}</span>
                  )}
                </button>
                <button className="hover:scale-110 transition-transform flex gap-1.5 items-center active:scale-95">
                  <MessageCircle
                    className="h-6 w-6 stroke-current hover:text-gray-500"
                    strokeWidth={1.5}
                  />
                  {comments.length > 0 && (
                    <span className="text-sm font-medium">
                      {comments.length}
                    </span>
                  )}
                </button>
                <button className="hover:scale-110 transition-transform active:scale-95">
                  <Share2
                    className="h-6 w-6 stroke-current hover:text-gray-500"
                    strokeWidth={1.5}
                  />
                </button>
              </div>
            </div>

            {/* Comment Input & CTA Buttons */}
            <div className="px-4 pb-4 space-y-3">
              <div className="flex items-center gap-3">
                <Input
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isPosting}
                  className="flex-1 bg-muted/30 border-0 h-10 text-sm focus-visible:ring-1"
                />
                <button
                  onClick={handleComment}
                  disabled={!commentText.trim() || isPosting}
                  className={cn(
                    "font-semibold text-sm transition-all",
                    commentText.trim()
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-blue-300 cursor-not-allowed",
                  )}
                >
                  {isPosting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Post"
                  )}
                </button>
              </div>

              {/* Action Buttons (CTA) */}
              {post.ctaLabel && post.ctaLabel.length > 0 && (
                <div className="flex gap-2 pt-1">
                  {post.ctaLabel.map((label) => (
                    <Button
                      key={label}
                      className="flex-1 cursor-pointer h-9 text-xs"
                      onClick={() =>
                        navigate(`/mchat?userId=${post.channel.user.id}`)
                      }
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;
