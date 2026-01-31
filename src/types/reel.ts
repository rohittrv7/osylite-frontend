// ---- Reel / Story API Interface ----

export interface ReelResponse {
  id: string;
  title: string | null;
  caption: string | null;
  fileUrl: string; // video url
  thumbnailUrl: string | undefined;
  type: "reel" | "story" | string;
  earningMod: "free" | "paid" | string;
  ctaLabel: string | null;
  likesCount: number;
  commentsCount: number;
  viewsCount: number;
  isPaidContent: boolean;
  isAd: boolean;
  createdAt: string; // ISO date string
  channel: Channel;
}

export interface Channel {
  id: string;
  handle: string;
  name: string;
  logoUrl: string | null;
  user: ChannelUser;
}

export interface ChannelUser {
  id: string;
  role: "user" | "admin" | string;
  avatarUrl: string | null;
  fullName: string;
}

// ---- API List Type ----
export type ReelListResponse = ReelResponse[];
