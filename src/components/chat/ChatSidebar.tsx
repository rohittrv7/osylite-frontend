import { useGetChatUsersQuery } from "@/store/api/chatApi";
import { useNavigate } from "react-router-dom";
import type { ChatUser } from "@/types/chat";
import { Loader2, MessageCircle } from "lucide-react";

const SHOWCASE_USER: ChatUser = {
  userId: "showcase",
  name: "Start a new chat",
  avatar: null,
  lastMessage: "Tap here to start chatting 👋",
  time: new Date().toISOString(),
  isOnline: false,
  // lastSeenAt: "",
};

const formatTime = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

const ChatSidebar = () => {
  const { data = [], isLoading } = useGetChatUsersQuery();
  const navigate = useNavigate();

  const usersToShow: ChatUser[] = data.length > 0 ? data : [SHOWCASE_USER];

  if (isLoading) return <Loader2 />;

  return (
    <div className="w-full md:w-80 border-r bg-chat-sidebar flex flex-col h-full">
      <div className="p-5 border-b">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Messages</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {usersToShow.map((user: ChatUser) => (
          <div
            key={user.userId}
            onClick={() =>
              user.userId !== "showcase" &&
              navigate(`/mchat?userId=${user.userId}`)
            }
            className={`px-4 py-3.5 cursor-pointer flex gap-3 border-b border-border/50 transition-colors hover:bg-muted/60
              // selectedUserId === user.userId ? "bg-muted" : ""
            `}
          >
            <div className="relative flex-shrink-0">
              <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                {user.name[0].toUpperCase()}
              </div>
              {user.isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-chat-online border-2 bg-green-500/80 border-chat-sidebar" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <p className="font-medium text-sm text-foreground truncate">
                  {user.name}
                </p>
                <span className="text-xs text-chat-timestamp flex-shrink-0 ml-2">
                  {formatTime(user.time)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate mt-0.5">
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
