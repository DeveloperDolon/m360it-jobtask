import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    categoryList: builder.query({
      query: () => ({
        url: `/products/categories`,
      }),
      providesTags: ["category"],
    }),
  }),
});

export const { useCategoryListQuery } = categoryApi;
