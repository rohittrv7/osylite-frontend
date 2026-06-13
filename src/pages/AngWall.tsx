import { useGetMixFeedQuery } from "@/store/api/postsApi";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Loader2, ImageIcon } from "lucide-react";
import { useState } from "react";

export default function ANGWall() {
  const { data: feedData, isLoading } = useGetMixFeedQuery({ page: 1, limit: 12, seed: undefined });
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const posts = feedData?.data || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">ANG Wall</h1>
      {posts.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p className="font-medium">No posts yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((p: any) => (
            <Card key={p.id} className="shadow-lg overflow-hidden">
              <CardHeader className="font-semibold text-sm line-clamp-1 pb-2">
                {p.title || p.caption || "Post"}
              </CardHeader>
              <CardContent className="p-0">
                {p.fileUrl?.[0] && (
                  <img
                    src={p.fileUrl[0]}
                    alt={p.title}
                    className="rounded-none w-full h-40 object-cover"
                    loading="lazy"
                  />
                )}
                <div className="p-4">
                  {p.caption && (
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{p.caption}</p>
                  )}
                  <div className="flex gap-4 mt-2">
                    <Button
                      size="sm"
                      variant={likedPosts.has(p.id) ? "default" : "outline"}
                      onClick={() => setLikedPosts(prev => {
                        const next = new Set(prev);
                        if (next.has(p.id)) next.delete(p.id); else next.add(p.id);
                        return next;
                      })}
                    >
                      <ThumbsUp className="w-3 h-3 mr-1" />
                      {(p.likesCount || 0) + (likedPosts.has(p.id) ? 1 : 0)}
                    </Button>
                    <Button size="sm" variant="outline">
                      <ThumbsDown className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
