import { rootApiSlice } from "./rootApiSlice";

export interface CreditCardApplication {
  id: string;
  fullName: string;
  panCard: string;
  income: number;
  occupation: string;
  bankName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  status: "Pending" | "Approved" | "Rejected";
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export const creditCardApi = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    applyForCreditCard: builder.mutation<CreditCardApplication, Partial<CreditCardApplication>>({
      query: (body) => ({
        url: "/credit-cards/apply",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CreditCards"],
    }),
    getMyCreditCards: builder.query<CreditCardApplication[], void>({
      query: () => "/credit-cards/my",
      providesTags: ["CreditCards"],
    }),
  }),
});

export const { useApplyForCreditCardMutation, useGetMyCreditCardsQuery } = creditCardApi;
