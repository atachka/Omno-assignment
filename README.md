# Stripe Payments Integration in Omno API Node.js

## Overview

This repository contains code for integrating Stripe Payments into an Omno API Node.js project. Stripe is a popular payment processing platform that provides powerful APIs and tools for accepting online payments.

## Installation

1. Install dependencies

   ```bash
   npm install

   ```

2. Create .env file
   ```plaintext
   STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_PUBLISHABLE_KEY
   STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
   OMNO_CLIENT_ID=YOUR_OMNO_CLIENT_ID
   OMNO_CLIENT_SECRET=YOUR_OMNO_CLIENT_SECRET
   baseUrl=YOUR_BASE_URL
	```
    
3. Run the app
   ```bash
   npm run dev
   ```

## How it Works

1.  Generate a payment intent by making a request to the /payments/create endpoint.
2.  Open the Url that is generated.
3.  Fill the inputs and send request for payment intent confirmation.

    ![Alt Text](https://iili.io/JSnJslj.png)
