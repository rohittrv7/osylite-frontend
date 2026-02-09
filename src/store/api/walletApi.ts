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
  amountInINR: number;
  utrNumber: string;
  screenshotUrl: string;
  planId?: string;
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
    }),

    // 3. Get History
    getTransactionHistory: builder.query<Transaction[], void>({
      query: () => "/wallet/history",
      providesTags: ["History"],
    }),

    // 4. Get Admin QR/UPI
    getAdminQr: builder.query<AdminQrResponse, void>({
      query: () => "/wallet/admin-qr",
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
} = walletApi;
