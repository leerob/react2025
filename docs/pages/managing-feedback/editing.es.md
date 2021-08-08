# Editando Feedback

Cuando el feedback se ha dejado en el sitio, está inicialmente en estado de `pending`. Después, un usuario puede cambiar si está activo o no. Vamos a crear una columna en la tabla que permita al propietario del sitio cambiar la visibilidad de una pieza de feedback.

Primero, necesitamos apuntar al documento correcto y reenviar un nuevo set de valores. Esto solo actualizará los campos basándose en lo que incluya `newValues`. Cualquier otro datos existente en feedback no será modificado. Por ejemplo, si enviamos nuevos valores de `{'status': 'active'}`, ningún otro campo en el documento cambiará excepto status.

**`lib/db.js`**

```js
export function updateFeedback(id, newValues) {
  return firestore.collection('feedback').doc(id).update(newValues)
}
```

Finalmente, podemos crear un nuevo componente que utilize el elemento `Switch` de Chakra. Cuando el elemento _switch_ es cambiado, actualizamos el feedback en la base de datos y mutamos la API route. Te habrás dado cuenta que realizamos `await` en el proceso de actualización para asegurarnos de que ha finalizado antes de mutar la caché..

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
