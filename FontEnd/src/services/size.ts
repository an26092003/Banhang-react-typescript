import { ProductType } from '@/types/Product';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { waiting } from '@/utils/waiting';
export type ISize = {
    _id: string;
    name: string;
    createdAt: string;
    updateAt: string;
    products: ProductType[];
};
export interface SizeType {
    _id: string;
    name: string;
}

export interface PaginatedSize {
    docs: SizeType[];
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

const sizeApi = createApi({
    reducerPath: 'size',
    tagTypes: ['Size'],
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:8080/api`,
        fetchFn: async (...arg) => {
            await waiting(2000);
            return fetch(...arg);
        },
    }),
    endpoints: (builder) => ({
        getAllSize: builder.query<PaginatedSize, void>({
            query: () => 'size',
            providesTags: ['Size'],
        }),
        getByIdSize: builder.query<ISize, string>({
            query: (_id) => `size/${_id}`,
            providesTags: ['Size'],
        }),
        createSize: builder.mutation<ISize, string>({
            query: (size) => ({
                url: 'size',
                method: 'POST',
                body: size,
            }),
            invalidatesTags: ['Size'],
        }),
        removeSize: builder.mutation<ISize, string>({
            query: (sizeId: string) => ({
                url: `size/${sizeId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Size'],
        }),
        updataSize: builder.mutation<ISize, { sizeId: string; size: Partial<ISize> }>({
            query: ({ sizeId, size }) => ({
                url: `size/${sizeId}`,
                method: 'PUT',
                body: { ...size, updateAt: new Date().toISOString() }
            }),
            invalidatesTags: ['Size'],
        })
    })
})

export const { useGetAllSizeQuery,
    useGetByIdSizeQuery,
    useCreateSizeMutation,
    useRemoveSizeMutation,
    useUpdataSizeMutation } = sizeApi
export default sizeApi