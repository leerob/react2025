# Deleting Feedback

Now that users have a way to add sites/feedback, we need to allow
them to manage this content. This will consist of two parts, deleting and editing.

import Callout from 'nextra-theme-docs/callout'

<Callout>
This section applies to both feedback and sites. The only real difference is the collection name. 
</Callout>

First, let's create a function allowing us to delete feedback from the client-side. Given an ID, find the document inside the `feedback` collection and delete it.

**`lib/db.js`**

```js
export function deleteFeedback(id) {
  return firestore.collection('feedback').doc(id).delete();
}
```

Deleting feedback or sites is a crucial user action. To ensure they _really_ want to delete, we can prompt a confirmation modal. Let's create the component for that, which is invoked by a button. We still complete `onDelete` next.

**`components/DeleteFeedbackButton.js`**

```js
import React, { useState, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  Button
} from '@chakra-ui/core';

const DeleteFeedbackButton = ({ feedbackId }) => {
  const [isOpen, setIsOpen] = useState();
  const cancelRef = useRef();

  const onClose = () => setIsOpen(false);
  const onDelete = () => {
    // TODO
    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Delete feedback"
        icon="delete"
        variant="ghost"
        onClick={() => setIsOpen(true)}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Feedback
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              fontWeight="bold"
              variantColor="red"
              onClick={onDelete}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteFeedbackButton;
```

Next, we need to update `onDelete` to call Firestore and delete the document.

**`components/DeleteFeedbackButton.js`**

```js
import React, { useState, useRef } from 'react';
import { mutate } from 'swr';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  Button
} from '@chakra-ui/core';

import { deleteFeedback } from '@/lib/db';

const DeleteFeedbackButton = ({ feedbackId }) => {
  const [isOpen, setIsOpen] = useState();
  const cancelRef = useRef();

  const onClose = () => setIsOpen(false);
  const onDelete = () => {
    deleteFeedback(feedbackId);
    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Delete feedback"
        icon="delete"
        variant="ghost"
        onClick={() => setIsOpen(true)}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Feedback
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              fontWeight="bold"
              variantColor="red"
              onClick={onDelete}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteFeedbackButton;
```

Finally, this allows us to place an `IconButton` which will open the confirmation modal. We use the prop `feedbackId` to identify which document we want to delete.

```js
// Somewhere in your codebase
<DeleteFeedbackButton feedbackId="BLspD6y8Bfn73LLm7nvW" />
```

As an exercise, determine where to place this component in the code.

### Going Further

Since we've fetched the feedback with SWR and forwarded it to this page, we need to update the SWR cache when we delete so that the item is removed from the screen.

```js
import { useAuth } from '@/lib/auth';

// ..

const auth = useAuth();

// ..

const onDelete = () => {
  deleteFeedback(feedbackId);
  mutate(
    ['/api/feedback', auth.user.token],
    async (data) => {
      return {
        feedback: data.feedback.filter((feedback) => feedback.id !== feedbackId)
      };
    },
    false
  );
  onClose();
};
```

This mutates the API call to fetch all feedback for a given user and filters out the deleted feedback based on its ID. Finally, it tells SWR _not_ to revalidate by passing `false` as the second parameter.

You can view the API route to fetch feedback [here](https://github.com/leerob/fastfeedback/blob/master/pages/api/feedback.js).
