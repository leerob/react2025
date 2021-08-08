# Stripe

Vamos a configurar Stripe para aceptar pagos recurrentes (suscripciones) y acceso al portal del cliente. Necesitarás una [cuenta de Stripe](https://dashboard.stripe.com/register) configurada.

### Extensión de Firebase

La extensión de Stripe para Firebase acepta pagos de suscripciones en tu aplicación con facilidad. Los usuarios pueden comprar según diferentes rangos de precios, y la extensión automáticamente sincronizará el status de la suscripción con Firestore. También agrega una reclamación personalizada a Firebase Authentication, lo que facilita saber cuándo un cliente está en un plan de pago.

Primero, [instala la extensión](https://firebase.google.com/products/extensions/firestore-stripe-subscriptions) en la consola de Firebase.
Esta extensión require el plan "Blaze" de Firebase. Este es un plan de pago por uso y solo tendrás gastos si empiezas a escalar. Si estás preocupado por este tema, puedes configurar [alertas de presupuesto](https://firebase.google.com/docs/firestore/quotas). Es muy probable que no llegues a los niveles de pago por un tiempo.

- Ya que hemos definido nuestra tabla de usuarios `users`, vamos a utilizarla en lugar de `customers`.
- Dentro del [dashboard de Stripe](https://dashboard.stripe.com/apikeys),
  crea una nueva [clave restringida](https://stripe.com/docs/keys#limit-access) con acceso de escritura para los recursos **Customers**, **Checkout Sessions** y **Customer portal**, y acceso de lectura para el recurso **Subscriptions**.
- Copia la clave de API dentro de Firebase.
- Haz click en **Install extension**. Reemplazaremos `FILL_IN_FROM_POSTINSTALL` después de instalar la extensión.

![Extensión de Stripe](/stripe-extension.png)

### Configurando la extensión

#### Define tus reglas de seguridad de Cloud Firestore

Es crucial limitar el acceso a datos a usuarios autenticados y que los usuarios solo sean capaces de ver su propia información. Para información de producto y precio, es importante deshabilitar el acceso de escritura desde una aplicación de cliente. Usa las reglas siguientes para restringir el acceso como se recomienda en las [reglas de Cloud Firestore](https://console.firebase.google.com/project/_/database/firestore/rules) de tu proyecto. Esto se basa en nuestra sección anterior sobre [reglas de seguridad](/firebase/security-rules).

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /${param:CUSTOMERS_COLLECTION}/{uid} {
      allow read, write: if request.auth.uid == uid;

      match /checkout_sessions/{id} {
        allow read, write: if request.auth.uid == uid;
      }
      match /subscriptions/{id} {
        allow read, write: if request.auth.uid == uid;
      }
    }

    match /${param:PRODUCTS_COLLECTION}/{id} {
      allow read: if true;
      allow write: if false;

      match /prices/{id} {
        allow read: if true;
        allow write: if false;
      }
    }
  }
}
```

#### Configurar Stripe webhooks

Necesitas configurar un webhook que sincronice la información relevante de Striple a tu Cloud Firestore. Esto incluye datos del producto y precios desde el dashboard de Stripe, así como los detalles de la suscripción de clientes.

Aquí tienes cómo configurar el webhook y la extensión para usarlo:

- Ve al [dashboard de Stripe.](https://dashboard.stripe.com/webhooks)
- Haz click en **Add Endpoint**.
- Usa la URL de la función de tu extensión como _endpoint_ URL.
- Selecciona los siguientes eventos:
  - `product.created`
  - `product.updated`
  - `price.created`
  - `price.updated`
  - `checkout.session.completed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
- Usando Firebase Console o Firebase CLI, [reconfigura](https://console.firebase.google.com/project/${param:PROJECT_ID}/extensions/instances/${param:EXT_INSTANCE_ID}?tab=config) tu extensión con firma secreta de tu webhook (por ejemplo, `whsec_12345678`). Introduce el valor en el parámetro llamado `Stripe webhook secret`. Aquí es donde reemplazaremos el `FILL_IN_FROM_POSTINSTALL` de antes.

#### Crear la información de producto y precio

Para que Stripe automáticamente facture a tus usuarios para los pagos recurrentes, necesitas crear la información de producto y el precio dentro del [dashboard de Stripe](https://dashboard.stripe.com/test/products). Cuando creas o actualizas la información de producto y precio en Stripe Dashboard, estos detalles se sincronizan automáticamente con Cloud Firestore, siempre y cuando el webhook esté correctamente configurado como se ha dicho arriba.

Como se mencionó en la sección anterior, tenemos tres planes de precios diferentes que queremos ofrecer para [Fast Feedback](/introduction/product-overview). Vamos a añadir esta información al dashboard de Stripe.

- Asegúrate de que **View test data** está habilitado en la parte inferior del dashboard.
- Navega a la sección [Products](https://dashboard.stripe.com/products) del dashboard.
- Haz click en **Add product**.
- Selecciona “Recurring” cuando introduces el precio.
- Configura el plan de precios.

import Callout from 'nextra-theme-docs/callout'

<Callout>
Los productos creados en modo de test pueden ser copidos al modo en directo, de tal forma que no tengas que volverlos a crear. En la vista de Detalle del Producto en el dashboard, haz click "Copy to live mode" en la esquina superior derecha. Solo podrás hacer esto una vez para cada producto creado en modo de test. Las actualizaciones siguientes en el producto de test no serán reflejados en el producto en directo.
</Callout>

### Añadiendo reclamaciones personalizadas

Si quieres que tus usuarios sean asignados con un [rol de reclamación personalizado](https://firebase.google.com/docs/auth/admin/custom-claims) para darles acceso a ciertos datos cuando se suscriben a un producto específico, puedes definir un valor de metatado llamado `firebaseRole` en el producto de Stripe.

![Stripe Premium](/stripe-premium.png)

El valor que definas para `firebaseRole` (por ejemplo, "premium" en la captura de pantalla superior) será definida como una reclamación personalizada `stripeRole` en el usuario. Esto te permite [definir reglas de acceso específicas](https://firebase.googleblog.com/2019/03/firebase-security-rules-admin-sdk-tips.html) basadas en el rol de usuario o [limitar el acceso a ciertas páginas](https://firebase.google.com/docs/auth/admin/custom-claims#access_custom_claims_on_the_client).

### Configurar el Customer Portal de Stripe

- Define tu marca personalizada en los [ajustes](https://dashboard.stripe.com/settings/branding).
- Configura los [ajustes](https://dashboard.stripe.com/test/settings/billing/portal) del Customer Portal.
- Habilita "Allow customers to update their payment methods".
- Habilita "Allow customers to update subscriptions".
- Habilita "Allow customers to cancel subscriptions".
- Añade los productos y precios que quieras permitir a los clientes que cambien entre ellos.
- Define la información requerida y links del negocio

### Configurar Stripe

Vamos a instalar la librería de Stripe para React

```bash
$ yarn add @stripe/stripe-js
```

A continuación, tenemos que cargar Stripe con nuestra clave publicable. Esto retornará una `Promise` que resuelve con el objeto de `Stripe` una vez que haya finalizado de cargar. Puedes coger la clave publicable de tu dashboard de Stripe. Añade el valor a tu fichero `.env.local` con el nombre`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.

**`lib/stripe.js`**

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

<Callout>
Después de finalizar los detalles de tu cuenta de Stripe para la cuenta de producción, puedes agregar la nueva clave publicable a tus variables de entorno de producción dentro de Vercel.
</Callout>

### Actualizando Extensiones

Dentro de la consola de Firebase Extensions, tienes la posibilidad de actualizar la extensión de Striple. Esto incluye un _changelog_ o registro de cambios para poder ver exactamente que hay nuevo. Por ejemplo, el soporte para código promocionales fue añadido recientemente.
