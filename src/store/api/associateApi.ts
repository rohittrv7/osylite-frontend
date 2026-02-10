import type {
  AssociateCategory,
  ProductExploreFilters,
  ServiceExploreFilters,
  VideoExploreFilters,
} from "@/types/associate";
import { rootApiSlice } from "./rootApiSlice";
import type { BusinessDetails } from "@/config/associate";
import type { ExplorePost } from "@/types/feed";

export type AssociateProfile = {
  id: string;
  userId: string;
  category: AssociateCategory;
  subCategory?: string;
  businessName: string;
  address: string;
  city: string;
  state: string;
  latitude?: number;
  longitude?: number;
  businessDetails?: BusinessDetails;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
};

export const associateApi = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyAssociateProfile: builder.query<AssociateProfile, void>({
      query: () => ({
        url: "/associates/me",
        method: "GET",
      }),
    }),

    getExploreProducts: builder.query<
      ExplorePost[],
      ProductExploreFilters | undefined
    >({
      query: (filters) => ({
        url: "/posts/products",
        params: filters,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "ExploreProducts" as const,
                id,
              })),
              { type: "ExploreProducts", id: "LIST" },
            ]
          : [{ type: "ExploreProducts", id: "LIST" }],
    }),

    getExploreServices: builder.query<
      ExplorePost[],
      ServiceExploreFilters | undefined
    >({
      query: (filters) => ({
        url: "/posts/services",
        params: filters,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "ExploreServices" as const,
                id,
              })),
              { type: "ExploreServices", id: "LIST" },
            ]
          : [{ type: "ExploreServices", id: "LIST" }],
    }),

    ratePost: builder.mutation<void, { postId: string; value: number }>({
      query: ({ postId, value }) => ({
        url: `/posts/${postId}/rate`,
        method: "POST",
        body: { value },
      }),
      invalidatesTags: (_result, _error, { postId }) => [
        { type: "ExploreProducts", id: postId }, // Sirf specific product update hoga
        { type: "ExploreServices", id: postId }, // Sirf specific service update hogi
        { type: "Post", id: postId }, // Detail page update hoga
        "PostFeed", // Home feed update hoga (general tag)
      ],
    }),

    getExploreVideos: builder.query<
      ExplorePost[],
      VideoExploreFilters | undefined
    >({
      query: (filters) => ({
        url: "/posts/videos",
        ...(filters ? { params: filters } : {}),
      }),
      providesTags: ["ExploreVideos"],
    }),
  }),
});

export const {
  useGetMyAssociateProfileQuery,
  useGetExploreProductsQuery,
  useGetExploreServicesQuery,
  useGetExploreVideosQuery,
  useRatePostMutation,
} = associateApi;
