import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { waiting } from '@/utils/waiting';
import { PaginatedDiscount } from '@/types/discount';
export type IDiscount = {
    _id: number | string,
    code: string;
    discount: number;
    count: number;
    maxAmount: number;
    startDate: Date;
    endDate: Date;
};
const discountApi = createApi({
    reducerPath: 'Discount',
    tagTypes: ['Discount'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        fetchFn: async (...arg) => {
            await waiting(2000);
            return fetch(...arg);
        },
    }),
    endpoints: (builder) => ({
        //lay tat ca
        getDiscounts: builder.query<PaginatedDiscount, void>({
            query: () => '/discounts',
            providesTags: ['Discount'],
        }),
        // lay ra 1
        getDiscountsById: builder.query<IDiscount, string>({
            query: (_id) => `/discounts/${_id}`,
            providesTags: ['Discount'],
        }),
        // them
        createDiscounts: builder.mutation<IDiscount, string>({
            query: (category) => ({
                url: '/discounts',
                method: 'POST',
                body: category,
            }),
            invalidatesTags: ['Discount'],
        }),
        // xoa 
        deleteDiscounts: builder.mutation<void, string>({
            query: (categoryId) => ({
                url: `/discounts/${categoryId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Discount'],
        }),
        // cap nhat
        updateDiscounts: builder.mutation<IDiscount, { categoryId: string; category: Partial<IDiscount> }>({
            query: ({ categoryId, category }) => ({
                url: `/discounts/${categoryId}`,
                method: 'PUT',
                body: { ...category },
            }),
            invalidatesTags: ['Discount'],
        }),
    }),
});
export const {
    useCreateDiscountsMutation,
    useDeleteDiscountsMutation,
    useGetDiscountsByIdQuery,
    useUpdateDiscountsMutation,
    useGetDiscountsQuery
} = discountApi;
export default discountApi;