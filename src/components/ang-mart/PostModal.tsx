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
  Phone,
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
import { Button } from "../ui/button";
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
  // 1. Fetch Comments
  const { data: comments = [] } = useGetCommentsQuery(post?.id ?? "", {
    skip: !post || !isOpen,
  });

  // 2. Mutations
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
    // Optimistic Update
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
      // Revert if API fails
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

        {/* Media Section */}
        <div
          className="relative flex-1 bg-black flex items-center justify-center overflow-hidden group"
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

        {/* Comments Panel */}
        <div className="w-full md:w-[380px] lg:w-[420px] bg-modal-surface flex flex-col border-l border-modal-border animate-slide-up md:animate-fade-in bg-white dark:bg-zinc-950">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-modal-border">
            <div className="flex items-center gap-3">
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
                <p className="text-xs text-muted-foreground">
                  {post.location || "Original Audio"}
                </p>
              </div>
            </div>
          </div>

          {/* Scrollable content */}
          <ScrollArea className="flex-1 min-h-0 px-4 overflow-y-auto">
            {/* Comments */}
            <div className="py-4 space-y-5">
              {comments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <MessageCircle
                    className="h-14 w-14 mb-4 opacity-30"
                    strokeWidth={1}
                  />
                  <p className="text-base font-medium">No comments yet</p>
                  <p className="text-sm opacity-70 mt-1">
                    Start the conversation
                  </p>
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
                      <div className="flex items-center gap-4 mt-1.5 text-xs text-muted-foreground">
                        <span>{formatTimeAgo(comment.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          {/* Actions & Input */}
          <div className="border-t border-modal-border bg-modal-surface">
            {/* Action buttons */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={cn(
                    "transition-all duration-200 flex gap-1 items-center justify-center hover:scale-110 active:scale-95",
                    isLiked && "animate-heart",
                  )}
                >
                  <Heart
                    className={cn(
                      "h-5 w-5 transition-colors",
                      isLiked
                        ? "fill-red-500 text-red-500 stroke-red-500"
                        : "stroke-current hover:text-gray-500", // Transparent when not liked
                    )}
                    strokeWidth={1.5}
                  />
                  {likesCount.toLocaleString()}{" "}
                </button>
                <button className="hover:scale-110 transition-transform flex gap-1 items-center justify-center active:scale-95">
                  <MessageCircle
                    className="h-5 w-5 stroke-current hover:text-gray-500"
                    strokeWidth={1.5}
                  />
                  {post.commentsCount.toLocaleString()}{" "}
                </button>
                <button className="hover:scale-110 transition-transform active:scale-95">
                  <Share2
                    className="h-5 w-5 stroke-current hover:text-gray-500"
                    strokeWidth={1.5}
                  />
                </button>
              </div>
            </div>

            {/* Comment input */}
            <div className="px-4 py-3 border-t border-modal-border">
              <div className="flex items-center gap-3">
                <Input
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isPosting}
                  className="flex-1 bg-transparent px-3 border-0 text-modal-text placeholder:text-muted-foreground text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
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
            </div>

            {/* Stats */}
            <div className="px-4 pb-2">
              <span className="flex  items-center text-blue-400 font-bold">
                <IndianRupee className="w-4 h-4" />
                {post.price}
              </span>
              <p className="text-sm text-muted-foreground mt-0.5">
                {post.title && (
                  <>
                    <span className="font-bold text-modal-text block mt-1 mb-1.5">
                      {post.title}
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
                    </span>
                  </>
                )}
                <span className="flex gap-1 items-center">
                  <MapPin className="w-3 h-3" /> {post.location}
                </span>
              </p>
              <span className="text-sm">{formatTimeAgo(post.createdAt)}</span>
            </div>
          </div>
          <div className="flex gap-3 justify-between items-center px-5 pb-5">
            <Button
              className="flex-1 cursor-pointer"
              onClick={() => navigate(`/mchat?userId=${post.channel.user.id}`)}
            >
              MChat
            </Button>
            <Button className="flex-1">Make Offer</Button>
            <Button>
              <Phone />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;
