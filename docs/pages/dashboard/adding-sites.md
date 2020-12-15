# Adding Sites

The final piece of this section is a Modal / Form to add sites. This will allow us to see SWR work its magic and update when new sites are added to the table.

When we created the `EmptyState` and `DashboardShell` components, you might have noticed both had a "create site" button. Let's wire that up to launch a modal.

## Creating the Modal

First, let's install `react-hook-form` to manage the state of our form. This makes it simple to fetch the values from inputs, as well as handle any errors if fields need more complex validation. For example, we could extend this to include validation checks that the URL matched a specific pattern.

```bash
$ yarn add react-hook-form
```

Next, let's create a new file for the modal with builds off Chakra UI's `Modal` component.

**`components/AddSiteModal.js`**

```js
import { useForm } from 'react-hook-form'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  useDisclosure,
} from '@chakra-ui/core'

const AddSiteModal = ({ children }) => {
  // This is used to manage the opened/closed state
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleSubmit, register } = useForm()

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)',
        }}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(TODO)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="My site"
                name="name"
                // Register the field so we can access the value
                ref={register({
                  required: 'Required',
                })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="https://website.com"
                name="url"
                ref={register({
                  required: 'Required',
                })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button
              backgroundColor="#99FFFE"
              color="#194D4C"
              fontWeight="medium"
              type="submit"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddSiteModal
```

![Add Site Modal](/modal.png)

This gives us a UI component that accepts some `children` for a button, which invokes the `Modal` showing a form. For example, we can update the `EmptyState` and `DashboardShell` components to use `AddSiteModal`.

```js
<AddSiteModal>+ Add Site</AddSiteModal>
```

## Saving the Site

Now, let's save this site when a user clicks "Create". First, we need to create the function to create the `site` inside Firebase.

**`lib/db.js`**

```js
export function createSite(data) {
  const site = firestore.collection('sites').doc()
  site.set(data)

  return site
}
```

There's two things to mention about this function. First, it's not blocking. We are not awaiting the result of setting the data on the document we create. This is because we'll utilize optimistic UI to _assume_ the creation was successful. Secondly, we are returning the site document. This allows us to have access to the document ID, which React uses as a `key` on the site table.

Finally, let's call `createSite` when we click "Create" (and `handleSubmit`) and update the SWR cache to add the new site data.

```js
import { useForm } from 'react-hook-form'
import { mutate } from 'swr'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  useToast,
  useDisclosure,
} from '@chakra-ui/core'

import { createSite } from '@/lib/db'
import { useAuth } from '@/lib/auth'

const AddSiteModal = ({ children }) => {
  const toast = useToast()
  const auth = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleSubmit, register } = useForm()

  const onCreateSite = ({ name, url }) => {
    // Create the new object to save in Firestore
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
    }

    // Retrieve the document ID for Firestore
    const { id } = createSite(newSite)
    // Show a toast message
    toast({
      title: 'Success!',
      description: "We've added your site.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    // Update the SWR cache to add the new site
    mutate(
      ['/api/sites', auth.user.token],
      async (data) => ({
        sites: [{ id, ...newSite }, ...data.sites],
      }),
      false
    )
    onClose()
  }

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)',
        }}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="My site"
                name="name"
                ref={register({
                  required: 'Required',
                })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="https://website.com"
                name="url"
                ref={register({
                  required: 'Required',
                })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button
              id="create-site-button"
              backgroundColor="#99FFFE"
              color="#194D4C"
              fontWeight="medium"
              type="submit"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddSiteModal
```
