import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
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
  UploadCloud,
  CheckCircle,
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

// --- New Imports for Booking & Upload ---
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useCreateBookingMutation } from "@/store/api/bookingApi";
import { useGetAdminQrQuery } from "@/store/api/walletApi";
import { Badge } from "@/components/ui/badge";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import { useLazyGetUploadSignatureQuery } from "@/store/api/cloudinaryApi";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";

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

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    currentIndex > 0 && setCurrentIndex((i) => i - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    currentIndex < mediaList.length - 1 && setCurrentIndex((i) => i + 1);
  };

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
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-all"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
          {currentIndex < mediaList.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-all"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
        </>
      )}

      {mediaList.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-20">
          {mediaList.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "h-1 sm:h-1.5 rounded-full transition-all duration-300 shadow-sm",
                i === currentIndex
                  ? "w-4 sm:w-6 bg-white"
                  : "w-1 sm:w-1.5 bg-white/50 hover:bg-white/80",
              )}
            />
          ))}
        </div>
      )}

      <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full">
        {currentIndex + 1} / {mediaList.length}
      </div>
    </div>
  );
};

// --- Main Page Component ---
export const PostDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // --- API HOOKS ---
  const { data: post, isLoading: loadingPost } = useGetPostByIdQuery(id || "");
  const { data: comments = [] } = useGetCommentsQuery(id || "", { skip: !id });

  const [addComment, { isLoading: isPosting }] = useAddCommentMutation();
  const [toggleLike] = useToggleLikeMutation();
  const [ratePost, { isLoading: isRating }] = useRatePostMutation();

  // Booking Hooks
  const { data: payConfig, isLoading: loadingPayConfig } = useGetAdminQrQuery();
  const [createBooking, { isLoading: isBookingLoading }] =
    useCreateBookingMutation();
  const [getSignatureTrigger] = useLazyGetUploadSignatureQuery();

  // --- STATES ---
  const [commentText, setCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  // Booking States
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [screenshotUrl, setScreenshotUrl] = useState("");

  const isMobile = useIsMobile();
  const finalAmount = Number(post?.price) || 0;

  const dynamicQrUrl = useMemo(() => {
    if (!payConfig?.upiId || finalAmount <= 0) return payConfig?.qrCodeUrl;
    const upiLink = `upi://pay?pa=${payConfig.upiId}&pn=ParcelX&am=${finalAmount}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiLink)}`;
  }, [payConfig, finalAmount]);

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

  if (!post)
    return (
      <div className="p-10 text-center text-foreground font-medium">
        Post not found
      </div>
    );

  const mediaList: string[] = Array.isArray(post.fileUrl)
    ? post.fileUrl
    : post.fileUrl
      ? [post.fileUrl]
      : post.thumbnailUrl
        ? [post.thumbnailUrl]
        : [];

  const userRating = post.myRating || 0;
  const averageRating = Number(post.averageRating || 0);

  // --- HANDLERS ---
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

  // Cloudinary Secure Upload Logic
  const getSignature = async ({ folder }: { folder: string }) => {
    return await getSignatureTrigger({ folder }).unwrap();
  };

  const handleScreenshotUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      const uploadRes = await uploadToCloudinary({
        file: file,
        postType: "payment_proofs",
        getSignature,
      });

      if (!uploadRes?.secure_url) throw new Error("Upload failed");

      setScreenshotUrl(uploadRes.secure_url);
      toast.success("Payment screenshot uploaded successfully!");
    } catch (err) {
      apiErrorToastHandler(err);
    } finally {
      setIsUploading(false);
    }
  };

  const confirmBooking = async () => {
    try {
      const isPaid = Number(post.price) > 0;

      if (isPaid && !screenshotUrl) {
        toast.error("Please upload the payment screenshot first");
        return;
      }

      const res = await createBooking({
        postId: post.id,
        paymentScreenshotUrl: screenshotUrl || undefined,
      }).unwrap();

      toast.success("Booking submitted successfully!");
      if (res.invoiceUrl) window.open(res.invoiceUrl, "_blank");
      setBookingModalOpen(false);
      setScreenshotUrl("");
    } catch (err) {
      apiErrorToastHandler(err);
    }
  };

  // 🛒 NEW: Buy Now / Add to Cart Logic
  const handleBuyNow = () => {
    const cartItem = {
      id: post.id,
      title: post.title ?? post.caption ?? "Product",
      price: finalAmount,
      image: mediaList[0] || "",
      quantity: 1,
      associateId: post.user.id,
    };
    dispatch(addToCart(cartItem));
    toast.success("Item added to cart!");
    navigate("/cart");
  };

  return (
    <div className="h-[91dvh] w-full flex flex-col md:flex-row bg-background overflow-y-auto md:overflow-hidden scrollbar-hide">
      {/* --- LEFT: MEDIA (Carousel) --- */}
      <div className="relative w-full md:flex-1 bg-secondary flex items-center justify-center aspect-square sm:aspect-video md:aspect-auto md:h-full border-b md:border-b-0">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-card transition-colors border border-border"
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
            <Heart className="w-20 h-20 sm:w-24 sm:h-24 text-destructive fill-destructive animate-heart-pop drop-shadow-2xl" />
          </div>
        )}
      </div>

      {/* --- RIGHT: DETAILS & COMMENTS --- */}
      <div className="w-full md:w-[400px] lg:w-[460px] bg-card flex flex-col min-h-0 md:h-full md:border-l border-border">
        {/* 1. Header */}
        <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between shrink-0 bg-card z-10 sticky top-0 md:static">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate(`/profile/${post.user.id}`)}
          >
            <Avatar className="w-10 h-10 sm:w-11 sm:h-11 ring-2 ring-primary/20 transition-transform group-hover:scale-105">
              <AvatarImage src={post?.user.avatarUrl || ""} />
              <AvatarFallback className="bg-primary text-primary-foreground font-display text-xs sm:text-sm font-bold uppercase">
                {post.user.firstName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-xs sm:text-sm group-hover:text-primary transition-colors text-foreground line-clamp-1">
                {post.isSponsored ? post.author.name : post.user.firstName}
              </p>
              <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground">
                {post.isSponsored && (
                  <span className="flex items-center gap-0.5">
                    <MapPin className="w-2.5 h-2.5 sm:w-3 h-3 text-primary" />
                    {post.author.city || "Location"}
                  </span>
                )}
                {post.isSponsored && (
                  <>
                    <span className="mx-0.5">•</span>
                    <span className="flex items-center gap-0.5 font-medium text-foreground">
                      <Star className="w-2.5 h-2.5 sm:w-3 h-3 fill-yellow-500 text-yellow-500" />
                      {averageRating > 0 ? averageRating.toFixed(1) : "New"}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Middle Section */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 sm:space-y-5 custom-scrollbar bg-card/50">
          <div className="space-y-3 animate-slide-up">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-lg sm:text-xl font-display font-bold leading-tight text-foreground tracking-tight">
                {post.title ?? post.caption}
              </h1>
              {finalAmount > 0 && (
                <div className="flex items-center gap-0.5 bg-primary/10 text-primary px-2.5 py-1.5 rounded-lg font-black text-base sm:text-lg whitespace-nowrap shrink-0 border border-primary/20">
                  <IndianRupee className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  {finalAmount.toLocaleString("en-IN")}
                </div>
              )}
            </div>

            <p
              className={cn(
                "text-xs sm:text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap",
                !isExpanded && "line-clamp-3",
              )}
            >
              {post.description}
            </p>
            {post.description && post.description.length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[11px] sm:text-xs text-primary font-bold hover:underline"
              >
                {isExpanded ? "Show less" : "Read more"}
              </button>
            )}

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] sm:text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                Posted {formatTimeAgo(post.createdAt)}
              </span>
              {post.isSponsored && (
                <Popover open={ratingOpen} onOpenChange={setRatingOpen}>
                  <PopoverTrigger asChild>
                    <button className="text-[11px] sm:text-xs font-bold text-primary hover:underline flex items-center gap-1">
                      <Star className="w-3 h-3 fill-primary" /> Rate this
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-2.5 sm:p-3 bg-popover border-border shadow-xl rounded-xl"
                    align="end"
                  >
                    <div className="flex gap-1 sm:gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          className="focus:outline-none hover:scale-125 active:scale-95 transition-transform"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => handleRate(star)}
                          disabled={isRating}
                        >
                          <Star
                            className={cn(
                              "w-6 h-6 sm:w-7 sm:h-7 transition-colors",
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
              )}
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Social Stats Row */}
          <div className="flex items-center justify-between px-0.5 sm:px-1">
            <div className="flex items-center gap-4 sm:gap-5">
              <button
                onClick={handleLike}
                className="flex items-center gap-1.5 sm:gap-2 group transition-colors"
              >
                <Heart
                  className={cn(
                    "w-5 h-5 sm:w-6 sm:h-6 transition-all group-active:scale-75",
                    isLiked
                      ? "fill-destructive text-destructive"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                />
                <span
                  className={cn(
                    "text-xs sm:text-sm font-bold",
                    isLiked ? "text-destructive" : "text-muted-foreground",
                  )}
                >
                  {likesCount}
                </span>
              </button>
              <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground group">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />
                <span className="text-xs sm:text-sm font-bold">
                  {comments.length}
                </span>
              </div>
            </div>
            <button className="text-muted-foreground hover:text-foreground transition-all hover:scale-110">
              <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          <div className="h-px bg-border" />

          {/* Comments List */}
          <div className="space-y-4 pb-2">
            <h3 className="font-display font-bold text-sm sm:text-base text-foreground flex items-center gap-2">
              Comments{" "}
              <Badge
                variant="secondary"
                className="px-1 h-4 sm:px-1.5 sm:h-5 text-[9px] sm:text-[10px]"
              >
                {comments.length}
              </Badge>
            </h3>
            {comments.length === 0 ? (
              <div className="py-8 sm:py-10 text-center text-muted-foreground text-xs sm:text-sm bg-muted/20 rounded-xl border border-dashed border-border/60">
                No comments yet. Start the conversation!
              </div>
            ) : (
              comments.map((comment, idx) => (
                <div
                  key={comment.id}
                  className="flex gap-2.5 sm:gap-3 animate-slide-up"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <Avatar className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 border border-border/40">
                    <AvatarImage src={comment.user.avatarUrl} />
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-[9px] font-black">
                      {comment.user.firstName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-muted/40 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 border border-border/10">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="text-[11px] sm:text-xs font-bold text-foreground">
                        {comment.user.firstName}
                      </span>
                      <span className="text-[9px] text-muted-foreground font-medium">
                        {formatTimeAgo(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-[13px] sm:text-sm text-foreground/90 leading-snug">
                      {comment.text}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 3. Footer */}
        <div className="border-t border-border p-3 sm:p-4 bg-card shrink-0 space-y-3 z-20 shadow-[0_-8px_16px_rgba(0,0,0,0.03)] sticky bottom-0 md:static">
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Add a comment..."
              className="flex-1 bg-muted/50 border-border focus-visible:ring-primary/30 rounded-full px-4 sm:px-5 h-10 sm:h-11 text-[13px] sm:text-sm"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleComment()}
            />
            <Button
              size="icon"
              onClick={handleComment}
              disabled={!commentText.trim() || isPosting}
              className="rounded-full w-10 h-10 sm:w-11 sm:h-11 shrink-0 shadow-lg transition-transform active:scale-95"
            >
              {isPosting ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              ) : (
                <Send className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />
              )}
            </Button>
          </div>

          {/* CTA Buttons */}
          {post?.ctaLabel && post.ctaLabel.length > 0 && (
            <div className="flex flex-wrap md:flex-nowrap gap-2 sm:gap-2.5 pt-0.5">
              {post.ctaLabel.map((label: any) => {
                let Icon = MessageCircle;
                if (label === PostCTA.BUY_NOW) Icon = ShoppingBag;
                else if (label === PostCTA.BOOKING) Icon = Calendar;
                else if (label === PostCTA.ENQUIRY) Icon = Info;
                else if (label === PostCTA.CALL) Icon = Phone;
                else if (label === PostCTA.PARTICIPATE) Icon = Users;
                else if (label === PostCTA.OFFICE) Icon = Building;
                else if (label === PostCTA.APPLY) Icon = FileText;

                return (
                  <Button
                    key={label}
                    onClick={() => {
                      if (label === PostCTA.BOOKING) {
                        setBookingModalOpen(true);
                      } else if (label === PostCTA.BUY_NOW) {
                        handleBuyNow();
                      } else if (label === PostCTA.CALL) {
                        window.location.href = `tel:${"9876543210"}`;
                      } else {
                        navigate(`/mchat?userId=${post.user.id}`);
                      }
                    }}
                    className={cn(
                      "flex-1 h-10 sm:h-12 cursor-pointer rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm gap-1.5 sm:gap-2 shadow-md transition-all active:scale-[0.98] tracking-tight",
                      label === "Chat"
                        ? "border-primary/30 text-primary hover:bg-primary/5 shadow-none"
                        : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20",
                    )}
                    variant={label === "Chat" ? "outline" : "default"}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {label}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* --- BOOKING DIALOG --- */}
      <Dialog open={bookingModalOpen} onOpenChange={setBookingModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-md rounded-[1.5rem] sm:rounded-[2rem] bg-card border-border shadow-2xl p-0 overflow-hidden">
          <div className="p-4 sm:p-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
            <DialogHeader className="mb-4 text-left">
              <DialogTitle className="text-lg sm:text-xl font-black italic uppercase tracking-tighter text-foreground flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" /> Confirm Booking
              </DialogTitle>
              <DialogDescription className="text-[13px] sm:text-sm text-muted-foreground font-medium">
                {finalAmount > 0
                  ? `This is a paid service of ₹${finalAmount.toLocaleString("en-IN")}. Please pay via UPI and upload proof.`
                  : "This is a free service. Confirm below to complete your booking."}
              </DialogDescription>
            </DialogHeader>

            {finalAmount > 0 && (
              <div className="space-y-4 sm:space-y-5 py-2 animate-in fade-in zoom-in duration-500">
                {loadingPayConfig ? (
                  <div className="h-40 sm:h-56 flex items-center justify-center bg-muted/30 rounded-2xl sm:rounded-3xl border border-dashed">
                    <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-primary opacity-50" />
                  </div>
                ) : payConfig ? (
                  <div className="bg-primary/5 p-4 sm:p-5 rounded-[1.5rem] sm:rounded-[2rem] border-2 border-dashed border-primary/20 text-center shadow-inner">
                    <p className="text-[9px] font-black text-primary mb-3 sm:mb-4 uppercase tracking-[0.2em]">
                      Scan to pay ₹{finalAmount}
                    </p>
                    <div className="relative group mx-auto w-fit">
                      <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-30" />
                      <img
                        src={dynamicQrUrl}
                        alt="Payment QR"
                        className="relative w-40 h-40 sm:w-52 sm:h-52 mx-auto p-2 rounded-xl sm:rounded-2xl bg-white shadow-xl mb-3 sm:mb-4 border-2 border-background"
                      />
                    </div>
                    <div className="bg-background/80 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl inline-flex items-center gap-2 sm:gap-3 border border-border shadow-sm max-w-full">
                      <span className="text-[10px] sm:text-[11px] font-black font-mono text-foreground uppercase tracking-wider truncate">
                        UPI: {payConfig.upiId}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center text-destructive text-xs sm:text-sm bg-destructive/10 rounded-xl border border-destructive/20 font-bold uppercase tracking-tight">
                    Payment configuration error.
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground tracking-widest px-1">
                    Proof of Payment (Screenshot)
                  </label>
                  <div className="relative border-2 border-dashed rounded-[1rem] sm:rounded-[1.5rem] p-4 sm:p-5 flex flex-col items-center justify-center gap-2 hover:bg-muted/40 transition-all border-border bg-muted/10 group cursor-pointer">
                    {screenshotUrl ? (
                      <div className="flex items-center gap-2 text-green-600 font-black text-[10px] sm:text-xs animate-in zoom-in uppercase tracking-tighter text-center">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-green-500 text-white" />{" "}
                        Receipt Linked
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="w-6 h-6 sm:w-7 sm:h-7 text-muted-foreground group-hover:text-primary transition-colors" />
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={handleScreenshotUpload}
                        />
                        <span className="text-[10px] sm:text-[11px] text-muted-foreground font-black uppercase tracking-tighter text-center">
                          {isUploading
                            ? "Uploading to Cloud..."
                            : "Tap to upload screenshot"}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-0 border-t border-border sticky bottom-0 bg-card">
            <Button
              variant="ghost"
              className="flex-1 rounded-none h-12 sm:h-14 font-black uppercase text-[10px] sm:text-xs tracking-widest text-muted-foreground hover:bg-muted/50 border-r"
              onClick={() => setBookingModalOpen(false)}
            >
              Dismiss
            </Button>
            <Button
              className="flex-1 rounded-none h-12 sm:h-14 font-black uppercase text-[10px] sm:text-xs tracking-widest bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={
                isBookingLoading ||
                isUploading ||
                (finalAmount > 0 && !payConfig) ||
                (finalAmount > 0 && !screenshotUrl)
              }
              onClick={confirmBooking}
            >
              {isBookingLoading ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                "Finalize"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostDetailsPage;
