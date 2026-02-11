import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
// Removed ScrollArea to use native flex scroll for better reliability
import { Button } from "@/components/ui/button";
import {
  Heart,
  MessageCircle,
  Share2,
  IndianRupee,
  MapPin,
  ArrowLeft,
  ShoppingBag,
  Star,
  Send,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Calendar,
  Info,
  Phone,
  Users,
  Building,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useGetPostByIdQuery,
  useAddCommentMutation,
  useGetCommentsQuery,
  useToggleLikeMutation,
} from "@/store/api/postsApi";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PostCTA } from "@/types/feed";
import { useRatePostMutation } from "@/store/api/associateApi";

// --- Helper Functions ---
const formatTimeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

// --- Image Carousel Component ---
interface MediaCarouselProps {
  mediaList: string[];
  onDoubleClick?: () => void;
  className?: string;
  isMobile?: boolean;
}

const MediaCarousel = ({
  mediaList,
  onDoubleClick,
  className,
}: MediaCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  //   const videoRef = useRef<HTMLVideoElement>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    currentIndex > 0 && setCurrentIndex((i) => i - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    currentIndex < mediaList.length - 1 && setCurrentIndex((i) => i + 1);
  };

  // const currentUrl = mediaList[currentIndex];
  // const isVideo = /\.(mp4|webm|mov|m4v)$/i.test(currentUrl);

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden select-none bg-black",
        className,
      )}
      onDoubleClick={onDoubleClick}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {mediaList.map((src, i) => {
          const isVideoItem = /\.(mp4|webm|mov|m4v)$/i.test(src);
          return (
            <div
              key={i}
              className="w-full h-full flex-shrink-0 flex items-center justify-center bg-black"
            >
              {isVideoItem ? (
                <video
                  src={src}
                  className="max-h-full max-w-full object-contain"
                  controls
                  playsInline
                />
              ) : (
                <img
                  src={src}
                  alt={`Product ${i + 1}`}
                  className="w-full h-full object-contain"
                  draggable={false}
                />
              )}
            </div>
          );
        })}
      </div>

      {mediaList.length > 1 && (
        <>
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {currentIndex < mediaList.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </>
      )}

      {mediaList.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {mediaList.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 shadow-sm",
                i === currentIndex
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/50 hover:bg-white/80",
              )}
            />
          ))}
        </div>
      )}

      <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full">
        {currentIndex + 1} / {mediaList.length}
      </div>
    </div>
  );
};

// --- Main Page Component ---
export const PostDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // --- API HOOKS ---
  const { data: post, isLoading: loadingPost } = useGetPostByIdQuery(id || "");
  const { data: comments = [] } = useGetCommentsQuery(id || "", { skip: !id });

  const [addComment, { isLoading: isPosting }] = useAddCommentMutation();
  const [toggleLike] = useToggleLikeMutation();
  const [ratePost, { isLoading: isRating }] = useRatePostMutation();

  // --- STATES ---
  const [commentText, setCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);

  const [ratingOpen, setRatingOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const isMobile = useIsMobile();

  useEffect(() => {
    if (post) {
      setIsLiked(Boolean(post.isLiked));
      setLikesCount(post.likesCount || 0);
    }
  }, [post?.id]);

  if (loadingPost) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!post) return <div className="p-10 text-center">Post not found</div>;

  const mediaList: string[] = Array.isArray(post.fileUrl)
    ? post.fileUrl
    : post.fileUrl
      ? [post.fileUrl]
      : post.thumbnailUrl
        ? [post.thumbnailUrl]
        : [];

  const userRating = post.myRating || 0;
  const averageRating = Number(post.averageRating || 0);

  const handleLike = async () => {
    const previousLiked = isLiked;
    const newLiked = !isLiked;
    const newCount = newLiked ? likesCount + 1 : likesCount - 1;

    setIsLiked(newLiked);
    setLikesCount(newCount);

    if (newLiked) {
      setShowLikeAnimation(true);
      setTimeout(() => setShowLikeAnimation(false), 600);
    }

    try {
      await toggleLike(post.id).unwrap();
    } catch (error) {
      setIsLiked(previousLiked);
      setLikesCount(likesCount);
      apiErrorToastHandler(error);
    }
  };

  const handleDoubleClick = () => {
    if (!isLiked) handleLike();
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

  const handleRate = async (value: number) => {
    try {
      await ratePost({ postId: post.id, value }).unwrap();
      toast.success(`You rated this ${value} stars!`);
      setRatingOpen(false);
    } catch (error) {
      apiErrorToastHandler(error);
    }
  };

  return (
    <div className="h-[91dvh] w-full flex flex-col md:flex-row bg-background overflow-hidden">
      {/* --- LEFT: MEDIA (Carousel) --- */}
      <div className="relative flex-1 bg-secondary flex items-center justify-center min-h-[45vh] md:min-h-0 md:h-full">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-card transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        <MediaCarousel
          mediaList={mediaList}
          onDoubleClick={handleDoubleClick}
          isMobile={isMobile}
          className="h-full"
        />

        {showLikeAnimation && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <Heart className="w-24 h-24 text-red-500 fill-red-500 animate-heart-pop drop-shadow-2xl" />
          </div>
        )}
      </div>

      {/* --- RIGHT: DETAILS & COMMENTS --- */}
      {/* 🔥 FIX: Ensure this container acts as a flex column with restricted height */}
      <div className="w-full md:w-[420px] lg:w-[460px] bg-card flex flex-col h-[55vh] md:h-full md:border-l border-border">
        {/* 1. Header (Fixed Height) */}
        <div className="p-5 border-b border-border flex items-center justify-between shrink-0 animate-fade-in bg-card z-10">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate(`/profile/${post.channel.user.id}`)}
          >
            <Avatar className="w-11 h-11 ring-2 ring-primary/20">
              <AvatarImage src={post.channel.logoUrl || ""} />
              <AvatarFallback className="bg-primary text-primary-foreground font-display text-sm">
                {post.channel.name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                {post.channel.name}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-0.5">
                  <MapPin className="w-3 h-3" />
                  {post.location || "Location"}
                </span>
                <span className="mx-1">•</span>
                <span className="flex items-center gap-0.5 font-medium text-foreground">
                  <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                  {averageRating > 0 ? averageRating.toFixed(1) : "New"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Scrollable Middle Section (Description + Comments) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent">
          {/* Title & Price */}
          <div className="space-y-3 animate-slide-up">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-xl font-display font-bold leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1.5 rounded-lg font-bold text-lg whitespace-nowrap shrink-0">
                <IndianRupee className="w-4 h-4" />
                {Number(post.price).toLocaleString("en-IN")}
              </div>
            </div>

            {/* Description */}
            <p
              className={cn(
                "text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap",
                !isExpanded && "line-clamp-3",
              )}
            >
              {post.description}
            </p>
            {post.description && post.description.length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-primary font-semibold hover:underline"
              >
                {isExpanded ? "Show less" : "Read more"}
              </button>
            )}

            {/* Rating Popover (Moved here or keep in header, user preference) */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-muted-foreground">
                Posted {formatTimeAgo(post.createdAt)}
              </span>

              <Popover open={ratingOpen} onOpenChange={setRatingOpen}>
                <PopoverTrigger asChild>
                  <button className="text-xs font-medium text-primary hover:underline">
                    Rate this
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3" align="end">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        className="focus:outline-none hover:scale-110 active:scale-95 transition-transform"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => handleRate(star)}
                        disabled={isRating}
                      >
                        <Star
                          className={cn(
                            "w-6 h-6 transition-colors",
                            star <= (hoverRating || userRating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground/30",
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Social Stats Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 group transition-colors"
              >
                <Heart
                  className={cn(
                    "w-6 h-6 transition-all group-active:scale-75",
                    isLiked
                      ? "fill-red-500 text-red-500"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                />
                <span
                  className={cn(
                    "text-sm font-medium",
                    isLiked ? "text-red-500" : "text-muted-foreground",
                  )}
                >
                  {likesCount}
                </span>
              </button>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MessageCircle className="w-6 h-6" />
                <span className="text-sm font-medium">{comments.length}</span>
              </div>
            </div>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Share2 className="w-6 h-6" />
            </button>
          </div>

          <div className="h-px bg-border" />

          {/* Comments List */}
          <div className="space-y-4 pb-2">
            <h3 className="font-display font-semibold text-base">
              Comments ({comments.length})
            </h3>
            {comments.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground text-sm bg-secondary/20 rounded-lg border border-dashed">
                No comments yet. Be the first!
              </div>
            ) : (
              comments.map((comment, idx) => (
                <div
                  key={comment.id}
                  className="flex gap-3 animate-slide-up"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <Avatar className="w-8 h-8 shrink-0">
                    <AvatarImage src={comment.user.avatarUrl} />
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-semibold">
                      {comment.user.firstName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-secondary/50 rounded-xl px-3 py-2.5">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-xs font-bold mr-1.5">
                        {comment.user.firstName}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {formatTimeAgo(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/90 leading-snug">
                      {comment.text}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 3. Footer (Fixed Height) */}
        <div className="border-t border-border p-4 bg-card shrink-0 space-y-3 z-20 shadow-[0_-5px_10px_rgba(0,0,0,0.02)]">
          {/* Comment Input */}
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Add a comment..."
              className="flex-1 bg-secondary/50 border-none focus-visible:ring-primary/30 rounded-full px-4 h-10"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleComment()}
            />
            <Button
              size="icon"
              onClick={handleComment}
              disabled={!commentText.trim() || isPosting}
              className="rounded-full w-10 h-10 shrink-0 shadow-sm"
            >
              {isPosting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4 ml-0.5" />
              )}
            </Button>
          </div>

          {/* CTA Buttons */}
          {post?.ctaLabel && post.ctaLabel.length > 0 && (
            <div className="flex gap-2 pt-1">
              {post.ctaLabel.map((label) => {
                let Icon = MessageCircle;
                switch (label) {
                  case PostCTA.BUY_NOW:
                    Icon = ShoppingBag;
                    break;
                  case PostCTA.BOOKING:
                    Icon = Calendar;
                    break;
                  case PostCTA.ENQUIRY:
                    Icon = Info;
                    break;
                  case PostCTA.CALL:
                    Icon = Phone;
                    break;
                  case PostCTA.PARTICIPATE:
                    Icon = Users;
                    break;
                  case PostCTA.OFFICE:
                    Icon = Building;
                    break;
                  case PostCTA.APPLY:
                    Icon = FileText;
                    break;
                  default:
                    Icon = MessageCircle;
                    break;
                }

                return (
                  <Button
                    key={label}
                    onClick={() => {
                      if (label === PostCTA.CALL) {
                        window.location.href = `tel:${post.channel.user.id}`;
                      } else {
                        navigate(`/mchat?userId=${post.channel.user.id}`);
                      }
                    }}
                    className={cn(
                      "flex-1 h-11 cursor-pointer rounded-xl font-semibold text-sm gap-2 shadow-sm transition-transform active:scale-[0.98]",
                      label === "Chat"
                        ? "variant-outline border-primary/20 text-primary hover:bg-primary/5"
                        : "shadow-primary/20",
                    )}
                    variant={label === "Chat" ? "outline" : "default"}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;
