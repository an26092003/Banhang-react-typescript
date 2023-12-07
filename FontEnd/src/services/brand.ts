import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { waiting } from '@/utils/waiting';

import { ProductType } from '@/types/Product';


export type TBrand = {
    _id: string;
    name: string;
    createdAt: string;
    updateAt: string;
    products: ProductType[];
};
export interface PaginatedBrand {
    docs: BrandType[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: null;
    page: number;
    pagingCounter: number;
    prevPage: null;
    totalDocs: number;
    totalPages: number;
   
}

export interface BrandType {
    _id: string;
    name: string;
   
}
const brandApi = createApi({
    reducerPath: 'brand',
    tagTypes: ['Brand'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        fetchFn: async (...arg) => {
            await waiting(2000);
            return fetch(...arg);
        },
    }),
    endpoints: (builder) => ({
        getBrands: builder.query<PaginatedBrand, void>({
            query: () => '/brand',
            providesTags: ['Brand'],
        }),
        getBrandId: builder.query<TBrand, string>({
            query: (_id) => `/brand/${_id}`,
            providesTags: ['Brand'],
        }),
        createBrand: builder.mutation<TBrand, string>({
            query: (category) => ({
                url: '/brand',
                method: 'POST',
                body: category,
            }),
            invalidatesTags: ['Brand'],
        }),
        deleteBrand: builder.mutation<void, string>({
            query: (brandId) => ({
                url: `/brand/${brandId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Brand'],
        }),

        updateBrand: builder.mutation<TBrand, { brandId: string; brand: Partial<TBrand> }>({
            query: ({ brandId, brand }) => ({
                url: `/brand/${brandId}`,
                method: 'PUT',
                body: { ...brand, updateAt: new Date().toISOString() },

            }),
            invalidatesTags: ['Brand'],
        }),
        getProductsByCategoryAndBrand: builder.query<ProductType[], { brandIds: string; brandId: string }>({
            query: ({ brandIds, brandId }) => ({
                url: '/products/categories',
                method: 'POST',
                body: { brandIds, brandId },
            }),
        }),
    }),
});

export const {useCreateBrandMutation, useDeleteBrandMutation ,useUpdateBrandMutation, useGetBrandIdQuery, useGetBrandsQuery, useGetProductsByCategoryAndBrandQuery } = brandApi;
export default brandApi;