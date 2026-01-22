import type { MediaItem } from "@/components/MediaGrid";
import { rootApiSlice } from "./rootApiSlice";
import type { PublicUserProfile } from "@/types/user";
import type {
  CreatePostPayload,
  ExploreFilters,
  ExplorePost,
  FollowResponse,
  PostMedia,
  PostType,
  Reel,
} from "@/types/post";
import type { FollowUser } from "@/components/FollowList";

export const postsApi = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<any, CreatePostPayload>({
      query: ({ caption, type, file, isEnquiryPost, ctaLabel }) => {
        const formData = new FormData();
        formData.append("type", type);
        formData.append("file", file);

        if (caption) formData.append("caption", caption);
        if (typeof isEnquiryPost === "boolean") {
          formData.append("isEnquiryPost", String(isEnquiryPost));
        }
        if (ctaLabel) formData.append("ctaLabel", ctaLabel);

        return {
          url: "/posts",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [
        "Post",
        "MyPosts",
        "ExploreSocial",
        "ExploreBusiness",
        "UserStats",
      ],
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
      providesTags: ["UserProfile"],
    }),

    getExplore: builder.query<ExplorePost[], ExploreFilters | void>({
      query: (filters) => ({
        url: "/posts/explore/social",
        params: filters ?? undefined,
      }),
      providesTags: ["ExploreSocial"],
    }),

    getAngMart: builder.query<ExplorePost[], ExploreFilters | undefined>({
      query: (filters) => ({
        url: "/posts/explore/business",
        params: filters,
      }),
      providesTags: ["ExploreBusiness"],
    }),

    getEntertainmentReels: builder.query<Reel[], void>({
      query: () => ({
        url: "/posts/reels/entertainment",
        method: "GET",
      }),
      providesTags: ["Reels"],
    }),

    // getAngMart: builder.query<ExplorePost[], void>({
    //   query: () => "/posts/explore/business",
    //   providesTags: ["Explore"],
    // }),

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
  }),
});

export const {
  useCreatePostMutation,
  useCreateAssociatePostMutation,
  useGetMyPostsQuery,
  useGetExploreQuery,
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
  useGetEntertainmentReelsQuery,
} = postsApi;
