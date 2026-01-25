// import { useRef, useState } from "react";
// import { Eye, Heart, Loader2, MessageCircle, Send, Play } from "lucide-react";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import type { ExplorePost } from "@/types/post";
// import { PreviewModal } from "../PreviewModal";

// interface FeedCardProps {
//   post: ExplorePost;
// }

// const FeedCard = ({ post }: FeedCardProps) => {
//   const feedVideoRef = useRef<HTMLVideoElement>(null);

//   const [isExpanded, setIsExpanded] = useState(false);
//   const description = post.description ?? "";
//   const [commentText, setCommentText] = useState("");
//   const [isCommenting, setIsCommenting] = useState(false);

//   const [preview, setPreview] = useState<{
//     open: boolean;
//     url: string;
//     type: "image" | "video";
//   }>({
//     open: false,
//     url: "",
//     type: "image",
//   });

//   const handleCommentSubmit = async () => {
//     if (!commentText.trim()) return;
//     setIsCommenting(true);
//     await new Promise(resolve => setTimeout(resolve, 500));
//     setCommentText("");
//     setIsCommenting(false);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleCommentSubmit();
//     }
//   };

//   const openPreview = (url: string, type: "image" | "video") => {
//     if (feedVideoRef.current) {
//       feedVideoRef.current.pause();
//     }
//     setPreview({ open: true, url, type });
//   };

//   const closePreview = () => {
//     setPreview((p) => ({ ...p, open: false }));
//     if (feedVideoRef.current) {
//       feedVideoRef.current.play().catch(() => {});
//     }
//   };

//   const formatCount = (num: number): string => {
//     if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
//     if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
//     return num.toString();
//   };

//   return (
//     <>
//       <Card className="mb-4 break-inside-avoid overflow-hidden border-border/50 hover:border-primary/30 transition-colors">
//         <CardHeader className="p-3 pb-2">
//           <div className="flex items-center gap-3">
//             {/* Avatar */}
//             <div
//               className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm overflow-hidden cursor-pointer flex-shrink-0"
//             >
//               {post.channel.logoUrl ? (
//                 <img
//                   src={post.channel.logoUrl}
//                   alt={post.channel.name}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 post.channel.name.charAt(0).toUpperCase()
//               )}
//             </div>

//             {/* User Info */}
//             <div className="flex-1 min-w-0">
//               <div className="flex items-center gap-2">
//                 <div className="min-w-0">
//                   <p className="font-semibold text-sm text-foreground truncate cursor-pointer hover:underline">
//                     {post.channel.name}
//                   </p>
//                   <p className="text-xs text-muted-foreground truncate">
//                     @{post.channel.handle}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {post.isAd && (
//               <span className="text-[10px] px-2 py-0.5 rounded-full bg-warning/20 text-warning font-medium">
//                 Sponsored
//               </span>
//             )}
//           </div>
//         </CardHeader>

//         {/* Media */}
//         <div
//           className="relative cursor-pointer group"
//           onClick={() =>
//             openPreview(
//               post.fileUrl,
//               post.type === "video" || post.type === "reel" ? "video" : "image"
//             )
//           }
//         >
//           {post.isAd && (
//             <div className="absolute top-2 left-2 z-10">
//               <span className="text-[10px] px-2 py-0.5 rounded bg-black/60 text-white font-medium">
//                 Ad
//               </span>
//             </div>
//           )}

//           {post.type === "video" || post.type === "reel" ? (
//             <>
//               <video
//                 ref={feedVideoRef}
//                 src={post.fileUrl}
//                 poster={post.thumbnailUrl}
//                 className="w-full object-cover"
//                 muted
//                 loop
//                 playsInline
//               />
//               <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
//                 <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
//                   <Play className="w-6 h-6 text-primary fill-primary ml-1" />
//                 </div>
//               </div>
//             </>
//           ) : (
//             <img
//               src={post.fileUrl || post.thumbnailUrl}
//               alt={post.title || "Post"}
//               className="w-full object-cover group-hover:opacity-95 transition-opacity"
//             />
//           )}
//         </div>

//         <CardContent className="p-3 pt-2 space-y-2">
//           {post.title && (
//             <h3 className="font-semibold text-sm text-foreground line-clamp-2">
//               {post.title}
//             </h3>
//           )}

//           {post.caption && (
//             <p className="text-sm text-foreground/90">{post.caption}</p>
//           )}

//           {description && (
//             <div>
//               <p
//                 className={cn(
//                   "text-xs text-muted-foreground",
//                   !isExpanded && "line-clamp-2"
//                 )}
//               >
//                 {description}
//               </p>

//               {description.length > 120 && (
//                 <button
//                   onClick={() => setIsExpanded(!isExpanded)}
//                   className="text-xs font-medium text-primary hover:underline mt-1"
//                 >
//                   {isExpanded ? "See less" : "See more"}
//                 </button>
//               )}
//             </div>
//           )}

//           {/* Stats */}
//           <div className="flex items-center gap-4 pt-1 text-muted-foreground">
//             <span className="flex items-center gap-1.5 text-xs">
//               <Eye className="w-4 h-4" />
//               {formatCount(post.viewsCount)}
//             </span>
//             <button className="flex items-center gap-1.5 text-xs hover:text-primary transition-colors">
//               <Heart className="w-4 h-4" />
//               {formatCount(post.likesCount)}
//             </button>
//             <span className="flex items-center gap-1.5 text-xs">
//               <MessageCircle className="w-4 h-4" />
//               {formatCount(post.commentsCount ?? 0)}
//             </span>
//           </div>

//           {/* Comment Input */}
//           {!post.isAd && (
//             <div className="relative pt-1">
//               <Input
//                 placeholder="Add a comment..."
//                 value={commentText}
//                 onChange={(e) => setCommentText(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 disabled={isCommenting}
//                 className="pr-12 text-sm"
//               />
//               <Button
//                 size="icon"
//                 variant="ghost"
//                 className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
//                 onClick={handleCommentSubmit}
//                 disabled={isCommenting || !commentText.trim()}
//               >
//                 {isCommenting ? (
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                 ) : (
//                   <Send className="w-4 h-4" />
//                 )}
//               </Button>
//             </div>
//           )}

//           {/* CTA Buttons */}
//           {post.isEnquiryPost && (
//             <div className="flex gap-2 pt-1">
//               <Button variant="outline" size="sm" className="flex-1 text-xs">
//                 MChat
//               </Button>
//               <Button variant="default" size="sm" className="flex-1 text-xs">
//                 {post.ctaLabel || "Enquiry Form"}
//               </Button>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       <PreviewModal
//         open={preview.open}
//         onClose={closePreview}
//         url={preview.url}
//         type={preview.type}
//       />
//     </>
//   );
// };

// export default FeedCard;

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

interface FeedCardProps {
  post: ExplorePost;
}

const FeedCard = ({ post }: FeedCardProps) => {
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

    // optimistic update
    setLiked((prev) => !prev);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));

    try {
      await toggleLike(post.id).unwrap();
    } catch (err) {
      apiErrorToastHandler(err || "Failed to increment view count");
      // rollback on error
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
        <CardHeader className="p-3 pb-2">
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
