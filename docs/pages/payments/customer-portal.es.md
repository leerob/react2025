# Portal del Cliente

También vamos a utilizar [Stripe Customer Portal](https://stripe.com/docs/billing/subscriptions/customer-portal). Este sitio proporciona gestión de suscripciones y facturación que permitirá a nuestros clientes:

- Actualizar suscripciones, incluyendo actualización a un plan superior o inferior
- Cancelar suscripciones, de forma inmediata o al final del periodo de facturación
- Actualizar métodos de pago como añadir o eliminar tarjetas de crédito
- Ver el historial de facturación y descargar facturas

## Configuración

Para crear un link a nuestro Portal del Cliente dentro de Stripe, podemos invocar una Firebase Funcion que cree la URL de forma correcta. Ten en cuenta que lo localización de tu función puede ser diferente de `us-central1`.

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

Finalmente, necesitamos un botón para llamar a `goToBillingPortal`. Este botón tiene todo el sentido dentro de nuestra cuenta. Siéntete libre de mostrar los ajustes de la cuenta como te encaje, o pega un vistazo al código fuente de [Fast Feedback](https://github.com/leerob/fastfeedback/blob/master/pages/account.js).

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

## Testeando

Después de hacer click en el botón de arriba, deberás ser redirigdo al Portal del Cliente.

![Dashboard de autoservicio de Stripe](/stripe-self-service.png)
