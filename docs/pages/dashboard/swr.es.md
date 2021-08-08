# SWR (Renderizado en el Lado del Cliente)

[SWR](https://swr.now.sh/) es una librería basada en React Hooks para traer datos remotos.
SWR primero retorna datos desde caché (_stale_), después envía la petición _fetch_ (_revalidate_) y finalmente trae los datos actualizados de nuevo.

Esto es importante para nuestra página de _dashboard_ porque permitirá dejar la página abierta y nuestros datos siempre permanecerán actualizados.
Si vuelves a hacer foco o cambias entre pestañas, SRW hará [la revalidación de datos automáticamente](https://swr.now.sh/#focus-revalidation).

Vamos a instalar ahora SWR.

```bash
$ yarn add swr
```

### API Route

Antes de poder utilizar SWR, necesitamos crear una API Route para acceder a Firestore desde el lado del servidor.

[API Routes](https://nextjs.org/docs/api-routes/introduction) nos proporcionan una solución sencilla para construir APIs dentro de Next.js.
Todo lo que necesitas para empezar es una carpeta `api/` dentro de nuestra carpeta principal `pages/` donde se encuentran las rutas. Todo archivo dentro de `pages/api/` es redireccionado a `/api/*`.

Creamos un nuevo fichero en`pages/api/sites.js`. Podemos reutilizar la función `getAllSites` que usamos antes cuando estábamos creando rutas dinámicas para las páginas de feedback.

**`pages/api/sites.js`**

```js
import { getAllSites } from '@/lib/db-admin'

export default async (_, res) => {
  const result = await getAllSites()

  if (result.error) {
    res.status(500).json({ error: result.error })
  }

  res.status(200).json({ sites: result.sites })
}
```

Para que una API Route funcione, necesitamos exportar una función por defecto (esto es, un **request handler**), que recibe los siguientes parámetros:

- `req`: Una instancia de [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage), más algunos [middlewares preconstruidos](https://nextjs.org/docs/api-routes/api-middlewares).
- `res`: Una instancia de [http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse), más algunas [funciones de ayuda](https://nextjs.org/docs/api-routes/response-helpers).

### Utilizando SWR

Para utilizar SRW, podemos importar el hook y definir desde que ruta queremos traer datos.

```js
import useSWR from 'swr'

const { data } = useSWR('/api/sites', fetcher)
```

`fetcher` es una pequeña envoltura o _wrapper_ de `fetch` que retorna un `json`. Vamos a extraer esto a `utils/fetcher`.

```js
// /utils/fetcher

export default async function (...args) {
  const res = await fetch(...args)

  return res.json()
}
```

`data` contendrá la respuesta JSON de nuestra API route.

```json
// /api/sites

{
  "sites": [
    {
      "id": "pRTMMovUKZx16npaMCET",
      "createdAt": "2020-05-21T04:01:31.694Z",
      "url": "https://react2025.com",
      "userId": "WG2acuO8oqW3Np0EXCSn28E19Rs2",
      "name": "React 2025"
    },
    {
      "id": "zckViEhZSAZD84lUEYyc",
      "createdAt": "2020-05-21T04:01:31.694Z",
      "url": "http://masteringnextjs.com/",
      "userId": "WG2acuO8oqW3Np0EXCSn28E19Rs2",
      "name": "Mastering Next.js"
    }
  ]
}
```

### Tabla de Sitios

Una vez que los datos han terminado de cargar, queremos mostrar la lista de los sitios dentro de una tabla. Actualmente ya hemos creado algunos componentes (`Table`, `Tr`, `Th`, `Td`) que nos permitirán componer nuestra tabla. Vamos a crear un nuevo componente para formatear y visualizar los datos mostrados arriba.

**`components/SiteTable.js`**

```js
import React from 'react'
import NextLink from 'next/link'
import { Box, Link } from '@chakra-ui/core'
import { parseISO, format } from 'date-fns'

import { Table, Tr, Th, Td } from './Table'

const SiteTable = ({ sites }) => {
  return (
    <Box overflowX="scroll">
      <Table w="full">
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Site Link</Th>
            <Th>Feedback Link</Th>
            <Th>Date Added</Th>
            <Th width="50px">{''}</Th>
          </Tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <Box as="tr" key={site.id}>
              <Td fontWeight="medium">{site.name}</Td>
              <Td>
                <Link href={site.url} isExternal>
                  {site.url}
                </Link>
              </Td>
              <Td>
                <NextLink href="/p/[siteId]" as={`/p/${site.id}`} passHref>
                  <Link color="blue.500" fontWeight="medium">
                    View Feedback
                  </Link>
                </NextLink>
              </Td>
              <Td>{format(parseISO(site.createdAt), 'PPpp')}</Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  )
}

export default SiteTable
```

Next precargará automáticamente los componentes de [`<Link>`](https://nextjs.org/docs/routing/introduction#linking-between-pages) a medida que estos aparezcan en la ventana (en el _vierport_).
Esto se traducirá en hacer la navegación por las páginas de nuestra aplicación más rápida. Por debajo, Next utiliza lo que se conoce como [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) para [precargar los archivos](https://www.w3.org/TR/resource-hints/#prefetch) necesarios en segundo plano.

### Consumiendo los Datos

Ahora que tenemos acceso a los datos desde la ruta, podemos construir la interfaz para consumir estos datos.
Vamos a crear una nueva ruta que muestre todos los sitios de un usuario.

**`pages/sites.js`**

```js
import React from 'react'
import useSWR from 'swr'

import DashboardShell from '@/components/DashboardShell'
import EmptyState from '@/components/EmptyState'
import SiteTable from '@/components/SiteTable'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import fetcher from '@/utils/fetcher'

const Dashboard = () => {
  const { data } = useSWR('/api/sites', fetcher)
  const sites = data?.sites

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      {sites.length ? <SiteTable sites={sites} /> : <EmptyState />}
    </DashboardShell>
  )
}

export default Dashboard
```

Vamos a repasar exactamente lo que está sucediendo aquí.

- En primer lugar, hacemos una petición a `/api/sites` y devolvemos una respuesta `json`.
- Utilizamos el [encadenamiento opcional](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) para acceder de forma segura a la variable anidada `sites` de los `data` que han sido retornados.
- Si no existe `data`, entonces mostrarmos el _loading skeleton_.
- De lo contrario, renderizamos el estado vacío o la tabla que muestra todos los sitios.
