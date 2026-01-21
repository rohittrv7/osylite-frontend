import type { Channel } from "./channel";
import type { UserRole } from "./userRole";

export type MembershipType = "primary_free" | "primary_paid" | "associate";

export interface User {
  id: string;

  phoneNumber: string;
  email: string;

  memberId: string;
  username: string;

  firstName: string;
  lastName: string;
  fullName: string | null;

  avatarUrl: string | null;
  bio: string | null;

  pincode: string;

  role: UserRole;
  membershipType: MembershipType;

  angCoins: number;
  walletBalance: string;

  postsCountThisMonth: number;
  lastPostDate: string | null;

  isVerified: boolean;

  otpExpiresAt: string | null;

  jobProfile: unknown | null;
  matrimonyProfile: unknown | null;
  associateProfile: unknown | null;

  channel: Channel | null;

  privacySettings: PrivacySettings;

  isAssociate: boolean;
  associateStatus: string | null;
  associateType: string | null;

  isChannelCreated: boolean;
  channelHandle: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface PrivacySettings {
  isPhotoPublic: boolean;
  showJobProfile: boolean;
  isProfilePublic: boolean;
  isFriendsListPublic: boolean;
  showMarriageProfile: boolean;
}

export type ChannelStatus = "approved" | "pending" | "rejected";

export interface PublicChannel {
  id: string;
  handle: string;
  name: string;
  description: string;
  logoUrl: string | null;
  bannerUrl: string | null;
  status: ChannelStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileStats {
  totalPosts: number;
  followersCount: number;
  followingCount: number;
}

export interface PublicUserProfile {
  id: string;

  firstName: string;
  lastName: string;
  fullName: string | null;

  username: string;
  avatarUrl: string | null;

  role: UserRole;
  bio: string | null;

  isVerified: boolean;

  associateProfile: unknown | null;

  channel: PublicChannel;

  createdAt: string;

  stats: ProfileStats;

  isFollowing: boolean;
  isMe: boolean;
}
