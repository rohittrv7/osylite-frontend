import type { VenueProfile } from "@/store/api/associateApi";

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
  type: string; // "Associate" etc.
  image: string | null;
  isVerified: boolean;
  category: string; // "grocery_shop_owner"
  subCategory: string | null;
  city: string;
  address: string;
  businessDetails: BusinessDetails;
}

export interface BusinessDetails {
  brand: string;
  unitNo: string;
  gstNumber: string;
  typeOfProduct: "both" | "product" | "service"; // adjust if more types exist
  businessMobile: string;
}

// Owner

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
  isSponsored: boolean;
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
  associateProfile: VenueProfile;
  isRated: boolean;
  myRating: number;
  channel: Channel;
  author: Author;
  user: User;
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

export interface FeedAuthor {
  id: string;
  name: string;
  avatar: string | null;
  type: "associate" | "channel" | "user";
  isVerified: boolean;
  username?: string; // Associate ke liye
  handle?: string; // Channel ke liye
}

export interface FeedPost {
  id: string;
  title: string | null;
  caption: string | null;
  description: string | null;
  fileUrl: string[];
  thumbnailUrl: string | null;
  location: string | null;
  latitude: string | null;
  longitude: string | null;
  type: "post" | "video" | "reel";
  status: string;
  averageRating: number;
  totalRatings: number;
  visibility: string;
  audience: string;
  displayArea: string | null;
  earningMod: "free" | "paid_viewer";
  price: string;
  category: string | null;
  categoryDetails: Record<string, any> | null;
  isEnquiryPost: boolean;
  ctaLabel: string[];
  likesCount: number;
  myRatingVal: number;
  commentsCount: number;
  sharesCount: number;
  viewsCount: number;
  isPaidContent: boolean;
  userId: string;
  channelId: string | null;
  createdAt: string;
  updatedAt: string;
  isSponsored: boolean;
  sponsoredLabel: string | null;
  author: FeedAuthor;
}

export interface FeedMeta {
  total: number;
  page: number;
  limit: number;
  lastPage: number;
  seed: string;
}

export interface MixFeedResponse {
  data: FeedPost[];
  meta: FeedMeta;
}

export interface GetMixFeedArgs {
  page: number;
  limit?: number;
  seed?: string;
}
