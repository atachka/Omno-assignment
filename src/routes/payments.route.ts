import {
  getPaymentForm,
  handlePaymentIntentCreation,
  handlePaymentIntentConfirmation,
} from '../controllers/index.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';
import {
  ConfirmPaymentIntent,
  PaymentRequestBodySchema,
} from '../schemas/payments/index.js';

export const paymentsRoutes = (fastify, options, done) => {
  // Returns iFrame
  fastify.get('/:id', getPaymentForm);

  // Creates payment intent
  fastify.post(
    '/create',
    {
      preHandler: [AuthMiddleware],
      schema: { body: PaymentRequestBodySchema },
    },
    handlePaymentIntentCreation,
  );
  // Confirms payment intent
  fastify.post(
    '/confirm',
    { schema: { body: ConfirmPaymentIntent } },
    handlePaymentIntentConfirmation,
  );

  done();
};
