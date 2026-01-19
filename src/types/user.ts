import type { UserRole } from "./userRole";

export interface User {
  id: string;
  phoneNumber: string;
  email: string;
  memberId: string;
  firstName: string;
  lastName: string;
  username: string;
  pincode: string;

  fullName: string | null;
  avatarUrl: string | null;
  backgroundUrl: string | null;
  bio: string | null;

  role: UserRole;
  membershipType: "primary_free" | string;

  angCoins: number;
  walletBalance: string;

  postsCountThisMonth: number;
  lastPostDate: string;

  isVerified: boolean;
  otpExpiresAt: string | null;

  additionalProfiles?: string | null;

  privacySettings: PrivacySettings;

  // channel?: Channel | null;

  createdAt: string;
  updatedAt: string;

  isChannelCreated: boolean;
  // channelStatus: ChannelStatus;
}

export interface PrivacySettings {
  isPhotoPublic: boolean;
  showJobProfile: boolean;
  isProfilePublic: boolean;
  isFriendsListPublic: boolean;
  showMarriageProfile: boolean;
}
