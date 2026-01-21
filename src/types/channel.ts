export type Channel = {
  id: string;
  name: string;
  owner: string;
  logo?: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
};

export interface ChannelData {
  name: string;
  handle: string;
  logoUrl?: string;
}

export interface FeedPost {
  id: string;
  channel: ChannelData;
  fileUrl: string;
  title?: string;
  caption?: string;
  description?: string;
  viewsCount: number;
  likesCount: number;
  commentsCount?: number;
  isEnquiryPost?: boolean;
  ctaLabel?: string;
}
