import Stripe from 'stripe';
import dotenv from 'dotenv';
import axios from 'axios';
import PaymentDTO from '../types/dtos/createPaymentIntent.dto.js';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function retrievePaymentIntent(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    throw new Error('Failed to retrieve payment intent');
  }
}

export async function createPaymentIntent(
  access_token: string,
  body: PaymentDTO,
) {
  try {
    await axios.post('https://api.omno.com/transaction/create', body, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: body.amount,
      currency: body.currency,
      description: 'card',
      payment_method_types: ['card'],
    });

    return paymentIntent;
  } catch (error) {
    throw new Error('Failed to create payment intent');
  }
}

export async function confirmPaymentIntent(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      return_url: process.env.baseUrl,
      payment_method: 'pm_card_visa',
    });
    return paymentIntent;
  } catch (error) {
    throw new Error('Failed to confirm payment intent');
  }
}
