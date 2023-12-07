import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { waiting } from '@/utils/waiting';
import { PaginatedUser, UserType } from '@/types/user';

export interface ExtendUser {
    data: UserType
}

const userApi = createApi({
    reducerPath: 'user',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        fetchFn: async (...arg) => {
            await waiting(2000);
            return fetch(...arg);
        },
    }),
    endpoints: (builder) => ({

        getAccount: builder.query<{ usage: number }, void>({
            query: () => ({
                url: '/statistics',
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['User'],
        }),
        getAllUser: builder.query<PaginatedUser, void>({
            query: () => '/User',
            providesTags: ['User'],
        }),
        getUserById: builder.query<ExtendUser, string>({
            query: (id) => `/User/${id}`,
            providesTags: ['User']
        }),
        updateUser: builder.mutation<ExtendUser, UserType>({
            query: (user) => ({
                url: `/User/${user._id}`,
                body: user,
                method: 'PATCH'
            }),
            invalidatesTags: ['User']
        }),
        avatar: builder.mutation<ExtendUser, {_id:string,avatar:string}>({
            query: (user) => ({
                method: 'PUT',
                url: `/user/${user._id}`,
                body: user,
            }),
            invalidatesTags: ['User']
        }),
        removeUser: builder.mutation<UserType, string>({
            query: (id) => ({
                url: `/User/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['User']
        })
    }),
});

export const { useGetAllUserQuery, useGetUserByIdQuery, useUpdateUserMutation, useRemoveUserMutation, useGetAccountQuery,useAvatarMutation } = userApi;
export default userApi;
