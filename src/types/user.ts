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

  role: "user" | "admin";
  membershipType: "primary_free" | "premium";

  angCoins: number;
  walletBalance: string;

  postsCountThisMonth: number;
  lastPostDate: string;

  isVerified: boolean;
  otpExpiresAt: string | null;

  additionalProfiles?: string | null;

  privacySettings: PrivacySettings;

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
