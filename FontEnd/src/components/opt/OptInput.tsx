import { useForgotPasswordMutation } from '@/services/auth';
import { Button, Form, Input, Space, message } from 'antd';
import { AxiosError } from 'axios';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    email: string;
    otp: number;
    token?: string;
    userId?: string;
}

const OptInput: FC<Props> = ({ email, otp, token, userId }) => {
    const router = useNavigate();

    const [timerCount, setTimer] = useState(60);
    const [disable, setDisable] = useState(true);
    const [OTPinput, setOTPinput] = useState<Number[]>([0, 0, 0, 0]);

    const [form] = Form.useForm();

    const [resendOTPSubmit, {}] = useForgotPasswordMutation();

    const resendOTP = async () => {
        let OTPVeryfy = Math.floor(1000 + Math.random() * 9000);
        if (disable) return;

        try {
            resendOTPSubmit({
                email,
                otp: OTPVeryfy,
            });

            form.resetFields();

            setDisable(true);
            message.info('OTP đã được gửi lại');
            setTimer(60);
        } catch (error) {
            message.error((error as AxiosError).message);
        }
    };

    const verfiyOTP = async () => {
        if (parseInt(OTPinput.join('')) === otp) {
            router(`/account/change-password?token=${token}&userId=${userId}`);
        }
    };

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
        <div className="flex justify-center items-center bg-gray-50">
            <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>Email Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>We have sent a code to your email</p>
                        </div>
                    </div>

                    <div>
                        <Form form={form} onFinish={verfiyOTP}>
                            <div className="flex flex-col space-y-16">
                                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                    <Form.Item>
                                        <Space.Compact size="large">
                                            <Input
                                                onChange={(e) =>
                                                    setOTPinput([
                                                        Number(e.target.value),
                                                        OTPinput[1],
                                                        OTPinput[2],
                                                        OTPinput[3],
                                                    ])
                                                }
                                                className="py-4 text-center text-2xl"
                                                maxLength={1}
                                            />
                                            <Input
                                                onChange={(e) =>
                                                    setOTPinput([
                                                        OTPinput[0],
                                                        Number(e.target.value),
                                                        OTPinput[2],
                                                        OTPinput[3],
                                                    ])
                                                }
                                                className="py-4 text-center text-2xl"
                                                maxLength={1}
                                            />
                                            <Input
                                                onChange={(e) =>
                                                    setOTPinput([
                                                        OTPinput[0],
                                                        OTPinput[1],
                                                        Number(e.target.value),
                                                        OTPinput[3],
                                                    ])
                                                }
                                                className="py-4 text-center text-2xl"
                                                maxLength={1}
                                            />
                                            <Input
                                                onChange={(e) =>
                                                    setOTPinput([
                                                        OTPinput[0],
                                                        OTPinput[1],
                                                        OTPinput[2],
                                                        Number(e.target.value),
                                                    ])
                                                }
                                                className="py-4 text-center text-2xl"
                                                maxLength={1}
                                            />
                                        </Space.Compact>
                                    </Form.Item>
                                </div>

                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <Button
                                            disabled={parseInt(OTPinput.join('')) === otp ? false : true}
                                            htmlType="submit"
                                            type="default"
                                            className="w-full"
                                        >
                                            Verify Account
                                        </Button>
                                    </div>

                                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                        <p>Didn't recieve code?</p>{' '}
                                        <a
                                            className="flex flex-row items-center"
                                            style={{
                                                color: disable ? 'gray' : 'blue',
                                                cursor: disable ? 'none' : 'pointer',
                                                textDecorationLine: disable ? 'none' : 'underline',
                                            }}
                                            onClick={() => resendOTP()}
                                        >
                                            {disable ? `Resend OTP in ${timerCount}s` : 'Resend OTP'}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OptInput;
