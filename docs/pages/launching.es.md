# Lanznado

Has construido la aplicación. Tienes (esperemos) algunos usuarios en fase alpha o cliente interesados. ¡Ahora debes lanzar!

## Términos de Uso y Política de Privacidad

Antes de que puedas aceptar dinero de los usuarios necesitas definir tús [Términos de uso](https://www.termsfeed.com/blog/saas-terms-use-privacy-policy/) y la [Política de Privacidad](https://www.termsfeed.com/blog/saas-terms-use-privacy-policy/).
Yo utilizo [Termly](https://termly.io) para ayudarme a generar automáticamente estos documentos. Después de seguir los pasos requeridos e introducir mi información, copié todos los documentos y los pegué dentro de un conversor de [Texto Enriquecido a Markdown](https://euangoddard.github.io/clipboard2markdown/).
Después, puedo usar el alojamiento de los archivos en mi sitio usando Markdown para editar fácilmente el contenido. Tuve que hacer algunos ajustes manuales a partir del contenido auto-generado.

### Añadiendo Markdown

La forma más fácil de gestionar este contenido es con Markdown. ¿Qué pasa si queremos utilizar Markdown con React? Tenemos [MDX](https://mdxjs.com/), que es "markdown para la era de los componentes". MDX nos permite escribir JSX dentro de nuestro Markdown, además de embeber contenido de React fácilmente en nuestros documentos. Esto nos dará flexibilidad en el futuro para mostrar nuestros contenidos escritos.

Para añadir soporte MDX a nuestros sitio de Next.js, debemos instalar primeramente las dependencias requeridas.

```bash
$ yarn add @mdx-js/loader @mdx-js/react @next/mdx
```

Después, reescribiremos la configuración por defecto del fichero [`next.config.js`](https://nextjs.org/docs/api-reference/next.config.js/introduction). Esto nos permite crear ficheros dentro de `pages/*` que tengan la extensión `.mdx`.

```js
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
})
```

A continuación, creamos un fichero en `pages/privacy.mdx` y vamos a añadir algo de Markdown.

```md
# Privacy Policy

We don't sell your data.
```

En este punto, deberás ser capaz de navegar a `/privacy` en tu aplicación y ver algo de contenido. Actualmente no tendrás ningún tipo de estilo. Vamos a añadir un componente de _layout_ que enmarcará todo el contenido del fichero Markdown.

**`pages/privacy.mdx`**

```md
import DocsLayout from '@/components/DocsLayout';

export default (props) => <DocsLayout {...props} />;

# Privacy Policy

We don't sell your data.
```

**`components/DocsLayout.js`**

```jsx
import React from 'react'
import { Box } from '@chakra-ui/core'

import Navbar from './Navbar'
import Footer from './Footer'

const DocsLayout = ({ children }) => (
  <>
    <Navbar />
    <Box maxW="650px" mx="auto" px={8}>
      {children}
    </Box>
    <Footer />
  </>
)

export default DocsLayout
```

Esto nos permitirá crear un `Navbar`/`Footer` para nuestro sitio web y tenerlo para que persista como un _layout_ a través de todas las páginas de la documentación. Finalmente, vamos a añadir un proveedor (_provider_) que le dirá a MDX qué componentes emplear cuando estemos renderizando el fichero Markdown. Por ejemplo, `**hello**` se deberá traducir a un componente en negrita. Queremos que nuestro proveedor esté a nivel superior en la aplicación, por lo que debemos modificar el fichero `_app.js`.

**`pages/_app.js`**

```jsx
import { MDXProvider } from '@mdx-js/react'

import MDXComponents from '@/components/MDXComponents'

return (
  <ThemeProvider theme={customTheme}>
    <AuthProvider>
      <MDXProvider components={MDXComponents}>
        <DefaultSeo {...SEO} />
        <GlobalStyle />
        <Component {...pageProps} />
      </MDXProvider>
    </AuthProvider>
  </ThemeProvider>
)
```

Para un ejemplo de cómo nuestros componentes MDX deben visualizarse, consulta `MDXComponents` desde [Fast Feedback](https://github.com/leerob/fastfeedback/blob/master/components/MDXComponents.js).

## Marketing / Ventas

Este no es un curso sobre marketing o ventas, ni soy un experto en ninguno de estos temas. Deberías considerar leer [Your Music and People](https://sive.rs/m) o echar un vistazo a [Sales for Founders](https://salesforfounders.com/).

Algunos consejos genéricos que he encontrado y pueden ser útiles.

- Escribe una _copy_ convincente. Elimina implacablemente todo lo que no sea crítico. Haz que tu página de destino sea lo más clara y concisa posible.
- Habla a los puntos débiles del cliente.
- Incluye testimonios que aborden las dudas de un cliente potencial.
- Utilice imágenes convincentes para contar tu historia.
- ¡Utiliza vídeo!

## Dónde Publicar

Publica donde tu audiencia objetivo se encuentre. Reddit, Hacker News, Facebook, Discord, Slack, etc. Idealmente, has estado creando una _newsletter_ o alguna otra forma de generación de _leads_ para tener un grupo de clientes potenciales.

Considera escribir acerca de tu camino, o cómo tu producto se ha construido, como una forma de marketing de contenidos para atraer clientes. También ayuda listar explícitamente cómo tu producto se compara a los de los competidores (y cómo es mejor).

Comparte tu camino con otros en las redes sociales. Considera pregunta a amigos o compañeros para que te ayuden a amplificar tu post de lanzamiento. Incluso puedes enviar un email frío a aquellos que han mostrado interés en el producto.

## Midiendo el Éxito

Ahora que has lanzado, quieres medir y rastrear tu éxito. Esto puede ser el número total de clientes, los ingresos mensuales recurrentes, visitas a página o cualquier otro tipo de métrica.

Nosotros ya hemos creado algunas buenas fuentes:

- Stripe (clientes, MRR, rebote)
- Analytics (páginas visitas, referidos)
- Firebase (lecturas/escrituras para entender el uso)

También puedes configurar [Google Search Console](https://search.google.com/search-console/about).
