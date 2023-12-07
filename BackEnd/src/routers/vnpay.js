
import config from 'config'
import dateformat from 'dateformat'
import querystring from 'qs'
import crypto from 'crypto'
import moment from 'moment'
import Order from '../models/order.js';
import shortid from 'shortid'

import { Router } from 'express'


const router = Router()

function sortObject(obj) {
    var sorted = {};
    var str = [];
    var key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

router.post('/create_payment_url', async (req, res) => {


    const { shipping, userId,products, fullName, phone, email } = req.body

    var orderNumber = shortid.generate();

    var newOrder = new Order({
        orderNumber,
        products,
        userId,
        payMethod: 1,
        shipping,
        status: 1,
        total: req.body.amount,
        fullName,
        phone,
        email,
        isPaid: false,
    });

    await newOrder.save();

    try {

        var ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        var tmnCode = '5KSAO4YT'
        var secretKey = 'ZGZQDKANASDZFMKWPNMOEZXYPBLBFTXL'
        var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'

        var returnUrl = `http://localhost:5173/success/${newOrder._id}`

        var date = new Date();
        var createDate = moment(date).format("YYYYMMDDHHmmss");

        var orderId = req.body.orderid;
        var amount = req.body.amount;
        var bankCode = req.body.bankCode;
        var orderInfo = req.body.orderDescription;
        var orderType = req.body.orderType;
        var locale = req.body.language;
        if (locale === null || locale === '') {
            locale = 'vn';
        }
        var currCode = 'VND';
        var vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        // vnp_Params['vnp_Merchant'] = ''
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = orderInfo;
        vnp_Params['vnp_OrderType'] = orderType;
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);

        var signData = querystring.stringify(vnp_Params, { encode: false });
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

        res.json({ url: vnpUrl })
    } catch (error) {
        console.log(error.message);
    }
});

export default router
// Vui lòng tham khảo thêm tại code demo