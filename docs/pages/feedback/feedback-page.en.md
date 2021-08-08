# Feedback Page

Now that we have the base for our feedback page, let's add some more logic! I'll break down each piece individually, then show the completed example at the end.

### Creating Feedback

We want to have a text input allowing users to add feedback, as well as a button to submit feedback. Then, we can create the feedback on the client-side using Firebase. First, let's make the Firebase query.

**`lib/db.js`**

```js
export function createFeedback(data) {
  return firestore.collection('feedback').add(data)
}
```

### Feedback Form

Now, we need a form on the client-side to accept input. Since we've already set up Chakra UI, this becomes much easier! We only want to show the text input if a user is logged in. We can utilize our `useAuth` hook for this.

**`pages/p/[siteId].js`**

```js
import { useRef } from 'react'
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/core'

import { useAuth } from '@/lib/auth'

// ...Rest of the file, redacted to focus on the return

const FeedbackPage = ({ initialFeedback }) => {
  const auth = useAuth()
  const inputEl = useRef(null)

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
      {auth.user && (
        <Box as="form">
          <FormControl my={8}>
            <FormLabel htmlFor="comment">Comment</FormLabel>
            <Input ref={inputEl} id="comment" placeholder="Leave a comment" />
            <Button mt={4} type="submit" fontWeight="medium">
              Add Comment
            </Button>
          </FormControl>
        </Box>
      )}
      // Only render the feedback if it exists
      {initialFeedback &&
        initialFeedback.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
    </Box>
  )
}

export default FeedbackPage
```

### Feedback Component

The `Feedback` component is a purely presentational component. It uses `date-fns` to parse our ISO timestamp and format it. First, install `date-fns`.

```bash
$ yarn add date-fns
```

Then, create the `Feedback` component.

**`components/Feedback.js`**

```js
import React from 'react'
import { Box, Heading, Text, Divider } from '@chakra-ui/core'
import { format, parseISO } from 'date-fns'

const Feedback = ({ author, text, createdAt }) => (
  <Box borderRadius={4} maxWidth="700px" w="full">
    <Heading size="sm" as="h3" mb={0} color="gray.900" fontWeight="medium">
      {author}
    </Heading>
    <Text color="gray.500" mb={4} fontSize="xs">
      {format(parseISO(createdAt), 'PPpp')}
    </Text>
    <Text color="gray.800">{text}</Text>
    <Divider borderColor="gray.200" backgroundColor="gray.200" mt={8} mb={8} />
  </Box>
)

export default Feedback
```

### Saving Feedback

Finally, we need to save the feedback using the `createFeedback` function we made earlier. By adding an `onSubmit` handler to our form, this will get triggered when the button with `type="submit"` is clicked. Let's step through `onSubmit`.

- First, we prevent the default behavior of a form reloading the page.
- We create the new feedback object to save to the database.
- We clear out the text input.
- We use React State to add the new feedback to the list so it appears it was added instantly.
- We actually save the feedback in Firestore.

**`pages/p/[siteId].js`**

```js {40,69,80}
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/core'

import Feedback from '@/components/Feedback'
import { useAuth } from '@/lib/auth'
import { createFeedback } from '@/lib/db'
import { getAllFeedback, getAllSites } from '@/lib/db-admin'

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
  const auth = useAuth()
  const router = useRouter()
  const inputEl = useRef(null)
  const [allFeedback, setAllFeedback] = useState([])

  useEffect(() => {
    setAllFeedback(initialFeedback)
  }, [initialFeedback])

  const onSubmit = (e) => {
    e.preventDefault()

    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: 'pending',
    }

    inputEl.current.value = ''
    setAllFeedback((currentFeedback) => [newFeedback, ...currentFeedback])
    createFeedback(newFeedback)
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
      {auth.user && (
        <Box as="form" onSubmit={onSubmit}>
          <FormControl my={8}>
            <FormLabel htmlFor="comment">Comment</FormLabel>
            <Input ref={inputEl} id="comment" placeholder="Leave a comment" />
            <Button mt={4} type="submit" fontWeight="medium">
              Add Comment
            </Button>
          </FormControl>
        </Box>
      )}

      {allFeedback &&
        allFeedback.map((feedback) => (
          <Feedback
            key={feedback.id || new Date().getTime().toString()}
            {...feedback}
          />
        ))}
    </Box>
  )
}

export default FeedbackPage
```
