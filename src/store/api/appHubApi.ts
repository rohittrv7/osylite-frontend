import { rootApiSlice } from "./rootApiSlice";

export interface AppHubApp {
  id: string;
  name: string;
  description: string;
  category: string;
  version: string;
  link: string;
  icon: string;
  status: "Pending" | "Approved" | "Rejected";
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export const appHubApi = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActiveApps: builder.query<AppHubApp[], void>({
      query: () => "/app-hub/active",
      providesTags: ["AppHub"],
    }),
  }),
});

export const { useGetActiveAppsQuery } = appHubApi;
