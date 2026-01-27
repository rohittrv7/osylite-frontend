import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSocket } from "@/hooks/useSocket";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatWindow from "@/components/chat/ChatWindow";

const ChatPage = () => {
  const socket = useSocket();
  const [params] = useSearchParams();
  const selectedUserId = params.get("userId");

  useEffect(() => {
    socket.connect();
  }, [socket]);

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <ChatSidebar />

      {selectedUserId ? (
        <ChatWindow userId={selectedUserId} />
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          <div className="text-center space-y-2">
            <p className="text-lg font-medium">💬 Your Messages</p>
            <p className="text-sm">
              Select a user from the left to start chatting
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
