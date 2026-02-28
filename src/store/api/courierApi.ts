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

export interface ReceiptResponse {
  awbNumber: string;
  downloadUrl: string;
  sender: string;
  receiver: string;
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

    calculateShipping: builder.mutation<
      any,
      {
        fromPincode: string;
        toPincode: string;
        weightGm: number;
        serviceType?: string;
      }
    >({
      query: (body) => ({
        url: "/shipping/calculate",
        method: "POST", // Agar NestJS @Get use kar raha hai body ke sath, toh usey @Post karein ya params bhejien
        body,
      }),
    }),

    downloadReceipt: builder.query<ReceiptResponse, string>({
      query: (awb) => `/shipping/download-receipt/${awb}`,
      providesTags: ["Operations"],
    }),
  }),
});

export const {
  useGetNearbyCouriersQuery,
  useGetAssociateByIdQuery,
  useCalculateShippingMutation,
  useLazyDownloadReceiptQuery,
} = courierApi;
