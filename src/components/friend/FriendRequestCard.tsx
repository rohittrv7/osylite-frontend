import { Check, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { FriendRequestResponse } from "@/types/friend";
import { useNavigate } from "react-router-dom";

interface FriendRequestCardProps {
  request: FriendRequestResponse;
  onConfirm: (id: string) => void;
  onDelete: (id: string) => void;
}

const FriendRequestCard = ({
  request,
  onConfirm,
  onDelete,
}: FriendRequestCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-4 p-4 bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow animate-slide-up">
      {/* Avatar */}
      <img
        src={
          request.sender.avatarUrl?.trim()
            ? request.sender.avatarUrl
            : `https://ui-avatars.com/api/?name=${request.sender.fullName}`
        }
        alt={request.sender.fullName}
        className="w-16 h-16 rounded-full object-cover ring-2 ring-border cursor-pointer"
        onClick={() => navigate(`/profile/${request.sender.id}`)}
        onError={(e) => {
          e.currentTarget.src = `https://ui-avatars.com/api/?name=${request.sender.fullName}`;
        }}
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground">
          {request.sender.fullName}
        </h3>
        {/* <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Users className="w-3 h-3" />
          <span>{request.sender.mutualFriends} mutual friends</span>
        </div> */}
        {/* {(request.sender.work || request.location) && (
          <p className="text-xs text-muted-foreground truncate mt-0.5">
            {request.work || request.location}
          </p>
        )} */}
        <p className="text-xs text-muted-foreground mt-1">
          {formatDistanceToNow(request.createdAt, { addSuffix: true })}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onConfirm(request.id)}
          className="flex items-center gap-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
        >
          <Check className="w-4 h-4" />
          <span className="hidden sm:inline cursor-pointer">Confirm</span>
        </button>
        <button
          onClick={() => onDelete(request.id)}
          className="flex items-center gap-1 px-4 py-2 bg-secondary text-foreground rounded-lg font-medium text-sm hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4" />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default FriendRequestCard;
