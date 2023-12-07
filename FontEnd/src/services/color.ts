import { ProductType } from '@/types/Product';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { waiting } from '@/utils/waiting';
export type IColor = {
    _id: string;
    name: string;
    createdAt: string;
    updateAt: string;
    products: ProductType[];
};
export interface ColorType {
    _id: string;
    name: string;
}

export interface PaginatedColor {
    docs: ColorType[];
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

const colorApi = createApi({
    reducerPath: 'color',
    tagTypes: ['Color'],
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:8080/api`,
        fetchFn: async (...arg) => {
            await waiting(2000);
            return fetch(...arg);
        },
    }),
    endpoints: (builder) => ({
        getAllColor: builder.query<PaginatedColor, void>({
            query: () => '/color',
            providesTags: ['Color'],
        }),
        getByIdColor: builder.query<IColor, string>({
            query: (_id) => `/color/${_id}`,
            providesTags: ['Color'],
        }),
        createColor: builder.mutation<IColor, string>({
            query: (color) => ({
                url: `color`,
                method: 'POST',
                body: color,
            }),
            invalidatesTags: ['Color'],
        }),
        removeColor: builder.mutation<IColor, string>({
            query: (id: string) => ({
                url: `color/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Color'],
        }),
        updateColor: builder.mutation<IColor, { id: string; color: Partial<IColor> }>({
            query: ({ id, color }) => ({
                url: `color/${id}`,
                method: 'PUT',
                body: { ...color, updateAt: new Date().toISOString() }
            }),
            invalidatesTags: ['Color'],
        })
    })
})

export const { useGetAllColorQuery,
    useGetByIdColorQuery,
    useCreateColorMutation,
    useRemoveColorMutation,
    useUpdateColorMutation } = colorApi
export default colorApi