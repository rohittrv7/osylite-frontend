import { Eye, Heart, MessageCircle, Share2 } from "lucide-react";
import {
  useToggleLikeMutation,
  useIncrementViewMutation,
  useIncrementShareMutation,
} from "@/store/api/postsApi";
import { useEffect, useRef } from "react";

interface PostActionsProps {
  post: {
    id: string;
    viewsCount: number;
    likesCount: number;
    commentsCount: number;
    sharesCount: number;
  };
  onCommentClick?: () => void; // Focus input when clicked
}

export function PostActions({ post, onCommentClick }: PostActionsProps) {
  const [toggleLike] = useToggleLikeMutation();
  const [incrementView] = useIncrementViewMutation();
  const [incrementShare] = useIncrementShareMutation();

  const viewedRef = useRef(false);

  // 👁 Count view only once per component mount
  useEffect(() => {
    if (!viewedRef.current) {
      incrementView({ postId: post.id });
      viewedRef.current = true;
    }
  }, [post.id, incrementView]);

  return (
    <div className="flex items-center justify-between w-full py-2">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Eye className="h-4 w-4" />
        {post.viewsCount} Views
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => toggleLike(post.id)} // Pass ID string directly
          className="flex items-center gap-1.5 text-sm hover:text-red-500 transition-colors"
        >
          <Heart className="h-4 w-4" />
          {post.likesCount}
        </button>

        <button
          onClick={onCommentClick}
          className="flex items-center gap-1.5 text-sm hover:text-blue-500 transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          {post.commentsCount}
        </button>

        <button
          onClick={() => incrementShare({ postId: post.id })}
          className="flex items-center gap-1.5 text-sm hover:text-green-500 transition-colors"
        >
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </div>
    </div>
  );
}
