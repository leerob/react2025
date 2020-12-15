# SWR (Client-Side Rendering)

[SWR](https://swr.now.sh/) is a React Hooks library for remote data fetching.
SWR first returns the data from cache (stale), then sends the fetch request (revalidate), and finally comes with the up-to-date data again.

This is important for our dashboard page because it can be left open and the data will remain fresh.
If you re-focus or switch between tabs, SWR will [automatically revalidate data](https://swr.now.sh/#focus-revalidation).

Let's install SWR now.

```bash
$ yarn add swr
```

### API Route

Before we can use SWR, we need to create an API Route to access Firestore server-side.

[API Routes](https://nextjs.org/docs/api-routes/introduction) provide a straight-forward solution for building an API inside Next.js.
All you need to get started is an `api/` folder inside your main `pages/` folder where your routes live. Every file inside `pages/api/` is mapped to `/api/*`.

Create a new file at `pages/api/sites.js`. We can re-use the function `getAllSites` we created earlier when creating the dynamic routes for the feedback pages.

**`pages/api/sites.js`**

```js
import { getAllSites } from '@/lib/db-admin'

export default async (_, res) => {
  const result = await getAllSites()

  if (result.error) {
    res.status(500).json({ error: result.error })
  }

  res.status(200).json({ sites: result.sites })
}
```

For an API route to work, you need to export a default function (i.e., **request handler**), which receives the following parameters:

- `req`: An instance of [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage), plus some [pre-built middlewares](https://nextjs.org/docs/api-routes/api-middlewares).
- `res`: An instance of [http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse), plus some [helper functions](https://nextjs.org/docs/api-routes/response-helpers).

### Using SWR

To use SWR, we can import the hook and define which route to fetch.

```js
import useSWR from 'swr'

const { data } = useSWR('/api/sites', fetcher)
```

`fetcher` is a small wrapper around `fetch` returning `json`. Let's extract this to `utils/fetcher`.

```js
// /utils/fetcher

export default async function (...args) {
  const res = await fetch(...args)

  return res.json()
}
```

`data` will contain the JSON response from our API route.

```json
// /api/sites

{
  "sites": [
    {
      "id": "pRTMMovUKZx16npaMCET",
      "createdAt": "2020-05-21T04:01:31.694Z",
      "url": "https://react2025.com",
      "userId": "WG2acuO8oqW3Np0EXCSn28E19Rs2",
      "name": "React 2025"
    },
    {
      "id": "zckViEhZSAZD84lUEYyc",
      "createdAt": "2020-05-21T04:01:31.694Z",
      "url": "http://masteringnextjs.com/",
      "userId": "WG2acuO8oqW3Np0EXCSn28E19Rs2",
      "name": "Mastering Next.js"
    }
  ]
}
```

### Site Table

Once the data finishes loading, we want to display a list of sites inside a table. We've already created some components (`Table`, `Tr`, `Th`, `Td`) allowing us to compose our table. Let's create a new component to format and display the data shown above.

**`components/SiteTable.js`**

```js
import React from 'react'
import NextLink from 'next/link'
import { Box, Link } from '@chakra-ui/core'
import { parseISO, format } from 'date-fns'

import { Table, Tr, Th, Td } from './Table'

const SiteTable = ({ sites }) => {
  return (
    <Box overflowX="scroll">
      <Table w="full">
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Site Link</Th>
            <Th>Feedback Link</Th>
            <Th>Date Added</Th>
            <Th width="50px">{''}</Th>
          </Tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <Box as="tr" key={site.id}>
              <Td fontWeight="medium">{site.name}</Td>
              <Td>
                <Link href={site.url} isExternal>
                  {site.url}
                </Link>
              </Td>
              <Td>
                <NextLink href="/p/[siteId]" as={`/p/${site.id}`} passHref>
                  <Link color="blue.500" fontWeight="medium">
                    View Feedback
                  </Link>
                </NextLink>
              </Td>
              <Td>{format(parseISO(site.createdAt), 'PPpp')}</Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  )
}

export default SiteTable
```

Next will automatically prefetch [`<Link>`](https://nextjs.org/docs/routing/introduction#linking-between-pages) components as they appear in-viewport.
This improves the responsiveness of your application by making navigations to new pages quicker. Under the hood, Next uses an [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to [prefetch the assets](https://www.w3.org/TR/resource-hints/#prefetch) necessary in the background.

### Consuming the Data

Now that we have access to the data from the route, we can build the UI to consume the data.
Let's create a new route to show all of the user's sites.

**`pages/sites.js`**

```js
import React from 'react'
import useSWR from 'swr'

import DashboardShell from '@/components/DashboardShell'
import EmptyState from '@/components/EmptyState'
import SiteTable from '@/components/SiteTable'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import fetcher from '@/utils/fetcher'

const Dashboard = () => {
  const { data } = useSWR('/api/sites', fetcher)
  const sites = data?.sites

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      {sites.length ? <SiteTable sites={sites} /> : <EmptyState />}
    </DashboardShell>
  )
}

export default Dashboard
```

Let's run through exactly what's happening here.

- First, we make a request to `/api/sites` and return the `json` response.
- We use [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) to safely access the nested property `sites` from the `data` returned.
- If there's no `data`, then we show the loading skeleton.
- Otherwise, render the empty state or the table showing all sites.
