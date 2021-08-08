# Página de Feedback

Ahora que tenemos la base para nuestra página de feedback, ¡vamos a añadir algo de lógica! Desglosaré cada componente individualmente, para luego mostrar el ejemplo completo al final.

### Creando Feedback

Queremos tener un campo de entrada de texto que permita a los usuarios añadir feedback, así como un botón de enviar feedback. Para esto, podemos crear el feedback en el lado del cliente utilizando Firebase. En primer lugar, vamos a hacer la consulta o _query_ en Firebase.

**`lib/db.js`**

```js
export function createFeedback(data) {
  return firestore.collection('feedback').add(data)
}
```

### Formulario de Feedback

Ahora necesitamos un formulario en el lado del cliente que acepte datos de entrada. Dado que ya hemos configurado Chakra UI, esto se vuelve mucho más sencillo. Además, queremos mostrar este campo de texto solo si el usuario ha iniciado sesión. Para esto, podemos utilizar el hook de `useAuth`.

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

### Componente de Feedback

El componente de `Feedback` es un componente puramente de presentación. Utiliza `date-fns` para para analizar nuestra fecha en formato ISO y formatearla. Primero, instalamos `date-fns`.

```bash
$ yarn add date-fns
```

Después, creamos el componente `Feedback`.

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

### Guardando Feedback

Finalmente, necesitamos guardar el feedback usando la función `createFeedback` que hicimos previamente. Añadiendo el manejador `onSubmit` a nuestro formulario, se activará cuando se haga click sobre el botón `type="submit"`. Vamos a ver más sobre `onSubmit`.

- Primero, evitamos el comportamiento predeterminado de un formulario que recarga la página.
- Creamos el nuevo objeto de feedback para guardar en la base de datos.
- Limpiamos la entrada de texto.
- Utilizamos React State para añadir el nuevo feedback a la lista, de forma que parezca que se ha añadido instantáneamente.
- Guardamos el feeback en Firestore.

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
