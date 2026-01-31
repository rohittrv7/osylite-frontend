import { Users, UserPlus } from "lucide-react";
import { useState } from "react";
import type { FriendSuggestion } from "@/store/api/friendsApi";
import { useNavigate } from "react-router-dom";

interface Props {
  friend: FriendSuggestion;
  onAddFriend: (id: string, name: string) => void;
}

const FriendSuggestionCard = ({ friend, onAddFriend }: Props) => {
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();
  const handleAdd = () => {
    setSent(true);
    onAddFriend(friend.id, friend.firstName);
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <div>
        {/* Image */}
        <img
          src={
            friend.avatarUrl?.trim()
              ? friend.avatarUrl
              : `https://ui-avatars.com/api/?name=${friend.firstName}`
          }
          alt={friend.firstName}
          className="w-full aspect-square object-cover"
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${friend.firstName}`;
          }}
        />
      </div>

      {/* Content */}
      <div className="p-3">
        <h3
          className="font-semibold truncate cursor-pointer"
          onClick={() => navigate(`/profile/${friend.id}`)}
        >
          {friend.firstName}
        </h3>

        {friend.mutualFriends > 0 && (
          <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
            <Users className="w-3 h-3" />
            <span>{friend.mutualFriends} mutual friends</span>
          </div>
        )}

        <div className="mt-3">
          {sent ? (
            <button
              disabled
              className="w-full py-2 border rounded-sm opacity-60 cursor-not-allowed"
            >
              Request Sent
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className="w-full cursor-pointer py-2 bg-blue-500 text-white rounded-sm flex items-center justify-center gap-2"
            >
              <UserPlus size={16} />
              Add Friend
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendSuggestionCard;
