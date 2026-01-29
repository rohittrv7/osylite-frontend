import { rootApiSlice } from "./rootApiSlice";

export const cloudinaryApi = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUploadSignature: builder.query<
      {
        timestamp: number;
        signature: string;
        cloudName: string;
        apiKey: string;
        folder: string;
      },
      { folder: string }
    >({
      query: ({ folder }) => ({
        url: "/media/signature",
        params: { folder },
      }),
    }),
  }),
});

export const { useLazyGetUploadSignatureQuery } = cloudinaryApi;
