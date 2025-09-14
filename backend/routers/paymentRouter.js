const express = require('express');
const router = express.Router();
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent', async (req, res) => {
    const { amount, customerData } = req.body;
    try {
        const customer = await stripe.customers.create(customerData);
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'inr',
            description: 'Office Space Booking Payment',
            customer: customer.id
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret
        });

    } catch (error) {
        console.error('Stripe Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

router.post('/retrieve-payment-intent', async (req, res) => {
    const { paymentIntentId } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        res.status(200).json(paymentIntent);
    } catch (error) {
        console.error('Stripe Retrieve Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;