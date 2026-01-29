// import type { Friend } from "@/types/friend";
// import { Users, UserPlus } from "lucide-react";
// import { useState } from "react";

// interface FriendSuggestionCardProps {
//   friend: Friend;
//   onAddFriend: (id: string) => void;
//   onRemove: (id: string) => void;
// }

// const FriendSuggestionCard = ({
//   friend,
//   onAddFriend,
//   onRemove,
// }: FriendSuggestionCardProps) => {
//   const [isAdded, setIsAdded] = useState(false);
//   const [isRemoved, setIsRemoved] = useState(false);

//   const handleAdd = () => {
//     setIsAdded(true);
//     onAddFriend(friend.id);
//   };

//   const handleRemove = () => {
//     setIsRemoved(true);
//     setTimeout(() => onRemove(friend.id), 300);
//   };

//   if (isRemoved) {
//     return null;
//   }

//   return (
//     <div className="friend-card animate-fade-in rounded-md border border-accent-foreground overflow-hidden">
//       {/* Remove Button */}
//       {/* <button
//         onClick={handleRemove}
//         className="absolute top-2 right-2 p-1 rounded-full hover:bg-secondary transition-colors z-20"
//         aria-label="Remove suggestion"
//       >
//         <X className="w-4 h-4 text-muted-foreground" />
//       </button> */}

//       {/* Profile Image */}
//       <div className="relative">
//         <img
//           src={friend.avatar}
//           alt={friend.name}
//           className="w-full aspect-square object-cover"
//         />
//       </div>

//       {/* Content */}
//       <div className="p-3">
//         <h3 className="font-semibold text-foreground truncate">
//           {friend.name}
//         </h3>

//         {/* Mutual Friends */}
//         <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
//           <Users className="w-3 h-3" />
//           <span>{friend.mutualFriends} mutual friends</span>
//         </div>

//         {/* Additional Info */}
//         {(friend.work || friend.location) && (
//           <p className="text-xs text-muted-foreground mt-1 truncate">
//             {friend.work || friend.location}
//           </p>
//         )}

//         {/* Action Buttons */}
//         <div className="mt-3 space-y-2">
//           {isAdded ? (
//             <button
//               disabled
//               className="action-btn-secondary flex items-center justify-center gap-2 cursor-not-allowed opacity-70"
//             >
//               <UserPlus className="w-4 h-4" />
//               Request Sent
//             </button>
//           ) : (
//             <button
//               onClick={handleAdd}
//               className="action-btn-primary border bg-blue-500 rounded-sm flex items-center w-full py-2 justify-center gap-2"
//             >
//               <UserPlus className="w-4 h-4" />
//               Add Friend
//             </button>
//           )}
//           <button
//             onClick={handleRemove}
//             className="action-btn-secondary w-full py-2 border bg-accent rounded-sm"
//           >
//             Remove
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FriendSuggestionCard;

import { Users, UserPlus } from "lucide-react";
import { useState } from "react";
import type { FriendSuggestion } from "@/store/api/friendsApi";

interface Props {
  friend: FriendSuggestion;
  onAddFriend: (id: string, name: string) => void;
}

const FriendSuggestionCard = ({ friend, onAddFriend }: Props) => {
  const [sent, setSent] = useState(false);

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
        <h3 className="font-semibold truncate">{friend.firstName}</h3>

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
