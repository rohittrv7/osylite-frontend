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

export const PostCTA = {
  BUY_NOW: "Buy Now",
  BOOKING: "Booking",
  ENQUIRY: "Enquiry",
  PARTICIPATE: "Participate",
  APPLY: "Apply",
  CHAT: "Chat",
  CALL: "Call",
  OFFICE: "Office",
};

export type PostCTA = (typeof PostCTA)[keyof typeof PostCTA];

export interface ExplorePost {
  id: string;
  title: string;
  caption: string | null;

  fileUrl: string | string[];
  thumbnailUrl: string | null;
  url: string;

  type: PostType;
  earningMod: EarningMode;
  price: string;

  isEnquiryPost: boolean;
  ctaLabel: string[];

  likesCount: number;
  commentsCount: number;
  viewsCount: number;
  averageRating: number;
  totalRatings: number;
  isPaidContent: boolean;
  isVideo: boolean;
  isLiked: boolean;
  location: string | null;
  description: string | null;
  isRated: boolean;
  myRating: number;
  channel: Channel;
  author: Author;
  owner: Owner;
  stats: PostStats;
  isAd: boolean;
  createdAt: string;
}

export interface ExploreFeed {
  id: string;
  title: string | null;
  caption: string | null;
  description: string | null;
  fileUrl: string[];
  thumbnailUrl: string | null;
  price: string | number;
  location: string | null;
  type: string;
  status: string;
  isAd?: boolean;
  averageRating: number;
  totalRatings: number;
  myRating?: number;
  // Note: JSON mein ye null aa raha hai
  channel: {
    id: string;
    name: string;
    handle: string;
    logoUrl: string | null;
    user: { id: string };
  } | null; 
  // Author fallback ke liye (as per your JSON)
  author: {
    id: string;
    name: string;
    handle: string;
    avatar: string | null;
    isVerified: boolean;
  };
  user: User; // Raw user object
  stats: {
    likes: number;
    comments: number;
    views: number;
  };
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
