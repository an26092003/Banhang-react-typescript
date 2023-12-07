import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { waiting } from '@/utils/waiting';
interface ApiLoginInput {
    usernameOrEmail: string;

    password: string;
}

interface ApiRegisterInput {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface ForgotPasswordInput {
    email: string;
    otp?: number;
    userId?: string;
    token?: string;
}

interface ChangePasswordInput {
    password: string;
    userId: string;
    token: string;
}

export interface ApiRenponse {
    _id: string;
    email: string;
    favourite: any[];
    username: string;
    role: string;
    phone: number;
    address: string;
    avatar:string;
}

const authApi = createApi({
    reducerPath: 'auth',
    tagTypes: ['Auth'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        fetchFn: async (...arg) => {
            await waiting(2000);
            return fetch(...arg);
        },
    }),
    endpoints: (builder) => ({
        me: builder.query<ApiRenponse, void>({
            query: () => ({
                url: '/me',
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['Auth'],
        }),
        signin: builder.mutation<ApiRenponse, ApiLoginInput>({
            query: (credential) => ({
                url: '/signin',
                method: 'POST',
                body: credential,
                credentials: 'include',
            }),
            invalidatesTags: ['Auth'],
        }),
        signup: builder.mutation<ApiRenponse, ApiRegisterInput>({
            query: (credential) => ({
                url: '/signup',
                method: 'POST',
                body: credential,
                credentials: 'include',
            }),
            invalidatesTags: ['Auth'],
        }),
        logout: builder.mutation<boolean, void>({
            query: () => ({
                url: '/logout',
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['Auth'],
        }),
        forgotPassword: builder.mutation<{ success: boolean; otp: number, token?: string; userId?: string; }, ForgotPasswordInput>({
            query: (email) => ({
                url: '/forgot-password',
                method: 'POST',
                body: email,
            }),
            invalidatesTags: ['Auth'],
        }),
        changePassword: builder.mutation<{ success: true }, ChangePasswordInput>({
            query: (newPassword) => ({
                method: 'PATCH',
                url: '/change-password',
                body: newPassword
            }),
            invalidatesTags: ['Auth']
        })
    }),
});

export const { useSigninMutation, useSignupMutation, useLogoutMutation, useMeQuery, useForgotPasswordMutation, useChangePasswordMutation } =
    authApi;
export default authApi;
