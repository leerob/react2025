# Enrutamiento Dinámico

Para aplicaciones complejas, no sabemos todas las rutas que van a estar disponibles antes de tiempo. Es probable que muchas rutas se contruyan sobre un modelo de datos (por ejemplo, una página para cada usuario).

Necesitamos generar de forma estática una página que contenga todo el feedback para cada sitio. Con Next.js, podemos añadir corchetes (_brackets_) a un nombre de fichero para crear una **ruta dinámica**.
Por ejemplo, vamos a configurar un nuevo archivo utilizando el enrutamiento dinámico.

**`pages/p/[siteId].js`**

```js {4}
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/core'

export default function FeedbackPage() {
  const router = useRouter()

  return <Box>Page ID: ${router.query.siteId}</Box>
}
```

Una ruta como `/p/abc` debería encajar con `pages/p/[siteId].js` y proveer este parámetro _query_ a la página. Para más información, visita la [documentación de enrutamiento](https://nextjs.org/docs/routing/introduction).

Vamos a crear la página de feedback, la cual es creada de forma dinámica para cada sitio.

**`lib/db-admin.js`**

```js
export async function getAllSites() {
  const snapshot = await db.collection('sites').get()

  const sites = []

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() })
  })

  return { sites }
}
```

**`pages/p/[siteId].js`**

```js
import { Box } from '@chakra-ui/core'
import { useRouter } from 'next/router'

import { getAllFeedback, getAllSites } from '../../lib/db-admin'

 export async function getStaticProps(context) {
  const siteId = context.params.siteId
  const { feedback } = await getAllFeedback(siteId)

  return {
    props: {
      initialFeedback: feedback,
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const { sites } = await getAllSites()
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString(),
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

const FeedbackPage = ({ initialFeedback }) => {
  const router = useRouter()

  return <Box>Site ID: ${router.query.siteId}</Box>
}

export default FeedbackPage
```

Vamos a analizar qué está sucediendo aquí.

- Utilizamos `getStaticProps` para traer todo el feedback para el sitio, dado el parámetro `siteId` devuelto por la ruta dinámica. Nosotros, por nuestra parte, reenviamos la información al componente via `prop`.
- Utilizamos `getStaticPaths` para crear una página para _cada_ sitio. Si una página no ha sido creada para un sitio (por ejemplo, para un nuevo sitio añadido), y el usuario visita la ruta, deberemos generar este sitio al vuelo. Esto es controlado definiendo el [valor de fallback](https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required) a `true`.
- Definimos un periodo de revalidación de un segundo con `revalidate`. Cada página de feedback es construida de forma estática al hacer un _build_ del proyecto. Entonces, cuando una petición viene después del periodo de revalidación, `getStaticProps` es ejecutado de nuevo bajo fondo. Si se completa de forma exitosa, la página es reemplazada y actualizada en la caché. Esto asegura que nunca tengas caídas o periodos de inactividad y los archivos siempre se sirvan como HTML estáticos.
