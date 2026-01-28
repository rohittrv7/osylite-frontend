import { rootApiSlice } from "./rootApiSlice";

export const friendsApi = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFriendSuggestions: builder.query<FriendSuggestion[], void>({
      query: () => "/friends/suggestions",
      providesTags: ["FriendSuggestions"],
    }),

    sendFriendRequest: builder.mutation<void, string>({
      query: (receiverId) => ({
        url: "/friends/request",
        method: "POST",
        body: { receiverId },
      }),
      invalidatesTags: ["FriendSuggestions"],
    }),

    getFriendRequests: builder.query<FriendRequest[], void>({
      query: () => "/friends/requests",
      providesTags: ["FriendRequests"],
    }),

    acceptFriendRequest: builder.mutation<void, string>({
      query: (requestId) => ({
        url: `/friends/accept/${requestId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["FriendRequests", "Friends"],
    }),

    rejectFriendRequest: builder.mutation<void, string>({
      query: (requestId) => ({
        url: `/friends/reject/${requestId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FriendRequests"],
    }),

    /* ---------- FRIENDS ---------- */
    getFriends: builder.query<Friend[], void>({
      query: () => "/friends/list",
      providesTags: ["Friends"],
    }),

    unfriend: builder.mutation<void, string>({
      query: (friendId) => ({
        url: `/friends/remove/${friendId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Friends"],
    }),
  }),
});

export const {
  useGetFriendSuggestionsQuery,
  useSendFriendRequestMutation,
  useGetFriendRequestsQuery,
  useAcceptFriendRequestMutation,
  useRejectFriendRequestMutation,
  useGetFriendsQuery,
  useUnfriendMutation,
} = friendsApi;

export interface FriendSuggestion {
  id: string;
  firstName: string;
  avatarUrl: string;
  mutualFriends: number;
}

export interface FriendRequest {
  id: string;
  name: string;
  avatar: string | null;
  mutualFriends: number;
  work?: string;
  location?: string;
  createdAt: string;
  status?: "pending" | "accepted" | "rejected";
}

export interface Friend {
  id: string;
  name: string;
  avatar: string | null;
  mutualFriends: number;
  work?: string;
  location?: string;
}
