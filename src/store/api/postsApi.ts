import type { MediaItem } from "@/components/MediaGrid";
import { rootApiSlice } from "./rootApiSlice";
import type { PublicUserProfile } from "@/types/user";
import type {
  CreatePostPayload,
  ExploreFilters,
  FollowResponse,
  PostMedia,
  PostType,
} from "@/types/post";
import type { FollowUser } from "@/components/FollowList";
import type { ReelResponse } from "@/types/reel";
import type { ExplorePost } from "@/types/feed";

export interface CreateCommentDto {
  postId: string;
  text: string;
}

export interface CommentResponse {
  id: string;
  text: string;
  createdAt: string;
  user: {
    id: string;
    firstName: string;
    lastName?: string;
    avatarUrl?: string;
  };
}

export const postsApi = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<void, CreatePostPayload>({
      query: (body) => ({
        url: "posts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MyPosts"],
    }),

    createAssociatePost: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/posts/associate/upload",
        method: "POST",
        body: formData,
      }),
    }),

    getUserPosts: builder.query<
      PostMedia[],
      { userId: string; type?: PostType }
    >({
      query: ({ userId, type }) => ({
        url: `/posts/user/${userId}`,
        params: type ? { type } : undefined,
      }),
      providesTags: ["UserPosts"],
    }),

    getMyFollowers: builder.query<FollowUser[], void>({
      query: () => "/connections/followers",
      providesTags: ["Followers"],
    }),

    getMyFollowing: builder.query<FollowUser[], void>({
      query: () => "/connections/following",
      providesTags: ["Following"],
    }),

    getUserFollowers: builder.query<FollowUser[], string>({
      query: (userId) => `/connections/${userId}/followers`,
      providesTags: ["UserFollowers"],
    }),

    getUserFollowing: builder.query<FollowUser[], string>({
      query: (userId) => `/connections/${userId}/following`,
      providesTags: ["UserFollowing"],
    }),

    getPublicProfile: builder.query<
      PublicUserProfile,
      { targetUserId: string }
    >({
      query: ({ targetUserId }) => `/users/profile/${targetUserId}`,
      providesTags: [
        "UserProfile",
        "Friends",
        "Followers",
        "Following",
        "FriendRequests",
        "FriendSuggestions",
      ],
    }),

    getAngMart: builder.query<ExplorePost[], ExploreFilters | undefined>({
      query: (filters) => ({
        url: "/posts/explore/business",
        params: filters,
      }),
      providesTags: ["ExploreBusiness"],
    }),

    getEntertainmentReels: builder.query<ReelResponse[], void>({
      query: () => ({
        url: "/posts/reels",
        method: "GET",
      }),
      providesTags: ["Reels"],
    }),

    getMyPosts: builder.query<MediaItem[], { type?: PostType }>({
      query: ({ type }) => ({
        url: "/posts/me",
        params: type ? { type } : undefined,
      }),
      providesTags: ["MyPosts"],
    }),

    followUser: builder.mutation<FollowResponse, { userId: string }>({
      query: ({ userId }) => ({
        url: `/connections/follow/${userId}`,
        method: "POST",
      }),
      invalidatesTags: ["Following", "UserProfile", "Followers"],
    }),

    unfollowUser: builder.mutation<FollowResponse, { userId: string }>({
      query: ({ userId }) => ({
        url: `/connections/unfollow/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Following", "UserProfile", "Followers"],
    }),

    getFeed: builder.query<
      any,
      { type: "post" | "video" | "reel"; page: number; limit: number }
    >({
      query: ({ type, page, limit = 10 }) => ({
        url: "/posts/feed",
        params: {
          type,
          page,
          limit,
        },
      }),

      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.type}`;
      },

      merge: (currentCache, newData) => {
        currentCache.data.push(...newData.data);
        currentCache.meta = newData.meta;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),

    transferCoins: builder.mutation<
      void,
      { receiverId: string; amount: number; note?: string }
    >({
      query: (body) => ({
        url: "/wallet/transfer",
        method: "POST",
        body,
      }),
    }),

    toggleLike: builder.mutation<void, string>({
      query: (postId) => ({
        url: `/posts/${postId}/like`,
        method: "POST",
      }),
      // Invalidating tags to refresh UI if needed (optional for optimistic updates)
      invalidatesTags: ["Post"],
    }),

    // Add Comment
    addComment: builder.mutation<void, CreateCommentDto>({
      query: ({ postId, text }) => ({
        url: `/posts/${postId}/comment`,
        method: "POST",
        body: { text },
      }),
      invalidatesTags: ["Comments", "Post"],
    }),

    // Get Comments
    getComments: builder.query<CommentResponse[], string>({
      query: (postId) => ({
        url: `/posts/${postId}/comments`,
        method: "GET",
      }),
      providesTags: ["Comments"],
    }),

    // Increment View
    incrementView: builder.mutation<void, { postId: string }>({
      query: ({ postId }) => ({
        url: `/posts/${postId}/view`,
        method: "POST",
      }),
    }),

    // Increment Share
    incrementShare: builder.mutation<void, { postId: string }>({
      query: ({ postId }) => ({
        url: `/posts/${postId}/share`,
        method: "POST",
      }),
    }),


    // Public Feed
    getPublicFeed: builder.query<ExplorePost[], any>({
      query: (params) => ({
        url: "/posts/feed",
        method: "GET",
        params,
      }),
      providesTags: ["PostFeed"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useCreateAssociatePostMutation,
  useGetMyPostsQuery,
  useGetAngMartQuery,
  useGetPublicProfileQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetUserPostsQuery,
  useGetMyFollowersQuery,
  useGetMyFollowingQuery,
  useGetUserFollowersQuery,
  useGetUserFollowingQuery,
  useGetFeedQuery,
  useGetEntertainmentReelsQuery,
  useTransferCoinsMutation,
  useToggleLikeMutation,
  useAddCommentMutation,
  useGetCommentsQuery,
  useIncrementViewMutation,
  useIncrementShareMutation,
  useGetPublicFeedQuery,
} = postsApi;
