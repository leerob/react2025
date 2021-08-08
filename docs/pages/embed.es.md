# Vista Embebida

El producto construido en este curso, [Fast Feedback](/introduction/product-overview), está hecho para ser embebido en sitios webs existentes. Esto permite a los usuarios añadir comentarios, reseñas y otras formas de feedback en sus sitios. Vamos a crear un método para embeber feedback dentro de un sitio diferente.

## Iframes

Podemos embeber nuestra ruta en otro sitio en solo una línea de código usando un `iframe`. Esto es crucial porque no requiere JavaScript adicional para el consumidor, si es necesario. Una página estática es servida y [regenerada](https://nextjs.org/blog/next-9-4#incremental-static-regeneration-beta) periódicamente para mostrar todos los comentarios que han sido aprobados.

```html
<iframe src="https://fastfeedback.io/embed/SITE_ID/ROUTE" />
```

## Capturar todas las rutas

Como has podido observar en la URL de arriba, podemos incluir un ID de sitio y una ruta dentro en la URL. Dentro de Fast Feedback, necesitamos un método para recuperar _ambos_ parámetros de forma que podamos consultar los datos correctos.

Podemos conseguir esto usando la [captura de todas las rutas](https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes). Esta es una extensión del enrutamiento dinámico que utiliza tres puntos (`...`) para conseguir cualquier número de parámetros.

Por ejemplo, `pages/embed/[...site].js` empareja tanto `/embed/SITE_ID` como `/embed/SITE_ID/ROUTE` – perfecto! Vamos a crear un nuevo archivo `pages/embed/[...site].js` de forma que podemos consumir todas las rutas capturadas.

**`pages/embed/[...site].js`**

```js
import { Box, Text } from '@chakra-ui/core'

import Feedback from '@/components/Feedback'
import { getAllFeedback, getAllSites, getSite } from '@/lib/db-admin'

 export async function getStaticProps(context) {
  // Destructure [...site], which is an array, to get the id and route
  const [siteId, route] = context.params.site
  // We can update `getAllFeedback` to filter by `route`
  const { feedback } = await getAllFeedback(siteId, route)

  return {
    props: {
      feedback,
    },
    // Revalidate the page after 1 second
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  // Create a embedded path for every site
  const { sites } = await getAllSites()
  const paths = sites.map((site) => ({
    params: {
      // Note that catch all routes take an array here
      site: [site.id.toString()],
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

const EmbeddedFeedbackPage = ({ feedback }) => (
  <Box display="flex" flexDirection="column" width="full">
    {feedback?.length ? (
      feedback.map((_feedback, index) => (
        <Feedback key={_feedback.id} {..._feedback} />
      ))
    ) : (
      <Text>There are no comments for this site.</Text>
    )}
  </Box>
)

export default EmbeddedFeedbackPage
```

## Redimensionado del Iframe

Cuando embebemos el iframe de feedback, quizás queramos redimensionar automáticamente la altura a los contenidos. Esto se puede conseguir empleando [iframe-resizer](https://github.com/davidjbradshaw/iframe-resizer).

Por ejemplo, si estás usando React, puedes añadir [iframe-resizer-react](https://github.com/davidjbradshaw/iframe-resizer-react) y hacer algo como esto. Esta librería pesa [5.8kB](https://bundlephobia.com/result?p=iframe-resizer-react@1.0.4) minificada + gzipped sin ninguna dependencia.

```jsx
<IframeResizer
  checkOrigin={false}
  title="Comments"
  src={`https://fastfeedback.io/embed/SITE_ID`}
  style={{
    width: '1px',
    minWidth: '100%',
  }}
/>
```

Para habilitar esto en el lado donde se embebe, necesitamos instalar `iframe-resizer` e incluir el snippet de JS dentro de la ruta embebida.

```bash
$ yarn add iframe-resizer
```

**`pages/embed/[...site].js`**

```
import 'iframe-resizer/js/iframeResizer.contentWindow';
```
