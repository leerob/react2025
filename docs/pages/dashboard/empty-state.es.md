# Estado Vacío

Con frecuencia se pasa por alto, pero una parte importante del diseño de sitios web son los estados vacíos o _[empty states](https://material.io/design/communication/empty-states.html#content)_.

En lugar de mostrar una pantalla en blanco, estos proporcionan un camino para guiar al usuario en su primera interacción con la aplicación (por ejemplo, crear tu primer sitio).

### Caso de Uso

Cuando un usuario crea por primera vez una cuenta, este no tendrá sitios para mostrar en el _dashboard_. Vamos a implementar un componente `EmptyState` que podemos emplear para guiar a los usuarios cuando crean su primer sitio. Esto proporcionará una mayor experiencia de usuario para el cliente.

![Empty State](/empty-state.png)

### Componente de Empty State

Utilizando el elemento componible `Box` de Chakra UI, podemos aplicar _props_ de estilo para diseño pseudo-tablas que imiten el diseño real de nuestro sitio. Entonces, podemos añadir un `Button` de _call-to-action_ ofreciendo la dirección a seguir al usuario.

**`components/EmptyState.js`**

```js
import React from 'react'
import { Box, Heading, Stack, Text, Button } from '@chakra-ui/core'

const EmptyState = () => {
  return (
    <Box
      backgroundColor="white"
      ml={0}
      mr={0}
      borderRadius={8}
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
    >
      <Box
        backgroundColor="gray.50"
        borderTopLeftRadius={8}
        borderTopRightRadius={8}
        borderBottom="1px solid"
        borderBottomColor="gray.200"
        height="40px"
      />
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={2}
        p={16}
        borderRadius={8}
      >
        <Heading size="lg">You haven’t added any sites.</Heading>
        <Text>Welcome 👋🏼 Let’s get started.</Text>
        <Button
          maxWidth="200px"
          backgroundColor="gray.900"
          color="white"
          fontWeight="medium"
          mt={4}
          _hover={{ bg: 'gray.700' }}
          _active={{
            bg: 'gray.800',
            transform: 'scale(0.95)',
          }}
        >
          Add Your First Site
        </Button>
      </Stack>
    </Box>
  )
}

export default EmptyState
```
