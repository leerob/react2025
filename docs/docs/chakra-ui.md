---
title: Setting Up Chakra UI
---

Front-end tooling has rapidly progressed, and projects like [styled-system](https://styled-system.com/) and [Theme UI](https://theme-ui.com/) make it easy
to create components that easily adhere to your design system.

[Chakra UI](https://chakra-ui.com/), built on top of styled-system, providers a comprehensive component library allowing us
to easily create components that adhere to a design system.

- Since it uses styled-system under the hood, we can use style props
- The theme is extendable, allowing us to change fonts and add icons easily
- It includes a great set of accessible components out of the box
- Works well with Next.js and supports dark mode

To install Chakra, let's add the required dependencies.

```bash
yarn add @chakra-ui/core @emotion/core @emotion/styled emotion-theming
```

Chakra UI comes with a default theme containing values for colors, typography, and more.
Let's extend the default and add a custom font.

**`styles/theme.js`**

```js
import { theme as chakraTheme } from '@chakra-ui/core';

const theme = {
  ...chakraTheme,
  fonts: {
    ...chakraTheme.fonts,
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 800
  }
};

export default theme;
```

Now, we can add the theme to our application with `ThemeProvider`, passing the `theme` object as a prop.
Let's modify `pages/_app.js` to make the theme available to all pages.

**`pages/_app.js`**

```js
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { AuthProvider } from '../util/auth';
import theme from '../styles/theme';

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CSSReset />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
```
