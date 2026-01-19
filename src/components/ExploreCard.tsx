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
import { Loader2 } from "lucide-react";

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
      setCommentText(""); // Clear input on success
    } catch (err) {
      console.error("Failed to comment", err);
    }
  };

  return (
    <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* 1. Header: Channel Info */}
      <CardHeader className="p-4 pb-2 flex flex-row items-center gap-3">
        <Avatar className="h-10 w-10 border">
          <AvatarImage src={post.channel.logoUrl ?? ""} />
          <AvatarFallback>
            {post.channel.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-sm">{post.channel.name}</h3>
          <p className="text-xs text-muted-foreground">
            {post.channel.handle || "Sponsored"}
          </p>
        </div>
      </CardHeader>

      {/* 2. Content: Caption & Description */}
      <div className="px-4 pb-2">
        <p className="text-sm text-gray-700 whitespace-pre-wrap">
          {post.caption}
        </p>
      </div>

      {/* 3. Media: Image or Video */}
      {(post.thumbnailUrl || post.fileUrl) && (
        <div className="relative aspect-video bg-black/5 w-full overflow-hidden">
          {post.type === "video" || post.type === "reel" ? (
            /* Simple Video Tag for now, ideally use a custom player */
            <video
              src={post.fileUrl}
              poster={post.thumbnailUrl || undefined}
              controls
              className="w-full h-full object-contain bg-black"
            />
          ) : (
            <img
              src={post.fileUrl}
              alt="Post Content"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
        </div>
      )}

      {/* 4. Stats & Actions Bar */}
      <CardContent className="px-4 py-2 border-b">
        <PostActions
          post={post}
          onCommentClick={() => inputRef.current?.focus()}
        />
      </CardContent>

      {/* 5. Footer: Comment Input & Action Buttons */}
      <CardFooter className="flex flex-col gap-3 p-4 bg-gray-50/50">
        {/* Comment Input Area */}
        <div className="w-full">
          <Input
            ref={inputRef}
            placeholder="Write Your Comment..."
            className="bg-white"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </div>

        {/* Action Buttons Row */}
        <div className="flex w-full gap-3 justify-end">
          {/* Enquiry Button (Only if isEnquiryPost is true) */}
          {post.isEnquiryPost && (
            <Button
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700"
              onClick={() => console.log("Open Enquiry Form for:", post.id)}
            >
              {post.ctaLabel || "Enquiry Form"}
            </Button>
          )}

          {/* Comment Submit Button */}
          <Button
            onClick={handleCommentSubmit}
            disabled={!commentText.trim() || isCommenting}
            className="min-w-[80px]"
          >
            {isCommenting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Post"
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
