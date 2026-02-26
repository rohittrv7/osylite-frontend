// store/api/bookingApi.ts

import { rootApiSlice } from "./rootApiSlice";

export interface PaymentConfig {
  upiId: string;
  qrCodeUrl: string;
  instruction: string;
  isActive: boolean;
}

export interface UserBooking {
  id: string;
  bookingRef: string;
  amount: string;
  status: "pending" | "accepted" | "rejected" | "completed";
  paymentStatus: "pending" | "verified" | "failed" | "not_required";
  paymentScreenshotUrl: string | null;
  invoiceUrl: string | null;
  createdAt: string;
  post: {
    id: string;
    title: string;
    price: number;
    fileUrl: string[];
  };
  associate: {
    id: string;
    businessName: string;
    city: string;
    pincode: string;
    user: {
      fullName: string;
      phoneNumber: string;
    };
  };
}

export const bookingApi = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyBookings: builder.query<any[], void>({
      query: () => "/bookings/my-bookings",
      providesTags: ["Bookings"],
    }),
    createBooking: builder.mutation<any, { postId: string }>({
      query: (body) => ({
        url: "/bookings/create",
        method: "POST",
        body,
      }),
      // Invalidates User to refresh AngCoin balance after deduction
      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const { useCreateBookingMutation, useGetMyBookingsQuery } = bookingApi;
