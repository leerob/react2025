# SEO

[Search Engine Optimization (SEO)](https://en.wikipedia.org/wiki/Search_engine_optimization) is the process of growing the quality and quantity of website traffic by increasing the visibility of a website or a web page to users of a web search engine. Basically, you want to rank high on Google.

With web applications, this generally means ensuring the proper [Open Graph](https://ogp.me/) and `<meta>` tags are inside your `<head>`. Luckily, there's a handy library called [next-seo](https://github.com/garmeeh/next-seo) which makes this process easy for Next.js.

## Installing Next SEO

First, install the library.

```bash
$ yarn add next-seo
```

Then, create a default configuration.

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

Feel free to customize this as you see fit. Finally, import the default configuration into your `_app.js` file to ensure it's included on every route.

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

## Overriding Defaults

It's likely you'll want to override some of the default values for specific pages. You can either import this directly into each page, or create a wrapping component like this.

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
