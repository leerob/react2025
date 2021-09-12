# Dynamic Routing

For complex applications, we don't know all the available routes available ahead of time.
Some routes are likely built on top of a data model (e.g., page for each user).

We need to statically generate a page containing all the feedback for each site. With Next.js, you can add brackets to a page filename to create a **dynamic route**.
For example, let's set up a new file using dynamic routing.

**`pages/p/[siteId].js`**

```js {4}
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/core'

export default function FeedbackPage() {
  const router = useRouter()

  return <Box>Page ID: {router.query.siteId}</Box>
}
```

A route like `/p/abc` would match `pages/p/[siteId].js` and provide the query parameter to the page. For more information, check out the [routing docs](https://nextjs.org/docs/routing/introduction).

Let's create the feedback page, which is created dynamically for each site.

**`lib/db-admin.js`**

```js
export async function getAllSites() {
  const snapshot = await db.collection('sites').get()

  const sites = []

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() })
  })

  return { sites }
}
```

**`pages/p/[siteId].js`**

```js
import { Box } from '@chakra-ui/core'
import { useRouter } from 'next/router'

import { getAllFeedback, getAllSites } from '../../lib/db-admin'

 export async function getStaticProps(context) {
  const siteId = context.params.siteId
  const { feedback } = await getAllFeedback(siteId)

  return {
    props: {
      initialFeedback: feedback,
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const { sites } = await getAllSites()
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString(),
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

const FeedbackPage = ({ initialFeedback }) => {
  const router = useRouter()

  return <Box>Site ID: {router.query.siteId}</Box>
}

export default FeedbackPage
```

Let's break down what's happening here.

- We use `getStaticProps` to fetch all the feedback for the site, given the `siteId` forwarded by the dynamic route. We forward that information to the component via a `prop`.
- We use `getStaticPaths` to create a page for _each_ site. If a page has not been created for a site (for example, a brand new site) and the user visits the route, we should generate the site on the fly. This is controlled by the [fallback value](https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required) of `true`.
- We define a revalidation period of one second with `revalidate`. Every feedback page is built statically at build time. Then, when a request comes in after the revalidation period, `getStaticProps` is re-ran behind the scenes. If it completes successfully, the page is replaced and updated in the cache. This ensures you never have downtime and always serve a static HTML file.
