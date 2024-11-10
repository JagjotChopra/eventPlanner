const express = require('express');
const router = express.Router();
const stripe = require('stripe')('STRIPE_SECRET_KEY');

router.post('/create-payment-intent', async (req, res) => {
    const { totalAmount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'cad',
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'Unable to create payment intent' });
    }

});

module.exports = router;
