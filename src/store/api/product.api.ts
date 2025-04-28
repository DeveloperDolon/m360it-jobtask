import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    productList: builder.query({
      query: () => ({ url: "/products" }),
      providesTags: ["product"],
    }),
  }),
});

export const { useProductListQuery } = productApi;
