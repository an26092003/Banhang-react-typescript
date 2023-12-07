import { useLogoutMutation, useMeQuery } from "@/services/auth";
import { useGetAccountCommentsQuery } from "@/services/comment";
import { useCalculateRevenueByMonthQuery, useCalculateRevenueByYearQuery, useGetOrderStatisticsQuery, useGetRevenueByDaysQuery, useGetRevenueStatisticsQuery } from "@/services/order";
import { useGetTotalProductQuery } from "@/services/product";
import { useGetAccountQuery } from "@/services/user";
import { useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const DashBoard = () => {
    const { data: DataComment } = useGetAccountCommentsQuery();
    const { data: DataUser } = useGetAccountQuery()
    const { data: revenueData } = useGetRevenueStatisticsQuery()
    const { data: totalProduct } = useGetTotalProductQuery()
    const { data: DataOrders } = useGetOrderStatisticsQuery()
    const { data: revenueByDay = {} } = useGetRevenueByDaysQuery()
    const { data: revenueByMonthData } = useCalculateRevenueByMonthQuery();
    const {data:revenueByYearData} = useCalculateRevenueByYearQuery()
    const usage = DataUser?.usage ?? 0;
    const totalComments = DataComment?.totalComments ?? 0;
    const totalP = totalProduct?.total ?? 0;
    const totalRevenue = revenueData?.totalRevenue ?? 0;
    const totalTotal = DataOrders?.totalOrders ?? 0;
    const { data: authData } = useMeQuery();
    const isAdmin = authData?.role === 'admin';
    useEffect(() => {

    }, [revenueByDay, revenueByMonthData]);

    const chartData = Object.keys(revenueByDay).map((date) => ({
        name: date,
        revenue: revenueByDay[date],
    }));
    


    return (
        <>
            <div className="grid grid-cols-4 gap-4 mb-4">
                <article
                    className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6"
                >
                    <div
                        className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                        </svg>

                        {/* <span className="text-xs font-medium"> 67.81% </span> */}
                    </div>

                    <div>
                        <strong className="block text-sm font-medium text-gray-500"> Bình luận </strong>

                        <p>
                            <span className="text-2xl font-medium text-gray-900"> {totalComments} </span>

                            <span className="text-xs text-gray-500"> bình luận </span>
                        </p>
                    </div>
                </article>
                <article
                    className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6"
                >
                    <div
                        className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                        </svg>

                        {/* <span className="text-xs font-medium"> 67.81% </span> */}
                    </div>

                    <div>
                        <strong className="block text-sm font-medium text-gray-500"> Sản phẩm</strong>

                        <p>
                            <span className="text-2xl font-medium text-gray-900"> {totalP} </span>

                            <span className="text-xs text-gray-500"> Tổng số sản phẩm hiện có </span>
                        </p>
                    </div>
                </article>
                {isAdmin && (
                    <article
                        className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6"
                    >
                        <div
                            className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                            </svg>
                        </div>
                        <div>
                            <strong className="block text-sm font-medium text-gray-500"> User </strong>
                            <p>
                                <span className="text-2xl font-medium text-gray-900"> {usage}</span>
                                <span className="text-xs text-gray-500"> user </span>
                            </p>
                        </div>
                    </article>
                )}

                <article
                    className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6"
                >
                    <div
                        className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                        </svg>

                        {/* <span className="text-xs font-medium"> 67.81% </span> */}
                    </div>

                    <div>
                        <strong className="block text-sm font-medium text-gray-500"> Doanh thu </strong>

                        <p>
                            <span className="text-2xl font-medium text-gray-900"> {totalRevenue}</span>

                            <span className="text-xs text-gray-500"> VND </span>
                        </p>
                    </div>

                </article>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-4">
                <article
                    className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6"
                >
                    <div
                        className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                        </svg>

                        {/* <span className="text-xs font-medium"> 67.81% </span> */}
                    </div>

                    <div>
                        <strong className="block text-sm font-medium text-gray-500"> Tổng đơn hàng </strong>

                        <p>
                            <span className="text-2xl font-medium text-gray-900"> {totalTotal}</span>

                            <span className="text-xs text-gray-500"> đơn hàng </span>
                        </p>
                    </div>

                </article>

            </div>
            <div className="grid grid-cols-2 gap-4 mb-20 mt-40">
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <BarChart width={600} height={300} data={revenueByMonthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="monthYear" />
                        {/* <YAxis reversed={true} /> */}
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalRevenue" fill="#8884d8" barSize={20} />
                    </BarChart>
                </div>
                
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <BarChart width={600} height={300} data={chartData}>
                        <XAxis dataKey="name" stroke="#8884d8" />
                        {/* <YAxis reversed={true} /> */}
                        <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                        <Legend
                            width={100}
                            wrapperStyle={{
                                top: 40,
                                right: 20,
                                backgroundColor: '#f5f5f5',
                                border: '1px solid #d5d5d5',
                                borderRadius: 3,
                                lineHeight: '40px',
                            }}
                        />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <Bar dataKey="revenue" fill="#8884d8" barSize={10} />
                    </BarChart>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800 mt-60">
                <BarChart width={600} height={300} data={revenueByYearData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        {/* <YAxis reversed={true} /> */}
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalRevenue" fill="#8884d8" barSize={20} />
                    </BarChart>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </p>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </p>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </p>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </p>
                </div>
            </div>
        </>
    )
}

export default DashBoard