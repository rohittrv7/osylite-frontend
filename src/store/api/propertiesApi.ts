import { rootApiSlice } from "./rootApiSlice";
import type {
  CreatePropertyDto,
  Lead,
  Property,
  PropertyFilters,
} from "@/types/property";

export const propertiesApi = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProperty: builder.mutation<Property, CreatePropertyDto>({
      query: (data) => ({
        url: "/properties",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["MyAds", "Properties"],
    }),

    updateProperty: builder.mutation<
      Property,
      { id: string; data: CreatePropertyDto }
    >({
      query: ({ id, data }) => ({
        url: `/properties/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Properties", "MyAds", "Properties"],
    }),

    // 2. Search & Feed
    getProperties: builder.query<Property[], PropertyFilters>({
      query: (params) => ({
        url: "/properties/search",
        method: "GET",
        params: params,
      }),
      providesTags: ["Properties"],
    }),

    // 3. Get My Ads
    getMyProperties: builder.query<Property[], void>({
      query: () => "/properties/my-ads",
      providesTags: ["MyAds"],
    }),

    // 4. Toggle Status (Active/Sold)
    togglePropertyStatus: builder.mutation<void, string>({
      query: (id) => ({
        url: `/properties/${id}/status`,
        method: "PATCH",
      }),
      invalidatesTags: ["MyAds", "Properties"],
    }),

    // 5. Delete Property
    deleteProperty: builder.mutation<void, string>({
      query: (id) => ({
        url: `/properties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MyAds", "Properties"],
    }),

    // 6. Get Single Property
    getPropertyById: builder.query<Property, string>({
      query: (id) => `/properties/${id}`,
      providesTags: ["Properties"],
    }),

    // 7. Toggle Save (Wishlist)
    toggleSaveProperty: builder.mutation<{ isSaved: boolean }, string>({
      query: (id) => ({
        url: `/properties/${id}/save`,
        method: "POST",
      }),
      // Invalidates specific property to update 'isSaved' UI, and the Wishlist list
      invalidatesTags: ["Wishlist"],
    }),

    // 8. Get Wishlist
    getSavedProperties: builder.query<Property[], void>({
      query: () => "/properties/wishlist/me",
      providesTags: ["Wishlist"],
    }),

    // 9. Contact Owner
    contactOwner: builder.mutation<void, { id: string; message: string }>({
      query: ({ id, message }) => ({
        url: `/properties/${id}/contact`,
        method: "POST",
        body: { message },
      }),
    }),

    // 10. Get Leads
    getMyLeads: builder.query<Lead[], void>({
      query: () => "/properties/leads/me",
      providesTags: ["Leads"],
    }),
  }),
});

export const {
  useCreatePropertyMutation,
  useGetPropertiesQuery,
  useGetMyPropertiesQuery,
  useTogglePropertyStatusMutation,
  useDeletePropertyMutation,
  useGetPropertyByIdQuery,
  useToggleSavePropertyMutation,
  useGetSavedPropertiesQuery,
  useContactOwnerMutation,
  useGetMyLeadsQuery,
  useUpdatePropertyMutation,
} = propertiesApi;
