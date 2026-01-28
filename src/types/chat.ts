export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
}

export interface ChatUser {
  userId: string;
  name: string;
  avatar: string | null;
  lastMessage: string;
  isOnline: boolean;
  time: string;
}

export type ChatUserList = ChatUser[];

export interface ChatPartnerInfo {
  id: string;
  name: string;
  avatar: string | null;
  isOnline: boolean;
  lastSeenAt: string;
}
