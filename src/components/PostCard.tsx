import { Button } from "@/components/ui/button";
import { useToggleLikeMutation } from "@/store/api/postsApi";

export function PostCard({ post }: any) {
  const [toggleLike] = useToggleLikeMutation();

  return (
    <div className="border rounded-xl p-3 space-y-2">
      <p>{post?.caption}</p>

      {post?.type !== "post" ? (
        <video src={post?.mediaUrl} controls />
      ) : (
        <img src={post?.mediaUrl} />
      )}

      <Button size="sm" onClick={() => toggleLike(post.id)}>
        ❤️ {post.likesCount}
      </Button>
    </div>
  );
}
