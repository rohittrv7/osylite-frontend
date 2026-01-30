import type { User } from "./user";

export type PostType = "post" | "reel" | "video";

export interface CreatePostPayload {
  caption?: string;
  type: "post" | "reel" | "video";
  fileUrl: string;
  latitude?: number;
  longitude?: number;
}

export interface PostStats {
  likes: number;
  comments: number;
  views: number;
}

export interface MyPost {
  id: string;
  url: string;
  type: PostType;
  stats: PostStats;
}

export type PostVisibility = "public" | "listed" | "private";
export const PostVisibility: PostCategory[] = [
  "entertainment",
  "education",
  "business",
  "sports",
  "other",
];

export type PostAudience = "0-17" | "18-30" | "31-50" | "50+" | "all";
export const PostAudience: PostAudience[] = [
  "0-17",
  "18-30",
  "31-50",
  "50+",
  "all",
];

export type DisplayArea = "district" | "state" | "national" | "international";
export const DisplayArea: DisplayArea[] = [
  "district",
  "state",
  "national",
  "international",
];

export type EarningMod =
  | "free"
  | "running_ads"
  | "on_rent"
  | "paid_viewer"
  | "copyright_sale";

export const EarningMod: EarningMod[] = [
  "free",
  "running_ads",
  "on_rent",
  "paid_viewer",
  "copyright_sale",
];

export type PostCategory =
  | "entertainment"
  | "education"
  | "business"
  | "sports"
  | "other";
export const PostCategory: PostCategory[] = [
  "entertainment",
  "education",
  "business",
  "sports",
  "other",
];

export interface ExploreFilters {
  type?: PostType;
  visibility?: PostVisibility;
  audience?: PostAudience;
  displayArea?: DisplayArea;
  earningMod?: EarningMod;
  category: PostCategory;
}

export interface ExplorePost {
  id: string;
  title: string | null;
  caption: string | null;
  fileUrl: string;
  thumbnailUrl: string | undefined;
  description: string;

  type: "post" | "reel" | "video";

  earningMod:
    | "free"
    | "running_ads"
    | "on_rent"
    | "paid_viewer"
    | "copyright_sale";

  price: string;

  category:
    | "entertainment"
    | "education"
    | "business"
    | "sports"
    | "other"
    | null;

  likesCount: number;
  viewsCount: number;
  commentsCount: number;
  sharesCount: number;

  audience: string;
  displayArea: string;

  isEnquiryPost: boolean;
  ctaLabel: string;
  isAd: boolean;
  isLiked: boolean;

  channel: ChannelInfo;

  createdAt: string;
}

export interface ChannelInfo {
  id: string;
  handle: string;
  name: string;
  logoUrl: string | null;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
}

export type CategoryDetails =
  | {
      gameName?: string;
      organizer?: string;
    }
  | {
      businessType?: string;
    }
  | {
      genres?: string[];
    };

export interface PublicProfile {
  user: User;
  isFollowing: boolean;
  isFollower: boolean;
}

export interface CreateAssociatePostPayload {
  title: string;
  description?: string;
  file: File;
  visibility: string;
  audience: string;
  displayArea: string;
  category: string;
  earningMod: string;
  price?: number;
  categoryDetails?: CategoryDetails;

  isEnquiryPost?: boolean;
  ctaLabel?: string;
}

export interface FollowResponse {
  success: boolean;
  message: string;
}

export type MediaType = "post" | "reel" | "video";

export interface PostMedia {
  id: string;
  fileUrl: string;
  thumbnailUrl: string | null;
  type: MediaType;
  viewsCount: number;
  likesCount: number;
}

export interface Reel {
  id: string;
  fileUrl: string;
  thumbnailUrl?: string | null;
  likesCount: number;
  commentsCount: number;
  viewsCount: number;
  caption?: string | null;
}
