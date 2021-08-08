# Launching

You've built the application. You (hopefully) have some alpha users or interested customers. Now, you must launch!

## Terms of Use and Privacy Policy

Before you can accept money from users, you need to define your [Terms of Use](https://www.termsfeed.com/blog/saas-terms-use-privacy-policy/) and a [Privacy Policy](https://www.termsfeed.com/blog/saas-terms-use-privacy-policy/).
I used [Termly](https://termly.io) to help me automatically generate these documents. After following the
required steps and entering my information, I copied the documents and pasted them into a [Rich Text to Markdown](https://euangoddard.github.io/clipboard2markdown/) transformer.
Then, I can use host the files on my site using Markdown to easily edit the contents. I had to make a few manual tweaks from the auto-generated content.

### Adding Markdown

The easiest to way to manage this content is with Markdown. What if we want to use Markdown with React? Enter [MDX](https://mdxjs.com/), which is "markdown for the component era". MDX allows us to write JSX inside our Markdown, as well as easily embed React components in documents. This gives us flexibility into the future for displaying written content.

To add MDX support to your Next.js site, first install the required dependencies.

```bash
$ yarn add @mdx-js/loader @mdx-js/react @next/mdx
```

Then, override the [`next.config.js`](https://nextjs.org/docs/api-reference/next.config.js/introduction) default configuration. This allows you to create files inside `pages/*` that end with `.mdx`.

```js
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
})
```

Next, create a file at `pages/privacy.mdx` and add some Markdown.

```md
# Privacy Policy

We don't sell your data.
```

At this point, you should be able to navigate to `/privacy` in your application and see some content. Currently, there isn't any styling. Let's add a layout component that will wrap our Markdown file.

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

This would allow you to create a `Navbar`/`Footer` for you website and have it persist as a layout across all of your documentation pages. Finally, let's add a "provider" that will tell MDX which components to use when rendering the Markdown file. For example, `**hello**` should translate to bold component. We want our provider to be at the top-level of our application, so let's modify `_app.js`.

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

For an example of what your MDX components might look like, see `MDXComponents` from [Fast Feedback](https://github.com/leerob/fastfeedback/blob/master/components/MDXComponents.js).

## Marketing / Sales

This is not a course on either marketing or sales, nor am I an expert of either of these topics. You might consider reading [Your Music and People](https://sive.rs/m) or checking out [Sales for Founders](https://salesforfounders.com/).

Some general tips that I've found that might be useful.

- Write compelling copy. Relentlessly prune anything non-critical. Make your landing page as clear and concise as possible.
- Speak to the customer's pain points.
- Include testimonals addressing a potential customer's doubts.
- Use compelling imagery to tell your story.
- Use video!

## Where To Post

Post where you target audience hangs out. Reddit, Hacker News, Facebook, Discord, Slack, etc. Ideally, you've been building a newsletter or some other form of lead generation along the way so you have a pool of potential customers.

Consider writing about your journey, or how you product is built, as a form of content marketing to attract customers. It's also helpful to be explicit listing how you product compares against other competiors (and how it's better).

Share you journey on social media with others. Consider asking friends or peers to help amplify your launch post. You could even cold email those who might have an interest in the product.

## Measuring Success

Now that you've launched, you want to measure and track your success. This might be total number of customers, monthly recurring revenue, page views, downloads, or any other metrics.

We've already created a few good sources:

- Stripe (Customers, MRR, churn)
- Analytics (Page views, referrers)
- Firebase (Reads/write to understand usage)

You might also consider setting up [Google Search Console](https://search.google.com/search-console/about).
