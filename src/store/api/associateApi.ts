import type { AssociateApplyPayload } from "@/types/associate";
import { rootApiSlice } from "./rootApiSlice";
import type { AssociateCategory, BusinessDetails } from "@/config/associate";

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
    applyAssociate: builder.mutation<
      { success: true; id: string },
      AssociateApplyPayload
    >({
      query: (data) => ({
        url: "/associates/apply",
        method: "POST",
        body: data,
      }),
    }),

    getMyAssociateProfile: builder.query<AssociateProfile, void>({
      query: () => ({
        url: "/associates/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useApplyAssociateMutation, useGetMyAssociateProfileQuery } =
  associateApi;
