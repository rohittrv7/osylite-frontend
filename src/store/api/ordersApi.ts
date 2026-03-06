import type { OrderDetailResponse } from "@/types/order";
import { rootApiSlice } from "./rootApiSlice";

export const ordersApi = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST /orders/buy
    buyProduct: builder.mutation<
      any,
      { items: { productId: string; quantity: number }[]; address: any }
    >({
      query: (body) => ({
        url: "/orders/buy",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),

    // GET /orders/my-orders
    getMyOrders: builder.query<any[], void>({
      query: () => ({ url: "/orders/list/all", method: "GET" }),
      providesTags: ["Orders"],
    }),

    // GET /orders/:id
    getOrderDetail: builder.query<OrderDetailResponse, string>({
      query: (id) => `/orders/${id}/myorder`,
      providesTags: ["Orders"],
    }),

    // PATCH /orders/:id/tracking
    updateTracking: builder.mutation<any, { id: string; status: string }>({
      query: ({ id, ...body }) => ({
        url: `/orders/${id}/tracking`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useBuyProductMutation,
  useGetMyOrdersQuery,
  useGetOrderDetailQuery,
  useUpdateTrackingMutation,
} = ordersApi;
