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
  }),
});

export const { useCreateChannelMutation, useGetChannelQuery } = channelApi;
