import instance from "./config";

interface PaymentData {
  id: string;
  vnp_ResponseCode: string;
}

const paymentApi = {
  createUrlPayment: async (data: any): Promise<any> => {
    return await instance.post("/create_payment_url", data);
  },
  changStatusPayment: async (data: PaymentData): Promise<any> => {
    return await instance.get(
      `/vnpay_checkout_result/${data.id}?vnp_ResponseCode=${data.vnp_ResponseCode}`
    );
  },
};

export default paymentApi;
