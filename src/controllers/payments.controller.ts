// paymentController.js
import {
  retrievePaymentIntent,
  createPaymentIntent,
  confirmPaymentIntent,
} from '../services/index.js';
import { generatePaymentForm } from '../utils/index.js';
import dotenv from 'dotenv';

dotenv.config();

export async function getPaymentForm(req, reply) {
  try {
    const paymentIntent = await retrievePaymentIntent(req.params.id);
    const formContent = generatePaymentForm(
      paymentIntent.id,
      paymentIntent.status,
      paymentIntent.amount,
      paymentIntent.currency,
    );

    reply.type('text/html').send(formContent);
  } catch (error) {
    reply.status(500).send({ error: 'Internal Server Error' });
  }
}

export async function handlePaymentIntentCreation(req, reply) {
  try {
    const paymentIntent = await createPaymentIntent(req.access_token, req.body);
    reply.send(`${process.env.baseUrl}/payments/${paymentIntent.id}`);
  } catch (error) {
    reply.status(500).send({ error: 'Internal Server Error' });
  }
}

export async function handlePaymentIntentConfirmation(req, reply) {
  try {
    const { paymentIntentId } = req.body;
    const paymentIntent = await confirmPaymentIntent(paymentIntentId);
    reply.send(paymentIntent);
  } catch (error) {
    reply.status(500).send({ error: 'Internal Server Error' });
  }
}
