# Logging

Antes de lanzar nuestro producto, queremos pensar en el peor escenario posible.

- ¿Qué pasa si nuestras peticiones a la API fallan?
- ¿Qué sucede si los usuarios no pueden iniciar sesión?
- ¿Cómo se si mi aplicación se está ejecutando con éxito?

## Observabilidad

[Observabilidad y monitorización](https://thenewstack.io/monitoring-and-observability-whats-the-difference-and-why-does-it-matter/) son dos pilares clave para entender tu sistema. En el mundo del SaaS, observabilidad significa que puedes responder cualquier pregunta acerca de qué está sucediendo en el interior del sistema con tan solo observarlo desde fuera. No existe la necesidad de lanzar nuevo código.

Tener un sitio estático reduce drásticamente la cantidad de complejidad en nuestro setup del despliegue. Sin embargo, seguimos teniendo funciones _serverless_ en juego y dependemos también de terceras partes. Existe todavía una posibilidad de que las cosas puedan ir mal. Cuando lo hagan, nos gustaría estar preparados para resolver el problema de inmediato.

Con un "sistema observable" tenemos la herramientas para entender qué está pasando con una sola consulta (_query_). Simplemente haz una pregunta y conoce más acerca de cómo nuestro software está trabajando.

## Añadiendo Logging

Antes de que podamos consultar nuestros datos, debemos tener datos. Queremos registrar toda la información relevante para eventos críticos en nuestro sistema - un _stream_ de eventos en directo.

Existen muchas formas de añadir _logging_ a nuestra aplicación SaaS, cada una con sus _tradeoffs_ (puntos a los que renunciamos a cambio de tener otros). Para este curso, me voy a centrar en una solución que te permitirá añadir como si fuera _plug-and-play_ el proveedor de tu elección. Después, te recomendaré mi solución favorita para este _stack_ obstinado (_opionated_).

Para la mayoría de proveedores de _logging_, cualquier cosa para la que puedas realizar `console.log` se mostrará. Por ejemplo, un log básico puede ser algo como esto.

```js
console.log('Completed successfully!')
console.error('500: Request failed.')
```

Puedes tener incluso logs estructurados a través de objetos JSON. Algunos proveedores de herramientas de _logging_ traducirán el objeto y te proveerán de acceso para consultar los elementos de forma individual. Por ejemplo, con Node.js tú quizás utilices [Pino](https://getpino.io/).

```js
import logger from 'pino'

logger.info({
  user: {
    name: 'Lee Robinson',
    email: 'me@leerob.io',
    id: 'hlk436k4l26h2',
  },
  event: {
    type: 'request',
    tag: 'api',
  },
})
```

Lo cual te da un objeto estructurado como este.

```json
{
  "level": 30,
  "time": 1531171082399,
  "pid": 657,
  "hostname": "169.254.69.141",
  "user": {
    "name": "Lee Robinson",
    "email": "me@leerob.io",
    "id": "hlk436k4l26h2"
  },
  "event": {
    "type": "request",
    "tag": "api"
  }
}
```

## Logflare

[Logflare](https://logflare.app/) es mi forma favorita de gestionar logs para aplicaciones que se han desplegado en Vercel. Con su [Integración en Vercel](https://vercel.com/integrations/logflare), es muy sencillo ir de un `console.log` a logs estructurados que puedes consultar. Su plan gratuito es muy generoso también (5.200.000 de eventos de logs por mes).

Logflare te traduce automáticamente la información de tus funciones _serverless_ para que puedas ver cuánto tardan las peticiones en realizarse. Con aplicaciones normales de logs, no tienes ningún tipo de información acerca de qué está cacheado. Con Logflare + Vercel, esto puedes hacerlo y es estructurado y consultable a través de _queries_. Es significativamente más barato que cualquier otro SaaS de logging y te permite "traer tu propio _backend_" si quieres. ¡Sin bloqueo de proveedores!

## Configurando la integración con Vercel

- [Crear una cuenta en Logflare](https://logflare.app/)
- [Instalar la integración de Logflare con Vercel](https://vercel.co/integrations/logflare)
- Hacer click en **Create Drain** para configurar un log.
- Entrar en tu [Dashboard de Logflare](https://logflare.app/dashboard) para ver los _streams_ de logs.

Vercel te proporciona tres tipos de logs: `build`, `static` y `lambda`. Pensando en nuestra aplicación de Next.js, esto se traduce a:

- `build` -> `next build`
- `static` -> `pages/index.js`
- `lambda` -> `pages/api/hello.js`

## Instalando y usando Pino Logflare

Además de los logs generados por Vercel, también querrás añadir añadir logs personalizados para cuando las cosas vayan mal.

Primero vamos a instalar las librerías necesarias en la aplicación.

```bash
$ yarn add pino pino-logflare
```

Después, traemos la Ingest API Key y el Stream ID de [nuestro dashboard](https://logflare.app/dashboard) y las añadimos como variables de entorno.

**`.env.local`**

```
NEXT_PUBLIC_LOGFLARE_KEY=
NEXT_PUBLIC_LOGFLARE_STREAM=
```

Estas claves se pueden hacer públicas ya que no permiten ningún tipo de gestión de la cuenta o acceso a las consultas. Son similares a identificadores únicos como el de Analytics.

A continuación, vamos a configurar una utilidad de logging que inicializará `pino-logflare` y resolverá las variables de entorno correctas. También configuramos algunas opciones predeterminadas, así como reenviar el entorno y Git commit SHA. `formatObjectKeys` ayuda a asegurarnos que `-` es reemplazado con `_` para el almacenamiento en Logflare.

**`utils/logger.js`**

```js
import pino from 'pino'
import { logflarePinoVercel } from 'pino-logflare'

const { stream, send } = logflarePinoVercel({
  apiKey: process.env.NEXT_PUBLIC_LOGFLARE_KEY,
  sourceToken: process.env.NEXT_PUBLIC_LOGFLARE_STREAM,
})

const logger = pino(
  {
    browser: {
      transmit: {
        send: send,
      },
    },
    level: 'debug',
    base: {
      env: process.env.NODE_ENV || 'ENV not set',
      revision: process.env.VERCEL_GITHUB_COMMIT_SHA,
    },
  },
  stream
)

const formatObjectKeys = (headers) => {
  const keyValues = {}

  Object.keys(headers).map((key) => {
    const newKey = key.replace(/-/g, '_')
    keyValues[newKey] = headers[key]
  })

  return keyValues
}

export { logger, formatObjectKeys }
```

Finalmente, podemos usar nuestro `logger` en cualquier lugar que queramos. Por ejemplo, vamos a crear un log de cualquier error que recibamos dentro de un bloque try/catch en una ruta de la API.

**`pages/api/sites.js`**

```js
import { auth } from '@/lib/firebase-admin'
import { getUserSites } from '@/lib/db-admin'
import { logger, formatObjectKeys } from '@/utils/logger'

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token)
    const { sites } = await getUserSites(uid)

    res.status(200).json({ sites })
  } catch (error) {
    logger.error(
      {
        request: {
          headers: formatObjectKeys(req.headers),
          url: req.url,
          method: req.method,
        },
        response: {
          statusCode: res.statusCode,
        },
      },
      error.message
    )

    res.status(500).json({ error })
  }
}
```
