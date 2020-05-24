---
title: Dynamic Routing
---

For complex applications, we don't know all the available routes available ahead of time.
Some routes are likely built on top of a data model (e.g., page for each user).

With Next.js, you can add brackets to a page filename to create a **dynamic route**.
For example, let's set up a route to leave feedback for a page.

**`pages/p/[pageId].js`**

```js {4}
import { useRouter } from 'next/router';

export default function FeedbackPage() {
  const router = useRouter();

  return <Box>Page ID: ${router.query.pageId}</Box>;
}
```

A route like `/p/abc` would match `pages/p/[pageId].js` and provide the query parameter to the page.

**`pages/p/[pageId].js`**

```js
import { useRouter } from 'next/router';

import Feedback from '../../components/Feedback';
import { useAuth } from '../../util/auth';
import { createFeedback } from '../../util/db';
import { getAllFeedback, getAllPages } from '../../util/db-admin';
import FeedbackLink from '../../components/FeedbackLink';

export async function getStaticProps(context) {
  const pageId = context.params.pageId;
  const result = await getAllFeedback(pageId);

  return {
    props: {
      initialFeedback: result.feedback
    }
  };
}

export async function getStaticPaths() {
  const result = await getAllPages();
  const paths = result.pages.map((page) => ({
    params: { pageId: page.id.toString() }
  }));

  return {
    paths,
    fallback: false
  };
}

export default function FeedbackPage({ initialFeedback }) {
  const router = useRouter();

  return <Box>Page ID: ${router.query.pageId}</Box>;
}
```
