import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { PaginatedProduct, ProductType } from '@/types/Product';
import { waiting } from '@/utils/waiting';
import { ApiRenponse } from './auth';

export type CommentType = {
    _id: string;
    userId: ApiRenponse;
    text: string;
    productId: ProductType;
    parentCommentId?: string;
    createdAt: Date;
    updatedAt: Date;
}

type ExtendProduct = ProductType & {
    comments: CommentType[]
}

const productApi = createApi({
    reducerPath: 'product',
    tagTypes: ['Product'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        fetchFn: async (...arg) => {
            await waiting(2000);
            return fetch(...arg);
        }
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<PaginatedProduct, void>({
            query: () => '/products',
            providesTags: ['Product'],
        }),
        getProductsHot: builder.query<ProductType, void>({
            query: () => '/products/topProduct',
            providesTags: ['Product'],
        }),
        getProductById: builder.query<ExtendProduct, string>({
            query: (_id) => `/products/${_id}`,
            providesTags: ['Product'],
        }),

        createProduct: builder.mutation<ProductType, string>({
            query: (product) => ({
                url: '/products',
                method: 'POST',
                body: product,
            }),
            invalidatesTags: ['Product'],
        }),
        deleteProduct: builder.mutation<void, string>({
            query: (productId) => ({
                url: `/products/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation<ProductType, { productId: string; updatedProduct: Partial<ProductType> }>({
            query: ({ productId, updatedProduct }) => ({
                url: `/products/${productId}`,
                method: 'PATCH',
                body: updatedProduct,
            }),
            invalidatesTags: ['Product'],
        }),
        getTotalProduct: builder.query<{ total: number }, void>({
            query: () => ({
                url: '/products/quanlity',
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['Product'],
        })
    }),

})


export const { useGetProductsQuery, useGetProductByIdQuery, useDeleteProductMutation, useUpdateProductMutation, useCreateProductMutation, useGetTotalProductQuery, useGetProductsHotQuery } = productApi;
export default productApi