import Stripe from 'stripe';

const stripe = Stripe('sk_test_51OCJujAEqVUq8VkzDJtQAGwMBgQB9tD2buWu9urM0s1WsOsNeD1DfRmaBPmKBr7H5cpbbTnXoApDNQJjrOgCTdH700viotKJEd');

export const stripePay = async (req, res) => {

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 100 * 100,
        currency: "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
            enabled: true,
        },
    });
    

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
}