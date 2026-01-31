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
import type { ExplorePost } from "@/types/associate";
import type { ReelResponse } from "@/types/reel";

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

    toggleLike: builder.mutation<void, string>({
      query: (id) => ({
        url: `/posts/${id}/like`,
        method: "POST",
      }),
      invalidatesTags: ["Post", "ExploreSocial", "ExploreBusiness", "MyPosts"],
    }),

    addComment: builder.mutation<any, { postId: string; text: string }>({
      query: ({ postId, text }) => ({
        url: `/posts/${postId}/comment`,
        method: "POST",
        body: { text },
      }),
      invalidatesTags: ["Post"],
    }),

    incrementView: builder.mutation<{ viewsCount: number }, { postId: string }>(
      {
        query: ({ postId }) => ({
          url: `/posts/${postId}/view`,
          method: "POST",
        }),
        invalidatesTags: ["Post"],
      },
    ),

    incrementShare: builder.mutation<
      { sharesCount: number },
      { postId: string }
    >({
      query: ({ postId }) => ({
        url: `/posts/${postId}/share`,
        method: "POST",
      }),
      invalidatesTags: ["Post"],
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
  }),
});

export const {
  useCreatePostMutation,
  useCreateAssociatePostMutation,
  useGetMyPostsQuery,
  useGetAngMartQuery,
  useToggleLikeMutation,
  useAddCommentMutation,
  useIncrementViewMutation,
  useIncrementShareMutation,
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
} = postsApi;
