
import express from 'express'
import Stripe from 'stripe';
import Order from '../models/order.js';
import shortid from 'shortid'

const router = express.Router();
const stripe = Stripe('sk_test_51OCJujAEqVUq8VkzDJtQAGwMBgQB9tD2buWu9urM0s1WsOsNeD1DfRmaBPmKBr7H5cpbbTnXoApDNQJjrOgCTdH700viotKJEd');

const YOUR_DOMAIN = 'http://localhost:5173'

router.post('/create-checkout-session', async (req, res) => {

    const { shipping, total, payMethod, status, userId, cartItems, fullName, phone, email, isPaid } = req.body

    const customer = await stripe.customers.create({
        metadata: {
            userId: userId,
            cart: JSON.stringify(cartItems.toString())
        }
    })

    const line_items = req.body.cartItems.map((item) => {
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.images[0]],
                    description: item.description,
                    metadata: {
                        id: item._id
                    }
                },
                unit_amount: Math.round(item.price * 100)
            },
            quantity: item.quantity
        }
    })

    const orderNumber = shortid.generate();

    const newOrder = new Order({
        orderNumber,
        products: cartItems,
        userId,
        payMethod,
        shipping,
        status,
        total,
        fullName,
        phone,
        email,
        isPaid
    });

    await newOrder.save();

    const session = await stripe.checkout.sessions.create({

        payment_method_types: ["card"],
        line_items,
        customer: customer.id,
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/success/${newOrder._id}`,
        cancel_url: `${YOUR_DOMAIN}/cancelled/${newOrder._id}`,
    });

    res.send({ url: session.url })

});

router.delete('/cancelled/:id', async (req, res) => {

    try {
        await Order.findOneAndDelete({ _id: req.params.id })

        return res.status(200).json({ success: true })


    } catch (error) {
        return res.status(400).json({ success: false })
    }
})

// Create order

// const createOrder = async (customer, data) => {
//     const Items = JSON.parse(customer.metadata.cart);

//     const newOrder = new Order({
//         userId: customer.metadata.userId,
//         customerId: data.customer,
//         paymentIntentId: data.payment_intent,
//         products: Items,
//         subtotal: data.amount_subtotal,
//         shipping: data.customer_details,
//         payMethod: 1,
//         status: 2
//     })

//     try {
//         const saveProduct = await newOrder.save();

//         console.log('PROCESSING ORDER', saveProduct);
//     } catch (error) {
//         console.log('ERROR', error.message);
//     }
// }

// Stripe webhook

// let endpointSecret;
// //  = "whsec_c9ba2ff33b0139f67e675d2155039b25fb2932f40148868d5892166cf19c32ca";

// router.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
//     const sig = request.headers['stripe-signature'];

//     let data;
//     let eventType;

//     if (endpointSecret) {
//         let event;


//         try {
//             event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//             console.log('Webhook verified');
//         } catch (err) {
//             console.log('Webhook Error', err.message);
//             response.status(400).send(`Webhook Error: ${err.message}`);
//             return;
//         }

//         data = event.data.object;
//         eventType = event.type;


//     } else {

//         data = request.body.data.object;
//         eventType = request.body.type;

//     }

//     // Handle the event
//     if (eventType === 'checkout.session.completed') {
//         stripe.customers.retrieve(data.customer).then(async (customer) => {

//             console.log('CUSTOMER',customer);
//             console.log('DATA',data);

//             createOrder(customer, data)
//         }).catch((err) => {
//             console.log(err.message);
//         })
//     }

//     // Return a 200 response to acknowledge receipt of the event
//     response.send().end();
// });


export default router;