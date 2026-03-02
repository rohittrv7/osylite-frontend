import { rootApiSlice } from "./rootApiSlice";

export interface TrackingLog {
  id: string;
  status: string;
  location: string;
  remarks: string;
  updatedAt: string;
}

export interface TrackingResponse {
  id: string;
  awbNumber: string;
  senderName: string;
  senderAddress: string;
  senderPincode: string;
  receiverName: string;
  receiverAddress: string;
  receiverPincode: string;
  weightGm: string;
  serviceType: string;
  totalAmount: string;
  status: string;
  createdAt: string;
  trackingLogs: TrackingLog[]; // 🔹 History ki jagah trackingLogs
}

export const operationsApi = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Final Booking
    bookShipment: builder.mutation<any, any>({
      query: (body) => ({ url: "/shipping/book", method: "POST", body }),
      invalidatesTags: ["Operations"],
    }),

    // 2. Live Tracking
    trackAwb: builder.query<TrackingResponse, string>({
      query: (awb) => `/shipping/track/${awb}`,
      providesTags: ["Tracking"],
    }),

    // 3. Status Update (Associate/Boy)
    updateShipmentStatus: builder.mutation<
      any,
      { id: string; status: string; location: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/shipping/update-status/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Tracking"],
    }),

    // 4. File Complaint
    // fileComplaint: builder.mutation<
    //   any,
    //   { shipmentId: string; issueType: string; description: string }
    // >({
    //   query: (body) => ({ url: "/shipping/complaints", method: "POST", body }),
    //   invalidatesTags: ["Complaints"],
    // }),

    fileComplaint: builder.mutation<
      any,
      { shipmentId: string; issueType: string; description: string }
    >({
      query: (body) => ({
        url: "/shipping/complaints",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Complaints"],
    }),

    getMyAllComplaints: builder.query<any[], void>({
      query: () => "/shipping/my-complaints",
      providesTags: ["Complaints"],
    }),
  }),
});

export const {
  useBookShipmentMutation,
  useTrackAwbQuery,
  useLazyTrackAwbQuery,
  useUpdateShipmentStatusMutation,
  useFileComplaintMutation,
  useGetMyAllComplaintsQuery,
} = operationsApi;
