import { rootApiSlice } from "./rootApiSlice";

interface ChannelResponse {
  message: string;
}

interface ChannelRequest {
  name: string;
  handle: string;
  description?: string;
}

export const channelApi = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createChannel: builder.mutation<ChannelResponse, ChannelRequest>({
      query: (credentials) => ({
        url: "/channels",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Channel", "Profile"],
    }),

    getChannel: builder.query<ChannelResponse, void>({
      query: () => ({
        url: "/channels/me",
        method: "GET",
      }),
      providesTags: ["Channel"],
    }),
  }),
});

export const { useCreateChannelMutation, useGetChannelQuery } = channelApi;
