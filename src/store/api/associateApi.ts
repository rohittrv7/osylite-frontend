import type {
  AssociateCategory,
  ProductExploreFilters,
  ServiceExploreFilters,
  VideoExploreFilters,
} from "@/types/associate";
import { rootApiSlice } from "./rootApiSlice";
import type { BusinessDetails } from "@/config/associate";
import type { ExploreFeed, ExplorePost } from "@/types/feed";
import type { AssociateProfileResponse } from "@/types/associateProfile";
import type { AdminQrResponse } from "@/types/wallet";

export type AssociateProfile = {
  id: string;
  userId: string;
  category: AssociateCategory;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  locality: string;
  rating: string;
  subCategory?: string;
  businessName: string;
  address: string;
  city: string;
  state: string;
  latitude?: number;
  longitude?: number;
  isVerified: boolean;
  businessDetails?: BusinessDetails;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
};

export interface VenueProfile {
  id: string;
  category: string;
  businessName: string;
  address: string;
  city: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  isVerified?: boolean;
  rating?: number;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string | null;
  };
}

export interface GetAssociatesFilterDto {
  category?: string;
  city?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export const associateApi = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyAssociateProfile: builder.query<AssociateProfile, void>({
      query: () => ({
        url: "/associates/me",
        method: "GET",
      }),
    }),

    getAssociatesByCategory: builder.query<
      VenueProfile[],
      GetAssociatesFilterDto
    >({
      query: (params) => ({
        url: "/associates/filter",
        params,
      }),
      providesTags: ["Associates"],
    }),

    // Get Single Associate Profile (for the next page)
    getAssociateProfile: builder.query<AssociateProfileResponse, string>({
      query: (id) => `/associates/${id}/profile`, // Adjust URL based on your backend prefix
      providesTags: ["Profile"],
    }),

    getAssociateContent: builder.query<
      any[],
      { id: string; type: "post" | "video" | "reel" }
    >({
      query: ({ id, type }) => ({
        url: `/associates/${id}/content`, // Adjust URL based on your backend prefix
        params: { type },
      }),
      providesTags: ["AssociatePosts"],
    }),

    getExploreProducts: builder.query<
      ExploreFeed[],
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

    getAssociateQr: builder.query<AdminQrResponse, void>({
      query: () => "/associates/payment-details",
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
  useGetAssociateProfileQuery,
  useGetAssociatesByCategoryQuery,
  useGetAssociateContentQuery,
  useGetAssociateQrQuery,
} = associateApi;
