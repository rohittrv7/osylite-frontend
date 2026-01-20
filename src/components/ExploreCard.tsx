import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { type ExplorePost, useAddCommentMutation } from "@/store/api/postsApi";
import { PostActions } from "./PostActions";
import { Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExploreCardProps {
  post: ExplorePost;
}

export function ExploreCard({ post }: ExploreCardProps) {
  const [commentText, setCommentText] = useState("");
  const [addComment, { isLoading: isCommenting }] = useAddCommentMutation();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    try {
      await addComment({ postId: post.id, text: commentText }).unwrap();
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

  return (
    <Card
      className={cn(
        "overflow-hidden border bg-card/80 backdrop-blur-sm",
        "shadow-sm hover:shadow-xl transition-all duration-300",
        "dark:border-neutral-800 dark:bg-neutral-950/60",
      )}
    >
      <CardHeader className="p-4 pb-3 flex flex-row items-center gap-3">
        <Avatar className="h-10 w-10 border border-border/50 shadow-sm">
          <AvatarImage
            src={post.channel.logoUrl ?? undefined}
            alt={post.channel.name}
          />
          <AvatarFallback className="text-sm font-medium bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800">
            {post.channel.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <span className="font-semibold text-sm tracking-tight">
            {post.channel.name}
          </span>
          <span className="text-xs text-muted-foreground/80">
            {post.channel.handle ? `@${post.channel.handle}` : "Sponsored"}
          </span>
        </div>
      </CardHeader>

      {post.caption && (
        <div className="px-4 pb-3">
          <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground/90">
            {post.caption}
          </p>
        </div>
      )}

      {(post.thumbnailUrl || post.fileUrl) && (
        <div className="relative w-full bg-black/5 dark:bg-black/40 overflow-hidden aspect-[4/5] sm:aspect-video">
          {post.type === "video" || post.type === "reel" ? (
            <video
              src={post.fileUrl}
              poster={post.thumbnailUrl || undefined}
              controls
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <img
              src={post.fileUrl ?? post.thumbnailUrl ?? undefined}
              alt="Post content"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              loading="lazy"
            />
          )}
        </div>
      )}

      <CardContent className="px-4 py-3 border-b border-border/50">
        <PostActions
          post={post}
          onCommentClick={() => inputRef.current?.focus()}
        />
      </CardContent>

      <CardFooter className="flex flex-col gap-4 p-4 bg-muted/40 dark:bg-neutral-900/30">
        <div className="relative w-full">
          <Input
            ref={inputRef}
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={handleKeyDown}
            className={cn(
              "pr-12 py-6 bg-background/60 backdrop-blur-sm border-border/60",
              "focus-visible:ring-primary/40 focus-visible:ring-offset-0",
              "transition-all duration-200",
            )}
            disabled={isCommenting}
          />

          <Button
            size="icon"
            variant="ghost"
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full",
              "text-primary hover:text-primary hover:bg-primary/10",
              "transition-colors duration-200",
            )}
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

        {post.isEnquiryPost && (
          <div className="w-full">
            <Button
              variant="outline"
              className={cn(
                "w-full border-green-600/70 text-green-600 dark:border-green-500/60 dark:text-green-400",
                "hover:bg-green-50/80 dark:hover:bg-green-950/40",
                "transition-colors duration-200",
              )}
              onClick={() => console.log("Open Enquiry Form for:", post.id)}
            >
              {post.ctaLabel || "Enquiry Form"}
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
