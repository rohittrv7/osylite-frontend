import type {
  AssociateApplyPayload,
  AssociateCategory,
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
    applyAssociate: builder.mutation<
      { success: true; id: string },
      AssociateApplyPayload
    >({
      query: (payload) => ({
        url: "/associates/apply",
        method: "POST",
        body: payload,
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
