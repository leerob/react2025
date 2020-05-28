---
title: Stripe
---

Let's set up Stripe Checkout to allow us to accept recurring payments (subscriptions).

### Set up Stripe

First, set up a [Stripe account](https://dashboard.stripe.com/register) and add an account name. Next, let's install the stripe Node library.

```bash
yarn add stripe
```

### Add Products and Prices

As mentioned in the last section, we have three different pricing tiers we'll want to offer for [Fast Feedback](/product-overview). Let's add this information to the Stripe dashboard.

1. Toggle **View test data** at the bottom of the dashboard.
1. Navigate to the [Products](https://dashboard.stripe.com/products) section in the Dashboard
1. Click **Add product**
1. Select “Recurring” when setting the price
1. Configure the pricing plan

We'll define three pricing plans for our single software product.

:::note
Products created in test mode can be copied to live mode so that you don’t need to recreate them. In the Product detail view in the Dashboard, click **Copy to live mode** on the upper right corner. You can only do this once for each product created in test mode. Subsequent updates to the test product are not reflected for the live product.
:::

### Create a Checkout Session (Server-side)

Now that we've defined our product and prices, let's create a new API route to establish a checkout session. This allows us to securely access Stripe by providing our API key as an environment variable on the server-side.

When a customer successfully completes their payment, they are redirected to the `success_url`, a page on your website that informs the customer that their payment was successful. For our application, let's redirect back to the account page to show their updated pricing plan.

When a customer clicks on the logo in a Checkout Session without completing a payment, Checkout redirects them back to your website by navigating to the `cancel_url`. Typically, this is the page on your website that the customer viewed prior to redirecting to Checkout.

**Note:** The `PRICE_ID` will be forwarded from the client-side.

**`pages/api/checkout.js`**

```js
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

export default async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: '{{PRICE_ID}}',
        quantity: 1
      }
    ],
    mode: 'subscription',
    success_url:
      'https://fastfeedback.io/account?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://fastfeedback.io'
  });

  return res.status(200).json(session);
};
```

### Redirect to Checkout (Client-side)

First, install the Stripe JavaScript library.

```bash
yarn add @stripe/stripe-js
```

Next, we need to load Stripe with our publishable key. This will return a `Promise` that resolves with the `Stripe` object once it's finished loading.

Then, call `redirectToCheckout` and provide the Session `id` we generated from the API route as a parameter.

**`pages/account.js`**

```js
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Account = () => {
  const handleClick = async (event) => {
    // Call your backend to create the Checkout session.
    const { sessionId } = await fetch('/api/checkout');
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.error(error.message);
  };

  return (
    <button role="link" onClick={handleClick}>
      Checkout
    </button>
  );
};

export default Account;
```

### Test a Payment

Stripe provides [test cards](https://stripe.com/docs/testing) to verify your payment flow works as expected. You can use any CVC, postal code, and future expiration date. To test a successful payment, use `4242 4242 4242 4242`.

If the payment was succesful, Stripe should redirect the user back to your `success_url` parameter (`/account`). You should also see the subscription listed as a new entry on your [Stripe dashboard](https://dashboard.stripe.com/subscriptions).

![Stripe Dashboard](/img/stripe.png)

### Subscriptions

- https://stripe.com/docs/billing/subscriptions/fixed-price
- https://github.com/stripe-samples/nextjs-typescript-react-stripe-js
- https://stripe.com/docs/payments/checkout/set-up-a-subscription

More, newer links. [Stripe Billing](https://stripe.com/billing).

- https://dashboard.stripe.com/test/dashboard
- https://stripe.com/docs/billing/subscriptions/integrating-self-serve-portal
- https://stripe.com/docs/payments/checkout/client-subscription

![Stripe self-serve dashboard](/img/stripe-self-service.png)
