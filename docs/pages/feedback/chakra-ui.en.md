# Setting Up Chakra UI

Front-end tooling has rapidly progressed, and projects like [styled-system](https://styled-system.com/) and [Theme UI](https://theme-ui.com/) make it easy
to create components that easily adhere to your design system.

[Chakra UI](https://chakra-ui.com/), built on top of styled-system, provides a comprehensive component library allowing us
to easily create components that adhere to a design system.

- Since it uses styled-system under the hood, we can use style props
- The theme is extendable, allowing us to change fonts and add icons easily
- It includes a great set of accessible components out of the box
- Works well with Next.js and supports dark mode

To install Chakra, let's add the required dependencies.

```bash
$ yarn add @chakra-ui/core@0.8.0 @emotion/core@10.0.28 @emotion/styled@10.0.27 emotion-theming@10.0.27
```

This course uses `v0.8` of Chakra UI. You can read the docs for this version [here](https://v0.chakra-ui.com/). If you'd prefer to start from `v1.0`, you can read the migration guide [here](https://chakra-ui.com/docs/migration).

Chakra UI comes with a default theme containing values for colors, typography, and more.
Let's extend the default and add a custom font.

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

Now, we can add the theme to our application with `ThemeProvider`, passing the `theme` object as a prop.
Let's modify `pages/_app.js` to make the theme available to all pages.
Next.js uses the [`App` component](https://nextjs.org/docs/advanced-features/custom-app) to initialize pages. You can override it and control the page initialization.

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

We also need to load the font Inter defined earlier. A [custom Document](https://nextjs.org/docs/advanced-features/custom-document) is commonly used to augment your application's `<html>` and `<body>` tags. This is necessary because Next.js pages skip the definition of the surrounding document's markup.

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
