import { rootApiSlice } from "./rootApiSlice";

export const friendsApi = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFriendSuggestions: builder.query<FriendSuggestion[], void>({
      query: () => "/friends/suggestions",
      providesTags: ["FriendSuggestions"],
    }),

    getFriendRequests: builder.query<any[], void>({
      query: () => "/friends/requests",
      providesTags: ["FriendRequests"],
    }),

    sendFriendRequest: builder.mutation<void, string>({
      query: (receiverId) => ({
        url: "/friends/request",
        method: "POST",
        body: { receiverId },
      }),
      invalidatesTags: ["FriendSuggestions", "Profile"],
    }),

    // --- List ke liye ---
    acceptFriendRequest: builder.mutation<void, string>({
      query: (requestId) => ({
        url: `/friends/accept/${requestId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["FriendRequests", "Friends", "Profile"],
    }),

    acceptFriendRequestByUserId: builder.mutation<void, string>({
      query: (senderId) => ({
        url: `/friends/accept-user/${senderId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["FriendRequests", "Friends", "Profile"],
    }),

    cancelFriendRequest: builder.mutation<void, string>({
      query: (receiverId) => ({
        url: `/friends/cancel/${receiverId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FriendSuggestions", "Profile"],
    }),

    // ... Other endpoints (reject, unfriend, etc.)
    rejectFriendRequest: builder.mutation<void, string>({
      query: (requestId) => ({
        url: `/friends/reject/${requestId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FriendRequests"],
    }),

    getFriends: builder.query<any[], void>({
      query: () => "/friends/list",
      providesTags: ["Friends"],
    }),

    unfriend: builder.mutation<void, string>({
      query: (friendId) => ({
        url: `/friends/remove/${friendId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Friends", "Profile"],
    }),
  }),
});

export const {
  useGetFriendSuggestionsQuery,
  useSendFriendRequestMutation,
  useGetFriendRequestsQuery,
  useAcceptFriendRequestMutation,
  useAcceptFriendRequestByUserIdMutation,
  useRejectFriendRequestMutation,
  useGetFriendsQuery,
  useUnfriendMutation,
  useCancelFriendRequestMutation,
} = friendsApi;

export interface FriendSuggestion {
  id: string;
  firstName: string;
  avatarUrl: string;
  mutualFriends: number;
}

export interface FriendRequest {
  id: string;
  fullName: string;
  avatar: string | null;
  mutualFriends: number;
  work?: string;
  location?: string;
  createdAt: string;
  status?: "pending" | "accepted" | "rejected";
}
