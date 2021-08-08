# Borrando Feedback

Ahora que los usuarios tienen una forma de añadis sitios/feedback, necesitamos permitirles gestionar este contenido. Estos consistirá en dos partes, borrar y editar.

import Callout from 'nextra-theme-docs/callout'

<Callout>
Esta sección es válida tanto para feedback para como sitios. La única diferencia es el nombre de la colección. 
</Callout>

Primero, vamos a crear una función que nos permita borrar feedback desde el lado del cliente. Dado un ID, vamos a encontrar el documento dentro de la colección`feedback` y lo vamos a borrar.

**`lib/db.js`**

```js
export function deleteFeedback(id) {
  return firestore.collection('feedback').doc(id).delete();
}
```

Borrar feedback o sitios es una acción crucial para el usuario. Para asegurarnos de que _realmente_ lo quiere borrar, podemos incluir un modal o ventana emergente de confirmación. Vamos a crear el componente para esto, el cual es invocado por un botón. Todavía tendremos que completar `onDelete` después.

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

A continuación, necesitamos actualizar `onDelete` para llamar a Firestore y borrar el documento.

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

Finalmente, esto nos permite colocar un `IconButton` que abrirá el modal de confirmación. Utilizamos la prop `feedbackId` para identificar qué documento queremos borrar.

```js
// Somewhere in your codebase
<DeleteFeedbackButton feedbackId="BLspD6y8Bfn73LLm7nvW" />
```

Como ejercicio, determina dónde coloar este componente en el código.

### Ir más lejos

Desde que hemos traído el feedback con SWR y reenviado a esta página, necesitamos actualizar la caché de SWR cuando borramos un elemento de forma que este ítem también sea borrado de la pantalla.

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

Esto muta la llamada a la API para traer todo el feedback para un usuario dado y filtra el feedback borrado en base a su ID. Finalmente, le dice a SRW que _no_ revalide mediante la inclusión de `false` como segundo parámetro.

Puedes ver la API route para traer el feedback [aquí](https://github.com/leerob/fastfeedback/blob/master/pages/api/feedback.js).
