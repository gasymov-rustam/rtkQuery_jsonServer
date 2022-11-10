import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IGood } from '../../types/IGood';

export const goodsApi = createApi({
  reducerPath: 'goodsApi',
  tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
    prepareHeaders: (headers, { getState, extra }) => {
      const token = window.localStorage.getItem('token') ?? '12345';

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<IGood[], number | void>({
      query: (limit: number) => ({
        url: 'goods',
        params: {
          _limit: limit,
        },

        providesTags: [{ type: 'Products', id: 'LIST' }],
      }),
    }),

    getProductById: builder.query<IGood, number>({
      query: (id) => ({
        url: `goods/${id}`,
      }),

      providesTags: [{ type: 'Products', id: 'LIST' }],
    }),

    addProduct: builder.mutation<IGood, Partial<IGood>>({
      query: (body) => ({
        url: `goods`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),

    updateProduct: builder.mutation<IGood, Partial<IGood>>({
      query: (body) => ({
        url: `goods/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),

    deleteProduct: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `goods/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, id) => [{ type: 'Products', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useLazyGetAllProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = goodsApi;
