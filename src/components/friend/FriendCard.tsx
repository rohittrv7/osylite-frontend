import type { Friend } from "@/types/friend";
import { MessageCircle, UserMinus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FriendCardProps {
  friend: Friend;
  onUnfriend: (id: string) => void;
}

export const FriendCard = ({ friend, onUnfriend }: FriendCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4 p-4 bg-card rounded-xl">
      <img
        src={
          friend.avatar?.trim()
            ? friend.avatar
            : `https://ui-avatars.com/api/?name=${friend.name}`
        }
        alt={friend.name}
        className="w-14 h-14 rounded-full object-cover cursor-pointer"
        onError={(e) => {
          e.currentTarget.src = `https://ui-avatars.com/api/?name=${friend.name}`;
        }}
        onClick={() => navigate(`/profile/${friend.id}`)}
      />

      <div className="flex-1">
        <h3 className="font-semibold">{friend.name}</h3>
        <p className="text-sm text-muted-foreground">
          {friend.mutualFriends} mutual friends
        </p>
      </div>

      <button
        onClick={() => navigate(`/mchat?userId=${friend.id}`)}
        className="p-2 bg-secondary rounded-full hover:bg-muted cursor-pointer"
      >
        <MessageCircle className="w-5 h-5" />
      </button>
      <button
        onClick={() => onUnfriend(friend.id)}
        className="p-2 bg-secondary rounded-full hover:bg-muted cursor-pointer"
      >
        <UserMinus className="w-5 h-5" />
      </button>
    </div>
  );
};
