import type { JobProfileType } from "@/store/api/jobsApi";
import type { Channel } from "./channel";
import type { UserRole } from "./userRole";

export type MembershipType = "primary_free" | "primary_paid" | "associate";

export interface workHistory {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface EducationDto {
  degree: string; // B.Tech
  college: string; // IIT Patna
  yearOfPassing: number;
}

export interface JobProfile {
  id: string;
  profileType: JobProfileType;

  // Candidate Fields
  currentJobTitle?: string;
  totalExperienceYears?: number;
  highestQualification?: string;
  skills?: string[];
  aboutMe?: string;
  expectedSalary?: string;
  resumeUrl?: string;
  education?: EducationDto[];
  workHistory?: workHistory[];
  preferredLocations?: string[];

  // Recruiter Fields
  companyName?: string;
  designation?: string;
  hiringFocus?: string[];
  hiringIndustry?: string;
  companyWebsite?: string;
  operatingCity?: string;
  officialEmail?: string;
  companyAddress?: string;
}

export interface User {
  id: string;

  phoneNumber: string;
  email: string;

  memberId: string;
  username: string;

  firstName: string;
  lastName: string;
  fullName: string | null;

  avatarUrl: string | undefined;
  bio: string | null;

  pincode: string;

  role: UserRole;
  membershipType: MembershipType;

  angCoins: number;
  walletBalance: string;

  postsCountThisMonth: number;
  lastPostDate: string | null;

  isVerified: boolean;
  isOtpVerified: boolean;

  otpExpiresAt: string | null;

  matrimonyProfile: unknown | null;
  associateProfile: unknown | null;

  channel: Channel | null;

  privacySettings: PrivacySettings;

  isAssociate: boolean;
  associateStatus: string | null;
  associateType: string | null;

  isChannelCreated: boolean;
  channelHandle: string | null;

  isJobProfileCreated: boolean;
  jobProfileType: string | null;
  jobProfile?: JobProfile;
  isMatrimonyProfile?: boolean;

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
  friendStatus: "pending" | "accepted" | "none";
  friendRequestSentByMe: boolean;
  isFriend: boolean;
  isFollowing: boolean;
  isMe: boolean;
}
