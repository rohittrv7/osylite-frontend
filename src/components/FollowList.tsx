import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "@/store/api/postsApi";

export interface FollowUser {
  id: string;
  fullName: string | null;
  username: string;
  avatarUrl: string | null;
  isFollowing: boolean;
  isMe: boolean;
}

interface FollowListProps {
  users: FollowUser[];
  type: "followers" | "following";
}

export default function FollowList({ users, type }: FollowListProps) {
  const [followUser, { isLoading: isFollowing }] = useFollowUserMutation();
  const [unfollowUser, { isLoading: isUnfollowing }] =
    useUnfollowUserMutation();

  const handleAction = async (user: FollowUser) => {
    if (user.isFollowing) {
      await unfollowUser({ userId: user.id });
    } else {
      await followUser({ userId: user.id });
    }
  };

  if (!users.length) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        No users found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users.map((user) => {
        const showFollowBack = type === "followers" && !user.isFollowing;

        return (
          <div
            key={user.id}
            className="flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatarUrl || ""} />
                <AvatarFallback>
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <p className="text-sm font-medium truncate">
                  {user.fullName || user.username}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  @{user.username}
                </p>
              </div>
            </div>

            {!user.isMe && (
              <Button
                size="sm"
                variant={user.isFollowing ? "outline" : "default"}
                disabled={isFollowing || isUnfollowing}
                onClick={() => handleAction(user)}
              >
                {user.isFollowing
                  ? "Unfollow"
                  : showFollowBack
                    ? "Follow Back"
                    : "Follow"}
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
