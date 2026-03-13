import { useSearchParams } from "react-router-dom";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import { MessageCircle } from "lucide-react";

const ChatPage = () => {
  const [params] = useSearchParams();
  const selectedUserId = params.get("userId");

  return (
    <div className="flex h-[calc(100vh-60px)] pt- w-full bg-background">
      {/* Sidebar: always visible on md+, hidden on mobile when chat is open */}
      <div
        className={`${selectedUserId ? "hidden md:flex" : "flex"} w-full md:w-80 flex-shrink-0`}
      >
        <ChatSidebar />
      </div>

      {/* Chat window or empty state */}
      {selectedUserId ? (
        <div className="flex-1 flex md:flex">
          <ChatWindow userId={selectedUserId} />
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-1">
              Your Messages
            </h2>
            <p className="text-sm text-muted-foreground">
              Select a conversation to start chatting
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
