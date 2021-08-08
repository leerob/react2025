# Embedded View

The product built in the course, [Fast Feedback](/introduction/product-overview), is meant to be embedded into existing websites. This allows users to seamlessly add comments, reviews, and other forms of feedback to their site. Let's create a method for embedding feedback into a different site.

## Iframes

We can embed our route into another site in one line code of using an `iframe`. This is crucial because it requires no extra JavaScript for the consumer, if necessary. A static page is served and [regenerated](https://nextjs.org/blog/next-9-4#incremental-static-regeneration-beta) periodically to show all comments that have been approved.

```html
<iframe src="https://fastfeedback.io/embed/SITE_ID/ROUTE" />
```

## Catch All Routes

As you might have noticed from the above URL, we can include a site ID and route in the URL. Inside Fast Feedback, we need a way to fetch _both_ parameters so we can query the correct data.

We can accomplish this using [catch all routes](https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes). This is an extension of dynamic routing that uses three dots (`...`) to get any number of parameters.

For example, `pages/embed/[...site].js` matches both `/embed/SITE_ID` as well as `/embed/SITE_ID/ROUTE` – perfect! Let's create a new file `pages/embed/[...site].js` so we can consume the catch all route.

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

## Iframe Resizer

When embedding the feedback iframe, you might want to automatically resize the
height to its contents. This can be achieved using [iframe-resizer](https://github.com/davidjbradshaw/iframe-resizer).

For example, if you are using React, you can add [iframe-resizer-react](https://github.com/davidjbradshaw/iframe-resizer-react) and do
something like this. This library is [5.8kB](https://bundlephobia.com/result?p=iframe-resizer-react@1.0.4) minified + gzipped with no dependencies.

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

To enable this on the embed side, we need to install `iframe-resizer` and include the JS snippet inside the embedded route.

```bash
$ yarn add iframe-resizer
```

**`pages/embed/[...site].js`**

```
import 'iframe-resizer/js/iframeResizer.contentWindow';
```
