import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type OptionType = {
    _id: string;
    name: String;
};

const optionApi = createApi({
    reducerPath: 'option',
    tagTypes: ['Option'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        fetchFn: async (...arg) => {
            return fetch(...arg);
        },
    }),
    endpoints: (builder) => ({
        getColors: builder.query<OptionType[], void>({
            query: () => '/color',
            providesTags: ['Option'],
        }),
        getBrands: builder.query<OptionType[], void>({
            query: () => '/brand',
            providesTags: ['Option'],
        }),
        getSizes: builder.query<OptionType[], void>({
            query: () => '/size',
            providesTags: ['Option'],
        }),
    }),
});

export const { useGetColorsQuery, useGetBrandsQuery, useGetSizesQuery } = optionApi;
export default optionApi;
