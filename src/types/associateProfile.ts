// 1. Privacy Settings Interface
export interface PrivacySettings {
  isPhotoPublic: boolean;
  showJobProfile: boolean;
  isProfilePublic: boolean;
  isFriendsListPublic: boolean;
  showMarriageProfile: boolean;
}

// 2. User Interface
export interface User {
  id: string;
  phoneNumber: string;
  email: string;
  memberId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  username: string | null;
  avatarUrl: string | null;
  pincode: string;
  role: string; // You can change to specific string union if known (e.g., 'associate' | 'user')
  bio: string | null;
  membershipType: string;
  angCoins: number;
  walletBalance: string; // Kept as string because JSON has "0.00"
  postsCountThisMonth: number;
  lastPostDate: string | null;
  isOtpVerified: boolean;
  isVerified: boolean;
  otpExpiresAt: string | null;
  channel: any | null; // Define specific Channel interface if data structure is known
  privacySettings: PrivacySettings;
  lastSeenAt: string;
  createdAt: string;
  updatedAt: string;
}

// 3. Business Details Interface
export interface BusinessDetails {
  website: string | null;
  closingTime: string | null;
  openingTime: string | null;
  fssaiLicense: string | null;
  businessMobile: string | null;
}

// 4. Main Profile Interface
export interface Profile {
  id: string;
  category: string;
  subCategory: string | null;
  businessName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number | null;
  longitude: number | null;
  businessDetails: BusinessDetails;
  user: User;
  status: "accepted" | "pending" | "rejected" | string; // Enum-like string
  adminRemarks: string | null;
  createdAt: string;
  updatedAt: string;
}

// 5. Content Interface
// Note: Since arrays are empty in your JSON, I used 'any[]'.
// Replace 'any' with specific interfaces (e.g., Post, Product) when you have their structure.
export interface Content {
  reels: any[];
  videos: any[];
  posts: any[];
  products: any[];
  services: any[];
}

// 6. Root Response Interface
export interface AssociateProfileResponse {
  profile: Profile;
  content: Content;
}
