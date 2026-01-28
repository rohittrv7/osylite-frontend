export interface Friend {
  id: string;
  name: string;
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

export const suggestedFriends: Friend[] = [
  {
    id: "1",
    name: "Priya Sharma",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    mutualFriends: 12,
    work: "Software Engineer at Google",
  },
  {
    id: "2",
    name: "Rahul Verma",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    mutualFriends: 8,
    location: "Mumbai, India",
  },
  {
    id: "3",
    name: "Ananya Gupta",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    mutualFriends: 15,
    work: "Designer at Meta",
  },
  {
    id: "4",
    name: "Vikram Singh",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    mutualFriends: 5,
    location: "Delhi, India",
  },
  {
    id: "5",
    name: "Sneha Patel",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
    mutualFriends: 20,
    work: "Product Manager at Amazon",
  },
  {
    id: "6",
    name: "Arjun Reddy",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    mutualFriends: 3,
    location: "Bangalore, India",
  },
  {
    id: "7",
    name: "Kavya Nair",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
    mutualFriends: 18,
    work: "Data Scientist at Microsoft",
  },
  {
    id: "8",
    name: "Rohan Kumar",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
    mutualFriends: 7,
    location: "Chennai, India",
  },
];

export const friendRequests: FriendRequest[] = [
  {
    id: "101",
    name: "Aisha Khan",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face",
    mutualFriends: 25,
    status: "pending",
    requestedAt: new Date("2024-01-25"),
    work: "Marketing Manager at Flipkart",
  },
  {
    id: "102",
    name: "Karthik Iyer",
    avatar:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop&crop=face",
    mutualFriends: 11,
    status: "pending",
    requestedAt: new Date("2024-01-24"),
    location: "Hyderabad, India",
  },
  {
    id: "103",
    name: "Meera Joshi",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face",
    mutualFriends: 9,
    status: "pending",
    requestedAt: new Date("2024-01-23"),
    work: "Teacher at DPS",
  },
  {
    id: "104",
    name: "Sameer Malhotra",
    avatar:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop&crop=face",
    mutualFriends: 14,
    status: "pending",
    requestedAt: new Date("2024-01-22"),
    location: "Pune, India",
  },
];

export const confirmedFriends: Friend[] = [
  {
    id: "201",
    name: "Neha Kapoor",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=face",
    mutualFriends: 32,
    work: "Architect at Infosys",
  },
  {
    id: "202",
    name: "Amit Tiwari",
    avatar:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face",
    mutualFriends: 28,
    location: "Kolkata, India",
  },
  {
    id: "203",
    name: "Pooja Menon",
    avatar:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=200&fit=crop&crop=face",
    mutualFriends: 45,
    work: "Doctor at AIIMS",
  },
];
