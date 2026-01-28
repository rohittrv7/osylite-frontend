import type { ChatPartnerInfo, ChatUser } from "@/types/chat";
import { rootApiSlice } from "./rootApiSlice";

export const chatApi = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Inbox / chat users list
    getChatUsers: builder.query<ChatUser[], void>({
      query: () => "/chat/inbox",
      providesTags: ["Chat"],
    }),

    getChatHistory: builder.query<any[], string>({
      query: (otherUserId) => `/chat/history/${otherUserId}`,
      providesTags: ["Chat"],
    }),

    getChatPartnerInfo: builder.query<ChatPartnerInfo, string>({
      query: (id) => `/chat/user/${id}`,
    }),
  }),
});

export const {
  useGetChatUsersQuery,
  useGetChatHistoryQuery,
  useGetChatPartnerInfoQuery,
} = chatApi;
