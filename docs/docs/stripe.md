---
title: Stripe
---

Let's set up Stripe to accept recurring payments (subscriptions) and access the customer portal.

### Add Products and Prices

First, set up a [Stripe account](https://dashboard.stripe.com/register) and add an account name.As mentioned in the last section, we have three different pricing tiers we'll want to offer for [Fast Feedback](/product-overview). Let's add this information to the Stripe dashboard.

1. Toggle **View test data** at the bottom of the dashboard.
1. Navigate to the [Products](https://dashboard.stripe.com/products) section in the Dashboard
1. Click **Add product**
1. Select “Recurring” when setting the price
1. Configure the pricing plan

We'll define three pricing plans for our single software product.

:::note
Products created in test mode can be copied to live mode so that you don’t need to recreate them. In the Product detail view in the Dashboard, click **Copy to live mode** on the upper right corner. You can only do this once for each product created in test mode. Subsequent updates to the test product are not reflected for the live product.
:::

### Set up Stripe

Let's install the stripe React library.

```bash
yarn add @stripe/stripe-js
```

Next, we need to load Stripe with our publishable key. This will return a `Promise` that resolves with the `Stripe` object once it's finished loading. You can grab the publishable key from your Stripe dashboard. Add the value to your `.env.local` file named `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.

**`pages/account.js`**

```js
import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }

  return stripePromise;
};

export default getStripe;
```

### Firebase Extension

TODO

### Testing

Stripe provides [test cards](https://stripe.com/docs/testing) to verify your payment flow works as expected. You can use any CVC, postal code, and future expiration date. To test a successful payment, use `4242 4242 4242 4242`.

If the payment was succesful, Stripe should redirect the user back to your `success_url` parameter (`/account`). You should also see the subscription listed as a new entry on your [Stripe dashboard](https://dashboard.stripe.com/subscriptions).

![Stripe Dashboard](/img/stripe.png)

### Customer Portal

![Stripe self-serve dashboard](/img/stripe-self-service.png)
