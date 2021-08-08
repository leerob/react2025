# SEO

[Search Engine Optimization (SEO)](https://en.wikipedia.org/wiki/Search_engine_optimization) es el proceso de crecer en calidad y cantidad el tráfico de nuestro sitio web por medio de incrementar la visibilidad de este o de una página a los usuarios de un motor web de búsquedas. Básicamente, lo que quieres es posicionarte alto en Google.

En aplicaciones web, esto generalmente significar asegurar la correcta configuración de [Open Graph](https://ogp.me/) y las etiquetas `<meta>` que estén en el interior de nuestro `<head>`. Por suerte, existe una librería muy útil llamada [next-seo](https://github.com/garmeeh/next-seo) que hace el proceso muy fácil para Next.js.

## Instalando Next SEO

Primero, instala la librería.

```bash
$ yarn add next-seo
```

Después, crea una configuración por defecto.

**`next-seo.config.js`**

```js
const title =
  'Fast Feedback – The easiest way to add comments or reviews to your static site.'
const description = 'Fast Feedback is being built as part of React 2025.'

const SEO = {
  title,
  description,
  canonical: 'https://fastfeedback.io',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://fastfeedback.io',
    title,
    description,
    images: [
      {
        url: 'https://fastfeedback.io/og.png',
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
  },
}

export default SEO
```

Siéntete libre de personalizar esta configuración hasta que veas que te encaja. Finalmente, importamos la configuración por defecto en nuestro archivo `_app.js` para asegurarnos de que se incluya en cualquier ruta.

**`pages/_app.js`**

```js
import SEO from '../next-seo.config'

..
..

return (
  <ThemeProvider theme={customTheme}>
    <AuthProvider>
      <DefaultSeo {...SEO} />
      <GlobalStyle />
      <Component {...pageProps} />
    </AuthProvider>
  </ThemeProvider>
)
```

## Sobreescribiendo valores predeterminados

Es probable que quieres sobreescribir algunos de los valores predeterminados para páginas específicas. Puedes importar esto directamente en cada página o crear un _wrapper_ o componente de envoltura como este.

**`components/Page.js`**

```js
import React from 'react'
import { NextSeo } from 'next-seo'

const Page = ({ name, path, children }) => {
  const title = `Fast Feedback – ${name}`
  const url = `https://fastfeedback.io${path}`

  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title,
        }}
      />
      {children}
    </>
  )
}

export default Page
```
