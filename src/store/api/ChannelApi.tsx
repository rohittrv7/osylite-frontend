import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ChannelResponse {
  message: string;
}

interface ChannelRequest {
  name: string;
  handle: string;
  description?: string;
}

export const channelApi = createApi({
  reducerPath: "channelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    createChannel: builder.mutation<ChannelResponse, ChannelRequest>({
      query: (credentials) => ({
        url: "/channels",
        method: "POST",
        body: credentials,
      }),
    }),

    getChannel: builder.query<void, void>({
      query: (credentials) => ({
        url: "/channels/me",
        method: "GET",
        body: credentials,
      }),
    }),

    // otpVerify: builder.mutation<OtpVerifyResponse, OtpVerifyRequest>({
    //   query: (credentials) => {
    //     const token = sessionStorage.getItem("authToken");
    //     return {
    //       url: "/auth/verify",
    //       method: "POST",
    //       body: credentials,
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     };
    //   },
    // }),

    // getProfile: builder.query<User, void>({
    //   query: () => {
    //     const token = sessionStorage.getItem("authToken");

    //     return {
    //       url: "/users/me",
    //       method: "GET",
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     };
    //   },
    // }),

    // resendOtp: builder.mutation<LoginResponse, void>({
    //   query: (credentials) => {
    //     const token = sessionStorage.getItem("authToken");
    //     return {
    //       url: "/auth/resend-otp",
    //       method: "POST",
    //       body: credentials,
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     };
    //   },
    // }),

    // logout: builder.mutation<void, void>({
    //   query: () => ({
    //     url: "/auth/logout",
    //     method: "POST",
    //   }),
    // }),

    // forgotPassword: builder.mutation<ForgotPasswordResponse, { email: string }>(
    //   {
    //     query: (body) => ({
    //       url: "/auth/forgot-password",
    //       method: "POST",
    //       body,
    //     }),
    //   },
    // ),

    // resetPassword: builder.mutation<
    //   { message: string },
    //   {
    //     otp: string;
    //     newPassword: string;
    //   }
    // >({
    //   query: (body) => {
    //     const token = sessionStorage.getItem("authToken");
    //     return {
    //       url: "/auth/reset-password",
    //       method: "POST",
    //       body,
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     };
    //   },
    // }),
  }),
});

export const { useCreateChannelMutation, useGetChannelQuery } = channelApi;
