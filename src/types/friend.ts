export interface Friend {
  id: string;
  fullName: string;
  avatar?: string | null;
  mutualFriends: number;
  location?: string;
  work?: string;
}

export type FriendRequestStatus = "pending" | "accepted" | "rejected";

export interface FriendRequest extends Friend {
  status: FriendRequestStatus;
  requestedAt: Date;
}

export interface FriendRequestResponse {
  id: string;
  senderId: string;
  receiverId: string;
  status: string;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  sender: UserProfile;
}

export interface UserProfile {
  id: string;
  phoneNumber: string;
  email: string;
  memberId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  avatarUrl: string | null;
  pincode: string | null;
  role: "user" | "admin" | string;
  bio: string | null;
  membershipType: string;
  angCoins: number;
  walletBalance: string;
  postsCountThisMonth: number;
  lastPostDate: string | null;
  isVerified: boolean;
  otpExpiresAt: string | null;
  lastSeenAt: string | null;
  createdAt: string;
  updatedAt: string;
  privacySettings: PrivacySettings;
}

export interface PrivacySettings {
  isPhotoPublic: boolean;
  showJobProfile: boolean;
  isProfilePublic: boolean;
  isFriendsListPublic: boolean;
  showMarriageProfile: boolean;
}


export interface FriendListResponse {
id: string;
phoneNumber: string;
email: string;
memberId: string;
firstName: string;
lastName: string;
fullName: string;
username: string;
avatarUrl: string | null;
pincode: string | null;
role: "user" | "admin" | string;
bio: string | null;
membershipType: string;
angCoins: number;
walletBalance: string;
postsCountThisMonth: number;
lastPostDate: string | null;
isVerified: boolean;
otpExpiresAt: string | null;
lastSeenAt: string | null;
createdAt: string; // ISO date
updatedAt: string; // ISO date
privacySettings: PrivacySettings;
}