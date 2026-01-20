import type { MediaItem } from "@/components/MediaGrid";
import { rootApiSlice } from "./rootApiSlice";

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

export type CategoryDetails =
  | {
      gameName?: string;
      organizer?: string;
    }
  | {
      businessType?: string;
    }
  | {
      genres?: string[];
    };

// export type PostCategory = {
//   ENTERTAINMENT: "entertainment";
//   EDUCATION: "education";
//   BUSINESS: "business";
//   SPORTS: "sports";
//   OTHER: "other";
// };

export interface CreateAssociatePostPayload {
  title: string;
  description?: string;
  file: File;

  category: string;
  earningMod: string;
  price?: number;

  categoryDetails?: CategoryDetails;

  isEnquiryPost?: boolean;
  ctaLabel?: string;
}

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
      invalidatesTags: ["Post", "MyPosts", "Explore", "UserStats"],
    }),

    createAssociatePost: builder.mutation<any, CreateAssociatePostPayload>({
      query: ({ file, categoryDetails, ...rest }) => {
        const formData = new FormData();

        Object.entries(rest).forEach(([key, value]) => {
          if (value !== undefined) {
            formData.append(key, String(value));
          }
        });

        formData.append("file", file);

        if (categoryDetails) {
          formData.append("categoryDetails", JSON.stringify(categoryDetails));
        }

        return {
          url: "/posts/associate/upload",
          method: "POST",
          body: formData,
        };
      },
    }),

    getExplore: builder.query<ExplorePost[], void>({
      query: () => "/posts/explore",
      providesTags: ["Explore"],
    }),

    getMyPosts: builder.query<MediaItem[], { type?: PostType }>({
      query: ({ type }) => ({
        url: "/posts/me",
        params: type ? { type } : undefined,
      }),
      providesTags: ["MyPosts"],
    }),

    toggleLike: builder.mutation<void, string>({
      query: (id) => ({
        url: `/posts/${id}/like`,
        method: "POST",
      }),
      invalidatesTags: ["Post", "Explore", "MyPosts"],
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
  useToggleLikeMutation,
  useAddCommentMutation,
  useIncrementViewMutation,
  useIncrementShareMutation,
} = postsApi;
