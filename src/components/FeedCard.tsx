// import { useState } from "react";
// import { IndianRupee, MapPin, Star, Loader2 } from "lucide-react";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { cn } from "@/lib/utils";
// import type { ExplorePost } from "@/types/feed";
// import { MediaGrid } from "./ang-mart/MediaGrid";
// import { PostModal } from "./ang-mart/PostModal";
// import { toast } from "sonner";
// import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";
// import { useRatePostMutation } from "@/store/api/associateApi";

// interface FeedCardProps {
//   post: ExplorePost;
//   viewMode?: "grid" | "list";
// }

// const FeedCard = ({ post, viewMode = "grid" }: FeedCardProps) => {
//   const [modalState, setModalState] = useState<{
//     isOpen: boolean;
//     initialIndex: number;
//   }>({
//     isOpen: false,
//     initialIndex: 0,
//   });

//   const [ratingOpen, setRatingOpen] = useState(false);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [isExpanded, setIsExpanded] = useState(false);

//   const [ratePost, { isLoading: isRating }] = useRatePostMutation();

//   const mediaList = [post.fileUrl];

//   // Use the myRating from backend (or 0 if not rated)
//   const userRating = post.myRating || 0;

//   const handleMediaClick = (_url: string, index: number) => {
//     setModalState({ isOpen: true, initialIndex: index });
//   };

//   const handleRate = async (value: number) => {
//     try {
//       await ratePost({ postId: post.id, value }).unwrap();
//       toast.success(`You rated this ${value} stars!`);
//       setRatingOpen(false);
//     } catch (error) {
//       apiErrorToastHandler(error);
//     }
//   };

//   const renderDisplayRating = (rating: number, count: number) => {
//     if (count === 0) {
//       return (
//         <div className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-[4px] border border-border w-fit mt-1 cursor-pointer hover:bg-muted">
//           <span className="text-[10px] text-muted-foreground font-medium">
//             Rate
//           </span>
//         </div>
//       );
//     }

//     return (
//       <div className="flex items-center gap-2 mt-1">
//         {/* Global Average Badge */}
//         <div className="flex items-center gap-1 bg-green-700 px-1.5 py-0.5 rounded-[4px] shadow-sm cursor-pointer hover:bg-green-800 transition-colors">
//           <span className="text-xs font-bold text-white leading-none mb-[1px]">
//             {rating.toFixed(1)}
//           </span>
//           <Star className="w-3 h-3 fill-white text-white" />
//         </div>

//         {/* Total Count */}
//         <span className="text-[11px] text-muted-foreground font-medium">
//           ({count})
//         </span>
//       </div>
//     );
//   };

//   return (
//     <>
//       <Card
//         className={cn(
//           "overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300 group bg-card",
//           viewMode === "list" && "flex flex-row",
//           post.isAd && "ring-1 ring-primary/20",
//         )}
//       >
//         <CardHeader className="px-3 py-2">
//           <div className="flex items-center gap-2.5">
//             <Avatar className="w-8 h-8 ring-2 ring-background">
//               <AvatarImage
//                 src={post.channel.logoUrl || ""}
//                 alt={post.channel.name}
//               />
//               <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
//                 {post.channel.name.charAt(0).toUpperCase()}
//               </AvatarFallback>
//             </Avatar>
//             <div className="min-w-0 flex-1">
//               <p className="text-sm font-semibold truncate leading-tight">
//                 {post.channel.name}
//               </p>
//               <p className="text-[11px] text-muted-foreground truncate">
//                 @{post.channel.handle}
//               </p>
//             </div>
//           </div>
//         </CardHeader>

//         <div
//           className={cn(
//             "relative overflow-hidden",
//             viewMode === "list" ? "w-40 sm:w-48 shrink-0" : "w-full",
//           )}
//         >
//           {post.isAd && (
//             <Badge className="absolute top-3 left-3 z-10">Sponsored</Badge>
//           )}

//           <MediaGrid
//             mediaUrls={mediaList}
//             type={post.type}
//             onMediaClick={handleMediaClick}
//           />
//         </div>

//         <div
//           className={cn(
//             "flex flex-col flex-1",
//             viewMode === "list" && "min-w-0",
//           )}
//         >
//           <CardContent className="p-3 pt-2 flex flex-col gap-2.5">
//             {post.title && (
//               <div>
//                 <div className="flex justify-between items-start">
//                   <h2 className="flex font-bold gap-1 items-center text-primary text-lg">
//                     <IndianRupee className="w-4 h-4" />
//                     {post.price || 0}
//                   </h2>

//                   {/* Rating Popover */}
//                   <Popover open={ratingOpen} onOpenChange={setRatingOpen}>
//                     <PopoverTrigger asChild>
//                       <button className="outline-none hover:opacity-80 transition-opacity">
//                         {renderDisplayRating(
//                           post.averageRating || 0,
//                           post.totalRatings || 0,
//                         )}
//                       </button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-3" align="end">
//                       <div className="flex flex-col items-center gap-2">
//                         <span className="text-xs font-medium text-muted-foreground">
//                           {userRating > 0 ? "Your rating" : "Rate this post"}
//                         </span>
//                         <div className="flex gap-1">
//                           {[1, 2, 3, 4, 5].map((star) => {
//                             const isFilled =
//                               star <= (hoverRating || userRating);

//                             return (
//                               <button
//                                 key={star}
//                                 type="button"
//                                 className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
//                                 onMouseEnter={() => setHoverRating(star)}
//                                 onMouseLeave={() => setHoverRating(0)}
//                                 onClick={() => handleRate(star)}
//                                 disabled={isRating}
//                               >
//                                 <Star
//                                   className={cn(
//                                     "w-6 h-6 transition-colors",
//                                     isFilled
//                                       ? "fill-yellow-400 text-yellow-400"
//                                       : "text-muted-foreground/30",
//                                   )}
//                                 />
//                               </button>
//                             );
//                           })}
//                         </div>
//                         {isRating && (
//                           <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
//                             <Loader2 className="w-3 h-3 animate-spin" />
//                             Submitting...
//                           </div>
//                         )}
//                       </div>
//                     </PopoverContent>
//                   </Popover>
//                 </div>

//                 <h4 className="font-medium text-sm leading-snug line-clamp-2 mt-1">
//                   {post.title ?? post.caption}
//                 </h4>

//                 {post.location && (
//                   <h4 className="font-normal flex gap-1 items-center text-muted-foreground text-xs leading-snug line-clamp-1 mt-1">
//                     <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
//                     {post.location}
//                   </h4>
//                 )}
//               </div>
//             )}

//             {post.description && (
//               <div className="space-y-0.5">
//                 <p
//                   className={cn(
//                     "text-xs text-muted-foreground leading-relaxed transition-all",
//                     !isExpanded && "line-clamp-2",
//                   )}
//                 >
//                   {post.description}
//                 </p>
//                 {post.description.length > 80 && (
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setIsExpanded(!isExpanded);
//                     }}
//                     className="text-[10px] font-bold text-primary hover:underline"
//                   >
//                     {isExpanded ? "Show less" : "Show more"}
//                   </button>
//                 )}
//               </div>
//             )}
//           </CardContent>
//         </div>
//       </Card>

//       {modalState.isOpen && (
//         <PostModal
//           post={post}
//           isOpen={modalState.isOpen}
//           onClose={() => setModalState({ ...modalState, isOpen: false })}
//           initialIndex={modalState.initialIndex}
//         />
//       )}
//     </>
//   );
// };

// export default FeedCard;

import { useState } from "react";
import { IndianRupee, MapPin, Star, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { ExplorePost } from "@/types/feed";
import { MediaGrid } from "./ang-mart/MediaGrid";
import { toast } from "sonner";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";
import { useNavigate } from "react-router-dom";
import { useRatePostMutation } from "@/store/api/associateApi";

interface FeedCardProps {
  post: ExplorePost;
  viewMode?: "grid" | "list";
}

const FeedCard = ({ post, viewMode = "grid" }: FeedCardProps) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  // Rating State
  const [ratingOpen, setRatingOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratePost, { isLoading: isRating }] = useRatePostMutation();

  const mediaList: string[] = Array.isArray(post.fileUrl)
    ? post.fileUrl
    : post.fileUrl
      ? [post.fileUrl]
      : [];

  // Use thumbnail if no media found (fallback logic)
  if (mediaList.length === 0 && post.thumbnailUrl) {
    mediaList.push(post.thumbnailUrl);
  }

  const userRating = post.myRating || 0;

  const handleMediaClick = (_url: string, index: number) => {
    navigate(`/post/${post.id}`, { state: { initialIndex: index } });
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

  const renderDisplayRating = (rating: number, count: number) => {
    if (count === 0) {
      return (
        <div className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-[4px] border border-border w-fit mt-1 cursor-pointer hover:bg-muted">
          <span className="text-[10px] text-muted-foreground font-medium">
            Rate
          </span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 mt-1">
        <div className="flex items-center gap-1 bg-green-700 px-1.5 py-0.5 rounded-[4px] shadow-sm cursor-pointer hover:bg-green-800 transition-colors">
          <span className="text-xs font-bold text-white leading-none mb-[1px]">
            {rating.toFixed(1)}
          </span>
          <Star className="w-3 h-3 fill-white text-white" />
        </div>
        <span className="text-[11px] text-muted-foreground font-medium">
          ({count})
        </span>
      </div>
    );
  };

  return (
    <Card
      className={cn(
        "overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300 group bg-card",
        viewMode === "list" && "flex flex-row",
        post.isAd && "ring-1 ring-primary/20",
      )}
    >
      <CardHeader className="px-3 py-2">
        <div className="flex items-center gap-2.5">
          <Avatar
            className="w-8 h-8 ring-2 ring-background cursor-pointer"
            onClick={() => navigate(`/profile/${post.channel.user.id}`)}
          >
            <AvatarImage
              src={post.channel.logoUrl || ""}
              alt={post.channel.name}
            />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              {post.channel.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p
              className="text-sm font-semibold truncate leading-tight cursor-pointer hover:underline"
              onClick={() => navigate(`/profile/${post.channel.user.id}`)}
            >
              {post.channel.name}
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              @{post.channel.handle}
            </p>
          </div>
        </div>
      </CardHeader>

      {/* Only render MediaGrid if there are media items */}
      {mediaList.length > 0 && (
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
          />
        </div>
      )}

      <div
        className={cn("flex flex-col flex-1", viewMode === "list" && "min-w-0")}
      >
        <CardContent className="p-3 pt-2 flex flex-col gap-2.5">
          {post.title && (
            <div>
              <div className="flex justify-between items-start">
                <h2 className="flex font-bold gap-1 items-center text-primary text-lg">
                  <IndianRupee className="w-4 h-4" />
                  {post.price || 0}
                </h2>

                <Popover open={ratingOpen} onOpenChange={setRatingOpen}>
                  <PopoverTrigger asChild>
                    <button className="outline-none hover:opacity-80 transition-opacity">
                      {renderDisplayRating(
                        post.averageRating || 0,
                        post.totalRatings || 0,
                      )}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-3" align="end">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        {userRating > 0 ? "Your rating" : "Rate this post"}
                      </span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
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
                      {isRating && (
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Loader2 className="w-3 h-3 animate-spin" />{" "}
                          Submitting...
                        </div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <h4
                className="font-medium text-sm leading-snug line-clamp-2 mt-1 cursor-pointer hover:text-primary"
                onClick={() => navigate(`/post/${post.id}`)}
              >
                {post.title ?? post.caption}
              </h4>

              {post.location && (
                <h4 className="font-normal flex gap-1 items-center text-muted-foreground text-xs leading-snug line-clamp-1 mt-1">
                  <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                  {post.location}
                </h4>
              )}
            </div>
          )}

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
        </CardContent>
      </div>
    </Card>
  );
};

export default FeedCard;
