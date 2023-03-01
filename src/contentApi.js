import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contentApi = createApi({
  reducerPath: "contentApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BASE_URL}` }),
  endpoints: (builder) => ({
    getContent: builder.mutation({
      query: ({ query }) => {
        return {
          url: `/search/movie?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=1&include_adult=false&query=${query}`,
          method: "get",
        };
      },
    }),
  }),
});

export const { useGetContentMutation } = contentApi;
