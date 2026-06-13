import { rootApiSlice } from "./rootApiSlice";

export interface Ad {
  id: string;
  title: string;
  fileUrl: string;
  ctaLink?: string;
  expiresAt: string;
  user: {
    id: string;
    firstName: string;
    avatarUrl?: string;
  };
}

export const adsApi = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActiveAds: builder.query<Ad[], void>({
      query: () => "/ads",
      providesTags: ["Ads"],
    }),
  }),
});

export const { useGetActiveAdsQuery } = adsApi;
