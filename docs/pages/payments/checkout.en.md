# Create a Checkout Session

For our product, we'll use [Stripe Checkout](https://stripe.com/docs/payments/checkout).
Checkout creates a secure, Stripe-hosted payment page that lets you collect payments quickly. It works across devices and is designed to increase your conversion.
Checkout saves you a lot of time providing some great features:

- **Designed to remove friction**—Real-time card validation with built-in error messaging
- **Mobile-ready**—Fully responsive design with Apple Pay and Google Pay
- **International**—Supports [15 languages](https://support.stripe.com/questions/supported-languages-for-stripe-checkout) and multiple payment methods
- **Customization and branding**—Customizable buttons and background color
- **Fraud and compliance**—Simplified PCI compliance and [SCA-ready](https://stripe.com/docs/strong-customer-authentication)
- **Additional features**—Collect addresses, send email receipts, and more

## Setup

Creating a Checkout session is very easy with the Stripe Firebase Extension. Inside our client-side database file, we can create a new Checkout session.
Replace the `price` variable with whatever ID was created inside your Firebase database.

import Callout from 'nextra-theme-docs/callout'

<Callout>
Before going to production, you'll want to either query your Products collection to fetch the price or set it as an environment variable, since the value is different between environments.
</Callout>

After creating the Checkout session, the Stripe Firebase extension will populate the `sessionId` on the document, which allows you to redirect to the Checkout.

**`lib/db.js`**

```js
import firebase from './firebase';
import getStripe from './stripe';

const firestore = firebase.firestore();

export async function createCheckoutSession(uid) {
  const checkoutSessionRef = await firestore
    .collection('users')
    .doc(uid)
    .collection('checkout_sessions')
    .add({
      price: 'price_HLxRKYrVN3CVzy',
      // This can be removed if you don't want promo codes
      allow_promotion_codes: true,
      success_url: window.location.origin,
      cancel_url: window.location.origin
    });

  checkoutSessionRef.onSnapshot(async (snap) => {
    const { sessionId } = snap.data();

    if (sessionId) {
      const stripe = await getStripe();

      stripe.redirectToCheckout({ sessionId });
    }
  });
}
```

Next, we need to create a button the calls `createCheckoutSession` to invoke the checkout. Let's create an upgrade component that will display if a user is on the free tier.

**`components/UpgradeEmptyState.js`**

```js
import React, { useState } from 'react';
import { Heading, Flex, Text, Button } from '@chakra-ui/core';

import { useAuth } from '@/lib/auth';
import { createCheckoutSession } from '@/lib/db';

const UpgradeEmptyState = () => {
  const { user } = useAuth();
  const [isCheckoutLoading, setCheckoutLoading] = useState(false);

  return (
    <Flex
      width="100%"
      backgroundColor="white"
      borderRadius="8px"
      p={16}
      justify="center"
      align="center"
      direction="column"
    >
      <Heading size="lg" mb={2}>
        Get feedback on your site instantly.
      </Heading>
      <Text mb={4}>Start today, then grow with us 🌱</Text>
      <Button
        onClick={() => {
          setCheckoutLoading(true);
          createCheckoutSession(user.uid);
        }}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        isLoading={isCheckoutLoading}
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)'
        }}
      >
        Upgrade to Starter
      </Button>
    </Flex>
  );
};

export default UpgradeEmptyState;
```

You'll likely only want to show this view if the user is not already on a paid plan. Since the extension adds a custom claim to the JWT, we can easily add the Stripe role to our `useAuth` hook.

**`lib/auth.js`**

```js
const user = await formatUser(rawUser);

..
..

const getStripeRole = async () => {
  await firebase.auth().currentUser.getIdToken(true);
  const decodedToken = await firebase.auth().currentUser.getIdTokenResult();

  return decodedToken.claims.stripeRole || 'free';
};

const formatUser = async (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: user.xa,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    stripeRole: await getStripeRole()
  };
};
```

`getStripeRole` fetches a new JWT for the user and checks the decoded token for the `stripeRole`. Then, our `user` object has access to what pricing tier they're on.

```js
const { user } = useAuth();

const isPaidAccount = user?.stripeRole !== 'free';
```

Finally, we can update our page displaying the list of sites to use the `UpgradeEmptyState` component.

**`pages/sites.js`**

```js
import useSWR from 'swr';

import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';
import SiteTable from '@/components/SiteTable';
import SiteEmptyState from '@/components/SiteEmptyState';
import SiteTableHeader from '@/components/SiteTableHeader';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import UpgradeEmptyState from '@/components/UpgradeEmptyState';

const Dashboard = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);
  const isPaidAccount = user?.stripeRole !== 'free';

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  if (data.sites.length) {
    return (
      <DashboardShell>
        <SiteTableHeader isPaidAccount={isPaidAccount} />
        <SiteTable sites={data.sites} />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <SiteTableHeader isPaidAccount={isPaidAccount} />
      {isPaidAccount ? <SiteEmptyState /> : <UpgradeEmptyState />}
    </DashboardShell>
  );
};

const DashboardPage = () => (
  <Page name="Dashboard" path="/sites">
    <Dashboard />
  </Page>
);

export default DashboardPage;
```

## Testing

Let's test that our Checkout integration is working as expected. After a user clicks on the button defined earlier, they will be redirected to Stripe.

Stripe provides [test cards](https://stripe.com/docs/testing) to verify your payment flow. You can use any CVC, postal code, and future expiration date. To test a successful payment, use `4242 4242 4242 4242`.

If the payment was successful, Stripe should redirect the user back to your `success_url` parameter (e.g., `/account`). You should also see the subscription listed as a new entry on your [Stripe dashboard](https://dashboard.stripe.com/subscriptions).

![Stripe Dashboard](/stripe.png)

Finally, confirmed that the `user` collection was updated inside of Firestore.
