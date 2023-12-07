import { Hoandon, IProductorder, Iuser, PaginatedOrder } from '@/types/order';
import { IOrder } from '@/types/order';
import { waiting } from '@/utils/waiting';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export type IdType = {
  _id: string;
  orderNumber: string;
  status: number;
  phone: number;
  fullName: string;
  shipping: string;
  products: IProductorder[];
  userId: string;
  payMethod: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  Iuser: Iuser[]
  order:IOrder[],
  LydoHoandon:string;
  Motahoandon:string,
  Emaill:string,
}


const orderApi = createApi({
  reducerPath: "order",
  tagTypes: ['Order'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api',
    fetchFn: async (...arg) => {
      await waiting(1000);
      return fetch(...arg)
    }
  }),


  endpoints: (builder) => ({


    calculateRevenueByYear: builder.query({
      query: () => '/revenue-by-year',
      providesTags: ['Order'],
    }),

    calculateRevenueByMonth: builder.query({
      query: () => '/revenue-by-month',
      providesTags: ['Order'],
    }),

    getRevenueByDays: builder.query({
      query: () => '/revenue-by-day',
      providesTags: ['Order'],
    }),

    getOrderStatistics: builder.query<{ totalOrders: number }, void>({
      query: () => '/order/statistics',
    }),

    getRevenueStatistics: builder.query<{ totalRevenue: number }, void>({
      query: () => ({
        url: '/orders',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Order'],
    }),
    getsOrder: builder.query<PaginatedOrder, void>({
      query: () => '/order',
      providesTags: ['Order'],
    }),
    getProductById: builder.query<IOrder, string>({
      query: (_id) => `/order/${_id}`,
      providesTags: ['Order']
    }),
    createOrder: builder.mutation<IOrder, IOrder>({
      query: (order) => ({
        url: '/order',
        method: 'POST',
        body: order
      }),
      invalidatesTags: ['Order']
    }),
    updateOrderStatus: builder.mutation<IOrder, { orderId: string, status: number, isPaid?: boolean }>({
      query: ({ orderId, status, isPaid }) => ({
        url: `/order/${orderId}/status`,
        method: 'PUT',
        body: { status, isPaid },
      }),
      invalidatesTags: ['Order'],
    }),
    returnOrder: builder.mutation<Hoandon, { orderId: string, LydoHoandon: string, Motahoandon: string, Emaill: string }>({
      query: ({ orderId, LydoHoandon, Motahoandon, Emaill }) => ({
        url: `/order/${orderId}/return`,
        method: 'POST',
        body: { status: 5, LydoHoandon, Motahoandon, Emaill },
      }),
      invalidatesTags: ['Order'],
    }),
    getOrderById: builder.query<IdType, string>({
      query: (_id) => `/order/${_id}`,
      providesTags: ['Order'],
    }),
  }),
})
export const {useReturnOrderMutation,  useGetOrderByIdQuery, useGetsOrderQuery,
  useGetProductByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
  useGetRevenueStatisticsQuery,
  useGetOrderStatisticsQuery,
  useGetRevenueByDaysQuery,
  useCalculateRevenueByMonthQuery,
  useCalculateRevenueByYearQuery } = orderApi
export default orderApi
