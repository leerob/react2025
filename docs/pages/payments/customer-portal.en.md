# Customer Portal

We'll also use [Stripe Customer Portal](https://stripe.com/docs/billing/subscriptions/customer-portal). The portal provides subscription and billing management features that allow your customers to:

- Update subscriptions, including upgrading and downgrading their subscriptions
- Cancel subscriptions, immediately or at the end of a billing period
- Update payment methods like adding and removing cards
- View billing history and download invoices

## Setup

To create a link to our Customer Portal inside Stripe, we can invoke a Firebase Function that creates the correct URL. Note that your function location may be different than `us-central1`.

**`lib/db.js`**

```js
import firebase from './firebase'

const app = firebase.app()

export async function goToBillingPortal() {
  const functionRef = app
    .functions('us-central1')
    .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink')

  const { data } = await functionRef({
    returnUrl: `${window.location.origin}/account`,
  })

  window.location.assign(data.url)
}
```

Finally, we need a button to call `goToBillingPortal`. This button makes the most sense inside of our account. Feel free to display your account settings as you see fit, or check out the [Fast Feedback](https://github.com/leerob/fastfeedback/blob/master/pages/account.js) source code.

**`pages/account.js`**

```js
import { useState } from 'react'
import { Button } from '@chakra-ui/core'

import { useAuth } from '@/lib/auth'
import { goToBillingPortal } from '@/lib/db'

const Account = () => {
  const { user, signout } = useAuth()
  const [isBillingLoading, setBillingLoading] = useState(false)

  return (
    <Button
      onClick={() => {
        setBillingLoading(true)
        goToBillingPortal()
      }}
      isLoading={isBillingLoading}
    >
      Manage Billing
    </Button>
  )
}

export default Account
```

## Testing

After clicking the above button, you should be redirected to the Customer Portal.

![Stripe self-serve dashboard](/stripe-self-service.png)
