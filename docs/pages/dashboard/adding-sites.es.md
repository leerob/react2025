# Añadiendo Sitios

La pieza final de esta sección es un Modal / Formulario para añadir sitios. Esto nos permitirá ver la magia de SWR trabajar y actualizar nuevos sitios cuando son añadidos a la tabla.

Cuando creamos los componentes `EmptyState` y `DashboardShell`, tal vez te hayas dado cuenta que ambos tienen el botón de "Crear Sitio". Vamos a conectarlo para lanzar un modal.

## Creando el Modal

Primero, vamos a instalar `react-hook-form` para gestionar el _state_ o estado de nuestro formulario. Esta librería hará sencillo la acción de traer valores de los campos de entrada, así como manejar cualquier error si los campos necesitan una validación más compleja. Por ejemplo, podemos extender esto para incluir comprobaciones de validación cuando una URL coincida con un patrón específico.

```bash
$ yarn add react-hook-form
```

A continuación, vamos a crear un nuevo archivo para el modal partiendo del componente `Modal` de Chakra UI.

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

![Añadir Modal del Sitio](/modal.png)

Esto nos proporciona un componente de UI que acepta un componente `children` para un botón, el cual invoca el `Modal` mostrando un formulario. Por ejemplo, podemos actualizar los componentes `EmptyState` y `DashboardShell` para usar `AddSiteModal`.

```js
<AddSiteModal>+ Add Site</AddSiteModal>
```

## Guardando el Sitio

Ahora, vamos a guardar el sitio cuando el usuario hace click en "Create". Primero, necesitamos crear la función para crear el `site` dentro de Firebase.

**`lib/db.js`**

```js
export function createSite(data) {
  const site = firestore.collection('sites').doc()
  site.set(data)

  return site
}
```

Hay dos cosas que es necesario mencionar de esta función. En primer lugar, es no bloqueante. No estamos esperando el resultado de configurar los datos en el documento que creamos. Esto es porque utilizaremos una UI optimista para _asumir_ que la creación ha sido exitosa. En segundo lugar,  estamos retornando el documento del sitio. Esto nos permite tener acceso al ID del documento, el cual React utilizará como una `key` en la tabla de sitios.

Finalmente, vamos a llamar a`createSite` cuando hacemos click en "Create" (y `handleSubmit`) y actualizamos la caché de SWR para añadir los datos del nuevo sitio.

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
