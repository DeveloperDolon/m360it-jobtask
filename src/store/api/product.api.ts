import { Product, TPagination } from "../../types";
import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    productList: builder.query({
      query: ({ limit, skip }: TPagination) => ({
        url: `/products?limit=${limit}&skip=${skip}`,
      }),
      providesTags: ["product"],
    }),
    productDetails: builder.query({
      query: (id: number) => `/product/${id}`,
      providesTags: ["product"],
    }),
    productUpdate: builder.mutation({
      query: ({ id, payload }: { id: number; payload: Product }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useProductListQuery,
  useProductDetailsQuery,
  useProductUpdateMutation,
} = productApi;
