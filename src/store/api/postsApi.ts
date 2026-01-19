import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type PostType = "post" | "reel" | "video";

export interface CreatePostPayload {
  caption?: string;
  type: "post" | "reel" | "video";
  file: File;
  isEnquiryPost?: boolean;
  ctaLabel?: string;
}

export interface PostStats {
  likes: number;
  comments: number;
  views: number;
}

export interface MyPost {
  id: string;
  url: string;
  type: PostType;
  stats: PostStats;
}

export interface ExplorePost {
  id: string;
  caption: string;
  fileUrl: string;
  thumbnailUrl: string | null;
  type: PostType;
  isEnquiryPost: boolean;
  ctaLabel: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  viewsCount: number;
  channel: {
    id: string;
    name: string;
    handle: string;
    logoUrl: string | null;
  };
  createdAt: string;
}

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    // createPost: builder.mutation<any, CreatePostPayload>({
    //   query: ({ caption, type, file, isEnquiryPost, ctaLabel }) => {
    //     const formData = new FormData();

    //     formData.append("type", type);
    //     formData.append("file", file);

    //     if (caption) {
    //       formData.append("caption", caption);
    //     }

    //     if (typeof isEnquiryPost === "boolean") {
    //       formData.append("isEnquiryPost", String(isEnquiryPost));
    //     }

    //     if (ctaLabel) {
    //       formData.append("ctaLabel", ctaLabel);
    //     }

    //     return {
    //       url: "/posts",
    //       method: "POST",
    //       body: formData,
    //     };
    //   },
    //   // invalidatesTags: ["Post"],
    // }),
    createPost: builder.mutation<any, CreatePostPayload>({
      query: ({ caption, type, file, isEnquiryPost, ctaLabel }) => {
        const formData = new FormData();

        formData.append("type", type);
        formData.append("file", file);

        if (caption) {
          formData.append("caption", caption);
        }

        if (typeof isEnquiryPost === "boolean") {
          formData.append("isEnquiryPost", String(isEnquiryPost)); // 👈 IMPORTANT
        }

        if (ctaLabel) {
          formData.append("ctaLabel", ctaLabel);
        }

        return {
          url: "/posts",
          method: "POST",
          body: formData,
        };
      },
    }),

    getExplore: builder.query<ExplorePost[], void>({
      query: () => "/posts/explore",
      providesTags: ["Post"], // Refetch on mutations
    }),

    getMyPosts: builder.query<MyPost[], { type?: PostType }>({
      query: ({ type }) => ({
        url: "/posts/me",
        params: type ? { type } : undefined,
      }),
    }),

    toggleLike: builder.mutation<void, string>({
      query: (id) => ({
        url: `/posts/${id}/like`,
        method: "POST",
      }),
      // invalidatesTags: (result, error, id) => [{ type: "Post", id }],
    }),

    addComment: builder.mutation<any, { postId: string; text: string }>({
      query: ({ postId, text }) => ({
        url: `/posts/${postId}/comment`,
        method: "POST",
        body: { text },
      }),
      // invalidatesTags: (result, error, arg) => [
      //   { type: "Post", id: arg.postId },
      // ],
    }),

    incrementView: builder.mutation<{ viewsCount: number }, { postId: string }>(
      {
        query: ({ postId }) => ({
          url: `/posts/${postId}/view`,
          method: "POST",
        }),
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
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetMyPostsQuery,
  useGetExploreQuery,
  useToggleLikeMutation,
  useAddCommentMutation,
  useIncrementViewMutation,
  useIncrementShareMutation,
} = postsApi;
