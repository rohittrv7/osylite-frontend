import { useEffect, useRef, useState } from "react";
import {
  useGetChatHistoryQuery,
  useGetChatPartnerInfoQuery,
} from "@/store/api/chatApi";
import { useSocket } from "@/hooks/useSocket";
import type { ChatMessage } from "@/types/chat";
import { Send } from "lucide-react";
import { useSelector } from "react-redux";
import { selectAuthUser } from "@/store/selectors/authSelectors";

interface Props {
  userId: string;
}

const ChatWindow = ({ userId }: Props) => {
  const user = useSelector(selectAuthUser);
  const currentUserId = user?.id;
  const socket = useSocket();

  const { data } = useGetChatPartnerInfoQuery(userId);

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
    <div className="flex-1 flex flex-col bg-background">
      {/* 🔹 Header */}
      <div className="h-14 border-b flex items-center px-4 gap-3">
        <div className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center text-sm">
          {data?.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-medium text-sm">{data?.name || "User"}</p>
          <p className="text-xs text-green-500">
            {data?.isOnline ? "Online" : data?.lastSeenAt}
          </p>
        </div>
      </div>

      {/* 🔹 Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground text-sm mt-10">
            No messages yet. Say hi 👋
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
                className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                  isMe
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-background border rounded-bl-sm"
                }`}
              >
                <p>{m.content}</p>
                <p className="text-[10px] mt-1 opacity-60 text-right">
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

      {/* 🔹 Input */}
      <div className="p-3 border-t flex items-center gap-2">
        <input
          ref={inputRef}
          placeholder="Type a message…"
          className="flex-1 rounded-full border px-4 py-2 text-sm focus:outline-none"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
