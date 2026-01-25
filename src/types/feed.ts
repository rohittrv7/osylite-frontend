export type ContentType = "post" | "reel" | "video";
// Common Types

export type PostType = "post" | "video" | "reel";
export type EarningMode = "free" | "paid";

// User

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
}

// Channel

export interface Channel {
  id: string;
  handle: string;
  name: string;
  logoUrl: string | null;
  status: "approved" | "pending" | "rejected";
  user: User;
}

// Author

export interface Author {
  id: string;
  name: string;
  handle: string;
  avatar: string | null;
  isVerified: boolean;
}

// Owner

export interface Owner {
  id: string;
}

// Stats

export interface PostStats {
  likes: number;
  comments: number;
  views: number;
}

// Main Post (ExplorePost)

export interface ExplorePost {
  id: string;
  title: string;
  caption: string | null;

  fileUrl: string;
  thumbnailUrl: string | null;
  url: string;

  type: PostType;
  earningMod: EarningMode;
  price: string;

  isEnquiryPost: boolean;
  ctaLabel: string | null;

  likesCount: number;
  commentsCount: number;
  viewsCount: number;

  isPaidContent: boolean;
  isVideo: boolean;
  isLiked: boolean;

  channel: Channel;
  author: Author;
  owner: Owner;
  stats: PostStats;

  createdAt: string;
}

// Pagination Meta

export interface FeedMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

// API Response

export interface FeedResponse {
  data: ExplorePost[];
  meta: FeedMeta;
}
