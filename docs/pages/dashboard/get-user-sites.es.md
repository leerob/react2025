# Obtener Sitios del Usuario

Ahora que nuestro _dashboard_ está configurar para traer los sitios, completado con un estado de carga, necesitamos limitar el listado de sitios para _solo_ tener los sitios del usuario concreto. Queremos hacer esto de forma segura de manera que solo puedas acceder a tus propios sitios.

Para garantizar la seguridad de tus datos de sitios, necesitamos validar el Token ID de Firebase en el servidor. Esto comprueba el [JWT](https://jwt.io/) (JSON Web Token) para asegurarse de que eres quien dices ser que eres. En primer lugar, necesitamos hacer algunos pequeños cambios en nuestro hook `useAuth` hook para coger el _token_.

**`lib/auth.js`**

```js
const user = formatUser(rawUser)
const { token, ...userWithoutToken } = user

createUser(user.uid, userWithoutToken)
setUser(user)

// ..

const formatUser = async (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: user.xa,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  }
}
```

No necesitamos almacenar el _token_ en la base de datos, pero lo queremos tener disponible en el objeto con datos del usuario que devuelve `useAuth`. Ahora, podemos dirigir este _token_ a nuestra _API route_. Si existe un usuario (ha iniciado sesión), redirigiremos el _token_ a una ruta específica.

**`pages/sites.js`**

```js
const { user } = useAuth()
const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher)
```

Esto requiere un pequeño cambio en nuestro `fetcher` para redirigir el _token_ de usuario.

**`utils/fetcher.js`**

```js
const fetcher = async (url, token) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  })

  return res.json()
}

export default fetcher
```

### Query de la base de datos

En lugar de `getAllSites`, necesitamos traer los sitios solo para un usuario. Además, vamos a ordernarlo por la fecha en la que estos fueron creador. Después, podremos emplear esta función dentro de `/api/sites`.

**`lib/db-admin.js`**

```js
export async function getUserSites(uid) {
  const snapshot = await db
    .collection('sites')
    .where('authorId', '==', uid)
    .get()

  const sites = []

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() })
  })

  sites.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  )

  return { sites }
}
```

### Verificando Tokens ID

Dentro de nuestra API Route, necesitamos [verificar el Token ID](https://firebase.google.com/docs/auth/admin/verify-id-tokens). Vamos a actualizar nuestra instancia de Firebase Admin para exportar además `auth`.

**`lib/firebase-admin.js`**

```js
import admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY,
      project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    }),
    databaseURL: 'https://fast-feedback-demo.firebaseio.com',
  })
}

const db = admin.firestore()
const auth = admin.auth()

export { db, auth }
```

Ahora, podemos traer de forma segura los sitios de un usuario dado.

**`api/sites.js`**

```js
import { auth } from '@/lib/firebase-admin'
import { getUserSites } from '@/lib/db-admin'

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token)
    const { sites } = await getUserSites(uid)

    res.status(200).json({ sites })
  } catch (error) {
    res.status(500).json({ error })
  }
}
```
