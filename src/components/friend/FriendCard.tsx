import type { FriendListResponse } from "@/types/friend";
import { MessageCircle, UserMinus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FriendCardProps {
  friend: FriendListResponse;
  onUnfriend: (id: string) => void;
}

export const FriendCard = ({ friend, onUnfriend }: FriendCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4 p-4 bg-card rounded-xl">
      <img
        src={
          friend.avatarUrl?.trim()
            ? friend.avatarUrl
            : `https://ui-avatars.com/api/?name=${friend.fullName}`
        }
        alt={friend.fullName}
        className="w-14 h-14 rounded-full object-cover cursor-pointer"
        onError={(e) => {
          e.currentTarget.src = `https://ui-avatars.com/api/?name=${friend.fullName}`;
        }}
        onClick={() => navigate(`/profile/${friend.id}`)}
      />

      <div className="flex-1">
        <h3 className="font-semibold">{friend.fullName}</h3>
        {/* <p className="text-sm text-muted-foreground">
          {friend.} mutual friends
        </p> */}
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
