import type { MatrimonyFilterDto, MatrimonyProfile } from "@/types/matrimony";
import { rootApiSlice } from "./rootApiSlice";

export const matrimonyApi = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create or Update Profile
    createOrUpdateMatrimonyProfile: builder.mutation<void, MatrimonyProfile>({
      query: (data) => ({
        url: "/matrimony", // Adjust based on your actual controller path e.g. 'matrimony' or 'profile'
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["MatrimonyProfile"],
    }),

    // Get My Profile
    getMyMatrimonyProfile: builder.query<MatrimonyProfile, void>({
      query: () => ({
        url: "/matrimony/me", // Adjust path
        method: "GET",
      }),
      providesTags: ["MatrimonyProfile"],
    }),

    getMatrimonyFeed: builder.query<MatrimonyProfile[], MatrimonyFilterDto>({
      query: (filters) => ({
        url: "/matrimony/search",
        method: "GET",
        params: filters, // RTK automatically serializes this object to query string
      }),
      providesTags: ["MatrimonyFeed"],
    }),

    // 2. Get Single Profile by ID
    getMatrimonyProfileById: builder.query<MatrimonyProfile, string>({
      query: (id) => ({
        url: `/matrimony/${id}`,
        method: "GET",
      }),
      providesTags: ["MatrimonyProfile"],
    }),
  }),
});

export const {
  useCreateOrUpdateMatrimonyProfileMutation,
  useGetMyMatrimonyProfileQuery,
  useGetMatrimonyFeedQuery,
  useGetMatrimonyProfileByIdQuery,
} = matrimonyApi;
