import { useGetChatUsersQuery } from "@/store/api/chatApi";
import { useNavigate } from "react-router-dom";
import type { ChatUser } from "@/types/chat";
import { Loader2 } from "lucide-react";

const SHOWCASE_USER: ChatUser = {
  userId: "showcase",
  name: "Start a new chat",
  avatar: null,
  lastMessage: "Tap here to start chatting 👋",
  time: new Date().toISOString(),
  isOnline: false,
  // lastSeenAt: "",
};

const ChatSidebar = () => {
  const { data = [], isLoading } = useGetChatUsersQuery();
  const navigate = useNavigate();

  const usersToShow: ChatUser[] = data.length > 0 ? data : [SHOWCASE_USER];

  if (isLoading) {
    return <Loader2 />;
  }

  return (
    <div className="w-72 border-r flex flex-col">
      <div className="p-4 font-semibold border-b">Messages</div>

      <div className="flex-1 overflow-y-auto">
        {usersToShow.map((user) => (
          <div
            key={user.userId}
            onClick={() =>
              user.userId !== "showcase" &&
              navigate(`/mchat?userId=${user.userId}`)
            }
            className="px-4 py-3 cursor-pointer hover:bg-muted flex gap-3 border-b"
          >
            <div className="h-10 relative w-10 rounded-full bg-primary text-white flex items-center justify-center text-sm">
              {user.name[0].toUpperCase()}
              {user.isOnline && (
                <div className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
