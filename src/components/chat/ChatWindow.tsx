import { useEffect, useRef, useState } from "react";
import {
  useGetChatHistoryQuery,
  useGetChatPartnerInfoQuery,
} from "@/store/api/chatApi";
import { useSocket } from "@/hooks/useSocket";
import type { ChatMessage } from "@/types/chat";
import { ArrowLeft, Send, Paperclip } from "lucide-react";
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
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  // Handle standard text message
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

  // Handle File / Media Selection (Max 100MB)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUserId) return;

    // 100MB Size Limit Validation
    if (file.size > 100 * 1024 * 1024) {
      alert("File size exceeds 100MB limit!");
      e.target.value = ""; // Reset input
      return;
    }

    const isImage = file.type.startsWith("image/");

    // Convert file to Base64 for instant preview and socket transmission
    // (Note: In a real heavy-production app, you'd upload to S3 first and send the URL)
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target?.result as string;

      // Extend ChatMessage locally for media handling
      const tempMsg: any = {
        id: crypto.randomUUID(),
        content: isImage ? "" : `📎 ${file.name}`,
        senderId: currentUserId,
        receiverId: userId,
        createdAt: new Date().toISOString(),
        fileUrl: base64Data,
        fileName: file.name,
        isImage: isImage,
      };

      setMessages((prev) => [...prev, tempMsg]);

      // Emit file data via Socket
      socket.emit("sendMessage", {
        receiverId: userId,
        content: isImage ? "" : `📎 ${file.name}`,
        fileData: base64Data,
        fileName: file.name,
        fileType: file.type,
      });
    };

    reader.readAsDataURL(file);
    e.target.value = ""; // Reset input after reading
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
          const mediaMsg = m as any; // Cast to access file properties if they exist

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
                {/* File / Media Rendering */}
                {mediaMsg.fileUrl && (
                  <div className="mb-2">
                    {mediaMsg.isImage ||
                    mediaMsg.fileUrl.startsWith("data:image") ? (
                      <img
                        src={mediaMsg.fileUrl}
                        alt="Attachment"
                        className="max-w-full h-auto rounded-lg"
                      />
                    ) : (
                      <a
                        href={mediaMsg.fileUrl}
                        download={mediaMsg.fileName || "download"}
                        className="flex items-center gap-2 underline text-sm break-all"
                      >
                        <Paperclip className="w-4 h-4 shrink-0" />
                        {mediaMsg.fileName || "Download Document"}
                      </a>
                    )}
                  </div>
                )}

                {/* Text Content */}
                {m.content && (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {m.content}
                  </p>
                )}

                <p
                  className={`text-[10px] mt-1 ${
                    isMe
                      ? "text-chat-bubble-sent-foreground/60"
                      : "text-chat-timestamp"
                  }`}
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
      <div className="px-4 py-3 border-t bg-chat-header flex items-center gap-2">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Attachment Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-10 h-10 rounded-full text-muted-foreground flex items-center justify-center hover:bg-muted transition-colors shrink-0"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <input
          ref={inputRef}
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2.5 rounded-full bg-muted text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
