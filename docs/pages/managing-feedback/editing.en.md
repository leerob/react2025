# Editing Feedback

After feedback is left on a site, it's initially `pending`. Then, a user can toggle whether it's active or not. Let's create a table row that allows the site owner to toggle visibility for a piece of feedback.

First, we need to target the correct document and forward a new set of values. This will only update in fields based on `newValues`. Any other existing feedback data will not be modified. For example, if we forward new values of `{'status': 'active'}`, no other field on the document will change except status.

**`lib/db.js`**

```js
export function updateFeedback(id, newValues) {
  return firestore.collection('feedback').doc(id).update(newValues)
}
```

Finally, we can create a new component to use Chakra's `Switch`. When the switch is toggled, we update the feedback in the database and mutate the API route. You'll notice that we `await` the update process to ensure it has finished before mutating the cache.

**`components/FeedbackRow.js`**

```js
import React, { useState } from 'react'
import { Box, Code, Switch } from '@chakra-ui/core'
import { mutate } from 'swr'

import { Td } from './Table'
import { useAuth } from '@/lib/auth'
import { updateFeedback } from '@/lib/db'
import DeleteFeedbackButton from './DeleteFeedbackButton'

const FeedbackRow = ({ id, author, text, route, status }) => {
  const auth = useAuth()
  const isChecked = status === 'active'

  const toggleFeedback = async () => {
    await updateFeedback(id, { status: isChecked ? 'pending' : 'active' })
    mutate(['/api/feedback', auth.user.token])
  }

  return (
    <Box as="tr" key={id}>
      <Td fontWeight="medium">{author}</Td>
      <Td>{text}</Td>
      <Td>
        <Code>{route || '/'}</Code>
      </Td>
      <Td>
        <Switch color="green" onChange={toggleFeedback} isChecked={isChecked} />
      </Td>
      <Td>
        <DeleteFeedbackButton feedbackId={id} />
      </Td>
    </Box>
  )
}

export default FeedbackRow
```
