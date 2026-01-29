import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { clearAuth } from "../slices/authSlice";
import { env } from "@/config/env";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: env.VITE_BACKEND_BASE_URL,

  credentials: "include",

  prepareHeaders: (headers) => {
    // const defaultHeaders = getDefaultHeaders();
    // Object.entries(defaultHeaders).forEach(([key, value]) => {
    //   headers.set(key, value);
    // });

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    result.error.status === 401 &&
    !(typeof args === "object" && args.url === "/auth/logout")
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        /**
         * Agar backend refresh-token endpoint deta hai (cookie based),
         * to yaha call kar sakte ho:
         *
         * await baseQuery(
         *   { url: "/auth/refresh", method: "POST" },
         *   api,
         *   extraOptions
         * );
         * result = await baseQuery(args, api, extraOptions);
         */

        api.dispatch(clearAuth());
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const rootApiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: [
    "Auth",
    "Profile",
    "UserStats",
    "Connections",
    "Channel",
    "Post",
    "ExploreSocial",
    "ExploreBusiness",
    "MyPosts",
    "UserPosts",
    "Followers",
    "Following",
    "UserFollowers",
    "UserFollowing",
    "UserProfile",
    "Reels",
    "ExploreProducts",
    "ExploreServices",
    "ExploreVideos",
    "Chat",
    "FriendSuggestions",
    "FriendRequests",
    "Friends",
  ],
});
