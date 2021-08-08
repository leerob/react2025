# Crear una Sesión de Compra

Para nuestro producto usaremos [Stripe Checkout](https://stripe.com/docs/payments/checkout).
Checkout es una página de pagos segura, alojada por Stripe, que te permite cobrar pagos de forma rápida. Funciona a través de todo tipo de dispositivos y está diseñado para incrementar tu conversión.
Checkout te ahora mucho tiempo proporcionándote grandes características:

- **Diseño para eliminar ficción**—Validación de tarjetas en tiempo real con mensajes de error integrados
- **Preparado para móviles**—Diseño totalmente responsive con soporte para Apple Pay y Google Pay
- **Internacional**—Soporta [15 idiomas](https://support.stripe.com/questions/supported-languages-for-stripe-checkout) y múltiples métodos de pago
- **Personalización y branding**—Botones y color de fondo personalizables
- **Cumplimiento de fraude**—Cumplimiento de PCI simplificado y [preparado para SCA](https://stripe.com/docs/strong-customer-authentication)
- **Funcionalidades adicionales**—Almacena direcciones, envía recibos al email y más

## Configuración

Crear una sesión de Checkout es muy simple con la extensión de Stripe para Firebase. Dentro de nuestro fichero de base de datos en el lado del cliente, podemos crear una nueva sesión de Checkout.
Reemplaza la variable `price` con cualquier ID que fue creado dentro de tu base de datos de Firebase.

import Callout from 'nextra-theme-docs/callout'

<Callout>
Antes de ir a producción, querrás consultar la colección de Products para traer el precio o definirlo como variable de entorno, ya que el valor es diferente en función del entorno.
</Callout>

Después de crear la sesión de Checkout, la extensión de Stripe para Firebase consultará `sessionId` en el documento, lo que te permitirá redirigir a Checkout.

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

A continuación, necesitamos crear el botón de llamadas `createCheckoutSession` para invocar al proceso de compra. Vamos a crear un componente que mostrará si el usuario está dentro del plan gratuito.

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

Querrás mostrar esta vista solamente si el usuario no se encuentra en un plan de pago. Debido a que la extensión añade un reclamo personalizado al token JWT, podemos añadir fácilemente el role de Stripe en nuestro hook `useAuth`.

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

`getStripeRole` trae un nuevo JWT para el usuario y comprueba el token decodificado para el `stripeRole`. Después, nuestro objecto de `user` tiene acceso al plan de precios en el que se encuentra.

```js
const { user } = useAuth();

const isPaidAccount = user?.stripeRole !== 'free';
```

Finalmente, podemos actualizar nuestra página mostrando la lista de sitios utilizando el componente `UpgradeEmptyState`.

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

## Testeando

Vamos a testear que la integración con Checkout está funcionando como esperamos. Después de que un usuario hace click en el botón definido antes, será redireccionado a Stripe.

Stripe proporciona [tarjetas de test](https://stripe.com/docs/testing) para verificar nuestro flujo de pago. Puedes utilizar cualquier CVC, código postal y fecha de expiración futura. Para testear un pago existoso, utiliza `4242 4242 4242 4242`.

Si el pago ha sido exitoso, Stripe debería redireccionar al usuario según donde hayas indicado en el parámetro `success_url` (por ejemplo, `/account`). Deberías, además, ver la suscripción listada como una nueva entrada dentro de tu [dashboard de Stripe](https://dashboard.stripe.com/subscriptions).

![Stripe Dashboard](/stripe.png)

Finalmente, confirmamos que la colección `user` se ha actualizado en Firestore.
