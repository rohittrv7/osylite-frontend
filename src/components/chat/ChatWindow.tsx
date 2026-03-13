import { useEffect, useRef, useState } from "react";
import {
  useGetChatHistoryQuery,
  useGetChatPartnerInfoQuery,
} from "@/store/api/chatApi";
import { useSocket } from "@/hooks/useSocket";
import type { ChatMessage } from "@/types/chat";
import { ArrowLeft, Send } from "lucide-react";
import { useSelector } from "react-redux";
import { selectAuthUser } from "@/store/selectors/authSelectors";
import { useNavigate } from "react-router-dom";

interface Props {
  userId: string;
}

const ChatWindow = ({ userId }: Props) => {
  const user = useSelector(selectAuthUser);
  const currentUserId = user?.id;
  const socket = useSocket();
  const navigate = useNavigate();

  const { data: reciver } = useGetChatPartnerInfoQuery(userId);

  const { data: history = [] } = useGetChatHistoryQuery(userId);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(history);
  }, [history]);

  useEffect(() => {
    if (!socket) return;
    const handler = (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("newMessage", handler);

    return () => {
      socket.off("newMessage", handler);
    };
  }, [socket]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!currentUserId) return;

    const text = inputRef.current?.value || "";
    if (!text.trim()) return;

    const tempMsg: ChatMessage = {
      id: crypto.randomUUID(),
      content: text,
      senderId: currentUserId,
      receiverId: userId,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempMsg]);

    socket.emit("sendMessage", {
      receiverId: userId,
      content: text,
    });

    inputRef.current!.value = "";
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background">
      {/* Header */}
      <div className="px-5 py-3.5 border-b bg-chat-header flex items-center gap-3">
        <button
          onClick={() => navigate("/mchat")}
          className="md:hidden w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
          {reciver?.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-sm text-foreground">
            {reciver?.name || "User"}
          </p>
          <p className="text-xs text-muted-foreground">
            {reciver?.isOnline ? (
              <span className="flex items-center gap-1 text-green-500">
                <span className="w-1.5 h-1.5 rounded-full bg-chat-online bg-amber-700 inline-block" />
                Online
              </span>
            ) : (
              "Offline"
            )}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-sm">
              No messages yet. Say hi 👋
            </p>
          </div>
        )}

        {messages.map((m) => {
          const isMe = m.senderId === currentUserId;
          return (
            <div
              key={m.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${
                  isMe
                    ? "bg-chat-bubble-sent text-chat-bubble-sent-foreground rounded-br-md"
                    : "bg-chat-bubble-received text-chat-bubble-received-foreground rounded-bl-md"
                }`}
              >
                <p className="text-sm leading-relaxed">{m.content}</p>
                <p
                  className={`text-[10px] mt-1 ${isMe ? "text-chat-bubble-sent-foreground/60" : "text-chat-timestamp"}`}
                >
                  {new Date(m.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t bg-chat-header flex gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2.5 rounded-full bg-muted text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
