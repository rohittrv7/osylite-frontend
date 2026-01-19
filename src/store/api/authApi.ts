import type { User } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LoginRequest {
  email: string;
  password: string;
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

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),

    otpVerify: builder.mutation<OtpVerifyResponse, OtpVerifyRequest>({
      query: (credentials) => {
        return {
          url: "/auth/verify",
          method: "POST",
          body: credentials,
        };
      },
    }),

    getProfile: builder.query<User, void>({
      query: () => {
        return {
          url: "/users/me",
          method: "GET",
        };
      },
    }),

    resendOtp: builder.mutation<LoginResponse, void>({
      query: (credentials) => {
        return {
          url: "/auth/resend-otp",
          method: "POST",
          body: credentials,
        };
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
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
      {
        otp: string;
        newPassword: string;
      }
    >({
      query: (body) => {
        return {
          url: "/auth/reset-password",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useOtpVerifyMutation,
  useGetProfileQuery,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
