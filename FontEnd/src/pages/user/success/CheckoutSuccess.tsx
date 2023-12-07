import { useMeQuery } from '@/services/auth';
import { useUpdateOrderStatusMutation } from '@/services/order';
import { clear } from '@/slices/cart';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { Status } from '@/types/status';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CheckoutSuccess = () => {
    const { id } = useParams();
    const router = useNavigate();
    const dispatch = useAppDispatch();
    const { cartItems } = useAppSelector((state) => state.cart);
    const shouldLog = useRef(true);

    const [update] = useUpdateOrderStatusMutation();
    const [timerCount, setTimer] = useState(5);
    const [disable, setDisable] = useState(true);
    const { data } = useMeQuery();

    function timeout(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const makeRequestInStock = async () => {
        let holder: any = {};

        cartItems.forEach((d) => {
            if (holder.hasOwnProperty(d._id)) {
                holder[d._id] = holder[d._id] + d.quantity;
            } else {
                holder[d._id] = d.quantity;
            }
        });

        let obj2 = [];

        for (const prop in holder) {
            obj2.push({ key: prop, value: holder[prop] });
        }

        await timeout(1000);

        obj2.map(async (obj) => {
            await axios.patch(`http://localhost:8080/api/products/instock/${obj.key}`, {
                value: obj.value,
            });
        });
    };

    const makeRequest = () => {
        update({
            orderId: id!,
            status: Status.ORDER_CONFIRM,
            isPaid: true,
        });
    };

    useEffect(() => {
        if (shouldLog.current) {
            shouldLog.current = false;
            makeRequest();
            makeRequestInStock();
            dispatch(clear());

            setTimeout(() => {
                router('/');
            }, 5000);
        }
    }, []);

    useEffect(() => {
        let interval = setInterval(() => {
            setTimer((lastTimerCount) => {
                lastTimerCount <= 1 && clearInterval(interval);
                if (lastTimerCount <= 1) setDisable(false);
                if (lastTimerCount <= 0) return lastTimerCount;
                return lastTimerCount - 1;
            });
        }, 1000); //each count lasts for a second
        //cleanup the interval on complete
        return () => clearInterval(interval);
    }, [disable]);

    return (
        <div className="bg-gray-100 h-screen flex items-center">
            <div className="bg-white p-6 max-w-3xl w-full rounded md:mx-auto">
                <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                    <path
                        fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                    ></path>
                </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
                    <p className="text-gray-600 my-2">
                        Cảm ơn khách hàng{' '}
                        <span className="text-red-500 font-semibold text-lg">
                            {data ? data?.username : ''} đã ủng hộ
                        </span>
                    </p>
                    <p> Chúc bạn 1 ngày vui vẻ 🥰! </p>{' '}
                    <a href="/" className="text-primary mt-2 block">
                        Trở lại
                    </a>
                    <div className="flex mt-4 flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                        {disable && `Trở lại sau ${timerCount}s`}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccess;
