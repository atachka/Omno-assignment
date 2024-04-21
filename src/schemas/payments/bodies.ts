export const PaymentRequestBodySchema = {
  type: 'object',
  properties: {
    amount: { type: 'string' },
    currency: { type: 'string' },
    callback: { type: 'string', format: 'uri' },
    callbackFail: { type: 'string', format: 'uri' },
    lang: { type: 'string' },
    hookUrl: { type: 'string', format: 'uri' },
    billing: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        address1: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
        country: { type: 'string' },
        postalCode: { type: 'string' },
        phone: { type: 'string' },
        email: { type: 'string', format: 'email' },
        externalUserId: { type: 'string' },
      },
      required: [
        'firstName',
        'lastName',
        'address1',
        'city',
        'state',
        'country',
        'postalCode',
        'phone',
        'email',
        'externalUserId',
      ],
    },
  },
  required: [
    'amount',
    'currency',
    'callback',
    'callbackFail',
    'lang',
    'hookUrl',
    'billing',
  ],
};

export const ConfirmPaymentIntent = {
  type: 'object',
  properties: {
    paymentIntentId: { type: 'string' },
    card: {
      type: 'object',
      properties: {
        number: { type: 'string', minLength: 16, maxLength: 16 },
        expiry: { type: 'string', minLength: 7, maxLength: 7 },
        cvc: { type: 'string', minLength: 3, maxLength: 3 },
      },
      required: ['number', 'expiry', 'cvc'],
    },
  },
  required: ['paymentIntentId', 'card'],
};
