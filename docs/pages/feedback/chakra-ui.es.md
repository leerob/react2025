# Configurando Chakra UI

Las herramientas de _front-end_ han progresado rápidamente y proyectos como [styled-system](https://styled-system.com/) y [Theme UI](https://theme-ui.com/) hacen sencilla la tarea de crear componentes que se adhieren fácilmente a nuestro _design system_.

[Chakra UI](https://chakra-ui.com/), construido sobre styled-system, nos provee de una librería de componentes que nos permite crear fácilmente componentes que se adhieren a nuestro _design system_.

- Dado que utiliza styled-system por debajo, podemos utilizar _props_ de estilo
- El tema es extensible, permitiéndonos cambiar fuentes e iconos fácilmente
- Incluye un gran conjunto de componentes accesibles listos para usar
- Funciona bien con Next.js y soporta modo oscuro

Para instalar Chakra, vamos a añadir las dependencias requeridas.

```bash
$ yarn add @chakra-ui/core@0.8.0 @emotion/core@10.0.28 @emotion/styled@10.0.27 emotion-theming@10.0.27
```

Este curso utiliza la versión `v0.8` de Chakra UI. Puedes leer la documentación para esta versión [aquí](https://v0.chakra-ui.com/). Si prefieres empezar por la versión `v1.0`, puedes leer sobre la guía de migración [aquí](https://chakra-ui.com/docs/migration).

Chakra UI viene con un tema por defecto que contiene valores para colores, tipografías y mucho más. Vamos a extender la configuración por defecto para añadir una fuente personalizada.

**`styles/theme.js`**

```js
import { theme as chakraTheme } from '@chakra-ui/core'

const theme = {
  ...chakraTheme,
  fonts: {
    ...chakraTheme.fonts,
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 800,
  },
}

export default theme
```

Ahora, podemos añadir el tema a nuestra aplicación mediante el `ThemeProvider`, pasando el objeto `theme` como una prop.
Vamos a modificar `pages/_app.js` para hacer el tema accesible a todas las páginas. Next.js utiliza el [componente `App`](https://nextjs.org/docs/advanced-features/custom-app) para inicializar las páginas. Puedes sobreescribirlo y controlar la inicialización de las páginas.

**`pages/_app.js`**

```js
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { AuthProvider } from '../lib/auth'
import theme from '../styles/theme'

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CSSReset />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
```

También necesitamos cargar la fuente Inter que hemos definido antes. Un [Document personalizado](https://nextjs.org/docs/advanced-features/custom-document) se usa con frecuencia para aumentar e incorporar elementos a las etiquetas `<html>` y `<body>` de nuestra aplicación. Esto es necesario porque las páginas de Next.js omiten la definición del _markup_ del documento.

**`pages/_document.js`**

```js
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
```
