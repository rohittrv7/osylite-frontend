import type {
  AssociateCategory,
  ExplorePost,
  ProductExploreFilters,
  ServiceExploreFilters,
  VideoExploreFilters,
} from "@/types/associate";
import { rootApiSlice } from "./rootApiSlice";
import type { BusinessDetails } from "@/config/associate";

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
        ...(filters ? { params: filters } : {}),
      }),
      providesTags: ["ExploreProducts"],
    }),

    getExploreServices: builder.query<
      ExplorePost[],
      ServiceExploreFilters | undefined
    >({
      query: (filters) => ({
        url: "/posts/services",
        ...(filters ? { params: filters } : {}),
      }),
      providesTags: ["ExploreServices"],
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
} = associateApi;
