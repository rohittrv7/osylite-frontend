import { rootApiSlice } from "./rootApiSlice";

export interface CourierBranch {
  id: string;
  businessName: string;
  mobile: string;
  address: string;
  pincode: string;
  distanceInKm: string;
  latitude: number;
  longitude: number;
}

export interface SearchCourierParams {
  latitude?: number;
  longitude?: number;
  radius?: number;
  pincode?: string;
  officeName?: string;
}

export const courierApi = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNearbyCouriers: builder.query<CourierBranch[], SearchCourierParams>({
      query: (params) => ({
        url: "/associates/search/couriers",
        params,
      }),
    }),

    getAssociateById: builder.query<any, string>({
      query: (id) => `/associates/${id}`, // Aapka backend path
    }),
  }),
});

export const { useGetNearbyCouriersQuery, useGetAssociateByIdQuery } =
  courierApi;
