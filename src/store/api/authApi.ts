import type { User } from "@/types/user";
import { rootApiSlice } from "./rootApiSlice";
import type { AssociateApplyPayload } from "@/types/associate";

interface LoginRequest {
  email: string;
  password: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: "credit" | "debit";
  currency: string;
  reason: string;
  description?: string;
  referenceId?: string;
  createdAt: string;
}
interface RegisterRequest {
  email: string;
  password: string;
}

interface OtpVerifyRequest {
  otp: string;
}

export interface ForgotPasswordResponse {
  message: string;
  user: User | null;
}

interface LoginResponse {
  access_token: string;
  user: User;
  message: string;
}

interface RegisterResponse {
  user: User | null;
  message: string;
}

interface OtpVerifyResponse {
  accessToken: string;
  user: User;
}

export const authApi = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth", "Profile"],
    }),

    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    applyAssociate: builder.mutation<
      { success: true; id: string },
      AssociateApplyPayload
    >({
      query: (payload) => ({
        url: "/auth/register-associate",
        method: "POST",
        body: payload,
      }),
    }),

    otpVerify: builder.mutation<OtpVerifyResponse, OtpVerifyRequest>({
      query: (credentials) => ({
        url: "/auth/verify",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth", "Profile"],
    }),

    getProfile: builder.query<User, void>({
      query: () => "/users/me",
      providesTags: ["Profile", "MatrimonyProfile", "MatrimonyFeed", "JobFeed"],
    }),

    updateAvatar: builder.mutation<void, { avatarUrl: string | null }>({
      query: (body) => ({
        url: "/users/avatar",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),

    resendOtp: builder.mutation<LoginResponse, void>({
      query: () => ({
        url: "/auth/resend-otp",
        method: "POST",
      }),
    }),

    logout: builder.query<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
    }),

    forgotPassword: builder.mutation<ForgotPasswordResponse, { email: string }>(
      {
        query: (body) => ({
          url: "/auth/forgot-password",
          method: "POST",
          body,
        }),
      },
    ),

    resetPassword: builder.mutation<
      { message: string },
      { otp: string; newPassword: string }
    >({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),

    getUserStats: builder.query<
      { totalPosts: number; followersCount: number; followingCount: number },
      void
    >({
      query: () => "users/stats/me",
      providesTags: ["UserStats"],
    }),

    getConnections: builder.query<any[], { type: "followers" | "following" }>({
      query: ({ type }) => ({
        url: "users/connections/list",
        params: { type },
      }),
      providesTags: ["Connections"],
    }),

    getTransactionHistory: builder.query<Transaction[], void>({
      query: () => "/wallet/history",
    }),
  }),
});

export const {
  useLoginMutation,
  useLazyLogoutQuery,
  useRegisterMutation,
  useOtpVerifyMutation,
  useGetProfileQuery,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetConnectionsQuery,
  useGetUserStatsQuery,
  useUpdateAvatarMutation,
  useGetTransactionHistoryQuery,
  useApplyAssociateMutation,
} = authApi;
