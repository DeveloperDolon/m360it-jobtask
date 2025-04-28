import { TPagination } from "../../types";
import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    productList: builder.query({
      query: ({ limit, skip }: TPagination) => ({
        url: `/products?limit=${limit}&skip=${skip}`,
      }),
      providesTags: ["product"],
    }),
  }),
});

export const { useProductListQuery } = productApi;
