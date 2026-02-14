import { rootApiSlice } from "./rootApiSlice";
import type {
  WalletBalance,
  Plan,
  Transaction,
  BankAccount,
  AddBankAccountDto,
  RequestRedemptionDto,
  AdminQrResponse,
} from "@/types/wallet";

export interface CreateRechargeRequestDto {
  utrNumber: string;
  screenshotUrl: string;
  planId?: string;
}

export interface PlanStatus {
  state: "PENDING" | "ACTIVE" | "NO_PLAN";
  planName?: string;
  expiryDate?: string;
  message?: string;
}

export const walletApi = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Get Balance
    getWalletBalance: builder.query<WalletBalance, void>({
      query: () => "/wallet/balance",
      providesTags: ["Wallet"],
    }),

    // 2. Get Plans
    getPlans: builder.query<Plan[], void>({
      query: () => "/wallet/plans",
      providesTags: ["Plans"],
      // Optional: Transform data if backend structure is different
      transformResponse: (response: Plan[]) => response,
    }),

    getMyPlanStatus: builder.query<PlanStatus, void>({
      query: () => "/wallet/my-plan-status",
      providesTags: ["Wallet"], // Recharge ke baad isse invalidate karna hoga
    }),

    // 3. Get History
    getTransactionHistory: builder.query<Transaction[], void>({
      query: () => "/wallet/history",
      providesTags: ["History"],
    }),

    // 4. Get Admin QR/UPI
    getAdminQr: builder.query<AdminQrResponse, void>({
      query: () => "/admin/payment-config",
    }),

    // 5. Submit Recharge Request (File Upload)
    requestRecharge: builder.mutation<void, CreateRechargeRequestDto>({
      query: (formData) => ({
        url: "/wallet/recharge-request",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["History"],
    }),

    // 6. Get Bank Accounts
    getBankAccounts: builder.query<BankAccount[], void>({
      query: () => "/wallet/bank-accounts",
      providesTags: ["BankAccounts"],
    }),

    // 7. Add Bank Account
    addBankAccount: builder.mutation<BankAccount, AddBankAccountDto>({
      query: (data) => ({
        url: "/wallet/bank-accounts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BankAccounts"],
    }),

    // 8. Redeem (Withdraw)
    redeemCoins: builder.mutation<void, RequestRedemptionDto>({
      query: (data) => ({
        url: "/wallet/redeem",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wallet", "History"],
    }),
  }),
});

export const {
  useGetWalletBalanceQuery,
  useGetPlansQuery,
  useGetTransactionHistoryQuery,
  useGetAdminQrQuery,
  useRequestRechargeMutation,
  useGetBankAccountsQuery,
  useAddBankAccountMutation,
  useRedeemCoinsMutation,
  useGetMyPlanStatusQuery,
} = walletApi;
